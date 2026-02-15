'use client';

import { useEffect, useState } from 'react';
import styles from '../Dashboard.module.css';

export default function SettingsPage() {
    const [user, setUser] = useState<{ name: string, projectType: string, budget: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('althea_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('althea_user');
        window.location.href = '/onboarding';
    };

    if (!user) return null;

    return (
        <div>
            <h1 className={styles.welcomeTitle}>Paramètres du Compte</h1>

            <div className={styles.card} style={{ maxWidth: '600px' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h3 className={styles.cardTitle}>Profil</h3>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-anthracite)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{user.name}</div>
                            <div style={{ color: '#666' }}>Client ALTHÉA</div>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 className={styles.cardTitle}>Détails du Projet</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Type de Projet</label>
                            <input type="text" value={user.projectType} readOnly style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #eee', background: '#f9f9f9' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Budget Estimé</label>
                            <input type="text" value={user.budget} readOnly style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #eee', background: '#f9f9f9' }} />
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                    <h3 className={styles.cardTitle} style={{ color: 'red' }}>Zone de Danger</h3>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            background: 'white',
                            border: '1px solid red',
                            color: 'red',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Se Déconnecter
                    </button>
                </div>
            </div>
        </div>
    );
}
