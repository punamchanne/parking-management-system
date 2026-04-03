
import cv2
import torch
import numpy as np
import requests
import datetime
from ultralytics import YOLO
from tracker import Sort
from ocr import plate_reader
from config import BACKEND_URL, YOLO_MODEL, MAX_CAPACITY, LINE_COORDS, VEHICLE_CLASSES

# Initialize YOLOv8
model = YOLO(YOLO_MODEL)

# Initialize Tracker
tracker = Sort()

# Vehicle count state
vehicle_count = 0
counted_ids = set()

def send_data_to_backend(plate_number, count):
    """
    Sends detected vehicle data to the Node.js backend.
    """
    try:
        data = {
            "vehicle_number": plate_number if plate_number else "UNKNOWN",
            "vehicle_count": count,
            "timestamp": datetime.datetime.now().isoformat()
        }
        response = requests.post(f"{BACKEND_URL}/update", json=data)
        if response.status_code == 200:
            print(f"Data sent: {data}")
        else:
            print(f"Failed to send data: {response.text}")
    except Exception as e:
        print(f"Error sending data to backend: {e}")

def main():
    global vehicle_count
    
    # Open camera feed (0 for local webcam, or video file path)
    cap = cv2.VideoCapture(0) 
    
    if not cap.isOpened():
        print("Error: Could not open video source.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # 1. AI Detection (YOLOv8)
        results = model(frame, verbose=False)
        detections = []
        
        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                if cls_id in VEHICLE_CLASSES:
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    conf = box.conf[0].item()
                    detections.append([x1, y1, x2, y2, conf])
        
        # 2. Tracking (SORT)
        if detections:
            track_bbs_ids = tracker.update(np.array(detections))
        else:
            track_bbs_ids = tracker.update(np.empty((0, 5)))
            
        # 3. Counting & OCR
        for track in track_bbs_ids:
            x1, y1, x2, y2, track_id = track
            
            # Simple Counting Logic: If vehicle passes a virtual line
            # Check center of bounding box
            cx = (x1 + x2) / 2
            cy = (y1 + y2) / 2
            
            # Draw tracking info
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, f"ID: {int(track_id)}", (int(x1), int(y1)-10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            
            # Check if crossing line (e.g., vertical line in middle)
            # In this example, if ID is new, assume it came in.
            # Real logic would check if cy crosses LINE_COORDS[1].
            if track_id not in counted_ids:
                if cy > LINE_COORDS[1]: # Crossed the line
                    vehicle_count += 1
                    counted_ids.add(track_id)
                    
                    # 4. OCR (only if count is increasing)
                    # Plate reader on the cropped vehicle
                    plate_text = plate_reader.extract_plate(frame, [x1, y1, x2, y2])
                    print(f"Vehicle Detected! ID: {track_id}, Plate: {plate_text}")
                    
                    # 5. Send Data to Backend
                    send_data_to_backend(plate_text, vehicle_count)
        
        # UI overlays
        # Draw counting line
        cv2.line(frame, (LINE_COORDS[0], LINE_COORDS[1]), (LINE_COORDS[2], LINE_COORDS[3]), (0, 0, 255), 2)
        cv2.putText(frame, f"Count: {vehicle_count}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 3)
        cv2.putText(frame, f"Capacity: {MAX_CAPACITY}", (50, 90), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 3)
        
        if vehicle_count > MAX_CAPACITY:
            cv2.putText(frame, "STATUS: CAPACITY EXCEEDED!", (50, 130), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

        cv2.imshow("Smart Parking Monitoring AI", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
