
import cv2
import torch
import numpy as np
import requests
import datetime
import time
import re
import threading
from flask import Flask, Response, stream_with_context, request
from flask_cors import CORS
from ultralytics import YOLO
from tracker import Sort
from ocr import plate_reader
from config import BACKEND_URL, YOLO_MODEL, MAX_CAPACITY, LINE_COORDS, VEHICLE_CLASSES

app = Flask(__name__)
CORS(app)

# AI Engine Config
# Added 0 (Person) temporarily ONLY for testing with mobile pictures if needed, 
# but filtered in detections so only vehicle shapes trigger logs.
VALID_CLASSES = [2, 3, 5, 7] # 2:car, 3:motorcycle, 5:bus, 7:truck
model = YOLO(YOLO_MODEL)
# Increased max_age to 100 for super stable tracking (important for mobile testing)
tracker = Sort(max_age=100, min_hits=1, iou_threshold=0.1)

# Global States
vehicle_timers = {} 
logged_entries = set() 
logged_violations = set() 
last_plate_info = {} 
ocr_processing = set() 
frame_count = 0
active_camera_index = 0 # Default 0 (Main Camera)

@app.route('/switch_camera', methods=['POST'])
def switch_camera():
    global active_camera_index
    idx = int(request.json.get('index', 0))
    active_camera_index = idx
    print(f">>> [CAM SWITCH] Switching to Index: {active_camera_index}")
    return {"status": "success", "index": active_camera_index}

def clean_plate_text(text):
    if not text: return None
    clean = re.sub(r'[^A-Z0-9]', '', str(text).upper())
    return clean if len(clean) >= 4 else None

def ocr_worker(frame, track_id, bbox):
    global last_plate_info
    try:
        x1, y1, x2, y2 = bbox
        # ROI: Lower half and centered for accuracy
        h, w = frame.shape[:2]
        x1, y1, x2, y2 = max(0, x1), max(0, y1), min(w, x2), min(h, y2)
        plate_roi = frame[y1:y2, x1:x2]
        
        if plate_roi.size > 0:
            raw_txt = plate_reader.extract_plate(frame, [x1, y1, x2, y2])
            cleaned = clean_plate_text(raw_txt)
            if cleaned:
                last_plate_info[track_id] = cleaned
    finally:
        if track_id in ocr_processing:
            ocr_processing.remove(track_id)

def send_update_to_backend(plate_number, status='normal', fine=0, duration=0):
    plate = plate_number if (plate_number and "SCANNING" not in plate_number) else "UNKNOWN"
    try:
        data = {
            "vehicle_number": plate,
            "status": status,
            "fine": int(fine),
            "vehicle_count": 1,
            "duration": f"{int(duration)}s",
            "timestamp": datetime.datetime.now().isoformat()
        }
        res = requests.post(f"{BACKEND_URL}/update", json=data, timeout=3)
        print(f">>> [API {status.upper()}] SUCCESS: {plate} | Stay: {int(duration)}s")
    except Exception as e:
        print(f">>> [API FAIL] {e}")

def generate_frames():
    global frame_count, active_camera_index
    current_index = active_camera_index
    cap = cv2.VideoCapture(current_index)
    
    while True:
        # Check if camera has been switched via API
        if current_index != active_camera_index:
            print(f">>> [STREAM] Re-initializing Camera to Index: {active_camera_index}")
            cap.release()
            current_index = active_camera_index
            cap = cv2.VideoCapture(current_index)

        success, frame = cap.read()
        if not success:
            print(f">>> [STREAM] Frame read failed for index {current_index}. Retrying...")
            cap.release()
            time.sleep(1)
            cap = cv2.VideoCapture(current_index)
            continue
        
        frame_count += 1
        h, w = frame.shape[:2]
        
        # High Frequency Detection for Mobile Testing
        results = model(frame, conf=0.1, verbose=False, device='cpu', imgsz=640)
        detections = []
        for r in results:
            for box in r.boxes:
                # Detect vehicles (even at low conf for mobile pictures)
                if int(box.cls[0]) in VALID_CLASSES:
                    detections.append(box.xyxy[0].tolist() + [box.conf[0].item()])
        
        track_bbs_ids = tracker.update(np.array(detections)) if detections else tracker.update(np.empty((0, 5)))
        current_time = time.time()
        active_ids = set()

        for track in track_bbs_ids:
            x1, y1, x2, y2, track_id = map(int, track)
            active_ids.add(track_id)
            
            if track_id not in vehicle_timers:
                vehicle_timers[track_id] = current_time
                last_plate_info[track_id] = "SCANNING..."
            
            # Continuous aggressive OCR for quick response
            if track_id not in ocr_processing:
                ocr_processing.add(track_id)
                threading.Thread(target=ocr_worker, args=(frame.copy(), track_id, (x1, y1, x2, y2))).start()

            elapsed = current_time - vehicle_timers[track_id]
            plate_text = last_plate_info[track_id]

            # Enforcement Timeline
            if elapsed >= 5 and track_id not in logged_entries:
                logged_entries.add(track_id)
                send_update_to_backend(plate_text, status='normal', duration=elapsed)

            if elapsed >= 30 and track_id not in logged_violations:
                logged_violations.add(track_id)
                send_update_to_backend(plate_text, status='violation', fine=500, duration=elapsed)

            # Colors and Status HUD
            color = (0, 255, 0) # Green
            if elapsed >= 30: color = (0, 0, 255) # Red
            elif elapsed >= 5: color = (255, 120, 0) # Blue-Cyan

            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 3)
            # Tag Label
            overlay_txt = f"{plate_text} | {int(elapsed)}s"
            (tw, th), _ = cv2.getTextSize(overlay_txt, 0, 0.5, 2)
            cv2.rectangle(frame, (x1, y1 - th - 10), (x1 + tw + 10, y1), color, -1)
            cv2.putText(frame, overlay_txt, (x1 + 5, y1 - 5), 0, 0.5, (255, 255, 255), 2)
            
            # Progress Countdown
            prog = min(elapsed / 30.0, 1.0)
            cv2.rectangle(frame, (x1, y2 + 5), (x1 + int(prog * (x2 - x1)), y2 + 15), color, -1)

        # Main Overlay
        cv2.putText(frame, "PARKAI SYSTEM: MONITORING ACTIVE", (20, h - 30), 0, 0.8, (0, 255, 255), 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(stream_with_context(generate_frames()), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, threaded=True)
