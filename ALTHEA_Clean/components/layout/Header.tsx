'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import AuthContext
import styles from './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth(); // Get auth state

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className={styles.contactInfo}>
                    <a href="tel:+221338000000" className={styles.phoneLink}>📞 +221 33 800 00 00</a>
                    <a href="mailto:contact@althea.sn" className={styles.emailLink}>✉️ contact@althea.sn</a>
                </div>
                <div className={styles.topLinks}>
                    <Link href="/faq">FAQ</Link>
                    <Link href="/blog">Blog</Link>
                    {/* Optional: Add logout here or in menu */}
                </div>
            </div>

            <div className={styles.mainHeader}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/logo-new.png"
                        alt="ALTHÉA Logo"
                        width={480}
                        height={180}
                        className={styles.logoImage}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Accueil</Link>
                    <Link href="/models" className={styles.navLink}>Nos Collections</Link>
                    <Link href="#tarifs" className={styles.navLink}>Le Pack Tech</Link>
                    <Link href="/quartiers" className={styles.navLink}>Réalisations</Link>

                    {user ? (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Link href="/dashboard" className={styles.loginButton}>
                                <span style={{ marginRight: '8px' }}>👤</span>
                                {user.name ? user.name.split(' ')[0] : 'Mon Espace'}
                            </Link>
                            <button onClick={logout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>
                                (Déconnexion)
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className={styles.loginButton}>
                            <span style={{ marginRight: '8px' }}>🔒</span>
                            CONNEXION
                        </Link>
                    )}
                </nav>

                {/* Mobile Burger Icon */}
                <button className={styles.burger} onClick={toggleMenu} aria-label="Menu">
                    <span className={`${styles.burgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.burgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.burgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.menuOpen : ''}`}>
                <Link href="/" className={styles.mobileLink} onClick={toggleMenu}>Accueil</Link>
                <Link href="/models" className={styles.mobileLink} onClick={toggleMenu}>Nos Collections</Link>
                <Link href="#tarifs" className={styles.mobileLink} onClick={toggleMenu}>Le Pack Tech</Link>
                <Link href="/quartiers" className={styles.mobileLink} onClick={toggleMenu}>Réalisations</Link>
                <div className={styles.mobileContact}>
                    <a href="tel:+221338000000">+221 33 800 00 00</a>
                </div>
                <Link href="/login" className={styles.mobileLogin} onClick={toggleMenu}>
                    🔒 MON ESPACE PROJET
                </Link>
            </div>
        </header >
    );
};

export default Header;
