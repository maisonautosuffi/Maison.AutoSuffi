'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Article.module.css';

// Mock data - in a real app this would come from a CMS or DB
const articles = {
    'pourquoi-investir-maintenant': {
        title: "Pourquoi 2026 est l'année idéale pour investir au Sénégal ?",
        date: "05 Fév 2026",
        category: "Investissement",
        readTime: "5 min",
        content: `
            <p>Le Sénégal connaît une transformation économique sans précédent. Avec la mise en exploitation des gisements de pétrole et de gaz, le pays entre dans une nouvelle ère de prospérité...</p>
            <h3>Une stabilité politique rassurante</h3>
            <p>Contrairement à ses voisins, le Sénégal demeure un îlot de stabilité en Afrique de l'Ouest, attirant massivement les investisseurs internationaux.</p>
            <h3>L'émergence d'une classe moyenne</h3>
            <p>La demande en logements de qualité explose. Les villas modernes, sécurisées et écologiques comme celles d'ALTHÉA répondent parfaitement à cette nouvelle exigence.</p>
        `
    },
    'architecture-bioclimatique': {
        title: "L'architecture bioclimatique : Le secret de la fraîcheur sans clim",
        date: "28 Jan 2026",
        category: "Architecture",
        readTime: "7 min",
        content: `
            <p>Vivre au Sénégal sans climatisation ? C'est possible grâce à l'architecture bioclimatique. Chez ALTHÉA, nous concevons nos villas pour qu'elles respirent.</p>
            <h3>L'orientation : la clé de tout</h3>
            <p>En orientant les façades principales nord-sud, nous limitons l'exposition directe au soleil tout en favorisant la ventilation naturelle traversante.</p>
        `
    }
    // Add other articles similarly...
};

export default function ArticlePage() {
    const params = useParams();
    const slug = params.slug as string;
    const article = articles[slug as keyof typeof articles];

    if (!article) {
        return <div className={styles.container}>Article non trouvé.</div>;
    }

    return (
        <article className={styles.article}>
            <div className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className={styles.heroContent}>
                    <span className={styles.category}>{article.category}</span>
                    <h1 className={styles.title}>{article.title}</h1>
                    <div className={styles.meta}>
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime} de lecture</span>
                    </div>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />

                <div className={styles.share}>
                    <h3>Partager cet article</h3>
                    <div className={styles.socials}>
                        <button>Facebook</button>
                        <button>LinkedIn</button>
                        <button>WhatsApp</button>
                    </div>
                </div>

                <div className={styles.navigation}>
                    <Link href="/blog" className={styles.backLink}>← Retour au journal</Link>
                </div>
            </div>
        </article>
    );
}
