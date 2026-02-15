'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import styles from '../../engineer/Engineer.module.css'; // Reusing styles for consistency
import { useToast } from '@/context/ToastContext';
import InspectionModal from '../../engineer/InspectionModal'; // Reusing the modal logic
import { sites as initialSites } from '@/data/sites';

export default function TechnicianSitePage() {
    const params = useParams();
    const siteId = params?.id as string;
    const initialSite = initialSites.find(s => s.id === siteId);

    if (!initialSite) {
        return <div className={styles.container} style={{ padding: '2rem', textAlign: 'center' }}>🚫 Chantier non trouvé ou accès refusé.</div>;
    }

    const { success, info } = useToast();
    const [site, setSite] = useState(initialSite);
    const [arrivalTime] = useState(new Date().toLocaleTimeString());
    const [departureTime, setDepartureTime] = useState<string | null>(null);

    // Modal State
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<{ milestoneId: number, label: string, type: 'foundation' | 'wall' | 'pouring' | 'generic' } | null>(null);

    const handleMilestoneClick = (milestoneId: number, label: string, isCompleted: boolean) => {
        if (isCompleted || departureTime) return;

        // Detect Type (Logic duplicated for independence)
        let type: 'foundation' | 'wall' | 'pouring' | 'generic' = 'generic';
        const l = label.toLowerCase();

        if (l.includes('coulage') || l.includes('dalle') || l.includes('béton')) type = 'pouring';
        else if (l.includes('fondation') || l.includes('implantation') || l.includes('fouille') || l.includes('semelle')) type = 'foundation';
        else if (l.includes('mur') || l.includes('élévation') || l.includes('brique')) type = 'wall';

        // Critical Check - Open Modal
        if (l.includes('coulage') || l.includes('validation') || l.includes('ferraillage') || l.includes('implantation') || l.includes('dalle') || l.includes('étude') || l.includes('sol')) {
            setSelectedTask({ milestoneId, label, type });
            setIsInspectorOpen(true);
        } else {
            toggleMilestone(milestoneId);
        }
    };

    const toggleMilestone = (milestoneId: number) => {
        const updatedMilestones = site.milestones.map(m => {
            if (m.id === milestoneId) return { ...m, completed: !m.completed };
            return m;
        });
        setSite({ ...site, milestones: updatedMilestones });
    };

    const handleInspectionValidate = (sessionData: any) => {
        if (selectedTask) {
            toggleMilestone(selectedTask.milestoneId);
            setIsInspectorOpen(false);
            success(`Contrôle validé par Technicien à ${sessionData.validationTime}`, "Validation Terrain");
            setSelectedTask(null);
        }
    };

    const handleCloseVisit = () => {
        if (!navigator.geolocation) return;
        info("Synchronisation...", "Départ Chantier");
        navigator.geolocation.getCurrentPosition((pos) => {
            const time = new Date().toLocaleTimeString();
            setDepartureTime(time);
            success(`Visite clôturée à ${time}.`, "A Bientôt");
        });
    };

    return (
        <div className={styles.container}>
            <InspectionModal
                isOpen={isInspectorOpen}
                onClose={() => setIsInspectorOpen(false)}
                onValidate={handleInspectionValidate}
                milestoneName={selectedTask?.label || ''}
                type={selectedTask?.type}
                siteCoordinates={site.coordinates}
            />

            <div className={styles.header} style={{ background: '#1e293b', color: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            INTERFACE TECHNICIEN
                        </span>
                        <h1 className={styles.title} style={{ color: 'white', marginTop: '0.5rem' }}>{site.name}</h1>
                        <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>📍 {site.location}</p>
                    </div>
                    {/* Floating Avatar or Action */}
                    <div style={{ background: '#3b82f6', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        T
                    </div>
                </div>
            </div>

            {/* ATTENDANCE CARD */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>⏱️</span> Pointage Présence
                    </h3>
                    <div style={{ fontSize: '0.8rem', background: departureTime ? '#fee2e2' : '#dcfce7', color: departureTime ? '#b91c1c' : '#15803d', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>
                        {departureTime ? 'OFF' : 'EN SERVICE'}
                    </div>
                </div>

                {!departureTime ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Arrivée sur site</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>{arrivalTime}</div>
                        </div>
                        <button
                            onClick={handleCloseVisit}
                            style={{
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.75rem 1.25rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                            }}
                        >
                            🛑 Fin de Service
                        </button>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                        Journée clôturée à <strong>{departureTime}</strong>.
                        <button onClick={() => window.location.reload()} style={{ display: 'block', margin: '1rem auto 0', color: '#3b82f6', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                            Nouvelle Session
                        </button>
                    </div>
                )}
            </div>

            {/* Checklist Section */}
            <div className={styles.siteCard}>
                <div className={styles.siteBody}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 className={styles.sectionTitle} style={{ margin: 0 }}>📋 Contrôles & Réalisations</h3>
                    </div>

                    <div className={styles.milestoneList}>
                        {site.milestones.map(milestone => (
                            <div
                                key={milestone.id}
                                className={styles.milestoneItem}
                                onClick={() => handleMilestoneClick(milestone.id, milestone.label, milestone.completed)}
                            >
                                <div className={`${styles.checkbox} ${milestone.completed ? styles.checked : ''}`}>
                                    {milestone.completed && '✓'}
                                </div>
                                <span style={{ flex: 1, textDecoration: milestone.completed ? 'line-through' : 'none' }}>
                                    {milestone.label}
                                </span>
                                {(milestone.label.toLowerCase().includes('sol') || milestone.label.toLowerCase().includes('ferraillage')) && (
                                    <span style={{ fontSize: '0.7rem', background: '#e0f2fe', color: '#0284c7', padding: '2px 6px', borderRadius: '4px' }}>
                                        CRITIQUE
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Tools */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <button style={{ padding: '1rem', background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: '#334155', fontWeight: 600 }}>
                    📷 Photo Rapide
                </button>
                <button style={{ padding: '1rem', background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: '#334155', fontWeight: 600 }}>
                    📞 Appeler Bureau
                </button>
            </div>
        </div>
    );
}
