'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { z } from 'zod'

const inviteSchema = z.object({
    email: z.string().email('Adresse email invalide'),
    role: z.enum(['client', 'technicien', 'ingenieur', 'admin'])
})

export function InviteForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        role: 'client'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        setSuccess(false)

        try {
            // Zod Validation
            inviteSchema.parse(formData)

            const response = await fetch('/api/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi')
            }

            setSuccess(true)
            // Wait briefly before redirecting or let user click 'return' manually
            setTimeout(() => {
                router.push('/backoffice/users')
                router.refresh()
            }, 2000)

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

    if (success) {
        return (
            <Card className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-text-primary">Invitation envoyée !</h3>
                <p className="text-text-secondary">
                    Redirection vers la page des utilisateurs...
                </p>
            </Card>
        )
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
                        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                            Adresse Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="exemple@email.com"
                            className="w-full bg-bg-alt border border-text-accent/20 rounded-none px-4 py-3 text-text-primary focus:border-text-accent focus:ring-1 focus:ring-text-accent transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-1">
                            Rôle *
                        </label>
                        <select
                            id="role"
                            name="role"
                            required
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full bg-bg-alt border border-text-accent/20 rounded-none px-4 py-3 text-text-primary focus:border-text-accent focus:ring-1 focus:ring-text-accent transition-all outline-none"
                        >
                            <option value="client">Client</option>
                            <option value="technicien">Technicien</option>
                            <option value="ingenieur">Ingénieur / Arch.</option>
                            <option value="admin">Administrateur</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6 border-t border-text-accent/10 flex justify-end gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => router.push('/backoffice/users')}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting || !formData.email}
                    >
                        {isSubmitting ? 'Envoi...' : 'Envoyer l\'invitation'}
                    </Button>
                </div>
            </form>
        </Card>
    )
}
