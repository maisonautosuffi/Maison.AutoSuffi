'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';
import styles from './Studio.module.css';

export default function StudioPage() {
    const [prompt, setPrompt] = useState('');
    const [email, setEmail] = useState(''); // NEW: Email for lead capture
    const [isPackMode, setIsPackMode] = useState(true); // Default to pack mode
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { success, error: toastError, info } = useToast();

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (prompt.length < 10) {
            toastError("Veuillez décrire votre vision (min. 10 caractères) pour lancer l'IA.", "Prompt trop court");
            return;
        }

        setIsLoading(true);
        setError(null);
        setImageUrls([]);

        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    email, // Send email to API
                    mode: isPackMode ? 'pack' : 'single'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = data.error || 'Une erreur est survenue';
                if (data.details?.message) errorMessage += `: ${data.details.message}`;
                throw new Error(errorMessage);
            }

            if (data.data && Array.isArray(data.data)) {
                setImageUrls(data.data);
                success("Génération terminée avec succès !", "Architecture IA");
            } else {
                throw new Error('Format de réponse inattendu');
            }

        } catch (err) {
            console.error('Generation request failed:', err);
            const msg = err instanceof Error ? err.message : 'Impossible de générer les images';
            setError(msg);
            toastError(msg, "Erreur de génération");
        } finally {
            setIsLoading(false);
        }
    };

    const handleModeSwitch = (mode: boolean) => {
        setIsPackMode(mode);
        if (mode) {
            success("Pack Tech activé : Façades + Jardin + Plan", "Mode Complet");
        } else {
            info("Mode Simple activé : Vue unique", "Mode Rapide"); // Assuming info exists, or use success
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Althéa Studio</h1>
                <p className={styles.subtitle}>
                    Imaginez votre future villa en temps réel. Décrivez votre vision,
                    et laissez notre IA architecturale la matérialiser.
                </p>
            </header>

            <div className={styles.studioGrid}>
                {/* Controls Panel */}
                <div className={styles.controlsPanel}>
                    <form onSubmit={handleGenerate}>
                        {/* Contact Info - NEW */}
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Votre Email (pour sauvegarder le projet)</label>
                            <input
                                type="email"
                                id="email"
                                className={styles.input} // Ensure this style exists or reuse textarea style logic
                                placeholder="exemple@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white',
                                    marginBottom: '1rem'
                                }}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="prompt" className={styles.label}>Votre Vision</label>
                            <textarea
                                id="prompt"
                                className={styles.textarea}
                                placeholder="Ex: Villa moderne en bord de mer, grandes baies vitrées..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Mode de Génération</label>
                            <div className={styles.modeSelection}>
                                <div
                                    className={`${styles.modeCard} ${!isPackMode ? styles.active : ''}`}
                                    onClick={() => handleModeSwitch(false)}
                                >
                                    <span className={styles.modeIcon}>🖼️</span>
                                    <span className={styles.modeTitle}>Simple</span>
                                    <span className={styles.modeDesc}>Une seule vue extérieure rapide.</span>
                                </div>
                                <div
                                    className={`${styles.modeCard} ${isPackMode ? styles.active : ''}`}
                                    onClick={() => handleModeSwitch(true)}
                                >
                                    <div className={styles.recommendedBadge}>Recommandé</div>
                                    <span className={styles.modeIcon}>📦</span>
                                    <span className={styles.modeTitle}>Pack Tech</span>
                                    <span className={styles.modeDesc}>Extérieur + Jardin + Plan Masse.</span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={styles.generateButton}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span>Création en cours...</span>
                            ) : (
                                <>
                                    <span>Générer le concept</span>
                                    <span>✨</span>
                                </>
                            )}
                        </button>
                    </form>

                    {error && (
                        <div className={styles.error}>
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Preview Panel */}
                <div className={styles.previewPanel}>
                    {isLoading && (
                        <div className={styles.loadingOverlay}>
                            <div className={styles.spinner}></div>

                            {/* NEW: Progress Steps Animation */}
                            <div className={styles.progressContainer}>
                                <div className={styles.progressSteps}>
                                    <span className={styles.step}>Analyse Architecturale...</span>
                                    <span className={styles.step}>Façade Avant...</span>
                                    <span className={styles.step}>Façade Arrière...</span>
                                    <span className={styles.step}>Jardin & Piscine...</span>
                                </div>
                                <div className={styles.progressBarWrapper}>
                                    <div className={styles.progressBarFill}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {imageUrls.length > 0 ? (
                        <div className={imageUrls.length > 1 ? styles.resultsGrid : styles.resultContainer}>
                            {imageUrls.map((url, idx) => (
                                <div key={idx} className={styles.imageCard}>
                                    <img
                                        src={url}
                                        alt={`Rendu ${idx + 1}`}
                                        className={styles.resultImage}
                                    />
                                    {isPackMode && (
                                        <span className={styles.imageLabel}>
                                            {idx === 0 ? "Façade Avant (Rue)" : idx === 1 ? "Façade Arrière (Vie)" : "Jardin & Piscine"}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.placeholder}>
                            <span className={styles.placeholderIcon}>🏛️</span>
                            <p>Les visuels apparaîtront ici</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
