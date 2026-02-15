'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Blog.module.css';

const articles = [
    {
        id: 1,
        slug: 'pourquoi-investir-maintenant',
        title: "Pourquoi 2026 est l'année idéale pour investir au Sénégal ?",
        excerpt: "Analyse du marché immobilier, stabilité politique et émergence de la classe moyenne : tous les feux sont au vert.",
        image: "/images/blog/dakar-skyline.jpg",
        category: "Investissement",
        date: "05 Fév 2026",
        readTime: "5 min"
    },
    {
        id: 2,
        slug: 'architecture-bioclimatique',
        title: "L'architecture bioclimatique : Le secret de la fraîcheur sans clim",
        excerpt: "Comment nos villas utilisent l'orientation et les matériaux naturels pour réduire la température intérieure de 5°C.",
        image: "/images/blog/bioclimatic-house.jpg",
        category: "Architecture",
        date: "28 Jan 2026",
        readTime: "7 min"
    },
    {
        id: 3,
        slug: 'diamniadio-ville-du-futur',
        title: "Diamniadio : Faut-il parier sur la ville nouvelle ?",
        excerpt: "Avec le TER et les ministères, Diamniadio explose. Est-il trop tard pour acheter ? Notre avis d'expert.",
        image: "/images/blog/diamniadio.jpg",
        category: "Secteur",
        date: "15 Jan 2026",
        readTime: "4 min"
    },
    {
        id: 4,
        slug: 'couts-caches-construction',
        title: "Les 5 coûts cachés de la construction (et comment les éviter)",
        excerpt: "Mur de clôture, raccordement SENELEC, fosse septique... : ce que les autres promoteurs ne vous disent pas.",
        image: "/images/blog/construction-costs.jpg",
        category: "Conseil",
        date: "10 Jan 2026",
        readTime: "6 min"
    }
];

export default function BlogPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Le Journal ALTHÉA</h1>
                <p className={styles.subtitle}>
                    Analyses, tendances et conseils pour réussir votre projet immobilier au Sénégal.
                </p>
            </header>

            <div className={styles.grid}>
                {articles.map((article) => (
                    <Link href={`/blog/${article.slug}`} key={article.id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            {/* Placeholder for now */}
                            <div className={styles.placeholder} style={{ background: `hsl(${Math.random() * 360}, 15%, 85%)` }}>
                                Image
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.meta}>
                                <span className={styles.category}>{article.category}</span>
                                <span className={styles.readTime}>{article.readTime}</span>
                            </div>
                            <h2 className={styles.cardTitle}>{article.title}</h2>
                            <p className={styles.excerpt}>{article.excerpt}</p>
                            <span className={styles.readMore}>Lire l'article →</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className={styles.newsletter}>
                <h3>Ne manquez aucun article</h3>
                <p>Recevez notre sélection mensuelle directement dans votre boîte mail.</p>
                <div className={styles.inputGroup}>
                    <input type="email" placeholder="Votre email" />
                    <button>S'abonner</button>
                </div>
            </div>
        </div>
    );
}
