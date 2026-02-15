'use client';

import Link from 'next/link';
import { useConfig } from '@/context/ConfigContext';
import { useRouter } from 'next/navigation';
import styles from './StickyBottomNav.module.css';

const StickyBottomNav = () => {
    const { startSimulation } = useConfig();
    const router = useRouter();

    const handleSimulate = () => {
        startSimulation('Cuivre'); // Default to Cuivre/Rec
        router.push('/contact-chat');
    };
    return (
        <div className={styles.container}>
            <a href="https://wa.me/221000000000" className={styles.whatsappButton}>
                WhatsApp Direct
            </a>
            <button onClick={handleSimulate} className={styles.simulateButton}>
                Simuler mon Projet
            </button>
        </div>
    );
};

export default StickyBottomNav;
