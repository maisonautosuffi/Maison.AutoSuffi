import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default async function AdminMilestoneDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: milestone } = await supabase
        .from('project_milestones')
        .select(`
            *,
            project:projects!project_id ( name )
        `)
        .eq('id', id)
        .single()

    if (!milestone) {
        return (
            <div className="p-12 text-center text-text-secondary">
                <h1 className="text-2xl font-serif text-text-primary mb-2">Jalon non trouvé</h1>
                <p>Le jalon <strong>{id}</strong> n'existe pas ou a été supprimé.</p>
                <Link href="/backoffice/milestones" className="mt-4 inline-block">
                    <Button variant="outline">Retour à la liste</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6 reveal-text">
            <div className="flex items-center gap-4">
                <Link href="/backoffice/milestones" className="text-text-secondary hover:text-text-primary transition-colors">
                    ← Retour
                </Link>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-serif text-text-primary mb-1">{milestone.label}</h1>
                    <p className="text-text-secondary font-sans text-sm">
                        Projet: {milestone.project?.name || 'Inconnu'} • Statut: {milestone.status}
                    </p>
                </div>
                <Link href={`/backoffice/milestones/${id}/edit`}>
                    <Button variant="outline">Modifier le jalon</Button>
                </Link>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-serif mb-4">Fonctionnalités prochainement disponibles</h2>
                <Card className="p-8 text-center bg-bg-card/50">
                    <p className="text-text-secondary">La gestion détaillée des jalons (checklists, rapports) est en cours de développement.</p>
                </Card>
            </div>
        </div>
    )
}
