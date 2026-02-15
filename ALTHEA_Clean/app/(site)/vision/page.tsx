import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Notre Vision | ALTHÉA',
    description: 'Une architecture qui célèbre l\'Afrique d\'aujourd\'hui et de demain.',
};

export default function VisionPage() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: 'var(--color-bg-main)', paddingTop: '100px' }}>
                <div style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--color-gold)', letterSpacing: '0.2em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Philosophie</span>
                        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)', marginTop: '0.5rem', marginBottom: '2rem', fontWeight: 300 }}>
                            L'Héritage Réinventé
                        </h1>
                        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                            ALTHÉA n'est pas seulement un constructeur. C'est un mouvement vers une architecture qui respecte nos racines tout en embrassant l'innovation technologique et bioclimatique.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', margin: '6rem 0' }}>
                        <div style={{ padding: '2rem', background: 'var(--color-bg-alt)', borderRadius: '2px' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: '1rem', fontWeight: 400 }}>Identité</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                Chaque ligne tracée par nos architectes raconte une histoire. Celle d'une Afrique fière, sophistiquée et intemporelle.
                            </p>
                        </div>
                        <div style={{ padding: '2rem', background: 'var(--color-bg-alt)', borderRadius: '2px' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: '1rem', fontWeight: 400 }}>Durabilité</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                Utilisation de matériaux géo-sourcés (brique de terre compressée, pierre locale) et techniques passives pour une fraîcheur naturelle.
                            </p>
                        </div>
                        <div style={{ padding: '2rem', background: 'var(--color-bg-alt)', borderRadius: '2px' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: '1rem', fontWeight: 400 }}>Technologie</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                Un suivi digital rigoureux via notre application propriétaire, garantissant transparence totale et conformité absolu.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
