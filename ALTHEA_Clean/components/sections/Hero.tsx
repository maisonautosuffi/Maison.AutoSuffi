'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import ScrollReveal from '../ui/ScrollReveal';

const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate normalized position (-1 to 1)
            const x = (clientX / innerWidth) * 2 - 1;
            const y = (clientY / innerHeight) * 2 - 1;

            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className={styles.hero} ref={heroRef}>
            {/* Parallax Background */}
            <div
                className={styles.videoBackground}
                style={{
                    transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(1.1)` // Subtle movement
                }}
            >
                {/* Simulated Video Placeholder with Gradient */}
            </div>

            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <ScrollReveal direction="up" delay={0.2} blur={true}>
                    <h1 className={styles.title}>
                        <span className="text-gradient">L'Harmonie</span> entre<br />
                        Terre et Lumière.
                    </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.4} blur={true}>
                    <div className="glass-card" style={{ padding: '2rem', display: 'inline-block', marginBottom: '2rem' }}>
                        <p className={styles.subtitle} style={{ margin: 0 }}>
                            Une architecture solaire et durable,<br />
                            inspirée par les grands espaces africains.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.6} scale={true}>
                    <div className={styles.ctaGroup}>
                        <Link href="/models" className={`${styles.primaryButton} magnetic-button`}>
                            Découvrir nos Modèles
                        </Link>
                        <Link href="/dashboard?demo=true" className={styles.secondaryButton}>
                            Visiter la Plateforme My Althéa
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Hero;
