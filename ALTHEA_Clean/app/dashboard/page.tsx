'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './Dashboard.module.css';
import TreasuryOverview from '@/components/dashboard/TreasuryOverview';
import PaymentSchedule from '@/components/dashboard/PaymentSchedule';
import { supabase } from '@/lib/supabase/client';

export default function DashboardPage() {
    const [projects, setProjects] = useState<Array<{ id: string; name: string; status: string; progress: number; current_phase: string | null }>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [docCount, setDocCount] = useState(0);
    const [photoCount, setPhotoCount] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0);
    const [amountPaid, setAmountPaid] = useState(0);
    const [paymentMilestones, setPaymentMilestones] = useState<Array<{
        id: number;
        name: string;
        percentage: number;
        amount: number;
        status: 'paid' | 'pending' | 'upcoming';
        dueDate: string;
        paidDate: string | null;
        trigger: string;
    }>>([]);

    const activeProjectId = useMemo(() => projects[0]?.id ?? 'A12', [projects]);

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const { data: projectsData, error: projectsError } = await supabase
                    .from('projects')
                    .select('id, name, status, progress, current_phase')
                    .order('created_at', { ascending: true });

                if (projectsError) throw projectsError;
                setProjects(projectsData ?? []);
            } finally {
                setIsLoading(false);
            }
        };

        void load();
    }, []);

    useEffect(() => {
        const loadProjectKPIs = async () => {
            if (!activeProjectId) return;

            const [{ count: docs }, { count: photos }] = await Promise.all([
                supabase.from('project_documents').select('*', { count: 'exact', head: true }).eq('project_id', activeProjectId),
                supabase.from('project_photos').select('*', { count: 'exact', head: true }).eq('project_id', activeProjectId),
            ]);

            setDocCount(docs ?? 0);
            setPhotoCount(photos ?? 0);

            const [{ data: requests }, { data: payments }] = await Promise.all([
                supabase
                    .from('project_payment_requests')
                    .select('id, description, amount_cents, status, due_date')
                    .eq('project_id', activeProjectId)
                    .order('created_at', { ascending: true }),
                supabase
                    .from('project_payments')
                    .select('id, request_id, amount_cents, status, paid_at')
                    .eq('project_id', activeProjectId)
                    .order('created_at', { ascending: true }),
            ]);

            const requestsList = requests ?? [];
            const paymentsList = payments ?? [];

            const total = requestsList.reduce((sum, r) => sum + (r.amount_cents ?? 0), 0);
            const paid = paymentsList
                .filter(p => p.status === 'RECEIVED')
                .reduce((sum, p) => sum + (p.amount_cents ?? 0), 0);

            setTotalBudget(Math.round(total / 100));
            setAmountPaid(Math.round(paid / 100));

            if (requestsList.length === 0) {
                setPaymentMilestones([]);
                return;
            }

            const milestoneRows = requestsList.map((r, idx) => {
                const matchingPayment = paymentsList.find(p => p.request_id === r.id && p.status === 'RECEIVED');
                const status: 'paid' | 'pending' | 'upcoming' = matchingPayment
                    ? 'paid'
                    : r.status === 'DUE'
                        ? 'pending'
                        : 'upcoming';
                const due = r.due_date ?? new Date().toISOString().slice(0, 10);

                const percentage = total > 0 ? Math.round(((r.amount_cents ?? 0) / total) * 100) : 0;

                return {
                    id: idx + 1,
                    name: r.description ?? `Étape ${idx + 1}`,
                    percentage,
                    amount: Math.round((r.amount_cents ?? 0) / 100),
                    status,
                    dueDate: due,
                    paidDate: matchingPayment?.paid_at ?? null,
                    trigger: r.description ?? '',
                };
            });

            setPaymentMilestones(milestoneRows);
        };

        void loadProjectKPIs();
    }, [activeProjectId]);

    const activeProject = projects.find(p => p.id === activeProjectId);
    const progress = activeProject?.progress ?? 0;
    const phase = activeProject?.current_phase ?? '';

    return (
        <div className={styles.grid}>
            {/* Treasury Overview - NEW */}
            <div className={styles.fullWidth}>
                <TreasuryOverview
                    totalBudget={totalBudget}
                    amountPaid={amountPaid}
                />
            </div>

            {/* Project Status Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3>État d'avancement</h3>
                    <span className={styles.statusBadge}>En cours</span>
                </div>
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className={styles.progressLabels}>
                        <span>{phase || '—'}</span>
                        <span>{progress}%</span>
                    </div>
                </div>
                <div className={styles.nextStep}>
                    <strong>Projet :</strong> {isLoading ? 'Chargement…' : (activeProject?.name ?? '—')}
                </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>{projects.length}</span>
                    <span className={styles.statLabel}>Chantiers</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>{docCount}</span>
                    <span className={styles.statLabel}>Documents</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>{photoCount}</span>
                    <span className={styles.statLabel}>Photos</span>
                </div>
            </div>

            {/* Payment Schedule - NEW */}
            <div className={styles.fullWidth}>
                <PaymentSchedule milestones={paymentMilestones} />
            </div>

            {/* Recent Activity */}
            <div className={`${styles.card} ${styles.fullWidth}`}>
                <h3>Dernières Activités</h3>
                <ul className={styles.activityList}>
                    <li className={styles.activityItem}>
                        <div className={styles.activityIcon}>📷</div>
                        <div className={styles.activityContent}>
                            <p><strong>Nouvelles photos ajoutées</strong> par le chef de chantier.</p>
                            <span className={styles.time}>Il y a 2 heures</span>
                        </div>
                    </li>
                    <li className={styles.activityItem}>
                        <div className={styles.activityIcon}>📂</div>
                        <div className={styles.activityContent}>
                            <p><strong>Document ajouté</strong> : Compte-rendu de visite n°4.</p>
                            <span className={styles.time}>Hier à 14:30</span>
                        </div>
                    </li>
                    <li className={styles.activityItem}>
                        <div className={styles.activityIcon}>✅</div>
                        <div className={styles.activityContent}>
                            <p><strong>Validation étape</strong> : Ferraillage poteaux validé par bureau de contrôle.</p>
                            <span className={styles.time}>Lundi 12 Fév</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
