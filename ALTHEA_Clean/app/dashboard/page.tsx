'use client';

import styles from './Dashboard.module.css';
import TreasuryOverview from '@/components/dashboard/TreasuryOverview';
import PaymentSchedule from '@/components/dashboard/PaymentSchedule';

export default function DashboardPage() {
    // Mock project data
    const projectData = {
        totalBudget: 90_540_000, // FCFA
        amountPaid: 22_635_000, // Signature + Fondations paid
    };

    const paymentMilestones = [
        {
            id: 1,
            name: 'Signature & Acompte',
            percentage: 20,
            amount: 18_108_000,
            status: 'paid' as const,
            dueDate: '2026-03-15',
            paidDate: '2026-03-10',
            trigger: 'Signature contrat + Validation plans architecturaux'
        },
        {
            id: 2,
            name: 'Mise en Place DTP',
            percentage: 5,
            amount: 4_527_000,
            status: 'paid' as const,
            dueDate: '2026-03-20',
            paidDate: '2026-03-18',
            trigger: 'Installation Digital Twin (matériel + abonnement durée chantier)'
        },
        {
            id: 3,
            name: 'Fondations',
            percentage: 15,
            amount: 13_581_000,
            status: 'pending' as const,
            dueDate: '2026-04-20',
            paidDate: null,
            trigger: 'Béton de fondation coulé + Validation géotechnicien'
        },
        {
            id: 4,
            name: 'Gros Œuvre',
            percentage: 15,
            amount: 13_581_000,
            status: 'upcoming' as const,
            dueDate: '2026-06-15',
            paidDate: null,
            trigger: 'Murs élévés, dalle coulée, charpente posée'
        },
        {
            id: 5,
            name: 'Mise Hors d\'Eau',
            percentage: 15,
            amount: 13_581_000,
            status: 'upcoming' as const,
            dueDate: '2026-08-30',
            paidDate: null,
            trigger: 'Toiture étanche + Menuiseries extérieures posées'
        },
        {
            id: 6,
            name: 'Second Œuvre',
            percentage: 15,
            amount: 13_581_000,
            status: 'upcoming' as const,
            dueDate: '2026-11-15',
            paidDate: null,
            trigger: 'Plomberie, électricité, finitions à 70%'
        },
        {
            id: 7,
            name: 'Finitions',
            percentage: 10,
            amount: 9_054_000,
            status: 'upcoming' as const,
            dueDate: '2027-01-20',
            paidDate: null,
            trigger: 'Peintures, sols, cuisine, salle de bain installés'
        },
        {
            id: 8,
            name: 'Livraison',
            percentage: 5,
            amount: 4_527_000,
            status: 'upcoming' as const,
            dueDate: '2027-02-28',
            paidDate: null,
            trigger: 'Réception chantier + Levée des réserves'
        },
    ];

    return (
        <div className={styles.grid}>
            {/* Treasury Overview - NEW */}
            <div className={styles.fullWidth}>
                <TreasuryOverview
                    totalBudget={projectData.totalBudget}
                    amountPaid={projectData.amountPaid}
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
                        <div className={styles.progress} style={{ width: '35%' }}></div>
                    </div>
                    <div className={styles.progressLabels}>
                        <span>Fondations</span>
                        <span>35%</span>
                    </div>
                </div>
                <div className={styles.nextStep}>
                    <strong>Prochaine étape :</strong> Coulage dalle RDC (Prévu le 12/03)
                </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>124</span>
                    <span className={styles.statLabel}>Jours restants</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>€45k</span>
                    <span className={styles.statLabel}>Budget consommé</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>12</span>
                    <span className={styles.statLabel}>Photos ajoutées</span>
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
