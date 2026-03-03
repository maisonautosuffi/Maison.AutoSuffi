"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { z } from 'zod'

const projectSchema = z.object({
    name: z.string().min(2, 'Le nom du projet doit contenir au moins 2 caractères'),
    location: z.string().optional(),
    surface: z.string().optional(),
    clientName: z.string().optional()
})

export function ProjectForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        surface: '',
        clientName: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const validationResult = projectSchema.safeParse(formData)
        if (!validationResult.success) {
            setError(validationResult.error.issues.map(e => e.message).join(', '))
            setIsLoading(false)
            return
        }

        try {
            const body = {
                ...formData,
                surface: formData.surface ? parseFloat(formData.surface) : undefined
            }

            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Erreur lors de la création du projet')
            }

            // Redirect back to projects list
            router.push('/backoffice/projects')
            router.refresh() // Force Next.js to re-fetch the server component data

        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium pr-text-primary mb-1">Nom du Projet *</label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Rénovation Villa Lemaire"
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium pr-text-primary mb-1">Localisation</label>
                    <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Ex: 75015 Paris"
                        className="w-full"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium pr-text-primary mb-1">Surface (m²)</label>
                        <Input
                            type="number"
                            name="surface"
                            value={formData.surface}
                            onChange={handleChange}
                            placeholder="Ex: 120"
                            className="w-full"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium pr-text-primary mb-1">Nom du Client</label>
                    <Input
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        placeholder="Nom d'affichage libre, ou ID existant plus tard"
                        className="w-full"
                        title="V1 : Champ texte. V2 : Sélection depuis la table profiles"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-text-accent/10">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/backoffice/projects')}
                    disabled={isLoading}
                >
                    Annuler
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Création...' : 'Créer le projet'}
                </Button>
            </div>
        </form>
    )
}
