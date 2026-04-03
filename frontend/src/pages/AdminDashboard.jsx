
import React, { useState, useEffect } from 'react';
import { getStats } from '../services/api';
import { CarFront, AlertCircle, History, TrendingUp, ShieldAlert, Zap, Users, BarChart3, Fingerprint, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalViolations: 0,
        currentCount: 0,
        capacity: 10,
        recentPlates: ["SCANNING..."]
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(prev => ({...data, recentPlates: data.recentLogs?.map(l => l.vehicle_number).slice(0, 5) || prev.recentPlates }));
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 3000); 
        return () => clearInterval(interval);
    }, []);

    const cards = [
        { title: 'Current Occupancy', value: `${stats.currentCount}/${stats.capacity}`, icon: CarFront, color: '#6366f1' },
        { title: 'Total Entries', value: stats.totalVehicles, icon: History, color: '#a855f7' },
        { title: 'Last Plate Scanned', value: stats.recentPlates?.[0] || '---', icon: Fingerprint, color: '#34d399' },
        { title: 'Violations Today', value: stats.totalViolations, icon: AlertCircle, color: '#ef4444' }
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Admin Console</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Global parking fleet management & AI surveillance</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="glass-card" style={{ padding: '0.75rem 1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <Users size={18} color="var(--primary)" /> <span>4 Active Admins</span>
                    </div>
                </div>
            </header>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {cards.map((card, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={card.title} 
                        className="glass-card" 
                        style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ background: `${card.color}15`, padding: '1rem', borderRadius: '1.25rem' }}>
                            <card.icon color={card.color} size={32} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px' }}>{card.title.toUpperCase()}</p>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.25rem', fontFamily: 'monospace' }}>{card.value}</h2>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Camera size={20} color="var(--primary)" /> Recent AI Identifications
                        </h3>
                        <span className="badge badge-success">Optimized</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {stats.recentPlates?.map((plate, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={idx} 
                                style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Fingerprint size={20} color="var(--primary)" />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '1px' }}>{plate}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Detected via CAM_01 | G-Block</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success)' }}>VERIFIED</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Just Now</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.05))', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Zap size={20} color="#f59e0b" /> Capacity Alert
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                            Current parking usage is at <strong>{Math.round((stats.currentCount / stats.capacity) * 100)}%</strong>. 
                            The AI engine is automatically dispatching violation emails for new entries.
                        </p>
                    </div>
                    <button className="btn-primary" style={{ marginTop: '2rem', width: '100%', fontWeight: 700 }}>Update Global Settings</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
