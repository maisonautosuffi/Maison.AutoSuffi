import type { Metadata } from 'next';
import styles from './services.module.css';

export const metadata: Metadata = {
    title: "Services & Processus | ALTHÉA",
    description: "Un accompagnement clé en main, du financement à la remise des clés.",
};

export default function ServicesPage() {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Services & Processus</h1>
                <p className={styles.intro}>
                    Nous avons simplifié l'immobilier pour vous. Un parcours transparent,
                    sécurisé et sans stress.
                </p>
            </div>

            <div className={styles.content}>
                <section className={styles.introSection}>
                    <p className={styles.largeText}>
                        L'expérience ALTHÉA va au-delà de la construction. Nous orchestrons chaque détail pour transformer votre vision en un patrimoine tangible, sans la moindre friction.
                    </p>
                </section>

                <div className={styles.stepsGrid}>
                    <div className={styles.step}>
                        <div className={styles.number}>01</div>
                        <div className={styles.stepContent}>
                            <h3>Immersion & Design</h3>
                            <p>
                                Votre voyage commence par une consultation exclusive. Choix du terrain, personnalisation architecturale, et visualisation 3D immersive. Nous co-créons votre sanctuaire.
                            </p>
                        </div>
                    </div>

                    <div className={styles.step}>
                        <div className={styles.number}>02</div>
                        <div className={styles.stepContent}>
                            <h3>Sérénité Administrative</h3>
                            <p>
                                Oubliez la complexité. De l'obtention du titre foncier au permis de construire, en passant par le montage financier, notre conciergerie juridique gère l'intégralité des démarches.
                            </p>
                        </div>
                    </div>

                    <div className={styles.step}>
                        <div className={styles.number}>03</div>
                        <div className={styles.stepContent}>
                            <h3>Construction Transparente (DTP)</h3>
                            <p>
                                Le cœur de notre promesse : le Digital Twin Project. Suivez votre chantier en temps réel via l'application. Caméras 24/7, timeline des milestones, et validation des étapes avant tout déblocage de fonds.
                            </p>
                        </div>
                    </div>

                    <div className={styles.step}>
                        <div className={styles.number}>04</div>
                        <div className={styles.stepContent}>
                            <h3>Livraison & Art de Vivre</h3>
                            <p>
                                Remise des clés en main propre. Mise en service de votre Smart Home. Si vous le souhaitez, notre service de gestion locative premium prend le relais pour rentabiliser votre bien en votre absence.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.premiumBox}>
                    <h2 className={styles.premiumTitle}>Services Exclusifs</h2>
                    <ul className={styles.premiumList}>
                        <li>
                            <strong>Rendement Locatif Sécurisé :</strong> Gestion locative complète avec garantie de loyers.
                        </li>
                        <li>
                            <strong>Smart Home Intégrée :</strong> Domotique avancée pour la gestion de l'énergie et la sécurité.
                        </li>
                        <li>
                            <strong>Design Intérieur :</strong> Partenariat avec des designers pour un ameublement "Prêt-à-vivre".
                        </li>
                    </ul>
                </div>

                <div className={styles.guaranteeBox}>
                    <h2 className={styles.guaranteeTitle}>Engagement Qualité</h2>
                    <div className={styles.guarantees}>
                        <div className={styles.guaranteeItem}>
                            <h4>Décennale</h4>
                            <p>Couverture complète sur le gros œuvre pour une tranquillité d'esprit absolue.</p>
                        </div>
                        <div className={styles.guaranteeItem}>
                            <h4>Délais Garantis</h4>
                            <p>Chaque jour de retard est pénalisé à notre charge. Votre temps est précieux.</p>
                        </div>
                        <div className={styles.guaranteeItem}>
                            <h4>Matériaux Certifiés</h4>
                            <p>Utilisation exclusive de matériaux normés et durables, testés pour le climat local.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
