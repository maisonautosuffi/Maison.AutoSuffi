import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { models } from '@/data/models';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Generate Static Params for SSG (optional but good for performance)
export async function generateStaticParams() {
    return models.map((model) => ({
        slug: model.id,
    }));
}

export default function ModelDetailPage({ params }: { params: { slug: string } }) {
    const model = models.find((m) => m.id === params.slug);

    if (!model) {
        notFound();
    }

    return (
        <>
            {/* Header (Manually included since we are outside (site) layout for now, or to be safe) */}
            {/* Ideally we should wrap app/models in a layout, but for now this works matching the main site style */}
            <Header />

            <main style={{ minHeight: '100vh', background: 'var(--color-bg-main)' }}>
                {/* Hero / Header Image */}
                <div style={{ position: 'relative', height: '70vh', width: '100%', overflow: 'hidden' }}>
                    <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to top, rgba(28, 25, 23, 0.6), transparent)' /* Warm black gradient */
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '3rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        textAlign: 'center',
                        color: 'var(--color-bg-main)',
                        width: '90%',
                        maxWidth: '1200px'
                    }}>
                        <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.9 }}>Collection Signature 2026</span>
                        <h1 style={{ fontSize: '4rem', fontFamily: 'var(--font-serif)', margin: '0.5rem 0', fontWeight: 300 }}>{model.name}</h1>
                        <p style={{ fontSize: '1.4rem', fontWeight: 300, opacity: 0.9, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{model.subtitle}</p>
                    </div>
                </div>

                {/* Content Container */}
                <div style={{ maxWidth: '1100px', margin: '-5rem auto 0', position: 'relative', zIndex: 10, padding: '0 2rem' }}>

                    {/* Key Stats Card */}
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '2px',
                        padding: '3rem',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '2rem',
                        textAlign: 'center',
                        marginBottom: '4rem',
                        border: '1px solid rgba(0,0,0,0.02)'
                    }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Surface</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>{model.surface}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Chambres</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>{model.chambres}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Salles de Bain</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>{model.bains}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Prix Départ</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>{model.price}</div>
                        </div>
                    </div>

                    {/* Description & Features */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>L'Esprit {model.name}</h2>
                            <p style={{ lineHeight: 1.9, color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>
                                {model.desc}
                            </p>
                            <p style={{ marginTop: '1.5rem', lineHeight: 1.9, color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>
                                Une conception bioclimatique qui privilégie la ventilation naturelle et l'optimisation de la lumière, réduisant l'empreinte énergétique sans sacrifier le confort moderne.
                            </p>
                            <div style={{ marginTop: '3rem' }}>
                                <Link href="/contact" style={{
                                    display: 'inline-block',
                                    padding: '1.2rem 2.5rem',
                                    background: 'var(--color-bg-dark)',
                                    color: 'var(--color-bg-main)',
                                    textDecoration: 'none',
                                    borderRadius: '2px',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontSize: '0.9rem'
                                }}>
                                    Demander les Plans & Devis
                                </Link>
                            </div>
                        </div>

                        <div style={{ background: 'var(--color-bg-alt)', padding: '2.5rem', borderRadius: '2px' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Points Forts</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {model.features.map((feature, i) => (
                                    <li key={i} style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'var(--color-gold)' }}>━</span> {feature}
                                    </li>
                                ))}
                                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                                    <span style={{ color: 'var(--color-gold)' }}>━</span> Titre Foncier Inclus
                                </li>
                                <li style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                                    <span style={{ color: 'var(--color-gold)' }}>━</span> Garantie Décennale
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
