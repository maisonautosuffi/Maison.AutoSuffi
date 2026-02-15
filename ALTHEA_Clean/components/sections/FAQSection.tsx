'use client';

import { useState } from 'react';
import styles from './FAQSection.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Quels sont les délais de construction ?",
        answer: "Nous nous engageons sur un délai de 8 à 12 mois pour la livraison clés en main, avec la possibilité d'être livré avant selon l'avancement."
    },
    {
        question: "Les villas sont-elles vraiment autonomes ?",
        answer: "Oui, la Collection Indigo est 100% off-grid avec panneaux solaires, batteries de stockage et système de récupération d'eau. Les collections Sable et Cuivre disposent de systèmes hybrides pour garantir une continuité de service."
    },
    {
        question: "Comment puis-je financer mon projet ?",
        answer: "Nous avons des partenariats avec 4 grandes banques (CBAO, BOA, Ecobank, Banque Atlantique) facilitant l'obtention de crédit. Nous proposons aussi un échéancier de paiement direct sur la durée du chantier."
    },
    {
        question: "Puis-je suivre le chantier à distance ?",
        answer: "Absolument. Notre plateforme 'Digital Twin' vous donne accès à des caméras 24/7, des rapports hebdomadaires illustrés et un suivi budgétaire en temps réel via votre espace client."
    },
    {
        question: "Occupez-vous des démarches administratives ?",
        answer: "Oui, notre 'Pack Sérénité' inclut la gestion complète du permis de construire, les raccordements (eau, électricité) et la régularisation foncière si nécessaire."
    },
    {
        question: "Quelles sont les garanties offertes ?",
        answer: "Nous offrons une garantie décennale sur la structure, une garantie biennale sur les équipements et une garantie de parfait achèvement pendant 1 an après la livraison."
    },
    {
        question: "Puis-je personnaliser les plans ?",
        answer: "Oui, nos modèles sont modulables. Vous pouvez ajuster les cloisons intérieures, choisir vos finitions et ajouter des options (piscine, annexe) avec notre architecte lors de la phase de conception."
    },
    {
        question: "Où construisez-vous actuellement ?",
        answer: "Nous intervenons principalement au Sénégal (Dakar, Petite Côte) ainsi qu'à Douala au Cameroun. Nous étudions d'autres zones sur demande."
    }
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Questions Fréquentes</span>
                    <h2 className={styles.title}>Tout savoir sur votre projet</h2>
                    <p className={styles.subtitle}>
                        Des réponses claires pour un investissement en toute sérénité.
                    </p>
                </div>

                <div className={styles.grid}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className={styles.question}>
                                <h3>{faq.question}</h3>
                                <span className={styles.icon}>
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </div>
                            <div className={styles.answer}>
                                <div className={styles.answerContent}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <p>Vous avez d'autres questions ?</p>
                    <a href="https://wa.me/221000000000" className={styles.whatsappButton}>
                        Discuter avec un expert
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
