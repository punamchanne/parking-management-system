
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, Home } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', pass: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Real User Auth
            const res = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: credentials.email })
            });
            const data = await res.json();

            if (data.success && data.user) {
                // Store user context
                localStorage.setItem('parkai_user', JSON.stringify(data.user));
                
                if (data.user.email === 'admin@parkai.com') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/user-dashboard');
                }
            } else {
                alert("Login Failed: " + (data.message || "Email not registered."));
            }
        } catch (err) {
            alert("Connection Error. Ensure Backend is running.");
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', zIndex: 0 }} />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card" 
                style={{ width: '100%', maxWidth: '420px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Shield color="#6366f1" size={30} />
                </div>
                
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Secure Login</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Enter your credentials to access your dashboard.</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>EMAIL ADDRESS</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0 1rem' }}>
                            <Mail size={18} color="var(--text-secondary)" />
                            <input 
                                required
                                type="email" placeholder="admin@parkai.com" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.75rem', color: 'white', outline: 'none' }}
                                value={credentials.email}
                                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>PASSWORD</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0 1rem' }}>
                            <Lock size={18} color="var(--text-secondary)" />
                            <input 
                                required
                                type="password" placeholder="admin123" 
                                style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.75rem', color: 'white', outline: 'none' }}
                                value={credentials.pass}
                                onChange={(e) => setCredentials({...credentials, pass: e.target.value})}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ height: '54px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                        Access Dashboard <ArrowRight size={18} />
                    </button>
                    
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Home size={14} /> Back to Home
                        </Link>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px dashed var(--glass-border)' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Testing Credentials:</p>
                        <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 700, marginTop: '0.25rem' }}>admin@parkai.com / user@parkai.com</p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default LoginPage;
