'use client';

import styles from './PaymentSchedule.module.css';

interface PaymentMilestone {
    id: number;
    name: string;
    percentage: number;
    amount: number;
    status: 'paid' | 'pending' | 'upcoming';
    dueDate: string;
    paidDate: string | null;
    trigger: string;
}

interface PaymentScheduleProps {
    milestones: PaymentMilestone[];
}

export default function PaymentSchedule({ milestones }: PaymentScheduleProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount) + ' FCFA';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return '✅';
            case 'pending': return '📌';
            case 'upcoming': return '⏳';
            default: return '○';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'paid': return 'Payé';
            case 'pending': return 'En attente';
            case 'upcoming': return 'À venir';
            default: return '';
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>📅 Échéancier de Paiement</h3>
                <p className={styles.subtitle}>Appels de fonds liés aux étapes clés du chantier</p>
            </div>

            <div className={styles.timeline}>
                {milestones.map((milestone, index) => (
                    <div
                        key={milestone.id}
                        className={`${styles.milestone} ${styles[milestone.status]}`}
                    >
                        <div className={styles.connector}>
                            <div className={styles.icon}>{getStatusIcon(milestone.status)}</div>
                            {index < milestones.length - 1 && <div className={styles.line} />}
                        </div>

                        <div className={styles.content}>
                            <div className={styles.milestoneHeader}>
                                <div className={styles.titleRow}>
                                    <h4>{milestone.name}</h4>
                                    <span className={`${styles.statusBadge} ${styles[milestone.status]}`}>
                                        {getStatusLabel(milestone.status)}
                                    </span>
                                </div>
                                <p className={styles.trigger}>{milestone.trigger}</p>
                            </div>

                            <div className={styles.details}>
                                <div className={styles.amount}>
                                    <span className={styles.amountValue}>{formatCurrency(milestone.amount)}</span>
                                    <span className={styles.percentage}>({milestone.percentage}%)</span>
                                </div>

                                <div className={styles.dates}>
                                    {milestone.status === 'paid' && milestone.paidDate ? (
                                        <span className={styles.datePaid}>
                                            💳 Payé le {formatDate(milestone.paidDate)}
                                        </span>
                                    ) : (
                                        <span className={styles.dateDue}>
                                            📆 Prévu le {formatDate(milestone.dueDate)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {milestone.status === 'pending' && (
                                <button className={styles.payButton}>
                                    Régler cette étape →
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
