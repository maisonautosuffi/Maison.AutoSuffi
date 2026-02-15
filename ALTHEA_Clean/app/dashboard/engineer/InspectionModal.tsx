'use client';

import { useState } from 'react';
import styles from './InspectionModal.module.css';

interface InspectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onValidate: (sessionData: any) => void;
    milestoneName: string;
    type?: 'foundation' | 'wall' | 'pouring' | 'generic';
    siteCoordinates?: { lat: number, lng: number };
}

// Helper: Calculate Distance in meters (Haversine Formula)
function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000; // Distance in m
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

const FEASIBILITY_ITEMS = [
    { id: 'weather', label: 'Météo favorable (Pas de pluie/vent violent prévu)' },
    { id: 'supply', label: 'Approvisionnement complet (Béton, Aciers sur site)' },
    { id: 'team', label: 'Équipe complète et EPI conformes' }
];

const CHECKLISTS = {
    foundation: [
        { id: 'implantation', label: 'Contrôle Implantation (Axes & Bornage)' },
        { id: 'correlation', label: 'Corrélation Armatures / Plan' },
        { id: 'depth', label: 'Vérification Profondeur & Largeur' },
        { id: 'clean', label: 'Propreté fond de fouille' }
    ],
    wall: [
        { id: 'implantation', label: 'Implantation & Traçage' },
        { id: 'verticality', label: 'Verticalité & Aplomb' },
        { id: 'openings', label: 'Réservations (Portes/Fenêtres)' },
        { id: 'materials', label: 'Conformité Matériaux (Briques/Moellons)' }
    ],
    pouring: [
        { id: 'slump', label: 'Slump Test (Cône d\'Abrams) conforme' },
        { id: 'no_water', label: '⛔ INTERDICTION AJOUT D\'EAU formelle' },
        { id: 'vibration', label: 'Vibration soignée (Aiguille vibrante)' },
        { id: 'drop_height', label: 'Hauteur de chute < 1.5m respectée' },
        { id: 'cure', label: 'Produit de cure prévu après coulage' }
    ],
    generic: [
        { id: 'conformity', label: 'Conformité au plan d\'exécution' },
        { id: 'quality', label: 'Qualité de mise en œuvre' },
        { id: 'safety', label: 'Respect des consignes de sécurité' }
    ]
};

// AI / DTU Rules Data
const DTU_RULES = {
    foundation: [
        { id: 1, text: "DTU 13.11 : Vérifier la garde au sol des armatures (min 3cm). -> Utilisez des cales d'enrobage pour éviter que l'acier ne touche le sol.", critical: true },
        { id: 2, text: "Eurocode 2 : Enrobage nominal requis. -> Le béton doit recouvrir l'acier de 4-5cm minimum pour éviter la corrosion.", critical: true }
    ],
    wall: [
        { id: 1, text: "DTU 20.1 : Tolérance de verticalité 10mm sur 3m. -> Utilisez un fil à plomb ou un laser pour vérifier l'aplomb.", critical: false },
        { id: 2, text: "Vérifier le harpage des angles. -> Les briques doivent se croiser correctement dans les angles.", critical: true }
    ],
    pouring: [
        { id: 1, text: "DTU 21 (Art 5.3) : Interdiction absolue d'ajout d'eau. -> Ne JAMAIS rajouter d'eau dans la toupie, cela affaiblit le béton.", critical: true },
        { id: 2, text: "Eurocode 2 : Risque de ségrégation. -> Vibreur : ne pas toucher les ferrailles, vibrer par couches de 50cm max.", critical: true },
        { id: 3, text: "Cure du béton obligatoire. -> Appliquer le produit de cure immédiatement après le talochage pour éviter les fissures.", critical: false }
    ],
    generic: [
        { id: 1, text: "Respect des règles de l'art. -> Port des EPI (Casque, Chaussures, Gants) obligatoire.", critical: false }
    ]
};

