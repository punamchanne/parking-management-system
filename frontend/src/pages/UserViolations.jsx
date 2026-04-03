
import React, { useState } from 'react';
import { getUserViolations } from '../services/api';
import { Search, AlertTriangle, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const UserViolations = () => {
    const [plate, setPlate] = useState('');
    const [violations, setViolations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await getUserViolations(plate);
            setViolations(data);
            setSearched(true);
        } catch (err) {
            console.error("Search failed:", err);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Check Your Status</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Enter vehicle number to find active fines and history</p>
            </div>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '1rem', padding: '0 1.5rem' }}>
                    <Search size={24} color="var(--primary)" />
                    <input 
                        required
                        type="text" placeholder="MH31AB1234" 
                        style={{ flex: 1, border: 'none', background: 'transparent', padding: '1.25rem', color: 'white', fontSize: '1.1rem', outline: 'none' }}
                        value={plate}
                        onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0 2rem' }}>Search</button>
            </form>

            <AnimatePresence>
                {searched && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Search Results:</h3>
                        {violations.length === 0 ? (
                            <div className="glass-card" style={{ textAlign: 'center', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <ShieldCheck size={64} color="#22c55e" />
                                <h3 style={{ color: '#22c55e' }}>No Violations Found</h3>
                                <p style={{ color: '#94a3b8' }}>Your vehicle is cleared of all parking system records.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {violations.map((v, idx) => (
                                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }} key={idx} className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                                    <AlertTriangle color="#ef4444" size={24} />
                                                    <h3 style={{ fontSize: '1.2rem' }}>Overcapacity Infraction</h3>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <Clock size={16} /> {format(new Date(v.entry_time), 'PPpp')}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <MapPin size={16} /> Main Gate Camera #1
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>FINE AMOUNT</p>
                                                <h2 style={{ color: '#ef4444', fontSize: '1.8rem', fontWeight: 800 }}>₹{v.fine || '500'}</h2>
                                                <span className="badge badge-danger">Unpaid</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserViolations;
