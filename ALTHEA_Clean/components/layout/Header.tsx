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

    const handleNavigate = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className={styles.contactInfo}>
                    <a href="tel:+221338000000" className={styles.phoneLink}>📞 +221 33 800 00 00</a>
                    <a href="mailto:contact@axiomia.com" className={styles.emailLink}>✉️ contact@axiomia.com</a>
                </div>
                <div className={styles.topLinks}>
                    <Link href="/#faq">FAQ</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>

            <div className={styles.mainHeader}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/images/axiomia-logo.png"
                        alt="AXIOMIA Logo"
                        width={480}
                        height={180}
                        className={styles.logoImage}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Accueil</Link>
                    <Link href="/methodologie" className={styles.navLink}>Méthode</Link>
                    <Link href="/tarifs" className={styles.navLink}>Nos Offres</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>

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
                <div className={styles.mobileLinks}>
                    <Link href="/" className={styles.mobileLink} onClick={handleNavigate}>Accueil</Link>
                    <Link href="/methodologie" className={styles.mobileLink} onClick={handleNavigate}>Méthode</Link>
                    <Link href="/tarifs" className={styles.mobileLink} onClick={handleNavigate}>Nos Offres</Link>
                    <Link href="/contact" className={styles.mobileLink} onClick={handleNavigate}>Contact</Link>
                    <div className={styles.mobileContact}>
                        <a href="tel:+221338000000">+221 33 800 00 00</a>
                    </div>
                </div>

                <div className={styles.mobileActions}>
                    {user ? (
                        <>
                            <Link href="/dashboard" className={styles.mobileLogin} onClick={handleNavigate}>
                                � MON ESPACE PROJET
                            </Link>
                            <button type="button" className={styles.mobileLogout} onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className={styles.mobileLogin} onClick={handleNavigate}>
                            🔒 CONNEXION
                        </Link>
                    )}
                </div>
            </div>
        </header >
    );
};

export default Header;
