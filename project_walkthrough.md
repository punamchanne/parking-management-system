
# 🚗 Smart Parking System: Architectural Overview

This full-stack AI project automates parking surveillance using computer vision and real-time data processing. Below is the technical breakdown of each module.

---

## 🧠 AI Module (The Core)
The AI engine is built in Python to leverage the `ultralytics` YOLOv8 framework.

- **Detection**: `detect.py` uses YOLOv8n (Nano) for high-performance inference on CPU/GPU. It filters objects for `car`, `motorcycle`, `bus`, and `truck`.
- **Tracking (SORT)**: Tracking is essential to avoid double-counting. Each vehicle is assigned a unique `track_id` that persists as it moves through the frame.
- **Counting Logic**: A virtual line is defined in `config.py`. When a vehicle's centroid crosses the line (Y-coordinate transition), the `vehicle_count` is updated.
- **OCR Engine**: Once a new vehicle is counted, `ocr.py` uses `EasyOCR` to crop the vehicle's bounding box and extract the license plate text.
- **API Push**: Every successful detection sends a JSON payload to the Express server:
  ```json
  {
    "vehicle_number": "MH31AB1234",
    "vehicle_count": 11,
    "timestamp": "2026-04-02T18:57:22Z"
  }
  ```

---

## 🌐 Backend (Control Center)
The Node.js/Express server handles data persistence and business rules.

- **MongoDB Atlas**: Stores two types of data:
  - `User`: Links `vehicle_number` to an `email` and `name`.
  - `Vehicle`: A historical log of every entry, count, and violation status.
- **Fine Logic**: If `vehicle_count > MAX_CAPACITY` (default: 10), the system automatically flags the entry as a `violation` and calculates a fine (₹500).
- **Automation Pipeline**:
  1. Receive detection from AI.
  2. Log entry to DB.
  3. If violation, lookup `User` by `vehicle_number`.
  4. If user found, trigger `sendEmail.js` utility.

---

## 📧 Email System (Alerting)
Using `Nodemailer` with Gmail SMTP.

- **Trigger**: Automated when the AI reports a count over the set limit.
- **Content**: Dynamic HTML email containing the plate number, fine amount, and a warning message.
- **Security**: Requires a Gmail "App Password" for the email alerts to work correctly.

---

## 🖥️ Frontend (Admin & User Panels)
A high-performance React application designed with **Glassmorphism** and a premium color palette.

- **Admin Dashboard**: Real-time polling of API stats (occupancy, violations, fleet health).
- **Live Monitoring**: A simulated HD video feed with AI detection overlays (bounding boxes, counting lines).
- **Vehicle Logs**: A searchable audit trail of all historical entries and system decisions.
- **User Portal**:
  - **Register**: Link vehicle numbers to email addresses for monitoring.
  - **Check Status**: On-demand search for active fines or clearing records.

---

## 🛠️ Testing Instructions
1. **Normal Case**: Run `detect.py` with 5 vehicles passing line → Logs generated, no email.
2. **Violation Case**: Run `detect.py` with 11th vehicle passing line → Log marked `violation` → Email sent to registered user.
3. **OCR Test**: Ensure the number plate is clear to verify `EasyOCR` accuracy in the AI terminal output.

---

**Built with Clean Architecture, Modern Design, and Scalable Logic.**
