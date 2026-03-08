'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'
import { AlertTriangle } from 'lucide-react'

interface DisputeModalProps {
    reportId: string;
}

export function DisputeModal({ reportId }: DisputeModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [reason, setReason] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { success, error: showError } = useToast()

    const handleConfirm = () => {
        if (!reason.trim()) {
            showError("Veuillez décrire la non-conformité.")
            return;
        }

        setIsSubmitting(true)

        // Simuler un appel API pour ouvrir le litige
        setTimeout(() => {
            setIsSubmitting(false)
            setIsOpen(false)
            setReason('')
            success("Litige ouvert. Constructeur notifié.", "Succès")

            // Recharger la page après un court délai pour actualiser le statut
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        }, 800)
    }

    return (
        <>
            <Button
                variant="outline"
                className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => setIsOpen(true)}
            >
                Refuser & Signaler une Malfaçon
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                                <h2 className="text-lg font-serif font-bold text-red-600">Ouverture d'un Litige</h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-800 transition-colors text-xl font-bold p-1 leading-none"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 space-y-4">
                            <p className="text-sm text-slate-900 font-sans leading-relaxed">
                                Le blocage des fonds alertera immédiatement le constructeur. Veuillez préciser le motif du refus.
                            </p>
                            <textarea
                                className="w-full border border-red-300 rounded-md p-3 text-sm font-sans text-slate-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 resize-none h-32"
                                placeholder="Décrivez la non-conformité constatée (ex: Profondeur des fondations insuffisante, ferraillage non conforme au plan...)"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                className="text-slate-700 hover:bg-gray-100 hover:text-slate-900"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                            >
                                Annuler
                            </Button>
                            <Button
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={handleConfirm}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Traitement...' : 'Confirmer le blocage'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
