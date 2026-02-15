'use client';

import Image from 'next/image';
import EmptyState from '@/components/ui/EmptyState';
import styles from './Photos.module.css';

const photoGallery = [
    {
        id: 1,
        src: "/images/chantier-1.jpg", // Placeholder
        date: "10 Fév 2026",
        title: "Implantation terminée",
        category: "Gros Œuvre"
    },
    {
        id: 2,
        src: "/images/chantier-2.jpg", // Placeholder
        date: "08 Fév 2026",
        title: "Livraison des agrégats",
        category: "Approvisionnement"
    },
    {
        id: 3,
        src: "/images/chantier-3.jpg", // Placeholder
        date: "05 Fév 2026",
        title: "Visite technique géomètre",
        category: "Études"
    },
    {
        id: 4,
        src: "/images/chantier-4.jpg", // Placeholder
        date: "28 Jan 2026",
        title: "Débroussaillage du terrain",
        category: "Préparation"
    }
];

export default function PhotosPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.subtitle}>Suivez l'évolution visuelle de votre chantier semaine par semaine.</p>
                <button className={styles.filterBtn}>Filtrer par date</button>
            </div>

            {photoGallery.length > 0 ? (
                <div className={styles.grid}>
                    {photoGallery.map((photo) => (
                        <div key={photo.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={photo.src}
                                    alt={photo.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className={styles.image}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.caption}>
                                <h3 className={styles.title}>{photo.title}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.date}>{photo.date}</span>
                                    <span className={styles.category}>{photo.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon="📷"
                    title="Aucune photo pour le moment"
                    description="Les photos de l'avancement de votre chantier seront publiées ici chaque semaine."
                />
            )}
        </div>
    );
}
