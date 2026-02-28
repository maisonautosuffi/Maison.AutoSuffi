import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function AdminMilestonesPage() {
    return (
        <div className="space-y-8 reveal-text">
            <div>
                <h1 className="text-3xl font-serif text-text-primary mb-1">Templates de Jalons</h1>
                <p className="text-text-secondary font-sans text-sm">Configurez les étapes types pour les nouveaux projets constructibles.</p>
            </div>

            <Card className="p-8 text-center text-text-secondary">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-bg-alt rounded-full flex items-center justify-center text-gold border border-text-accent/20">
                        🗺️
                    </div>
                </div>
                <h3 className="font-serif text-xl text-text-primary mb-2">Gestionnaire de Gabarits</h3>
                <p className="font-sans text-sm max-w-md mx-auto mb-6">
                    La personnalisation des modèles de jalons réutilisables sera intégrée dans la V1.1.
                    Actuellement, les jalons se fixent via l'API.
                </p>
                <Button variant="outline" disabled>Nouveau Gabarit (Bientôt)</Button>
            </Card>
        </div>
    )
}
