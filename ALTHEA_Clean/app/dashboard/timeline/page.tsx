'use client';

import { useState } from 'react';
import styles from './Timeline.module.css';
import { sites } from '@/data/sites';

// Mock Data for "Intelligent" Features
const MOCK_VALIDATIONS = [
    { id: 1, type: 'photo', user: 'Jean (Tech)', title: 'Ferraillage Poteaux RDC', time: '10:45', status: 'pending', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, type: 'alert', user: 'Jean (Tech)', title: 'Retard Livraison Ciment', time: '09:30', status: 'pending', img: null },
];

const MOCK_MATERIALS = [
    { id: 1, item: 'Ciment (5T)', status: 'Reçu', date: 'Aujourd\'hui', notes: 'Conforme' },
    { id: 2, item: 'Ferraillage 12mm', status: 'En attente', date: 'Demain', notes: 'Camion bloqué' },
];

export default function TimelinePage() {
    // Demo: Selecting Villa Mandela
    const site = sites.find(s => s.id === 'B04');
    const [viewMode, setViewMode] = useState<'engineer' | 'client' | 'technician'>('engineer');
    const [validations, setValidations] = useState(MOCK_VALIDATIONS);

    if (!site) return <div>Site non trouvé</div>;

    const handleValidate = (id: number) => {
        setValidations(prev => prev.map(v => v.id === id ? { ...v, status: 'validated' } : v));
        // Simulate notification
        alert("✅ Validé ! Notification envoyée au Client.");
    };

    const handleReject = (id: number) => {
        setValidations(prev => prev.filter(v => v.id !== id));
        alert("❌ Refusé. Notification envoyée au Technicien.");
    };

    return (
        <div className={styles.container}>
            {/* Header & Role Switcher */}
            <div className={styles.header}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🧠</span> Pilotage 360° (IA)
                    </h2>
                    <p style={{ color: '#64748b' }}>Centre de contrôle intelligent • {site.name}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                    {(['engineer', 'client', 'technician'] as const).map(role => (
                        <button
                            key={role}
                            onClick={() => setViewMode(role)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: viewMode === role ? 'white' : 'transparent',
                                color: viewMode === role ? '#0f172a' : '#64748b',
                                border: 'none',
                                borderRadius: '6px',
                                boxShadow: viewMode === role ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                cursor: 'pointer',
                                fontWeight: 500,
                                textTransform: 'capitalize'
                            }}
                        >
                            {role === 'engineer' ? '👷 Ingénieur' : role === 'client' ? '👤 Client' : '🔨 Tech'}
                        </button>
                    ))}
                </div>
            </div>

            {/* INTEGRATED DASHBOARD GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repea(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* LEFT COLUMN: ACTION STREAM */}
                <div style={{ flex: 2 }}>

                    {/* ENGINEER VIEW: VALIDATION QUEUE */}
                    {viewMode === 'engineer' && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>⚡ Actions Requises ({validations.filter(v => v.status === 'pending').length})</h3>
                            {validations.filter(v => v.status === 'pending').length === 0 ? (
                                <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px', textAlign: 'center', color: '#94a3b8' }}>
                                    Rien à signaler. Tout est à jour.
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {validations.filter(v => v.status === 'pending').map(item => (
                                        <div key={item.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '1rem', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                                            {item.img ? (
                                                <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', background: '#eee' }}>
                                                    <img src={item.img} alt="Evidence" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            ) : (
                                                <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>⚠️</div>
                                            )}

                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.title}</span>
                                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.time}</span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', marginBottom: '0.75rem' }}>
                                                    Soumis par <strong>{item.user}</strong>. En attente de validation.
                                                </p>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button onClick={() => handleValidate(item.id)} style={{ flex: 1, padding: '0.4rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>Valider ✅</button>
                                                    <button onClick={() => handleReject(item.id)} style={{ flex: 1, padding: '0.4rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>Refuser ❌</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TIMELINE */}
                    <div className={styles.timeline}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#0f172a' }}>📅 Planning {viewMode === 'client' ? 'Simplifié' : 'Détaillé'}</h3>
                        {site.planning?.map((step, index) => (
                            <div key={index} className={`${styles.step} ${styles[step.status]} ${viewMode === 'client' && step.status === 'pending' ? styles.clientFuture : ''}`}>
                                <div className={styles.marker}>
                                    <div className={styles.icon}>{step.icon}</div>
                                    <div className={styles.line}></div>
                                </div>
                                <div className={styles.content}>
                                    <span className={styles.date}>{step.date}</span>
                                    <h3 className={styles.title}>{step.title}</h3>
                                    {(viewMode !== 'client' || step.status !== 'pending') && (
                                        <p className={styles.description}>
                                            {step.status === 'completed' ? 'Validé et terminé.' : step.status === 'active' ? 'En cours.' : 'Planifié.'}
                                        </p>
                                    )}
                                    {viewMode === 'engineer' && (
                                        <button style={{ fontSize: '0.8rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: '0.5rem' }}>✏️ Éditer</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: SHARED RESOURCES */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    {/* WEATHER (Smart) */}
                    <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '12px', padding: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Météo Saly</span>
                            <span>☀️</span>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>28°C</div>
                        <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>Conditions idéales pour coulage béton.</div>
                    </div>

                    {/* MATERIALS LOG */}
                    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#475569' }}>📦 Réception Matériel</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {MOCK_MATERIALS.map(mat => (
                                <div key={mat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', padding: '0.5rem', background: 'white', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{mat.item}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{mat.notes}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: mat.status === 'Reçu' ? '#16a34a' : '#ea580c' }}>{mat.status}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{mat.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {viewMode !== 'client' && (
                            <button style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', background: 'white', border: '1px dashed #cbd5e1', color: '#64748b', borderRadius: '6px', cursor: 'pointer' }}>
                                + Ajouter Réception
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
