import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    actionLabel?: string;
    actionLink?: string;
    onAction?: () => void;
}

export default function EmptyState({ icon, title, description, actionLabel, actionLink, onAction }: EmptyStateProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'rgba(30, 41, 59, 0.3)',
            border: '1px dashed rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            color: '#94a3b8'
        }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.8 }}>{icon}</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ maxWidth: '400px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>{description}</p>

            {actionLabel && (actionLink || onAction) && (
                actionLink ? (
                    <Link href={actionLink} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                        color: 'white',
                        fontWeight: 500,
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        transition: 'transform 0.2s'
                    }}>
                        {actionLabel}
                    </Link>
                ) : (
                    <button onClick={onAction} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                        color: 'white',
                        fontWeight: 500,
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}>
                        {actionLabel}
                    </button>
                )
            )}
        </div>
    );
}
