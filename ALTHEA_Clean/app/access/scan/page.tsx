'use client';

import { useState, Suspense } from 'react';
import styles from './Scan.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

function ScanContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Default to B04 (Mandela) if no param, for demo purposes logic, but ideally we scan it.
    // In a real QR code, the URL would be /access/scan?siteId=B04
    const urlSiteId = searchParams.get('siteId');
    const [targetSiteId, setTargetSiteId] = useState(urlSiteId || 'B04');

    const [step, setStep] = useState<'idle' | 'scanning' | 'locating' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const startScan = (siteIdOverride?: string) => {
        if (siteIdOverride) setTargetSiteId(siteIdOverride);

        setStep('scanning');
        // Simulate Camera Open / QR Read delay
        setTimeout(() => {
            setStep('locating');
            checkLocation();
        }, 1500);
    };

    const checkLocation = () => {
        if (!navigator.geolocation) {
            setErrorMsg("La géolocalisation n'est pas supportée par votre appareil.");
            setStep('error');
            return;
        }

        // Real geolocation request
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Mock verification of mock coordinates logic
                // In real app, we'd compare position.coords.latitude/longitude with Site DB
                console.log("Technician at:", position.coords);

                // Simulate processing
                setTimeout(() => {
                    setStep('success');
                    // Redirect after success to specific site
                    setTimeout(() => {
                        router.push(`/dashboard/engineer/${targetSiteId}`);
                    }, 1500);
                }, 1500);
            },
            (error) => {
                let msg = "Erreur de géolocalisation.";
                if (error.code === error.PERMISSION_DENIED) {
                    msg = "ACCÈS REFUSÉ : La géolocalisation est OBLIGATOIRE pour certifier votre présence sur chantier.";
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    msg = "Signal GPS introuvable. Sortez du bungalow.";
                }
                setErrorMsg(msg);
                setStep('error');
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return (
        <div className={styles.container}>
            {step === 'idle' && (
                <>
                    <div className={styles.scannerFrame}>
                        <span style={{ fontSize: '3rem' }}>📷</span>
                    </div>
                    <h1 className={styles.title}>Accès Technicien</h1>
                    <p className={styles.subtitle}>Scannez le QR Code du chantier pour déverrouiller le contrôle.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button className={styles.actionButton} onClick={() => startScan()}>
                            Scanner QR Code
                        </button>

                        {/* Demo Button for the User */}
                        <button
                            className={styles.actionButton}
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                            onClick={() => startScan('B04')}
                        >
                            ⚡ Simulation : Scan Villa Mandela (#B04)
                        </button>
                    </div>

                    <p style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.7 }}>
                        🔒 Géolocalisation active requise
                    </p>
                </>
            )}

            {step === 'scanning' && (
                <>
                    <div className={styles.scannerFrame}>
                        <div className={styles.scannerLine}></div>
                    </div>
                    <p className={styles.subtitle}>Lecture du QR Code...</p>
                </>
            )}

            {step === 'locating' && (
                <>
                    <div className={styles.radar}>
                        <span style={{ fontSize: '1.5rem' }}>📍</span>
                    </div>
                    <h2 style={{ marginTop: '1.5rem', fontWeight: 600 }}>Vérification Satellite</h2>
                    <p className={styles.subtitle}>Certification de votre présence sur le site...</p>
                </>
            )}

            {step === 'success' && (
                <>
                    <div className={styles.successBox}>
                        <h3>✅ Accès Autorisé</h3>
                        <p>Chantier identifié : #{targetSiteId}</p>
                        <p>Précision GPS : 3m</p>
                    </div>
                    <p style={{ marginTop: '1rem' }}>Chargement du plan de contrôle...</p>
                </>
            )}

            {step === 'error' && (
                <>
                    <div className={styles.errorBox}>
                        <h3>⛔ Accès Refusé</h3>
                        <p>{errorMsg}</p>
                    </div>
                    <button className={styles.actionButton} onClick={() => setStep('idle')} style={{ marginTop: '1.5rem', background: '#475569' }}>
                        Réessayer
                    </button>
                </>
            )}
        </div>
    );
}

export default function ScanPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ScanContent />
        </Suspense>
    );
}
