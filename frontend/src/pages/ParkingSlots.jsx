
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, LayoutGrid, Info } from 'lucide-react';

const ParkingSlots = () => {
    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Real-time Parking Slots</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Sensor identification from localized parking hub (ESP32 Gateway)</p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card" 
                style={{ padding: '2rem', borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <LayoutGrid color="var(--primary)" size={24} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Localized Sensor Stream</h3>
                    </div>
                    <a 
                        href="http://192.168.4.1" 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                    >
                        Open Directly <ExternalLink size={16} />
                    </a>
                </div>

                {/* Sensor Hub Iframe */}
                <div style={{ 
                    width: '100%', 
                    height: '600px', 
                    background: '#0a0b1e', 
                    borderRadius: '1rem', 
                    border: '1px solid var(--glass-border)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                }}>
                    <iframe 
                        src="http://192.168.4.1" 
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Parking Sensor Hub"
                        onError={(e) => console.log("Sensor hub offline")}
                    />
                    
                    {/* Fallback Overlay if not reachable */}
                    <div style={{ position: 'absolute', pointerEvents: 'none', textAlign: 'center', padding: '2rem' }}>
                        <Info size={48} color="#444" style={{ marginBottom: '1rem' }} />
                        <p style={{ maxWidth: '400px' }}>Waiting for Sensor Connection (http://192.168.4.1)</p>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>Ensure your ESP32/Hardware is powered and on the same network.</p>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>System Protocol</h4>
                        <p style={{ fontWeight: 600 }}>TCP/IP Gateway (ESP32-CAM)</p>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Sync Interval</h4>
                        <p style={{ fontWeight: 600 }}>Real-time (0.5s Latency)</p>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Connection Mode</h4>
                        <p style={{ fontWeight: 600 }}>Localized Node</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ParkingSlots;
