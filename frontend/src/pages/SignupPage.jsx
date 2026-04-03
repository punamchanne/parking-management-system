
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, User, ArrowRight, Home, Car } from 'lucide-react';
import { registerUser } from '../services/api';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', pass: '', vehicle_number: '' });
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Registering the user profile with vehicle link in backend
            await registerUser({
                name: formData.name,
                email: formData.email,
                vehicle_number: formData.vehicle_number.toUpperCase()
            });
            alert("Account Created & Vehicle Linked! Proceed to login.");
            navigate('/login');
        } catch (err) {
            alert("Signup Failed. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', zIndex: 0 }} />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card" 
                style={{ width: '100%', maxWidth: '440px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                
                <div style={{ background: 'rgba(168, 85, 247, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Shield color="#a855f7" size={30} />
                </div>
                
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.25rem' }}>Join ParkAI</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>Create profile and link your vehicle for smart alerts.</p>

                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>FULL NAME</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0 1rem' }}>
                            <User size={16} color="var(--text-secondary)" />
                            <input 
                                required
                                type="text" placeholder="John Doe" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.7rem', color: 'white', outline: 'none' }}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>GAADI NUMBER (VEHICLE NO.)</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '10px', padding: '0 1rem' }}>
                            <Car size={16} color="#a855f7" />
                            <input 
                                required
                                type="text" placeholder="MH12AB1234" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.7rem', color: 'white', outline: 'none', fontWeight: 700, letterSpacing: '1px' }}
                                value={formData.vehicle_number}
                                onChange={(e) => setFormData({...formData, vehicle_number: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>EMAIL ADDRESS</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0 1rem' }}>
                            <Mail size={16} color="var(--text-secondary)" />
                            <input 
                                required
                                type="email" placeholder="john@example.com" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.7rem', color: 'white', outline: 'none' }}
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>PASSWORD</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0 1rem' }}>
                            <Lock size={16} color="var(--text-secondary)" />
                            <input 
                                required
                                type="password" placeholder="••••••••" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.7rem', color: 'white', outline: 'none' }}
                                value={formData.pass}
                                onChange={(e) => setFormData({...formData, pass: e.target.value})}
                            />
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className="btn-primary" style={{ height: '52px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.5rem', background: 'linear-gradient(135deg, #a855f7, #6366f1)', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Processing...' : <><UserCircle size={20} /> Create My Account <ArrowRight size={18} /></>}
                    </button>
                    
                    <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Already have an account? Login</Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// Internal Import helper
const UserCircle = ({size}) => <User size={size} />;


export default SignupPage;
