'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { z } from 'zod'

interface Project {
    id: string
    name: string
}

const milestoneSchema = z.object({
    projectId: z.string().min(1, 'Veuillez sélectionner un projet'),
    label: z.string().min(2, 'Le nom du jalon doit contenir au moins 2 caractères')
})

export function MilestoneForm({ projects }: { projects: Project[] }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        projectId: '',
        label: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            // Zod Validation
            milestoneSchema.parse(formData)

            const response = await fetch('/api/milestones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Une erreur est survenue lors de la création du jalon')
            }

            // Redirect to milestones list on success
            router.push('/backoffice/milestones')
            router.refresh()
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                setError(err.issues.map(e => e.message).join(', '))
            } else {
                setError(err.message)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="projectId" className="block text-sm font-medium text-text-primary mb-1">
                            Projet *
                        </label>
                        <select
                            id="projectId"
                            name="projectId"
                            required
                            value={formData.projectId}
                            onChange={handleChange}
                            className="w-full bg-bg-alt border border-text-accent/20 rounded-none px-4 py-3 text-text-primary focus:border-text-accent focus:ring-1 focus:ring-text-accent transition-all outline-none"
                        >
                            <option value="">Sélectionner un projet...</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="label" className="block text-sm font-medium text-text-primary mb-1">
                            Nom du jalon *
                        </label>
                        <input
                            type="text"
                            id="label"
                            name="label"
                            required
                            value={formData.label}
                            onChange={handleChange}
                            placeholder="Ex: Fondation terminée"
                            className="w-full bg-bg-alt border border-text-accent/20 rounded-none px-4 py-3 text-text-primary focus:border-text-accent focus:ring-1 focus:ring-text-accent transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-text-accent/10 flex justify-end gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => router.push('/backoffice/milestones')}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting || !formData.projectId || !formData.label}
                    >
                        {isSubmitting ? 'Création...' : 'Créer le jalon'}
                    </Button>
                </div>
            </form>
        </Card>
    )
}
