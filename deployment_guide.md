# Smart Parking AI Deployment Guide

This document outlines the professional deployment strategy for the Smart Parking AI system.

## 1. Database Layer (MongoDB Atlas)
For production-grade data storage, use a managed cloud database.
- **Provider**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Setup**: Create a new shared cluster (M0 Free Tier is sufficient for prototyping).
- **Environment**: Update your `MONGO_URI` in the backend `.env` once the cluster is provisioned.

## 2. Backend API (Node.js/Express)
The backend should be hosted on a platform that supports continuous running services.
- **Provider**: [Render](https://render.com/) or [Railway](https://railway.app/)
- **Process**:
  1. Push the `backend/` directory to a GitHub repository.
  2. Connect the repository to Render as a "Web Service".
  3. Configure the **Environment Variables** in the Render dashboard (Copy from your local `.env`).
  4. Ensure the `PORT` is dynamically assigned by the provider.

## 3. AI Module (Python/YOLOv8)
The AI engine requires dedicated CPU/GPU resources and a persistent connection to the camera feed.
- **Provider**: AWS EC2 (t3.medium or higher) or DigitalOcean Droplet.
- **Process**:
  1. Clone the project onto the VPS.
  2. Install dependencies: `pip install ultralytics easyocr flask flask-cors opencv-python`.
  3. Run `stream_server.py`.
  4. **Proximity Note**: For real-time camera feeds from an ESP32 or USB Cam, the AI module should be physically located on the same network or use a tunnel like **Ngrok**.

## 4. Hardware Connectivity (ESP32)
Since the ESP32 typically operates on a local IP (`192.168.4.1`), it must be made accessible to the hosted frontend.
- **Option A (Ngrok)**: Run local ngrok bridge to the ESP32 ip.
- **Option B (Cloudflare Tunnel)**: A more secure way to expose the local device web server to the internet.
- **Update**: Once accessible, update the `iframe` source in `ParkingSlots.jsx`.

## 5. Frontend UI (React/Vite)
The frontend can be hosted using highly optimized static site providers.
- **Provider**: [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)
- **Configuration**:
  1. Change `src/services/api.js` constant `API_BASE_URL` to point to your new **Render Backend URL**.
  2. Deploy via Vercel GitHub integration.

> [!IMPORTANT]
> **Pre-Deployment Checklist**:
> 1. Verify `CORS` settings in `backend/app.js` allow your new Vercel domain.
> 2. Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in the production environment variables.
> 3. Verify SMTP (Email) credentials for violation alerts.