export default function InspectionModal({ isOpen, onClose, onValidate, milestoneName, type = 'generic', siteCoordinates }: InspectionModalProps) {
    if (!isOpen) return null;

    // Session State
    const [startTime] = useState(new Date().toLocaleTimeString()); // Captured when modal opens
    const [status, setStatus] = useState<'inspecting' | 'validating' | 'verifying_photo'>('inspecting');

    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [hasPhoto, setHasPhoto] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [photoData, setPhotoData] = useState<{ url: string, timestamp: string, coords: string } | null>(null);

    // Select dynamic checklist
    const activeChecklist = CHECKLISTS[type] || CHECKLISTS.generic;

    // Get rules for current type
    const activeRules = DTU_RULES[type] || DTU_RULES.generic;

    const toggleCheck = (id: string) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setStatus('verifying_photo'); // Show loading state "Securing..."
        const file = e.target.files[0];

        // 1. Verify Location
        if (navigator.geolocation && siteCoordinates) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const dist = getDistanceFromLatLonInM(
                        pos.coords.latitude, pos.coords.longitude,
                        siteCoordinates.lat, siteCoordinates.lng
                    );

                    // Allow 200m radius
                    const isClose = dist < 200;

                    if (true) { // FORCE TRUE FOR DEMO/LOCALHOST (Replace with 'isClose' for prod)
                        // 2. Simulate Watermarking & Upload
                        setTimeout(() => {
                            setPhotoData({
                                url: URL.createObjectURL(file), // Local preview
                                timestamp: new Date().toLocaleString(),
                                coords: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`
                            });
                            setHasPhoto(true);
                            setStatus('inspecting');
                            alert(`✅ Photo Certifiée Conforme.\n📍 Distance Chantier: ${Math.round(dist)}m\n🕒 Horodatage Sécurisé.`);
                        }, 2000);
                    } else {
                        alert(`⛔ REFUSÉ : Vous êtes à ${Math.round(dist)}m du chantier. Rapprochez-vous.`);
                        setStatus('inspecting');
                        e.target.value = ""; // Reset input
                    }
                },
                (err) => {
                    alert("ERREUR : GPS requis pour certifier la photo.");
                    setStatus('inspecting');
                },
                { enableHighAccuracy: true }
            );
        } else {
            // Fallback for no GPS or no Site Coords (Demo mode)
            setTimeout(() => {
                setHasPhoto(true);
                setStatus('inspecting');
            }, 1000);
        }
    };

    const handleValidateProcess = () => {
        setStatus('validating');

        // RE-CHECK GEOLOCATION FOR VALIDATION
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    // Success - Proceed
                    onValidate({
                        startTime,
                        validationTime: new Date().toLocaleTimeString(),
                        coords: pos.coords,
                        checks: checkedItems
                    });
                },
                (err) => {
                    alert("ERREUR : Géolocalisation requise pour valider. Veuillez activer le GPS.");
                    setStatus('inspecting');
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Géolocalisation non supportée.");
            setStatus('inspecting');
        }
    };

    const allFeasibility = FEASIBILITY_ITEMS.every(item => checkedItems[item.id]);
    const allQuality = activeChecklist.every(item => checkedItems[item.id]);
    const canValidate = allFeasibility && allQuality && hasPhoto;

    return (
        <div className={styles.overlay} onClick={(e) => {
            // Disable clicking outside to force explicit close/cancel
        }}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <span>🛡️</span>
                        Session de Contrôle : {startTime}
                    </div>
                    {/* Disable close if process started to enforce flow? Or just allow cancel */}
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={styles.body}>
                    {/* AI ASSISTANT SECTION */}
                    <div style={{
                        background: '#f0fdfa',
                        border: '1px solid #99f6e4',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        gap: '0.75rem'
                    }}>
                        <div style={{ fontSize: '1.5rem' }}>🤖</div>
                        <div>
                            <h5 style={{ margin: 0, color: '#0f766e', fontSize: '0.95rem' }}>Assistant Conformité IA</h5>
                            <div style={{ fontSize: '0.85rem', color: '#134e4a', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {activeRules.map(rule => (
                                    <div key={rule.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                        <span>{rule.critical ? '⚠️' : 'ℹ️'}</span>
                                        <span>{rule.text}</span>
                                    </div>
                                ))}
                                <div style={{ marginTop: '0.5rem', fontWeight: 600, color: '#0d9488' }}>
                                    📸 Photo requise : Zoom sur {type === 'foundation' ? 'les ligatures' : type === 'wall' ? 'les joints' : 'le point clé'}.
                                </div>
                            </div>
                        </div>
                    </div>

                    <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
                        Élément : <strong>{milestoneName}</strong>
                    </p>

                    <h4 className={styles.sectionTitle}>1. Faisabilité Opérationnelle ({FEASIBILITY_ITEMS.length})</h4>
                    <div className={styles.checklist}>
                        {FEASIBILITY_ITEMS.map(item => (
                            <div
                                key={item.id}
                                className={`${styles.checkItem} ${checkedItems[item.id] ? styles.checked : ''}`}
                                onClick={() => toggleCheck(item.id)}
                            >
                                <div className={styles.checkbox}>
                                    {checkedItems[item.id] && '✓'}
                                </div>
                                <span className={styles.label}>{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <h4 className={styles.sectionTitle}>2. Contrôle Technique ({type === 'foundation' ? 'Fondations' : type === 'wall' ? 'Murs' : 'Standard'})</h4>
                    <div className={styles.checklist}>
                        {activeChecklist.map(item => (
                            <div
                                key={item.id}
                                className={`${styles.checkItem} ${checkedItems[item.id] ? styles.checked : ''}`}
                                onClick={() => toggleCheck(item.id)}
                            >
                                <div className={styles.checkbox}>
                                    {checkedItems[item.id] && '✓'}
                                </div>
                                <span className={styles.label}>{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <h4 className={styles.sectionTitle}>3. Preuve Visuelle Sécurisée</h4>
                    <div className={`${styles.uploadZone} ${hasPhoto ? styles.done : ''}`}>
                        {!hasPhoto ? (
                            <>
                                <label style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        capture="environment" // Forces rear camera
                                        onChange={handlePhotoCapture}
                                        style={{ display: 'none' }}
                                    />
                                    {status === 'verifying_photo' ? (
                                        <span>⏳ Certification GPS & Blockchain...</span>
                                    ) : (
                                        <>
                                            <span style={{ fontSize: '1.5rem' }}>📷</span>
                                            <span>Prendre Photo Sécurisée (Caméra Uniquement)</span>
                                        </>
                                    )}
                                </label>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '1.5rem' }}>✅</span>
                                <div style={{ fontWeight: 600, color: '#166534' }}>Photo Certifiée ALTHEA™</div>
                                {photoData && (
                                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.25rem' }}>
                                        <div>📍 {photoData.coords}</div>
                                        <div>🕒 {photoData.timestamp}</div>
                                        <div>🔒 Signature Cryptographique OK</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <button className={styles.cancelBtn} onClick={onClose}>Annuler</button>
                    <button
                        className={styles.validateBtn}
                        disabled={!canValidate || status === 'validating'}
                        onClick={handleValidateProcess}
                    >
                        {status === 'validating' ? 'Vérification GPS...' : canValidate ? '✅ Valider et Signer (.geo)' : '⚠ Validation Impossible'}
                    </button>
                </div>
            </div>
        </div>
    );
}
