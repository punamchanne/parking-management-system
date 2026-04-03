
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import VehicleLog from './pages/VehicleLog';
import UserRegistration from './pages/UserRegistration';
import UserViolations from './pages/UserViolations';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ParkingSlots from './pages/ParkingSlots';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 100px)' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/monitoring" element={<LiveMonitoring />} />
            <Route path="/logs" element={<VehicleLog />} />
            <Route path="/register-vehicle" element={<UserRegistration />} />
            <Route path="/user-status" element={<UserViolations />} />
            <Route path="/parking-slots" element={<ParkingSlots />} />
          </Routes>
        </main>
        
        <footer style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <p>© 2026 Smart Parking AI System. All Rights Reserved.</p>
          <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>System Status: Online</a>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Security Audit</a>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
