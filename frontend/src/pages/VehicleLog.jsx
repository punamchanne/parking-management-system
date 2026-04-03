
import React, { useState, useEffect } from 'react';
import { getLogs } from '../services/api';
import { format } from 'date-fns';
import { Search, Download, Filter, Car, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const VehicleLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await getLogs();
                setLogs(data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>Vehicle Historical Logs</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Full audit trail for all entries and violations</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0 1rem' }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input type="text" placeholder="Search number plate..." style={{ border: 'none', background: 'transparent', padding: '0.75rem', color: 'white', outline: 'none' }} />
                    </div>
                    <button style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--glass-border)', background: 'transparent', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} /> Export
                    </button>
                    <button style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--glass-border)', background: 'transparent', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={18} /> Filters
                    </button>
                </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '1rem' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Plate Number</th>
                                <th>Timestamp</th>
                                <th>Status</th>
                                <th>Stay Duration</th>
                                <th>Fine Issued</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>Loading records...</td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>No entry records found</td>
                                </tr>
                            ) : logs.map((log, idx) => (
                                <tr key={log._id || idx}>
                                    <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Car size={16} color="#6366f1" /> {log.vehicle_number}
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)' }}>
                                        {log.entry_time ? format(new Date(log.entry_time), 'PPpp') : 'N/A'}
                                    </td>
                                    <td>
                                        <span className={`badge ${log.status === 'violation' ? 'badge-danger' : 'badge-success'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}>
                                            {log.status === 'violation' && <AlertTriangle size={12} />} {log.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>{log.duration || '0s'}</td>
                                    <td style={{ color: log.fine > 0 ? '#ef4444' : '#666', fontWeight: 600 }}>
                                        {log.fine > 0 ? `₹${log.fine}` : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default VehicleLog;
