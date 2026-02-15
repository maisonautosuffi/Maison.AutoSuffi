import Link from 'next/link';
import Image from 'next/image';
import styles from './ModelsSection.module.css';

const models = [
    {
        id: 'mandela',
        name: 'Mandela',
        desc: 'L\'harmonie parfaite. Un hommage à la paix et à l\'intégration naturelle.',
    },
    {
        id: 'sankara',
        name: 'Sankara',
        desc: 'L\'intégrité visionnaire. Autosuffisance et design révolutionnaire pour une vie libre.',
    },
    {
        id: 'lumumba',
        name: 'Lumumba',
        desc: 'L\'indépendance audacieuse. Architecture résiliente et fière, tournée vers l\'avenir.',
    },
    {
        id: 'senghor',
        name: 'Senghor',
        desc: 'La fusion poétique. Architecture en symbiose avec la nature et l\'environnement.',
    },
    {
        id: 'cheikh-anta-diop',
        name: 'Cheikh Anta Diop',
        desc: 'L\'héritage culturel. Grands espaces familiaux célébrant la transmission et la communauté.',
    },
    {
        id: 'nkrumah',
        name: 'Nkrumah',
        desc: 'La vision panafricaine. Design futuriste et audacieux pour les pionniers de demain.',
    },
];

import ScrollReveal from '../ui/ScrollReveal';

const ModelsSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <ScrollReveal direction="up" delay={0.1}>
                    <h2 className={styles.title}>Nos Modèles Signature</h2>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                    <p className={styles.subtitle}>Des villas conçues pour votre héritage.</p>
                </ScrollReveal>
            </div>

            <div className={styles.grid}>
                {models.map((model, index) => (
                    <ScrollReveal key={model.id} direction="up" delay={0.1 * index} className="h-full">
                        <div className={`${styles.card} glass-card model-card h-full`}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={`/models/${model.id}.png`}
                                    alt={`Villa ${model.name} - Rendu 3D`}
                                    width={600}
                                    height={400}
                                    className={styles.image}
                                    style={{ objectFit: 'cover' }}
                                    priority={model.id === 'mandela'}
                                />
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.modelName}>{model.name}</h3>
                                <p className={styles.description}>{model.desc}</p>
                                <Link href={`/models/${model.id}`} className={styles.link}>
                                    Découvrir →
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            <div className={styles.centerCta}>
                <ScrollReveal scale={true} delay={0.4}>
                    <Link href="/models" className={styles.viewAll}>
                        Voir tous les modèles
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ModelsSection;
