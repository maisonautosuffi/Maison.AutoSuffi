'use client';

import styles from '../Dashboard.module.css';

export default function DtpPage() {
    return (
        <div>
            <header className={styles.welcomeHeader}>
                <h1 className={styles.welcomeTitle}>Digital Twin Project (DTP)</h1>
                <p>Suivez votre chantier en temps réel. Transparence totale.</p>
            </header>

            <div className={styles.card} style={{ marginBottom: '2rem' }}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Vue Chantier - Caméra Principale</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className={styles.liveIndicator}>EN DIRECT</div>
                        <select style={{ padding: '5px', borderRadius: '5px' }}>
                            <option>Caméra 01 - Façade Sud</option>
                            <option>Caméra 02 - Vue Aérienne</option>
                            <option>Caméra 03 - Intérieur</option>
                        </select>
                    </div>
                </div>

                {/* Simulated Video Feed */}
                <div style={{
                    width: '100%',
                    height: '450px',
                    background: 'linear-gradient(45deg, #1a1a1a, #2c3e50)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    position: 'relative'
                }}>
                    <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎥</span>
                    <p>Connexion Sécurisée Satellite établie...</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Flux simulé pour la démonstration</p>

                    {/* Timestamp Overlay */}
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        fontFamily: 'monospace',
                        background: 'rgba(0,0,0,0.5)',
                        padding: '5px 10px',
                        borderRadius: '4px'
                    }}>
                        {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </div>

            <div className={styles.cardsGrid}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>Journal de Bord</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                            <strong>05/02/2026</strong> <br />
                            <span style={{ color: '#666' }}>Validation de l'étude de sol.</span>
                        </li>
                        <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                            <strong>01/02/2026</strong> <br />
                            <span style={{ color: '#666' }}>Implantation du chantier terminée.</span>
                        </li>
                        <li>
                            <strong>28/01/2026</strong> <br />
                            <span style={{ color: '#666' }}>Signature du contrat de construction.</span>
                        </li>
                    </ul>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>Statistiques</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <span>Budget Consommé</span>
                        <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '10%' }}></div></div>
                        <span style={{ fontSize: '0.8rem' }}>10%</span>
                    </div>
                    <div>
                        <span>Délais</span>
                        <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '15%', background: 'green' }}></div></div>
                        <span style={{ fontSize: '0.8rem' }}>Dans les temps</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
