'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'

interface ReleaseFundsButtonProps {
    reportId: string;
    conclusion?: string;
}

export function ReleaseFundsButton({ reportId, conclusion }: ReleaseFundsButtonProps) {
    const { success, error: showError } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    // Si on a déjà payé ou pas encore validé du point de vue global
    const isAlreadyPaid = conclusion === 'OK_PAID';

    const handleRelease = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/finances/release', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reportId,
                    applicationFeeAmount: 75000 // 750€ de commission par défaut pour la simulation
                })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Erreur inconnue')
            }

            success(data.message)

            // Rafraîchir la page ou l'état local pour refléter le changement
            setTimeout(() => {
                window.location.reload()
            }, 1500)

        } catch (error: any) {
            showError(`Erreur : ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    if (isAlreadyPaid) {
        return <Button size="sm" variant="outline" className="text-[10px] py-1 h-auto opacity-50 cursor-not-allowed">DÉJÀ PAYÉ</Button>
    }

    return (
        <Button
            className="w-full bg-blue-900 text-white hover:bg-blue-800"
            onClick={handleRelease}
            disabled={isLoading}
        >
            {isLoading ? 'DÉBLOCAGE...' : 'Valider le rapport & Débloquer les fonds'}
        </Button>
    )
}
