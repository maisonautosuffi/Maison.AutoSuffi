'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
    const router = useRouter();
    const { success, error } = useToast();
    const [role, setRole] = useState<'client' | 'engineer' | 'technician' | 'admin'>('client');
    const [credentials, setCredentials] = useState({ id: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClose = () => {
        if (!mounted) return;

        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
            return;
        }

        router.push('/');
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const email = credentials.id.trim();
            const password = credentials.password;

            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                error(signInError.message, 'Erreur');
                return;
            }

            success(`Bienvenue sur votre Espace ${role.toUpperCase()}`, 'Connexion Réussie');
            router.push('/dashboard');
            router.refresh();
        } catch (e) {
            error('Identifiants incorrects', 'Erreur');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1c1917', // Warm Black
            fontFamily: "'Montserrat', sans-serif",
            overflow: 'hidden'
        }}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
                
                * { box-sizing: border-box; } /* CRITICAL FIX */

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `}</style>

            <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                padding: '2.5rem 2rem',
                borderRadius: '12px', /* More squared/premium */
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3)', /* Deeper shadow */
                position: 'relative'
            }} className="animate-slide-up">

                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Retour à l'accueil"
                    style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '999px',
                        border: '1px solid #E5E5E0',
                        background: '#FAFAF6',
                        color: '#1c1917',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        lineHeight: 1,
                    }}
                >
                    ×
                </button>

                {/* Logo Section */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Image
                        src="/logo-new.png"
                        alt="ALTHÉA"
                        width={240}
                        height={80}
                        style={{
                            objectFit: 'contain',
                            display: 'block',
                            margin: '0 auto 1.5rem auto',
                            height: 'auto'
                        }}
                    />
                    <h1 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.8rem',
                        color: '#1c1917',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.02em',
                        fontWeight: 300
                    }} className="animate-slide-up delay-100">
                        Espace Privé
                    </h1>
                    <p style={{ color: '#57534e', fontSize: '0.85rem', fontWeight: 300, fontStyle: 'italic' }} className="animate-slide-up delay-100">
                        Veuillez vous identifier
                    </p>
                </div>

                {/* Role Switcher */}
                <div style={{
                    display: 'flex',
                    background: '#FAFAF6',
                    padding: '4px',
                    borderRadius: '4px',
                    marginBottom: '1.5rem',
                    border: '1px solid #E5E5E0'
                }} className="animate-slide-up delay-200">
                    {(['client', 'technician', 'engineer', 'admin'] as const).map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            style={{
                                flex: 1,
                                padding: '0.5rem',
                                border: 'none',
                                background: role === r ? 'white' : 'transparent',
                                color: role === r ? '#1c1917' : '#78716c',
                                fontWeight: role === r ? 500 : 400,
                                borderRadius: '2px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: role === r ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                                textTransform: 'capitalize',
                                fontSize: '0.8rem',
                                fontFamily: "'Montserrat', sans-serif"
                            }}
                        >
                            {r === 'technician' ? 'Tech' : r === 'engineer' ? 'Ingé' : r}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }} className="animate-slide-up delay-300">
                    <div>
                        <input
                            type="text"
                            required
                            placeholder={role === 'client' ? 'Identifiant Client' : 'Identifiant Collaborateur'}
                            value={credentials.id}
                            onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                borderRadius: '2px',
                                border: '1px solid #E5E5E0',
                                borderBottom: '1px solid #d6d3d1',
                                fontSize: '0.9rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                                background: '#FAFAF6',
                                fontFamily: "'Montserrat', sans-serif",
                                color: '#1c1917'
                            }}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            required
                            placeholder="Mot de passe"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                borderRadius: '2px',
                                border: '1px solid #E5E5E0',
                                borderBottom: '1px solid #d6d3d1',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#FAFAF6',
                                fontFamily: "'Montserrat', sans-serif",
                                color: '#1c1917'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#57534e', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ accentColor: '#1c1917', width: '14px', height: '14px' }} />
                            Rester connecté
                        </label>
                        <a href="#" style={{ color: '#1c1917', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid #e7e5e4' }}>Oublié ?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            background: '#1c1917', /* Warm Black */
                            color: '#F5F5F0', /* Off white text */
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '2px',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.8 : 1,
                            marginTop: '0.5rem',
                            transition: 'all 0.2s',
                            textTransform: 'uppercase',
                            fontFamily: "'Montserrat', sans-serif"
                        }}
                    >
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.65rem', color: '#cbd5e1', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Secured by ALTHÉA Access
                </div>
            </div>
        </div>
    );
}
