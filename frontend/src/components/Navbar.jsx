
import React, { useState } from 'react';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Camera, ClipboardList, UserPlus, FileSearch, ShieldAlert, Home, LogIn, UserCircle, LogOut, LayoutGrid, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isLanding = ['/', '/login'].includes(location.pathname);
    const isAdmin = location.pathname.includes('admin') || location.pathname === '/monitoring' || location.pathname === '/logs' || location.pathname === '/parking-slots';

    const handleLogout = () => {
        setIsOpen(false);
        localStorage.removeItem('user'); // Ensure session is cleared
        navigate('/');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { to: "/", icon: Home, label: "Home", show: true },
        { to: "/admin-dashboard", icon: LayoutDashboard, label: "Admin", show: !isLanding && isAdmin },
        { to: "/monitoring", icon: Camera, label: "Live AI", show: !isLanding && isAdmin },
        { to: "/logs", icon: ClipboardList, label: "Logs", show: !isLanding && isAdmin },
        { to: "/user-dashboard", icon: LayoutDashboard, label: "Dashboard", show: !isLanding && !isAdmin },
        { to: "/user-status", icon: FileSearch, label: "Fines", show: !isLanding && !isAdmin },
        { to: "/parking-slots", icon: LayoutGrid, label: "Slots", show: !isLanding },

    ];

    return (
        <nav style={{ padding: '0.75rem 1.5rem', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldAlert color="#6366f1" size={24} />
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }} className="gradient-text">ParkAI</h2>
                </Link>

                {/* Mobile Menu Toggle */}
                <button 
                    onClick={toggleMenu}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', outline: 'none' }}
                    className="mobile-toggle"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-menu">
                    {navItems.filter(item => item.show).map(item => (
                        <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <item.icon size={16} /> <span>{item.label}</span>
                        </NavLink>
                    ))}
                    
                    {!isLanding ? (
                        <button onClick={handleLogout} className="logout-btn">
                            <LogOut size={16} /> Logout
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.75rem' }}>

                            <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Login</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 998 }}
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{ position: 'fixed', top: 0, right: 0, width: '280px', height: '100vh', background: '#0f172a', borderLeft: '1px solid var(--glass-border)', padding: '2rem', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                <X size={28} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', opacity: 0.7 }} />
                            </div>
                            
                            {navItems.filter(item => item.show).map(item => (
                                <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)} className="nav-link-mobile">
                                    <item.icon size={20} /> {item.label}
                                </NavLink>
                            ))}
                            
                            <div style={{ marginTop: 'auto' }}>
                                {!isLanding ? (
                                    <button onClick={handleLogout} className="logout-btn" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                                        <LogOut size={18} /> Logout
                                    </button>
                                ) : (
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Portal Login</Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                .nav-link {
                    display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--text-secondary);
                    font-weight: 500; font-size: 0.9rem; transition: 0.2s;
                }
                .nav-link:hover, .nav-link.active { color: white; }
                
                .nav-link-mobile {
                    display: flex; align-items: center; gap: 1rem; text-decoration: none; color: var(--text-secondary);
                    font-size: 1.1rem; font-weight: 600; padding: 0.75rem 1rem; border-radius: 0.75rem; transition: 0.2s;
                }
                .nav-link-mobile:hover { background: rgba(255,255,255,0.05); color: white; }
                
                .logout-btn {
                    background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2);
                    padding: 0.5rem 1rem; border-radius: 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
                    font-size: 0.85rem; font-weight: 600;
                }

                @media (max-width: 900px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
                @media (min-width: 901px) {
                    .mobile-toggle { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
