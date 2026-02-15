import type { Metadata } from 'next';
import styles from './quartiers.module.css';

export const metadata: Metadata = {
    title: "Quartiers de Demain | ALTHÉA",
    description: "Des éco-quartiers intelligents et autonomes pour une vie communautaire épanouie.",
};

export default function QuartiersPage() {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Quartiers de Demain</h1>
                <p className={styles.intro}>
                    Plus qu'une maison, un écosystème. Découvrez nos villes intelligentes où
                    autonomie rime avec communauté.
                </p>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Vision des Éco-quartiers</h2>
                    <p className={styles.text}>
                        Nos quartiers sont conçus pour être résilients. Intégrant production alimentaire,
                        gestion autonome de l'énergie et de l'eau, ils offrent un cadre de vie sain
                        et sécurisé, déconnecté des aléas des réseaux publics mais hyper-connecté socialement.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Projets en Cours</h2>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Dakar Oasis</h3>
                            <p className={styles.text}>
                                Un havre de paix situé à 30mn de la capitale, conçu pour déconnecter du tumulte urbain.
                                Ce projet pilote comprend 50 villas bioclimatiques, une ferme permacole communautaire
                                permettant une autonomie alimentaire de 60%, et un centre de santé holistique.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Saly Horizon</h3>
                            <p className={styles.text}>
                                Entre mer et lagune, Saly Horizon réinvente la station balnéaire.
                                Axé sur l'écotourisme et le télétravail, ce quartier intègre des espaces de coworking
                                en plein air et une gestion 100% renouvelable des ressources hydriques.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Projets Futurs</h2>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Casamance Retreat</h3>
                            <p className={styles.text}>
                                Une immersion totale en forêt. Ce futur éco-village mettra à l'honneur
                                l'architecture vernaculaire Diola revisitée, avec un impact carbone négatif.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Infrastructures Durables</h2>
                    <p className={styles.text}>
                        Chaque quartier ALTHÉA dispose de routes solaires, d'éclairage intelligent
                        et de systèmes de recyclage des déchets biomimétiques.
                    </p>
                </section>
            </div>
        </div>
    );
}
