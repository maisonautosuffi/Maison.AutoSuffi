import { Card } from '@/components/ui/Card'
import { ProjectForm } from './ProjectForm'

export default function NewProjectPage() {
    return (
        <div className="space-y-6 reveal-text">
            <div>
                <h1 className="text-3xl font-serif text-text-primary mb-1">Nouveau Projet</h1>
                <p className="text-text-secondary font-sans text-sm">
                    Renseignez les informations initiales du chantier.
                </p>
            </div>

            <Card className="max-w-2xl p-8">
                <ProjectForm />
            </Card>
        </div>
    )
}
