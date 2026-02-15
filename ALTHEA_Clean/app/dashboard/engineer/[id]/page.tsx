'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import styles from '../Engineer.module.css'; // Reusing styles
import { useToast } from '@/context/ToastContext';
import InspectionModal from '../InspectionModal';
import { sites as initialSites } from '@/data/sites';

export default function SiteDetailPage() {
    const params = useParams();
    const siteId = params?.id as string;

    // In a real app, we would fetch data here. For now, find in mock data.
    // We clone it to local state to allow interaction
    const initialSite = initialSites.find(s => s.id === siteId);

    if (!initialSite) {
        return <div className={styles.container}>Chantier non trouvé</div>;
    }

    const { success, info } = useToast();
    const [site, setSite] = useState(initialSite);

    // Visit Session State
    const [arrivalTime] = useState(new Date().toLocaleTimeString());
    const [departureTime, setDepartureTime] = useState<string | null>(null);

    // Modal State
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<{ milestoneId: number, label: string, type: 'foundation' | 'wall' | 'pouring' | 'generic' } | null>(null);

    const handleMilestoneClick = (milestoneId: number, label: string, isCompleted: boolean) => {
        if (isCompleted || departureTime) return; // Locked if closed

        // Detect Type
        let type: 'foundation' | 'wall' | 'pouring' | 'generic' = 'generic';
        const l = label.toLowerCase();

        if (l.includes('coulage') || l.includes('dalle') || l.includes('béton')) type = 'pouring';
        else if (l.includes('fondation') || l.includes('implantation') || l.includes('fouille') || l.includes('semelle')) type = 'foundation';
        else if (l.includes('mur') || l.includes('élévation') || l.includes('brique')) type = 'wall';

        // Critical Check
        if (l.includes('coulage') || l.includes('validation') || l.includes('ferraillage') || l.includes('implantation') || l.includes('dalle')) {
            setSelectedTask({ milestoneId, label, type });
            setIsInspectorOpen(true);
        } else {
            toggleMilestone(milestoneId);
        }
    };

    const toggleMilestone = (milestoneId: number) => {
        const updatedMilestones = site.milestones.map(m => {
            if (m.id === milestoneId) {
                const newState = !m.completed;
                if (newState) {
                    // In real app, we would log this simple toggle too
                }
                return { ...m, completed: newState };
            }
            return m;
        });

        // Update progress
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);

        setSite({ ...site, milestones: updatedMilestones, progress: newProgress });
    };

    const handleInspectionValidate = (sessionData: any) => {
        if (selectedTask) {
            toggleMilestone(selectedTask.milestoneId);
            setIsInspectorOpen(false);
            success(`Contrôle validé à ${sessionData.validationTime}`, "Certification On-Site");
            // Log sessionData to DB in real app
            setSelectedTask(null);
        }
    };

    const handleCloseVisit = () => {
        if (!navigator.geolocation) return;

        info("Clôture de la visite et synchronisation...", "Départ Chantier");

        navigator.geolocation.getCurrentPosition((pos) => {
            const time = new Date().toLocaleTimeString();
            setDepartureTime(time);
            success(`Visite clôturée à ${time}. Position vérifiée.`, "Session Terminée");
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
            />

            <div className={styles.header}>
                <div>
                    <span className={styles.statusBadge} style={{ background: '#3b82f6', color: 'white', marginBottom: '0.5rem', display: 'inline-block' }}>
                        MODE TECHNICIEN • {arrivalTime}
                    </span>
                    <h1 className={styles.title}>{site.name}</h1>
                    <p className={styles.subtitle}>{site.location} • {site.client}</p>
                </div>
                {departureTime ? (
                    <div className={styles.statusBadge} style={{ background: '#cbd5e1', color: '#475569' }}>
                        🛑 Visite Clôturée à {departureTime}
                    </div>
                ) : (
                    <button
                        className="magnetic-button"
                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                        onClick={handleCloseVisit}
                    >
                        Clôturer la visite
                    </button>
                )}
            </div>

            <div className={styles.siteCard} style={{ maxWidth: '800px' }}>
                <div className={styles.siteBody}>
                    {/* Progress Bar */}
                    <div className={styles.progressSection}>
                        <div className={styles.progressLabel}>
                            <span>Avancement Phase: {site.currentPhase}</span>
                            <span>{site.progress}%</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${site.progress}%`, background: site.status === 'CRITICAL' ? '#ef4444' : '#3b82f6' }}
                            />
                        </div>
                    </div>

                    <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>✅ Liste de Contrôle</h3>

                    {/* Milestones Checklist */}
                    <div className={styles.milestoneList}>
                        {site.milestones.map(milestone => (
                            <div
                                key={milestone.id}
                                className={styles.milestoneItem}
                                onClick={() => handleMilestoneClick(milestone.id, milestone.label, milestone.completed)}
                                style={{ cursor: milestone.completed ? 'default' : 'pointer' }}
                            >
                                <div className={`${styles.checkbox} ${milestone.completed ? styles.checked : ''}`}>
                                    {milestone.completed && '✓'}
                                </div>
                                <span style={{
                                    textDecoration: milestone.completed ? 'line-through' : 'none',
                                    opacity: milestone.completed ? 0.6 : 1,
                                    flex: 1
                                }}>
                                    {milestone.label}
                                </span>
                                {(milestone.label.toLowerCase().includes('coulage') || milestone.label.toLowerCase().includes('validation')) && !milestone.completed && (
                                    <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px' }}>
                                        INSPECTION REQUISE
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tech Data / Sensors */}
                    <div className={styles.techData}>
                        <div className={styles.sensorItem}>
                            <span className={styles.sensorLabel}>TEMP. SITE</span>
                            <span className={styles.sensorValue}>{site.sensors.temp}</span>
                        </div>
                        <div className={styles.sensorItem}>
                            <span className={styles.sensorLabel}>HUMIDITÉ</span>
                            <span className={styles.sensorValue}>{site.sensors.humidity}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
