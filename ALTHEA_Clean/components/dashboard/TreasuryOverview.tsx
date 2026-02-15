'use client';

import styles from './TreasuryOverview.module.css';

interface TreasuryOverviewProps {
    totalBudget: number;
    amountPaid: number;
}

export default function TreasuryOverview({ totalBudget, amountPaid }: TreasuryOverviewProps) {
    const remainingBalance = totalBudget - amountPaid;
    const progressPercentage = ((amountPaid / totalBudget) * 100).toFixed(1);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount) + ' FCFA';
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>💰 Trésorerie du Projet</h3>
            </div>

            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <span className={styles.label}>Budget Total</span>
                    <span className={styles.value}>{formatCurrency(totalBudget)}</span>
                </div>

                <div className={styles.statItem}>
                    <span className={styles.label}>Montant Payé</span>
                    <span className={`${styles.value} ${styles.paid}`}>{formatCurrency(amountPaid)}</span>
                </div>

                <div className={styles.statItem}>
                    <span className={styles.label}>Solde Restant</span>
                    <span className={`${styles.value} ${styles.remaining}`}>{formatCurrency(remainingBalance)}</span>
                </div>
            </div>

            <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progress}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                <div className={styles.progressLabel}>
                    <span>{progressPercentage}% du budget consommé</span>
                </div>
            </div>
        </div>
    );
}
