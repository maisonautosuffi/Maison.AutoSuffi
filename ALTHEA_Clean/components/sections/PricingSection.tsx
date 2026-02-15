'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConfig } from '@/context/ConfigContext';
import FinancingCalculator from '@/components/tools/FinancingCalculator';
import styles from './PricingSection.module.css';

const PricingSection = () => {
    const router = useRouter();
    const { startSimulation } = useConfig();
    const [showCalculator, setShowCalculator] = useState(false);
    const [selectedProjectCost, setSelectedProjectCost] = useState(0);

    const handleSimulate = (collection: 'Sable' | 'Cuivre' | 'Indigo', pricePerM2: number) => {
        const estimatedCost = 120 * pricePerM2; // Default 120m²
        setSelectedProjectCost(estimatedCost);
        setShowCalculator(true);
    };

    const handleContinueToChat = (collection: 'Sable' | 'Cuivre' | 'Indigo') => {
        startSimulation(collection);
        router.push('/contact-chat');
    };
    return (
        <section className={styles.section} id="tarifs">
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>L'INVESTISSEMENT MAÎTRISÉ</h2>
                    <p className={styles.subtitle}>"Des tarifs calculés au plus juste, basés sur la réalité technique et non la spéculation."</p>
                    <p className={styles.note}>
                        💡 Les tarifs ci-dessous s'appliquent à <strong>tous nos modèles architecturaux</strong> (Mandela, Sankara, Lumumba, Senghor, Cheikh Anta Diop, Nkrumah).
                        <br />Choisissez d'abord votre <strong>modèle architectural</strong>, puis sélectionnez votre <strong>niveau de finition</strong>.
                    </p>
                </div>

                {/* Socle Technologique */}
                <div className={styles.infraBlock}>
                    <div className={styles.infraHeader}>
                        <h3 className={styles.infraTitle}>PACK INFRASTRUCTURE "DIGITAL TWIN"</h3>
                        <span className={styles.infraRequired}>Obligatoire pour l'ouverture du chantier</span>
                    </div>
                    <div className={styles.infraGrid}>
                        <div className={styles.infraItem}>
                            <span>Installation Matérielle (Hardware)</span>
                            <strong>3 017 800 FCFA</strong>
                            <p>Kit Starlink Propriétaire, Caméra 4K, Mât Technique Acier, Setup Logiciel.</p>
                        </div>
                        <div className={styles.infraItem}>
                            <span>Service Mensuel (Live Connect)</span>
                            <strong>98 500 FCFA / mois</strong>
                            <p>Abonnement Data Satellite, Maintenance Solaire, Cloud Vidéo Sécurisé.</p>
                        </div>
                    </div>
                </div>

                {/* Collections */}
                <div className={styles.collectionsGrid}>
                    {/* SABLE */}
                    <div className={styles.collectionCard}>
                        <h3 className={styles.collectionTitle}>COLLECTION SABLE</h3>
                        <p className={styles.collectionConcept}>L'Essentiel aux normes DTU.</p>
                        <strong className={styles.collectionPrice}>655 900 FCFA <span>/ m²</span></strong>
                        <ul className={styles.featuresList}>
                            <li>Sols Grès Cérame</li>
                            <li>Alu Blanc</li>
                            <li>Kit Solaire Secours</li>
                        </ul>
                        <button onClick={() => handleSimulate('Sable', 655900)} className={styles.selectButton}>
                            Simuler ce modèle
                        </button>
                    </div>

                    {/* CUIVRE */}
                    <div className={`${styles.collectionCard} ${styles.recommended}`}>
                        <div className={styles.badge}>Choix Recommandé</div>
                        <h3 className={styles.collectionTitle}>COLLECTION CUIVRE</h3>
                        <p className={styles.collectionConcept}>Le standard Althéa.</p>
                        <strong className={styles.collectionPrice}>754 500 FCFA <span>/ m²</span></strong>
                        <ul className={styles.featuresList}>
                            <li>Béton Ciré</li>
                            <li>Cuisine Importée</li>
                            <li>Alu Noir Mat</li>
                            <li>Kit Solaire Confort</li>
                        </ul>
                        <button onClick={() => handleSimulate('Cuivre', 754500)} className={`${styles.selectButton} ${styles.selectButtonRec}`}>
                            Simuler ce modèle
                        </button>
                    </div>

                    {/* INDIGO */}
                    <div className={styles.collectionCard}>
                        <h3 className={styles.collectionTitle}>COLLECTION INDIGO</h3>
                        <p className={styles.collectionConcept}>L'Autonomie Totale.</p>
                        <strong className={styles.collectionPrice}>À partir de 918 400 FCFA <span>/ m²</span></strong>
                        <ul className={styles.featuresList}>
                            <li>Pierre Naturelle</li>
                            <li>Piscine</li>
                            <li>Full Off-Grid</li>
                            <li>Conciergerie</li>
                        </ul>
                        <button onClick={() => handleSimulate('Indigo', 918400)} className={styles.selectButton}>
                            Simuler ce modèle
                        </button>
                    </div>
                </div>

                {/* Simulator */}
                <div className={styles.simulator}>
                    <div className={styles.simHeader}>Exemple : Villa Familiale 120m² (Gamme Cuivre)</div>
                    <div className={styles.simRow}>
                        <span>Infrastructure Digital Twin :</span>
                        <span>3 017 800 FCFA</span>
                    </div>
                    <div className={styles.simRow}>
                        <span>Construction (120 x 754 500) :</span>
                        <span>90 540 000 FCFA</span>
                    </div>
                    <div className={styles.simRow}>
                        <span>Suivi Connecté (10 mois x 98 500) :</span>
                        <span>985 000 FCFA</span>
                    </div>
                    <div className={styles.simTotal}>
                        <span>TOTAL PROJET ESTIMÉ :</span>
                        <span>94 542 800 FCFA (Hors Foncier)</span>
                    </div>
                </div>
            </div>

            {showCalculator && (
                <FinancingCalculator
                    projectCost={selectedProjectCost}
                    onClose={() => setShowCalculator(false)}
                />
            )}
        </section>
    );
};

export default PricingSection;
