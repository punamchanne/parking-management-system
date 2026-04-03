
# 🚗 Smart Parking System with AI Monitoring & Email Alerts

A complete full-stack solution for automated parking management using Computer Vision (YOLOv8), Real-time Tracking (SORT), and OCR (EasyOCR).

## 🚀 Features
- **AI Detection**: Real-time vehicle detection (Cars, Bikes, Trucks) using YOLOv8.
- **Smart Counting**: Automated vehicle counting based on virtual line crossing.
- **Deep Tracking**: Object tracking using SORT to avoid duplicate counts.
- **Number Plate Recognition**: OCR extraction for identified vehicles.
- **Automated Fine Generation**: Intelligent violation detection (if count > capacity).
- **Email Notifications**: Instant Nodemailer alerts to registered vehicle owners.
- **Modern Dashboard**: High-fidelity React admin & user panels with glassmorphism.

---

## 🛠️ Tech Stack
- **AI/ML**: Python, OpenCV, YOLOv8, SORT, EasyOCR
- **Backend**: Node.js, Express.js, MongoDB Atlas
- **Frontend**: React.js (Vite), Framer Motion, Lucide Icons
- **Communications**: Axios, Nodemailer (SMTP)

---

## 📁 Project Structure
```text
smart-parking-system/
├── ai-module/         # Python AI Engine
│   ├── detect.py      # Main entry point for AI inference
│   ├── tracker.py     # Object Tracking (SORT)
│   ├── ocr.py         # License Plate Extraction
│   └── config.py      # AI Configuration
├── backend/           # Node.js Express API
│   ├── routes/        # Vehicle & User endpoints
│   ├── models/        # MongoDB schemas
│   ├── controllers/   # Business logic
│   └── utils/         # Email & Helper utilities
└── frontend/          # React Web Application
```

---

## ⚙️ Installation & Setup

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Update `.env` with your **MongoDB URI** and **Gmail App Password**.
4. `npm start` (Runs on port 5000)

### 2. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

### 3. AI Module Setup
1. Ensure Python 3.8+ is installed.
2. `pip install ultralytics easyocr opencv-python requests filterpy scipy`
3. `cd ai-module`
4. `python detect.py` (Ensure your backend is running)

---

## 📸 AI Logic Explained
- **Detection**: YOLOv8 extracts bounding boxes for classes `[2, 3, 5, 7]`.
- **Tracking**: SORT assigns unique IDs to each vehicle across frames.
- **Counting**: When a centroid's Y-coordinate crosses the `L1` horizontal line, `vehicle_count` increments.
- **Plate Detection**: EasyOCR crops the bounding box and extracts alphanumeric text.
- **Violation**: Backend checks `vehicle_count > MAX_CAPACITY`. If true, an entry marked `violation` triggers an email lookup via `vehicle_number`.

---

## 🔒 Security Requirements
Ensure you enable **2-Factor Authentication** on your Gmail account and create an **App Password** for the email alerts to work correctly.

---

Built with ❤️ by Antigravity AI
