import Link from 'next/link';
import Image from 'next/image';
import styles from './DTPSection.module.css';

const DTPSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.label}>Technologie Digital Twin</span>
                    <h2 className={styles.title}>Le Contrôle Absolu,<br /> Où que vous soyez.</h2>
                    <p className={styles.text}>
                        Fini le stress et l'opacité. Avec le Digital Twin Project (DTP),
                        votre future villa possède son jumeau numérique. Suivez chaque étape
                        de la construction en temps réel depuis votre smartphone.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <span className={styles.check}>✓</span> Suivi budgétaire précis
                        </li>
                        <li className={styles.listItem}>
                            <span className={styles.check}>✓</span> Caméras de chantier 24/7
                        </li>
                        <li className={styles.listItem}>
                            <span className={styles.check}>✓</span> QR Code unique pour l'historique
                        </li>
                    </ul>
                    <Link href="/vision" style={{ color: 'var(--color-azure)', textDecoration: 'underline' }}>
                        En savoir plus sur le DTP →
                    </Link>
                </div>

                <div className={styles.visual}>
                    <div className={styles.dashboardContainer}>
                        <Image
                            src="/process/dtp-dashboard.png"
                            alt="Tableau de bord Digital Twin Platform - Suivi de chantier"
                            width={700}
                            height={500}
                            className={styles.dashboardImage}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DTPSection;
