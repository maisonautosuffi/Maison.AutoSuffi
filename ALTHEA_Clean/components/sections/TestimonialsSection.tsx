'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './TestimonialsSection.module.css';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    project: string;
    rating: number;
    text: string;
    image: string;
    date: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Mamadou Diallo",
        role: "Entrepreneur, Paris",
        project: "Villa Mandela 150m² - Saly",
        rating: 5,
        text: "Suivre mon chantier depuis Paris via l'app était incroyable. Livraison en 4 mois pile comme promis. La transparence totale m'a permis d'investir sereinement.",
        image: "/testimonials/mamadou.jpg",
        date: "Livré en Décembre 2025"
    },
    {
        id: 2,
        name: "Aïcha Ndiaye",
        role: "Médecin, Dakar",
        project: "Villa Lumumba 120m² - Thiès",
        rating: 5,
        text: "Transparence totale sur les coûts. Aucune surprise. Le Digital Twin m'a rassurée à chaque étape. Qualité de construction exceptionnelle.",
        image: "/testimonials/aicha.jpg",
        date: "Livré en Octobre 2025"
    },
    {
        id: 3,
        name: "Jean-Pierre Mendy",
        role: "Ingénieur, New York",
        project: "Villa Sankara 180m² - Mbour",
        rating: 5,
        text: "Investissement parfait pour ma retraite. Qualité exceptionnelle, finitions impeccables. L'équipe ALTHÉA a dépassé mes attentes.",
        image: "/testimonials/jean-pierre.jpg",
        date: "Livré en Septembre 2025"
    },
    {
        id: 4,
        name: "Fatou Sow",
        role: "Avocate, Montréal",
        project: "Villa Mandela 135m² - Dakar",
        rating: 5,
        text: "Processus fluide du début à la fin. Le suivi en temps réel est un vrai plus. Je recommande vivement ALTHÉA à la diaspora.",
        image: "/testimonials/fatou.jpg",
        date: "Livré en Novembre 2025"
    }
];

const TestimonialsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
                ★
            </span>
        ));
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Témoignages Clients</span>
                    <h2 className={styles.title}>Ils nous font confiance</h2>
                    <p className={styles.subtitle}>
                        Découvrez les retours de nos clients qui ont construit leur villa avec ALTHÉA
                    </p>
                </div>

                <div className={styles.carousel}>
                    <button
                        onClick={prevTestimonial}
                        className={styles.navButton}
                        aria-label="Témoignage précédent"
                    >
                        ‹
                    </button>

                    <div className={styles.testimonialWrapper}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`${styles.testimonialCard} ${index === activeIndex ? styles.active : ''
                                    }`}
                                style={{
                                    transform: `translateX(${(index - activeIndex) * 100}%)`,
                                }}
                            >
                                <div className={styles.cardContent}>
                                    <div className={styles.clientInfo}>
                                        <div className={styles.avatar}>
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={80}
                                                height={80}
                                                className={styles.avatarImage}
                                            />
                                        </div>
                                        <div className={styles.clientDetails}>
                                            <h3 className={styles.clientName}>{testimonial.name}</h3>
                                            <p className={styles.clientRole}>{testimonial.role}</p>
                                            <div className={styles.rating}>
                                                {renderStars(testimonial.rating)}
                                            </div>
                                        </div>
                                    </div>

                                    <blockquote className={styles.quote}>
                                        "{testimonial.text}"
                                    </blockquote>

                                    <div className={styles.projectInfo}>
                                        <div className={styles.projectName}>{testimonial.project}</div>
                                        <div className={styles.deliveryBadge}>{testimonial.date}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={nextTestimonial}
                        className={styles.navButton}
                        aria-label="Témoignage suivant"
                    >
                        ›
                    </button>
                </div>

                <div className={styles.indicators}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ''
                                }`}
                            aria-label={`Aller au témoignage ${index + 1}`}
                        />
                    ))}
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>15+</div>
                        <div className={styles.statLabel}>Projets Livrés</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>100%</div>
                        <div className={styles.statLabel}>Clients Satisfaits</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>4.8/5</div>
                        <div className={styles.statLabel}>Note Moyenne</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
