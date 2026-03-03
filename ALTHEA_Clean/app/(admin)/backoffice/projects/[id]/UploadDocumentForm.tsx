'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface UploadDocumentFormProps {
    projectId: string
}

export function UploadDocumentForm({ projectId }: UploadDocumentFormProps) {
    const router = useRouter()
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [file, setFile] = useState<File | null>(null)
    const [category, setCategory] = useState('GENERAL')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        setIsUploading(true)
        setError(null)
        setSuccess(null)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('projectId', projectId)
            formData.append('category', category)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors du téléchargement')
            }

            setSuccess('Document téléchargé avec succès')
            setFile(null)

            // Reset file input
            const fileInput = document.getElementById('file-upload') as HTMLInputElement
            if (fileInput) fileInput.value = ''

            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Card className="p-6">
            <h3 className="font-serif text-lg mb-4 text-text-primary">Ajouter un document au coffre-fort</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-500/10 border border-green-500 text-green-600 p-3 rounded text-sm">
                        {success}
                    </div>
                )}

                <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-text-primary mb-1">
                        Fichier *
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        required
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full bg-bg-alt border border-text-accent/20 rounded-none px-4 py-2 text-text-primary focus:border-text-accent focus:ring-1 focus:ring-text-accent transition-all outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-1">
                        Catégorie *
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-bg-alt border border-text-accent/20 rounded-none px-4 py-2 text-text-primary focus:border-text-accent focus:ring-1 focus:ring-text-accent transition-all outline-none"
                    >
                        <option value="GENERAL">Général</option>
                        <option value="PLAN">Plan architectural / technique</option>
                        <option value="INSPECTION">Rapport d'inspection</option>
                        <option value="ATTESTATION">Attestation / Certificat</option>
                        <option value="CONTRACT">Contrat / Devis</option>
                    </select>
                </div>

                <div className="pt-2">
                    <Button type="submit" disabled={!file || isUploading} className="w-full">
                        {isUploading ? 'Téléchargement en cours...' : 'Téléverser le document'}
                    </Button>
                </div>
            </form>
        </Card>
    )
}
