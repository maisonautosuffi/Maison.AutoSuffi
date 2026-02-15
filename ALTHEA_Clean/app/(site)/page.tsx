import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "ALTHÉA | Architecture d'Exception",
  description: "Villas signatures, construction durable et suivi digital. Une nouvelle ère pour l'immobilier en Afrique de l'Ouest.",
};

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <Image
            src="/hero-final.jpg"
            alt="Villa Signature Dakar | ALTHÉA - L'Art de Vivre"
            fill
            style={{
              objectFit: 'cover',
              animation: 'slowZoom 20s infinite alternate ease-in-out'
            }}
            priority
            quality={100}
          />

          {/* Cinematic Gradient Overlay: Darker at bottom for text readability, clearer at top */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)'
          }} />
          {/* Subtle warm tint overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(28, 25, 23, 0.1)', // Warm black tint
            mixBlendMode: 'multiply'
          }} />
        </div>

        {/* Content */}
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10, color: '#FAFAF9' }}>
          <p className="reveal-text" style={{
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontSize: '0.75rem',
            marginBottom: '1.5rem',
            opacity: 0.9,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Sénégal & Cameroun
          </p>
          <h1 className="reveal-text reveal-delay-1" style={{
            maxWidth: '900px',
            margin: '0 auto',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', // Significantly reduced max size
            color: '#FAFAF9',
            lineHeight: 1.1,
            fontWeight: 300,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            L'Art de Vivre <br />
            <span style={{
              fontStyle: 'italic',
              fontFamily: 'var(--font-serif)',
              fontWeight: 400
            }}>Réinventé</span>
          </h1>
          <div className="reveal-text reveal-delay-2" style={{ marginTop: '2.5rem' }}>
            <Link href="/models" className="btn-primary" style={{
              backgroundColor: 'rgba(250, 250, 249, 0.05)',
              backdropFilter: 'blur(5px)',
              borderColor: '#FAFAF9',
              color: '#FAFAF9',
              fontSize: '0.85rem',
              padding: '1.2rem 3rem',
              letterSpacing: '0.2em' // Match the wide feel
            }}>
              Découvrir nos Collections
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="reveal-text reveal-delay-3" style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', color: '#FAFAF9', opacity: 0.8 }}>
          <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Explorer</span>
          <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40%', background: '#fff', animation: 'scrollDown 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite' }} />
          </div>
        </div>
      </section>

      {/* INTRO / VISION SECTION */}
      <section style={{ padding: '8rem 0', background: 'var(--color-bg-main)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <div>
              <h2 className="reveal-text" style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--color-text-primary)' }}>Vision <br /> Architecturale</h2>
              <p className="reveal-text reveal-delay-1" style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.8 }}>
                ALTHÉA fusionne l'héritage culturel africain avec les standards les plus exigeants de la construction moderne.
                Chaque villa est une œuvre conçue pour traverser le temps, minimiser son empreinte et maximiser votre confort.
              </p>
              <Link href="/vision" style={{ textDecoration: 'underline', textUnderlineOffset: '6px', color: 'var(--color-gold)' }}>
                Notre Philosophie &rarr;
              </Link>
            </div>
            <div style={{ position: 'relative', height: '600px', borderRadius: '2px', overflow: 'hidden' }}>
              <Image
                src="/models/mandela.png" // Placeholder
                alt="Vision Info"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED MODELS PREVIEW */}
      <section style={{ padding: '10rem 0', background: 'var(--color-bg-alt)' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem' }}>Collection Signature</span>
          <h2 style={{ fontSize: '3.5rem', marginTop: '1.5rem', color: 'var(--color-text-primary)' }}>Nos Modèles</h2>
        </div>

        {/* Simple Horizontal Scroll or Grid */}
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '3rem' }}>
            {/* Item 1 */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'relative', height: '500px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <Image src="/models/lumumba.png" alt="Lumumba" fill style={{ objectFit: 'cover', transition: 'transform 0.6s' }} />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Lumumba</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>400 m² • 6 Chambres</p>
            </div>
            {/* Item 2 */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'relative', height: '500px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <Image src="/models/sankara.png" alt="Sankara" fill style={{ objectFit: 'cover', transition: 'transform 0.6s' }} />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Sankara</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>320 m² • 5 Chambres</p>
            </div>
            {/* Item 3 */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'relative', height: '500px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <Image src="/models/mandela.png" alt="Mandela" fill style={{ objectFit: 'cover', transition: 'transform 0.6s' }} />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Mandela</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>250 m² • 4 Chambres</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '6rem' }}>
            <Link href="/models" className="btn-premium-link">
              VOIR TOUTE LA COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER (Temporary manual inclusion if layout doesn't cover) */}
    </>
  );
}
