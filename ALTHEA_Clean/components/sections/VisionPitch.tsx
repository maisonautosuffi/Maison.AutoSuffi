import styles from './VisionPitch.module.css';

const VisionPitch = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    {/* Placeholder for Architect/DTP image */}
                    <div className={styles.imagePlaceholder}>
                        Image: Chef de Projet & Interface My Althéa
                    </div>
                </div>

                <div className={styles.content}>
                    <span className={styles.label}>La Vision & Confiance</span>
                    <h2 className={styles.title}>
                        Bâtir l'Avenir, <br />
                        Inspirer la Confiance.
                    </h2>
                    <p className={styles.description}>
                        ALTHÉA redéfinit l'immobilier en Afrique pour la diaspora.
                        Grâce à une transparence technologique totale et une excellence architecturale,
                        construire votre héritage devient une expérience sereine et connectée.
                    </p>

                    <div className={styles.grid}>
                        <div className={styles.feature}>
                            <div className={styles.icon}>I</div>
                            <h3 className={styles.featureTitle}>Innovation</h3>
                            <p className={styles.featureText}>Architecture d'avant-garde & matériaux éco-futuristes.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.icon}>A</div>
                            <h3 className={styles.featureTitle}>Autonomie</h3>
                            <p className={styles.featureText}>Énergie propre & éco-systèmes intégrés.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.icon}>C</div>
                            <h3 className={styles.featureTitle}>Confiance</h3>
                            <p className={styles.featureText}>Suivi en temps réel via Digital Twin.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.icon}>D</div>
                            <h3 className={styles.featureTitle}>Design</h3>
                            <p className={styles.featureText}>Étude intégrée & modèles adaptables.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionPitch;
