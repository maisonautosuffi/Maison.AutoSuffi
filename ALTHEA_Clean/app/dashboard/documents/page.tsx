'use client';

import { useState, useRef } from 'react';
import styles from './Documents.module.css';
import EmptyState from '@/components/ui/EmptyState';

const documents = [
    {
        id: 1,
        name: "Contrat de Construction (CCMI)",
        type: "PDF",
        size: "2.4 MB",
        date: "15 Jan 2026",
        category: "Administratif"
    },
    {
        id: 2,
        name: "Plans Architecturaux Validés",
        type: "PDF",
        size: "15.8 MB",
        date: "20 Jan 2026",
        category: "Technique"
    },
    {
        id: 3,
        name: "Permis de Construire",
        type: "PDF",
        size: "1.2 MB",
        date: "28 Jan 2026",
        category: "Administratif"
    },
    {
        id: 4,
        name: "Étude de Sol G1/G2",
        type: "PDF",
        size: "4.5 MB",
        date: "02 Fév 2026",
        category: "Technique"
    },
    {
        id: 5,
        name: "Planning Prévisionnel Détaillé",
        type: "XLS",
        size: "0.5 MB",
        date: "10 Fév 2026",
        category: "Planning"
    }
];

export default function DocumentsPage() {
    const [docs, setDocs] = useState(documents);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        // Simulate upload delay
        setTimeout(() => {
            const newDoc = {
                id: docs.length + 1,
                name: file.name,
                type: file.name.split('.').pop()?.toUpperCase() || "DOC",
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
                category: "Importé"
            };
            setDocs([newDoc, ...docs]);
            setIsUploading(false);
            alert(`Document "${file.name}" ajouté avec succès !`);
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.filters}>
                    <button className={`${styles.filter} ${styles.active}`}>Tous</button>
                    <button className={styles.filter}>Administratif</button>
                    <button className={styles.filter}>Technique</button>
                    <button className={styles.filter}>Financier</button>
                </div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <button
                        className={styles.uploadButton}
                        onClick={handleUploadClick}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Chargement...' : '📤 Ajouter un document'}
                    </button>
                </div>
            </div>

            {docs.length > 0 ? (
                <div className={styles.grid}>
                    {docs.map((doc) => (
                        <div key={doc.id} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <span className={styles.fileIcon}>
                                    {doc.type.includes('PDF') ? '📕' : doc.type.includes('XLS') ? '📊' : doc.type.includes('JPG') || doc.type.includes('PNG') ? '🖼️' : '📄'}
                                </span>
                            </div>
                            <div className={styles.details}>
                                <h3 className={styles.name}>{doc.name}</h3>
                                <div className={styles.meta}>
                                    <span>{doc.date}</span>
                                    <span>•</span>
                                    <span>{doc.size}</span>
                                </div>
                                <span className={styles.categoryBadge}>{doc.category}</span>
                            </div>
                            <button className={styles.downloadBtn} aria-label="Télécharger">
                                ⬇️
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon="📂"
                    title="Aucun document"
                    description="Vos documents administratifs et techniques apparaîtront ici dès qu'ils seront disponibles."
                    actionLabel="Ajouter un document"
                    onAction={handleUploadClick}
                />
            )}
        </div>
    );
}
