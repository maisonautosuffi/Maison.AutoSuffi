'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './RealizationsGallery.module.css';

interface Project {
    id: number;
    name: string;
    model: string;
    collection: string;
    surface: number;
    location: string;
    deliveryDate: string;
    mainImage: string;
    images: string[];
    category: 'mandela' | 'lumumba' | 'sankara';
}

const projects: Project[] = [
    {
        id: 1,
        name: "Villa Mandela - Saly",
        model: "Mandela",
        collection: "Cuivre",
        surface: 150,
        location: "Saly, Sénégal",
        deliveryDate: "Décembre 2025",
        mainImage: "/projects/mandela-saly-main.jpg",
        images: [
            "/projects/mandela-saly-1.jpg",
            "/projects/mandela-saly-2.jpg",
            "/projects/mandela-saly-3.jpg"
        ],
        category: 'mandela'
    },
    {
        id: 2,
        name: "Villa Lumumba - Thiès",
        model: "Lumumba",
        collection: "Cuivre",
        surface: 120,
        location: "Thiès, Sénégal",
        deliveryDate: "Octobre 2025",
        mainImage: "/projects/lumumba-thies-main.jpg",
        images: [
            "/projects/lumumba-thies-1.jpg",
            "/projects/lumumba-thies-2.jpg",
            "/projects/lumumba-thies-3.jpg"
        ],
        category: 'lumumba'
    },
    {
        id: 3,
        name: "Villa Sankara - Mbour",
        model: "Sankara",
        collection: "Indigo",
        surface: 180,
        location: "Mbour, Sénégal",
        deliveryDate: "Septembre 2025",
        mainImage: "/projects/sankara-mbour-main.jpg",
        images: [
            "/projects/sankara-mbour-1.jpg",
            "/projects/sankara-mbour-2.jpg",
            "/projects/sankara-mbour-3.jpg"
        ],
        category: 'sankara'
    },
    {
        id: 4,
        name: "Villa Mandela - Dakar",
        model: "Mandela",
        collection: "Sable",
        surface: 135,
        location: "Dakar, Sénégal",
        deliveryDate: "Novembre 2025",
        mainImage: "/projects/mandela-dakar-main.jpg",
        images: [
            "/projects/mandela-dakar-1.jpg",
            "/projects/mandela-dakar-2.jpg",
            "/projects/mandela-dakar-3.jpg"
        ],
        category: 'mandela'
    },
    {
        id: 5,
        name: "Villa Lumumba - Saly",
        model: "Lumumba",
        collection: "Indigo",
        surface: 145,
        location: "Saly, Sénégal",
        deliveryDate: "Août 2025",
        mainImage: "/projects/lumumba-saly-main.jpg",
        images: [
            "/projects/lumumba-saly-1.jpg",
            "/projects/lumumba-saly-2.jpg",
            "/projects/lumumba-saly-3.jpg"
        ],
        category: 'lumumba'
    },
    {
        id: 6,
        name: "Villa Sankara - Dakar",
        model: "Sankara",
        collection: "Cuivre",
        surface: 165,
        location: "Dakar, Sénégal",
        deliveryDate: "Juillet 2025",
        mainImage: "/projects/sankara-dakar-main.jpg",
        images: [
            "/projects/sankara-dakar-1.jpg",
            "/projects/sankara-dakar-2.jpg",
            "/projects/sankara-dakar-3.jpg"
        ],
        category: 'sankara'
    }
];

const RealizationsGallery = () => {
    const [filter, setFilter] = useState<'all' | 'mandela' | 'lumumba' | 'sankara'>('all');

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Nos Réalisations</span>
                    <h2 className={styles.title}>Projets Livrés avec Succès</h2>
                    <p className={styles.subtitle}>
                        Découvrez nos villas construites et livrées à nos clients à travers le Sénégal
                    </p>
                </div>

                <div className={styles.filters}>
                    <button
                        onClick={() => setFilter('all')}
                        className={`${styles.filterButton} ${filter === 'all' ? styles.filterActive : ''}`}
                    >
                        Tous les projets
                    </button>
                    <button
                        onClick={() => setFilter('mandela')}
                        className={`${styles.filterButton} ${filter === 'mandela' ? styles.filterActive : ''}`}
                    >
                        Mandela
                    </button>
                    <button
                        onClick={() => setFilter('lumumba')}
                        className={`${styles.filterButton} ${filter === 'lumumba' ? styles.filterActive : ''}`}
                    >
                        Lumumba
                    </button>
                    <button
                        onClick={() => setFilter('sankara')}
                        className={`${styles.filterButton} ${filter === 'sankara' ? styles.filterActive : ''}`}
                    >
                        Sankara
                    </button>
                </div>

                <div className={styles.grid}>
                    {filteredProjects.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={project.mainImage}
                                    alt={project.name}
                                    width={600}
                                    height={400}
                                    className={styles.image}
                                />
                                <div className={styles.overlay}>
                                    <Link href={`/realisations/${project.id}`} className={styles.viewButton}>
                                        Voir le projet →
                                    </Link>
                                </div>
                                <div className={styles.badge}>{project.deliveryDate}</div>
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.projectName}>{project.name}</h3>

                                <div className={styles.details}>
                                    <div className={styles.detail}>
                                        <span className={styles.detailLabel}>Modèle</span>
                                        <span className={styles.detailValue}>{project.model}</span>
                                    </div>
                                    <div className={styles.detail}>
                                        <span className={styles.detailLabel}>Collection</span>
                                        <span className={styles.detailValue}>{project.collection}</span>
                                    </div>
                                    <div className={styles.detail}>
                                        <span className={styles.detailLabel}>Surface</span>
                                        <span className={styles.detailValue}>{project.surface}m²</span>
                                    </div>
                                    <div className={styles.detail}>
                                        <span className={styles.detailLabel}>Localisation</span>
                                        <span className={styles.detailValue}>{project.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <p className={styles.ctaText}>
                        Vous souhaitez voir votre projet ici ?
                    </p>
                    <Link href="/contact-chat" className={styles.ctaButton}>
                        Démarrer mon projet
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RealizationsGallery;
