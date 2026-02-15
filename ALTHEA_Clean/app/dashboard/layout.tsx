'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { info } = useToast();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    // Intelligent Behavior: Auto-collapse on immersive pages
    useEffect(() => {
        const isImmersive = pathname.includes('/scan') || pathname.match(/\/engineer\/[a-zA-Z0-9]+/);
        if (isImmersive) {
            setIsCollapsed(true);
        }
    }, [pathname]);

    return (
        <div className={styles.container}>
            {/* Mobile Overlay */}
            <div
                className={`${styles.overlay} ${isSidebarOpen ? styles.visible : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.mobileOpen : ''} ${isCollapsed ? styles.collapsed : ''}`}>
                <button className={styles.toggleBtn} onClick={toggleCollapse}>
                    {isCollapsed ? '›' : '‹'}
                </button>

                <div className={styles.logoContainer}>
                    <Link href="/">
                        <Image src="/logo-new.png" alt="ALTHÉA" width={250} height={100} className={styles.logo} style={{ objectFit: 'contain' }} />
                        <span className={styles.smallLogo}>A.</span>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <Link href="/dashboard" className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                        <span className={styles.icon}>📊</span> <span>Vue d'ensemble</span>
                    </Link>
                    <Link href="/dashboard/timeline" className={`${styles.navLink} ${pathname === '/dashboard/timeline' ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                        <span className={styles.icon}>📅</span> <span>Planning & Suivi</span>
                    </Link>
                    <Link href="/dashboard/documents" className={`${styles.navLink} ${pathname === '/dashboard/documents' ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                        <span className={styles.icon}>📂</span> <span>Documents</span>
                    </Link>
                    <Link href="/dashboard/photos" className={`${styles.navLink} ${pathname === '/dashboard/photos' ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                        <span className={styles.icon}>📷</span> <span>Photos Chantier</span>
                    </Link>
                    <Link href="/dashboard/studio" className={`${styles.navLink} ${pathname === '/dashboard/studio' ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                        <span className={styles.icon}>✨</span> <span>Studio IA</span>
                    </Link>
                    <Link href="/dashboard/financial" className={`${styles.navLink} ${pathname === '/dashboard/financial' ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                        <span className={styles.icon}>💰</span> <span>Finances</span>
                    </Link>
                    <Link href="/dashboard/engineer" className={`${styles.navLink} ${pathname === '/dashboard/engineer' ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                        <span className={styles.icon}>👷</span> <span>Ingénieur</span>
                    </Link>
                    <Link href="/dashboard/admin" className={`${styles.navLink} ${pathname === '/dashboard/admin' ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
                        <span className={styles.icon}>⚙️</span> <span>Admin</span>
                    </Link>
                </nav>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>JD</div>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>Jean Dupont</p>
                        <p className={styles.projectRef}>Villa Sankara #A12</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`${styles.main} ${isCollapsed ? styles.expanded : ''}`}>
                <header className={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className={styles.menuToggle} onClick={toggleSidebar}>
                            ☰
                        </button>
                        <h1 className={styles.pageTitle}>
                            {pathname === '/dashboard' ? "Vue d'ensemble" :
                                pathname.includes('timeline') ? "Planning de construction" :
                                    pathname.includes('documents') ? "Mes Documents" :
                                        pathname.includes('photos') ? "Galerie Photos" :
                                            pathname.includes('financial') ? "Suivi Financier" :
                                                pathname.includes('studio') ? "Studio Architecture" :
                                                    pathname.includes('engineer') ? "Contrôle Technique" :
                                                        pathname.includes('admin') ? "Administration" : "Mon Espace"}
                        </h1>
                    </div>
                    <button className={styles.notifButton} onClick={() => info("Vous n'avez pas de nouvelles notifications", "Notifications")}>
                        🔔
                    </button>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
