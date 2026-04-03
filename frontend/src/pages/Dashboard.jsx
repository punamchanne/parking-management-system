
import React, { useState, useEffect } from 'react';
import { getStats } from '../services/api';
import { CarFront, AlertCircle, History, TrendingUp, ShieldAlert, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalViolations: 0,
        currentCount: 0,
        capacity: 10
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    const cards = [
        { title: 'Current Occupancy', value: `${stats.currentCount}/${stats.capacity}`, icon: CarFront, color: '#6366f1' },
        { title: 'Total Entries Today', value: stats.totalVehicles, icon: History, color: '#a855f7' },
        { title: 'Active Violations', value: stats.totalViolations, icon: AlertCircle, color: '#ef4444' },
        { title: 'Space Utilization', value: `${Math.round((stats.currentCount / stats.capacity) * 100)}%`, icon: TrendingUp, color: '#22c55e' }
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Admin Overview</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Real-time AI-powered parking surveillance dashboard</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {cards.map((card, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="glass-card" 
                        style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ background: `${card.color}20`, padding: '1rem', borderRadius: '1rem' }}>
                            <card.icon color={card.color} size={32} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>{card.title}</p>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.25rem' }}>{card.value}</h2>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldAlert size={20} color="#6366f1" /> System Health
                        </h3>
                        <span className="badge badge-success">Online</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>AI Inference Core (YOLOv8)</span>
                                <span style={{ fontWeight: 600 }}>Active - 24ms</span>
                            </div>
                            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: '85%', height: '100%', background: 'var(--primary)' }}></div>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>OCR Engine (EasyOCR)</span>
                                <span style={{ fontWeight: 600 }}>Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={20} color="#f59e0b" /> Capacity Alert
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Current parking usage is at <strong>{Math.round((stats.currentCount / stats.capacity) * 100)}%</strong>. 
                        {stats.currentCount >= stats.capacity ? " AUTOMATED FINES ARE BEING ISSUED." : " System is monitoring within normal limits."}
                    </p>
                    <button className="btn-primary" style={{ marginTop: '2rem', width: '100%' }}>Update Capacity</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
