import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) console.error("Error fetching client dashboard projects:", error);

    const projectsList = projects || []

    return (
        <div className="space-y-8 reveal-text">
            <div>
                <h1 className="text-4xl font-serif text-text-primary mb-2">Mes Projets</h1>
                <p className="text-text-secondary font-sans">
                    Bienvenue dans votre espace client ALTHÉA.
                </p>
            </div>

            {projectsList.length === 0 ? (
                <Card className="p-8 text-center text-text-secondary">
                    <p className="mb-4">Vous n'avez aucun projet en cours pour le moment.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-text reveal-delay-1">
                    {projectsList.map((project) => (
                        <Card key={project.id} className="p-0 overflow-hidden flex flex-col h-full">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="font-serif text-2xl tracking-wide text-brand-confidence">{project.name}</h2>
                                    <span className="bg-brand-confidence/5 border border-brand-confidence/10 text-brand-confidence text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                        {project.status === 'PRE_STUDY' ? 'À l\'étude' : 'En cours'}
                                    </span>
                                </div>

                                {/* BUDGET MOCKUP */}
                                <div className="p-4 rounded-xl bg-bg-main border border-text-accent/10 mb-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-secondary font-sans uppercase tracking-wider">Budget Engagé</p>
                                            <p className="text-2xl font-serif text-brand-confidence">
                                                {/* Simulated budget based on ID to look real but dynamic */}
                                                {(150000 + (project.id % 5) * 20000).toLocaleString('fr-FR')} €
                                            </p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-xs text-text-secondary font-sans uppercase tracking-wider">Décaissé</p>
                                            <p className="font-sans text-brand-accent font-medium">
                                                {((150000 + (project.id % 5) * 20000) * (project.progress / 100)).toLocaleString('fr-FR')} €
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-bg-alt rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-brand-accent h-1.5 rounded-full transition-all text-xs" style={{ width: `${project.progress}%` }}></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-sans pb-3 border-b border-text-accent/10">
                                        <span className="text-text-secondary">Emplacement</span>
                                        <span className="text-text-primary font-medium">{project.location || 'Non spécifié'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-sans">
                                        <span className="text-text-secondary">Avancement Technique</span>
                                        <span className="text-brand-confidence font-bold">{project.progress}%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <Link href={`/project/${project.id}`} className="w-full">
                                    <Button className="w-full shadow-md shadow-brand-confidence/5">
                                        Consulter le dossier
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
