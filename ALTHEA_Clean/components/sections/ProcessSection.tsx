import styles from './ProcessSection.module.css';

const milestones = [
    { icon: '📝', title: 'Signature & Acompte', percentage: '20%', description: 'Signature du contrat et validation des plans architecturaux' },
    { icon: '📡', title: 'Mise en Place DTP', percentage: '5%', description: 'Installation Digital Twin (matériel + abonnement durée chantier)' },
    { icon: '🏗️', title: 'Fondations', percentage: '15%', description: 'Coulage du béton et validation par le géotechnicien' },
    { icon: '🧱', title: 'Gros Œuvre', percentage: '15%', description: 'Élévation des murs, dalle et pose de la charpente' },
    { icon: '🏠', title: 'Mise Hors d\'Eau', percentage: '15%', description: 'Toiture étanche et menuiseries extérieures' },
    { icon: '⚡', title: 'Second Œuvre', percentage: '15%', description: 'Plomberie, électricité et finitions à 70%' },
    { icon: '🎨', title: 'Finitions', percentage: '10%', description: 'Peintures, sols, cuisine et salles de bain' },
    { icon: '✅', title: 'Livraison', percentage: '5%', description: 'Réception du chantier et levée des réserves' },
];

import ScrollReveal from '../ui/ScrollReveal';

const ProcessSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <ScrollReveal direction="up" delay={0.1}>
                        <h2 className={styles.title}>Un Processus Transparent</h2>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.2}>
                        <p className={styles.subtitle}>
                            8 étapes clés avec appels de fonds progressifs. Vous suivez chaque avancement en temps réel.
                        </p>
                    </ScrollReveal>
                </div>

                <div className={styles.timeline}>
                    {milestones.map((milestone, index) => (
                        <ScrollReveal key={index} direction="left" delay={index * 0.1} className={styles.milestoneWrapper}>
                            <div className={styles.milestone}>
                                <div className={styles.iconContainer}>
                                    <span className={styles.icon}>{milestone.icon}</span>
                                    {index < milestones.length - 1 && <div className={styles.connector} />}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.titleRow}>
                                        <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                                        <span className={styles.percentage}>{milestone.percentage}</span>
                                    </div>
                                    <p className={styles.description}>{milestone.description}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <div className={styles.cta}>
                    <ScrollReveal scale={true} delay={0.5}>
                        <p className={styles.ctaText}>
                            Découvrez votre échéancier personnalisé lors de votre rendez-vous conseil.
                        </p>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
