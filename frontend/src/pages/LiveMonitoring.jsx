
import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, Maximize, Settings, Play, StopCircle, Activity, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveMonitoring = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState('Standby');
    const [streamError, setStreamError] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleToggleSurveillance = () => {
        if (!isActive) {
            setIsActive(true);
            setStatus('Connecting...');
            setStreamError(false);
            setTimeout(() => setStatus('System Active'), 1500);
        } else {
            setIsActive(false);
            setStatus('Standby');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
                <div>
                    <h1 className="gradient-text title-responsive" style={{ fontSize: '2.5rem', fontWeight: 800 }}>AI Surveillance Terminal</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Direct camera integration with YOLOv8 & SORT tracking</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: isActive ? '#22c55e' : '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                           <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isActive ? '#22c55e' : '#94a3b8', animation: isActive ? 'pulse 1.5s infinite' : 'none' }}></div>
                           {status.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{currentTime}</span>
                    </div>
                    <button 
                        onClick={handleToggleSurveillance}
                        className="btn-primary" 
                        style={{ background: isActive ? 'rgba(239, 68, 68, 0.15)' : 'linear-gradient(135deg, #6366f1, #a855f7)', border: isActive ? '1px solid #ef4444' : 'none', color: isActive ? '#ef4444' : 'white', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', fontSize: '1.1rem', transition: '0.3s' }}
                    >
                        {isActive ? (
                            <><StopCircle size={22} /> Stop</>
                        ) : (
                            <><Play size={22} fill="currentColor" /> Start AI Feed</>
                        )}
                    </button>
                </div>
            </header>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card" 
                    style={{ height: 'min(650px, 60vh)', background: '#000', position: 'relative', overflow: 'hidden', padding: 0, border: isActive ? '2px solid var(--primary)' : '1px solid var(--glass-border)' }}>
                    
                    {/* Camera Overlay */}
                    <div style={{ position: 'absolute', top: '30px', left: '30px', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 10 }}>
                        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', color: '#fff', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                           CAM_01 | G-BLOCK MAIN | {isActive ? 'FEED_LIVE' : 'STANDBY'}
                        </div>
                    </div>

                    {/* Main Monitoring Screen */}
                    <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatePresence mode="wait">
                            {!isActive ? (
                                <motion.div 
                                    key="standby"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ textAlign: 'center' }}>
                                    <Camera size={80} color="rgba(255,255,255,0.05)" style={{ marginBottom: '1.5rem' }} />
                                    <h2 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.2)' }}>Monitoring Loop Inactive</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.1)' }}>Ensure Terminal 3 (python stream_server.py) is running</p>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="active"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    
                                    {/* Real MJPEG Stream from Python Flask Server */}
                                    <img 
                                        src="http://localhost:8000/video_feed" 
                                        alt="AI Surveillance Feed" 
                                        onError={() => setStreamError(true)}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />

                                    {streamError && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                            <RefreshCw size={48} color="#ef4444" className="spin" />
                                            <h3 style={{ color: '#ef4444' }}>Stream Connection Failed</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Check if `python stream_server.py` is active on port 8000.</p>
                                        </div>
                                    )}

                                    {/* HUD Effect Overlay */}
                                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 70%, rgba(99, 102, 241, 0.05) 100%)', pointerEvents: 'none', border: '2px solid rgba(99, 102, 241, 0.1)' }}></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card">
                        <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={20} color="var(--primary)" /> Sensor Health
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', border: '1px solid var(--glass-border)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>SURVEILLANCE MODE</p>
                                <p style={{ fontWeight: 700 }}>{isActive ? 'AI_YOLO_INF' : 'OFFLINE'}</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', border: '1px solid var(--glass-border)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>PIPELINE LOAD</p>
                                <p style={{ fontWeight: 700 }}>{isActive ? 'OPTIMAL (24ms)' : '0ms'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05), transparent)' }}>
                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                            <ShieldCheck size={20} /> Guard Active
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>The AI loops are checking for overcapacity violation on each entry event.</p>
                        <button className="btn-primary" style={{ marginTop: '1.25rem', width: '100%', height: '44px', fontSize: '0.9rem' }}>Configure Guard</button>
                    </div>
                </div>
            </div>

            <style>{`
                .spin { animation: spin 2s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default LiveMonitoring;
