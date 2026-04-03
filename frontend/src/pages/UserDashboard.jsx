
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Car, ShieldCheck, Mail, ArrowRight, CreditCard, Clock, MapPin, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const UserDashboard = () => {
    // Fetch logged-in user data
    const userStr = localStorage.getItem('parkai_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest User', vehicle_number: 'NOT_LINKED', email: 'guest@parkai.com' };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>My Parking Hub</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Personalized security monitoring and vehicle history</p>
            </header>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Active Vehicle Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card" 
                        style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(15, 23, 42, 0.4))' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '1.25rem' }}>
                                    <Car color="white" size={32} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>{user.vehicle_number}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Primary Vehicle | Active Monitoring</p>
                                </div>
                            </div>
                            <span className="badge badge-success">IN COMPLIANCE</span>
                        </div>
                        <div style={{ margin: '2.5rem 0', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>LAST SEEN</p>
                                <p style={{ fontWeight: 600 }}>Just Now</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>LOCATION</p>
                                <p style={{ fontWeight: 600 }}>Main Entrance</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>STATUS</p>
                                <p style={{ fontWeight: 600 }}>Verified by AI</p>
                            </div>
                        </div>
                        <Link to="/user-status" className="btn-primary" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary)', width: 'fit-content' }}>
                            View Detailed Logs <ArrowRight size={18} />
                        </Link>
                    </motion.div>

                    {/* Quick Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ textAlign: 'center' }}>
                            <ShieldCheck size={28} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No Active Fines</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>All fees are cleared.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ textAlign: 'center' }}>
                            <Clock size={28} color="#a855f7" style={{ margin: '0 auto 1rem' }} />
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Live Session</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>System monitoring active.</p>
                        </motion.div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* User Profile Summary */}
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(168,85,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(168,85,247,0.3)' }}>
                            <User size={40} color="#a855f7" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{user.name}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Verified Citizen</p>
                        <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1.5rem 0' }} />
                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <Mail size={16} style={{ flexShrink: 0 }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <CreditCard size={16} style={{ flexShrink: 0 }} /> Wallet: ACTIVE
                            </div>
                        </div>
                    </div>

                    {/* Action Cards */}
                    <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), transparent)' }}>
                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ArrowRight size={18} color="var(--success)" /> Quick Action
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Need to add another vehicle for AI tracking? Register it instantly.</p>
                        <Link to="/register-vehicle" style={{ textDecoration: 'none', color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Register New Vehicle <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
