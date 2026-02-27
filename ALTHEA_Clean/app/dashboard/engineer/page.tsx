'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './Engineer.module.css';
import { useToast } from '@/context/ToastContext';
import InspectionModal from './InspectionModal';
import { supabase } from '@/lib/supabase/client';

export default function EngineerDashboard() {
    const { success, info } = useToast();

    const [projects, setProjects] = useState<Array<{
        id: string;
        name: string;
        location: string | null;
        status: string;
        progress: number;
        current_phase: string | null;
        sensors: { temp: string; humidity: string; noise: string };
        milestones: Array<{ id: number; label: string; status: string; date: string | null }>;
    }>>([]);

    const activeProjectId = useMemo(() => projects[0]?.id ?? 'A12', [projects]);

    const isMilestoneCompleted = (milestone: { status: string }) => milestone.status === 'VALIDATED';

    // Modal State
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<{ siteId: string, milestoneId: number, label: string } | null>(null);

    const handleMilestoneClick = (siteId: string, milestoneId: number, label: string, isCompleted: boolean) => {
        if (isCompleted) return; // Already done

        // Check if it's a critical task requiring inspection
        if (label.toLowerCase().includes('coulage') || label.toLowerCase().includes('validation') || label.toLowerCase().includes('ferraillage')) {
            setSelectedTask({ siteId, milestoneId, label });
            setIsInspectorOpen(true);
        } else {
            // Simple toggle for non-critical
            toggleMilestone(siteId, milestoneId);
        }
    };

    useEffect(() => {
        const load = async () => {
            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select('id, name, location, status, progress, current_phase')
                .order('created_at', { ascending: true });

            if (projectsError || !projectsData) {
                return;
            }

            const projectIds = projectsData.map(p => p.id as string);

            const milestonesByProject = new Map<string, Array<{ id: number; label: string; status: string; date: string | null }>>();

            await Promise.all(
                projectIds.map(async (pid) => {
                    const { data: milestonesData } = await supabase
                        .from('project_milestones')
                        .select('id, label, status, validated_at')
                        .eq('project_id', pid)
                        .order('id', { ascending: true });

                    const mapped = (milestonesData ?? []).map(m => ({
                        id: m.id as number,
                        label: m.label as string,
                        status: m.status as string,
                        date: (m.validated_at as string | null) ?? null,
                    }));

                    milestonesByProject.set(pid, mapped);
                })
            );

            setProjects(projectsData.map(p => ({
                id: p.id as string,
                name: p.name as string,
                location: (p.location as string | null) ?? null,
                status: (p.status as string) ?? 'ACTIVE',
                progress: (p.progress as number) ?? 0,
                current_phase: (p.current_phase as string | null) ?? null,
                sensors: { temp: '—', humidity: '—', noise: '—' },
                milestones: milestonesByProject.get(p.id as string) ?? [],
            })));
        };

        void load();
    }, [activeProjectId]);

    const toggleMilestone = (siteId: string, milestoneId: number) => {
        const run = async () => {
            const today = new Date().toISOString().slice(0, 10);

            const { error: updateError } = await supabase
                .from('project_milestones')
                .update({ status: 'VALIDATED', validated_at: today })
                .eq('id', milestoneId)
                .eq('project_id', siteId);

            if (updateError) {
                info("Impossible de valider cette étape pour le moment.", 'Erreur');
                return;
            }

            const { data: milestonesData, error: milestonesError } = await supabase
                .from('project_milestones')
                .select('id, label, status, validated_at')
                .eq('project_id', siteId)
                .order('id', { ascending: true });

            if (milestonesError) {
                info("Étape validée, mais rafraîchissement des données impossible.", 'Info');
                return;
            }

            const mappedMilestones = (milestonesData ?? []).map(m => ({
                id: m.id as number,
                label: m.label as string,
                status: m.status as string,
                date: (m.validated_at as string | null) ?? null,
            }));

            const completedCount = mappedMilestones.filter(m => isMilestoneCompleted(m)).length;
            const newProgress = mappedMilestones.length > 0 ? Math.round((completedCount / mappedMilestones.length) * 100) : 0;

            await supabase
                .from('projects')
                .update({ progress: newProgress })
                .eq('id', siteId);

            let projectName = siteId;
            setProjects(current =>
                current.map(p => {
                    if (p.id === siteId) {
                        projectName = p.name;
                    }
                    if (p.id !== siteId) return p;
                    return { ...p, milestones: mappedMilestones, progress: newProgress };
                })
            );

            const milestoneLabel = mappedMilestones.find(m => m.id === milestoneId)?.label ?? '';
            success(`Étape "${milestoneLabel}" validée pour ${projectName}`, 'Validation Chantier');
        };

        void run();
    };

    const handleInspectionValidate = () => {
        if (selectedTask) {
            toggleMilestone(selectedTask.siteId, selectedTask.milestoneId);
            setIsInspectorOpen(false);
            success("Inspection validée conformité ISO-9001", "Contrôle Qualité");
            setSelectedTask(null);
        }
    };

    return (
        <div className={styles.container}>
            <InspectionModal
                isOpen={isInspectorOpen}
                onClose={() => setIsInspectorOpen(false)}
                onValidate={handleInspectionValidate}
                milestoneName={selectedTask?.label || ''}
            />

            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Supervision Technique</h1>
                    <p className={styles.subtitle}>Interface de contrôle Ingénieur • Vue temps réel</p>
                </div>
                <button className="magnetic-button" style={{
                    padding: '0.8rem 1.5rem',
                    background: '#0f172a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }} onClick={() => info("Génération du rapport PDF global en cours...", "Export")}>
                    📥 Exporter Rapport Hebdo
                </button>
            </div>

            {/* KPI Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Chantiers Actifs</span>
                    <span className={styles.statValue}>12</span>
                    <span className={`${styles.statTrend} ${styles.trendUp}`}>↑ 2 ce mois</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Alertes Critiques</span>
                    <span className={styles.statValue} style={{ color: '#ef4444' }}>1</span>
                    <span className={`${styles.statTrend} ${styles.trendDown}`}>Retard Appro. (Douala)</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Taux Conformité</span>
                    <span className={styles.statValue}>94%</span>
                    <span className={`${styles.statTrend} ${styles.trendNeutral}`}>Standard ISO</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Capteurs IoT</span>
                    <span className={styles.statValue}>48</span>
                    <span className={`${styles.statTrend} ${styles.trendUp}`}>Actifs & Connectés</span>
                </div>
            </div>

            {/* Active Sites Monitor */}
            <h2 className={styles.sectionTitle}>📡 Moniteur de Chantiers (Live)</h2>

            <div className={styles.sitesGrid}>
                {projects.map(site => (
                    <div key={site.id} className={styles.siteCard}>
                        <div className={styles.siteHeader}>
                            <div>
                                <h3 className={styles.siteName}>{site.name}</h3>
                                <div className={styles.siteLocation}>📍 {site.location}</div>
                            </div>
                            <span className={`${styles.statusBadge} ${site.status === 'CRITICAL' ? styles.statusCritical : styles.statusActive}`}>
                                {site.status}
                            </span>
                        </div>

                        <div className={styles.siteBody}>
                            {/* Progress Bar */}
                            <div className={styles.progressSection}>
                                <div className={styles.progressLabel}>
                                    <span>Avancement Global</span>
                                    <span>{site.progress}%</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${site.progress}%`, background: site.status === 'CRITICAL' ? '#ef4444' : '#3b82f6' }}
                                    />
                                </div>
                            </div>

                            {/* Milestones Checklist */}
                            <div className={styles.milestoneList}>
                                {site.milestones.map(milestone => (
                                    <div
                                        key={milestone.id}
                                        className={styles.milestoneItem}
                                        onClick={() => handleMilestoneClick(site.id, milestone.id, milestone.label, isMilestoneCompleted(milestone))}
                                        style={{ cursor: isMilestoneCompleted(milestone) ? 'default' : 'pointer' }}
                                    >
                                        <div className={`${styles.checkbox} ${isMilestoneCompleted(milestone) ? styles.checked : ''}`}>
                                            {isMilestoneCompleted(milestone) && '✓'}
                                        </div>
                                        <span style={{
                                            textDecoration: isMilestoneCompleted(milestone) ? 'line-through' : 'none',
                                            opacity: isMilestoneCompleted(milestone) ? 0.6 : 1
                                        }}>
                                            {milestone.label}
                                        </span>
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
                ))}
            </div>
        </div>
    );
}
