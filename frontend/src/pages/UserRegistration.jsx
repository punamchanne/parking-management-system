
import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { User, Mail, CreditCard, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        vehicle_number: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            if (data.success) {
                setStatus({ type: 'success', message: 'User registered! You will receive AI notifications now.' });
                setFormData({ name: '', email: '', vehicle_number: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Registration failed.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Error processing request.' });
        }
    };

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <User color="#6366f1" size={30} />
                    </div>
                    <h1 className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>User Registration</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Sign up to receive automatic parking violation alerts</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Full Name</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0 1rem' }}>
                            <User size={18} color="var(--text-secondary)" />
                            <input 
                                required
                                type="text" placeholder="John Doe" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '1rem', color: 'white', outline: 'none' }}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email Address</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0 1rem' }}>
                            <Mail size={18} color="var(--text-secondary)" />
                            <input 
                                required
                                type="email" placeholder="john@example.com" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '1rem', color: 'white', outline: 'none' }}
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Vehicle Number</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0 1rem' }}>
                            <CreditCard size={18} color="var(--text-secondary)" />
                            <input 
                                required
                                type="text" placeholder="MH31AB1234" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '1rem', color: 'white', outline: 'none' }}
                                value={formData.vehicle_number}
                                onChange={(e) => setFormData({...formData, vehicle_number: e.target.value.toUpperCase()})}
                            />
                        </div>
                    </div>

                    {status.message && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', background: status.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: status.type === 'success' ? '#4ade80' : '#f87171' }}>
                            {status.type === 'success' ? <CheckCircle size={18} /> : <Info size={18} />} {status.message}
                        </motion.div>
                    )}

                    <button type="submit" className="btn-primary" style={{ height: '56px', fontSize: '1.1rem', marginTop: '1rem' }}>Submit Registration</button>
                </form>
            </motion.div>
        </div>
    );
};

export default UserRegistration;
