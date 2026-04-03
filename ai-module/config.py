
# Configuration for Smart Parking AI Module

# Backend API URL
BACKEND_URL = "http://localhost:5000/api"

# YOLOv8 Model Selection (e.g., yolov8n.pt, yolov8s.pt, yolov8m.pt)
YOLO_MODEL = "yolov8n.pt"

# Parking Capacity
MAX_CAPACITY = 10

# Counting Line (Vertical Line in center of frame for this example)
# (x1, y1, x2, y2)
LINE_COORDS = [0, 360, 1280, 360]

# Vehicle Classes for YOLO (0: person, 1: bicycle, 2: car, 3: motorcycle, 5: bus, 7: truck)
VEHICLE_CLASSES = [2, 3, 5, 7]

# OCR Confidence Threshold
OCR_THRESHOLD = 0.5
