import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Contact | ALTHÉA',
    description: 'Discutons de votre projet de construction au Sénégal ou au Cameroun.',
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: 'var(--color-bg-main)', paddingTop: '100px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--color-gold)', letterSpacing: '0.2em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Démarrer votre projet</span>
                        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)', marginTop: '0.5rem', fontWeight: 300 }}>
                            Contactez-nous
                        </h1>
                    </div>

                    <form style={{ display: 'grid', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nom Complet</label>
                            <input type="text" style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--color-bg-alt)',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '2px',
                                fontSize: '1rem',
                                color: 'var(--color-text-primary)',
                                outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                            <input type="email" style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--color-bg-alt)',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '2px',
                                fontSize: '1rem',
                                color: 'var(--color-text-primary)',
                                outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Votre Message</label>
                            <textarea rows={5} style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--color-bg-alt)',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '2px',
                                fontSize: '1rem',
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-sans)',
                                outline: 'none'
                            }} />
                        </div>
                        <button type="submit" style={{
                            padding: '1.2rem',
                            background: 'var(--color-bg-dark)',
                            color: 'var(--color-bg-main)',
                            border: '1px solid var(--color-bg-dark)',
                            borderRadius: '2px',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'all 0.3s ease'
                        }}>
                            Envoyer
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
