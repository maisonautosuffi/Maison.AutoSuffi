import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function AdminChecklistsPage() {
    return (
        <div className="space-y-8 reveal-text">
            <div>
                <h1 className="text-3xl font-serif text-text-primary mb-1">Modèles de Checklists</h1>
                <p className="text-text-secondary font-sans text-sm">Créez et gérez les questionnaires d'inspection par corps de métier.</p>
            </div>

            <Card className="p-8 text-center text-text-secondary">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-bg-alt rounded-full flex items-center justify-center text-gold border border-text-accent/20">
                        📋
                    </div>
                </div>
                <h3 className="font-serif text-xl text-text-primary mb-2">Fonctionnalité V1.1</h3>
                <p className="font-sans text-sm max-w-md mx-auto mb-6">
                    Le module de création dynamique de checklists sera disponible prochainement dans la prochaine mise à jour mineure.
                </p>
                <Button variant="outline" disabled>Créer un modèle (Bientôt)</Button>
            </Card>
        </div>
    )
}
