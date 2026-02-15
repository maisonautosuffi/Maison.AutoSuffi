'use client';

import styles from './Financial.module.css';

export default function FinancialPage() {
    return (
        <div className={styles.container}>
            {/* Summary Cards */}
            <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                    <span className={styles.label}>Budget Total</span>
                    <span className={styles.value}>85 000 000 FCFA</span>
                    <span className={styles.subtext}>Villa Sankara #A12</span>
                </div>
                <div className={styles.summaryCard}>
                    <span className={styles.label}>Déjà Versé</span>
                    <span className={styles.value}>25 500 000 FCFA</span>
                    <span className={styles.subtext}>30% du total</span>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: '30%' }}></div>
                    </div>
                </div>
                <div className={styles.summaryCard}>
                    <span className={styles.label}>Prochaine Échéance</span>
                    <span className={styles.value}>12 750 000 FCFA</span>
                    <span className={styles.subtext}>Au coulage Dalle RDC (12 Mar)</span>
                </div>
            </div>

            {/* Transaction History */}
            <div className={styles.historySection}>
                <h3>Historique des Paiements</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Référence</th>
                            <th>Montant</th>
                            <th>Statut</th>
                            <th>Facture</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15 Jan 2026</td>
                            <td>Acompte de Démarrage (30%)</td>
                            <td>VIR-2026-001</td>
                            <td className={styles.amount}>25 500 000 FCFA</td>
                            <td><span className={styles.badgeSuccess}>Reçu</span></td>
                            <td><button className={styles.downloadBtn}>⬇️ PDF</button></td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>Appel de fonds n°2 (Achèvement Fondations)</td>
                            <td>-</td>
                            <td className={styles.amount}>12 750 000 FCFA</td>
                            <td><span className={styles.badgePending}>À venir</span></td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>Appel de fonds n°3 (Achèvement Murs)</td>
                            <td>-</td>
                            <td className={styles.amount}>12 750 000 FCFA</td>
                            <td><span className={styles.badgePending}>À venir</span></td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Document Upload Section - NEW */}
            <div className={styles.uploadSection}>
                <h3>Ajouter un justificatif</h3>
                <div className={styles.uploadBox}>
                    <input
                        type="file"
                        id="file-upload"
                        className={styles.fileInput}
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                alert(`Document "${e.target.files[0].name}" téléchargé avec succès ! (Simulation)`);
                            }
                        }}
                    />
                    <label htmlFor="file-upload" className={styles.uploadLabel}>
                        <span className={styles.uploadIcon}>☁️</span>
                        <span>Cliquez pour déposer un virement ou une facture</span>
                        <span className={styles.uploadHint}>(PDF, JPG, PNG - Max 5Mo)</span>
                    </label>
                </div>
            </div>

            {/* Bank Info */}
            <div className={styles.bankInfo}>
                <div className={styles.infoIcon}>ℹ️</div>
                <div className={styles.infoContent}>
                    <h4>Coordonnées Bancaires (RIB)</h4>
                    <p>Pour vos virements, veuillez utiliser le compte suivant :</p>
                    <div className={styles.ribBox}>
                        <strong>Banque :</strong> CBAO Groupe Attijariwafa Bank<br />
                        <strong>IBAN :</strong> SN12 3456 7890 1234 5678 9012 34<br />
                        <strong>BIC :</strong> CBAOSNDK
                    </div>
                </div>
            </div>
        </div >
    );
}
