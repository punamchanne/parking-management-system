
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Camera, Bell, ArrowRight, Car, Activity } from 'lucide-react';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Hero Section */}
            <section style={{ padding: '8rem 2rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', zIndex: 0 }} />
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', zIndex: 1 }}>
                    <span className="badge badge-success" style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem' }}>Next-Gen Surveillance</span>
                    <h1 style={{ fontSize: 'var(--hero-size, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }} className="gradient-text title-responsive">
                        Smart Parking <br /> Evolution with AI
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        Automate your parking space with real-time vehicle detection, automated tracking, and instant violation alerts using state-of-the-art YOLOv8 AI.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/login" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            Admin Login <ArrowRight size={20} />
                        </Link>

                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Smarter Monitoring by Design</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Built for security, scalability, and ease of use.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: Camera, title: 'AI Detection', desc: 'Real-time vehicle identification using deep learning vision models.', color: '#6366f1' },
                        { icon: Activity, title: 'Live Tracking', desc: 'Continuous tracking to prevent duplicate counts and ensure accuracy.', color: '#a855f7' },
                        { icon: Shield, title: 'Auto Enforcement', desc: 'Automated violation triggers with history logging and fine tracking.', color: '#ef4444' },
                        { icon: Bell, title: 'Instant Alerts', desc: 'Direct email notifications for overcapacity and security incidents.', color: '#22c55e' }
                    ].map((feature, idx) => (
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            key={idx} 
                            className="glass-card" 
                            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ background: `${feature.color}20`, width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <feature.icon color={feature.color} size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '8rem 2rem' }}>
                <div className="glass-card" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Ready to Secure Your Space?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>Join the future of parking management systems with our AI-powered solution.</p>
                    <Link to="/login" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>Proceed to Login</Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
