import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ModelsSection from '@/components/sections/ModelsSection';

export const metadata: Metadata = {
    title: 'Nos Collections | ALTHÉA',
    description: 'Découvrez nos modèles de villas signature : Mandela, Sankara, Lumumba. Architecture bioclimatique et design premium.',
};

export default function ModelsPage() {
    return (
        <>
            <main style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--color-bg-main)' }}>
                <div style={{ textAlign: 'center', padding: '6rem 2rem 0' }}>
                    <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)', marginBottom: '1rem', fontWeight: 300 }}>
                        Notre Collection Signature
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Chaque villa ALTHÉA est une œuvre d'art habitable, conçue pour traverser le temps et magnifier votre art de vivre.
                    </p>
                </div>

                {/* Reusing the Section Component */}
                <ModelsSection />

                <div style={{ textAlign: 'center', padding: '6rem 4rem', background: 'var(--color-bg-alt)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>Vous avez un projet sur-mesure ?</h2>
                    <p style={{ marginBottom: '2.5rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        Nos architectes partenaires (BIM) peuvent adapter nos modèles à votre terrain spécifique.
                    </p>
                    <a href="/contact" style={{
                        display: 'inline-block',
                        padding: '1.2rem 2.5rem',
                        background: 'var(--color-bg-dark)',
                        color: 'var(--color-bg-main)',
                        borderRadius: '2px',
                        fontWeight: 500,
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.9rem'
                    }}>
                        Discuter avec un architecte
                    </a>
                </div>
            </main>
        </>
    );
}
