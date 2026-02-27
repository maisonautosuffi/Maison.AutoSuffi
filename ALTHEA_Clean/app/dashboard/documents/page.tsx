'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Documents.module.css';
import EmptyState from '@/components/ui/EmptyState';

import { supabase } from '@/lib/supabase/client';

type DocRow = {
    id: string;
    project_id: string;
    name: string;
    category: string | null;
    mime_type: string | null;
    file_size_bytes: number | null;
    storage_path: string | null;
    created_at: string;
};

export default function DocumentsPage() {
    const [docs, setDocs] = useState<Array<{
        id: string;
        name: string;
        type: string;
        size: string;
        date: string;
        category: string;
        storagePath: string | null;
    }>>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [projects, setProjects] = useState<Array<{ id: string }>>([]);
    const activeProjectId = useMemo(() => projects[0]?.id ?? 'A12', [projects]);

    const formatSize = (bytes: number | null) => {
        if (!bytes) return '-';
        const mb = bytes / 1024 / 1024;
        return `${mb.toFixed(1)} MB`;
    };

    const formatDateLabel = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const inferType = (name: string, mimeType: string | null) => {
        if (mimeType) {
            if (mimeType.includes('pdf')) return 'PDF';
            if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'XLS';
            if (mimeType.includes('image')) return 'IMG';
        }

        const ext = name.split('.').pop()?.toUpperCase();
        return ext ?? 'DOC';
    };

    useEffect(() => {
        const loadProjects = async () => {
            const { data } = await supabase.from('projects').select('id').order('created_at', { ascending: true });
            setProjects(data ?? []);
        };

        void loadProjects();
    }, []);

    useEffect(() => {
        const loadDocs = async () => {
            if (!activeProjectId) return;

            const { data, error } = await supabase
                .from('project_documents')
                .select('id, project_id, name, category, mime_type, file_size_bytes, storage_path, created_at')
                .eq('project_id', activeProjectId)
                .order('created_at', { ascending: false });

            if (error) return;

            const mapped = ((data ?? []) as DocRow[]).map(d => ({
                id: d.id,
                name: d.name,
                type: inferType(d.name, d.mime_type),
                size: formatSize(d.file_size_bytes),
                date: formatDateLabel(d.created_at),
                category: d.category ?? '—',
                storagePath: d.storage_path,
            }));

            setDocs(mapped);
        };

        void loadDocs();
    }, [activeProjectId]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const run = async () => {
            setIsUploading(true);
            try {
                const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
                const path = `${activeProjectId}/${Date.now()}_${safeName}`;

                const { error: uploadError } = await supabase
                    .storage
                    .from('project-documents')
                    .upload(path, file, { contentType: file.type, upsert: false });

                if (uploadError) {
                    return;
                }

                const { data: inserted, error: insertError } = await supabase
                    .from('project_documents')
                    .insert({
                        project_id: activeProjectId,
                        name: file.name,
                        category: 'Importé',
                        mime_type: file.type || null,
                        file_size_bytes: file.size,
                        storage_path: path,
                    })
                    .select('id, name, category, mime_type, file_size_bytes, storage_path, created_at')
                    .single();

                if (insertError || !inserted) {
                    return;
                }

                setDocs(current => [
                    {
                        id: inserted.id,
                        name: inserted.name,
                        type: inferType(inserted.name, inserted.mime_type),
                        size: formatSize(inserted.file_size_bytes),
                        date: formatDateLabel(inserted.created_at),
                        category: inserted.category ?? '—',
                        storagePath: inserted.storage_path,
                    },
                    ...current,
                ]);
            } finally {
                setIsUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        };

        void run();
    };

    const handleDownload = async (doc: { storagePath: string | null; name: string }) => {
        if (!doc.storagePath) return;

        const { data, error } = await supabase
            .storage
            .from('project-documents')
            .createSignedUrl(doc.storagePath, 60);

        if (error || !data?.signedUrl) return;

        window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
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
                            <button className={styles.downloadBtn} aria-label="Télécharger" onClick={() => void handleDownload(doc)}>
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
