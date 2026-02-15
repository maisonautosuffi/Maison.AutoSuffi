'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import styles from '@/components/ui/Toast.module.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
}

interface ToastContextType {
    showToast: (props: Omit<Toast, 'id'>) => void;
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showToast = useCallback(({ type, title, message, duration = 5000 }: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { id, type, title, message, duration };

        setToasts(prev => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                // Add closing animation class logic if needed, simplify for now to just remove
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const success = (message: string, title?: string) => showToast({ type: 'success', message, title: title || 'Succès' });
    const error = (message: string, title?: string) => showToast({ type: 'error', message, title: title || 'Erreur' });
    const info = (message: string, title?: string) => showToast({ type: 'info', message, title: title || 'Information' });
    const warning = (message: string, title?: string) => showToast({ type: 'warning', message, title: title || 'Attention' });

    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
            {children}
            <div className={styles.toastContainer}>
                {toasts.map(toast => (
                    <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
                        <div className={styles.icon}>{getIcon(toast.type)}</div>
                        <div className={styles.content}>
                            {toast.title && <span className={styles.title}>{toast.title}</span>}
                            <span className={styles.message}>{toast.message}</span>
                        </div>
                        <button className={styles.closeButton} onClick={() => removeToast(toast.id)}>
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
