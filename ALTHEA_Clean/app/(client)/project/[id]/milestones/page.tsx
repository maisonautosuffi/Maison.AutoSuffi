import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export default async function MilestonesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: projectId } = await params
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: project, error } = await supabase
        .from('projects')
        .select(`
            *,
            milestones:project_milestones (
                *,
                inspections ( * )
            )
        `)
        .eq('id', projectId)
        .single()

    if (error) console.error("Error fetching project milestones:", error);

    if (project?.milestones) {
        project.milestones.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

    if (!project || project.client_user_id !== user.id) {
        redirect('/dashboard')
    }

    return (
        <div className="space-y-8 reveal-text">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 reveal-text reveal-delay-1">
                <div>
                    <h1 className="text-3xl font-serif text-text-primary mb-2">Jalons & Inspections</h1>
                    <p className="text-text-secondary font-sans flex items-center gap-2 text-sm">
                        <Link href="/dashboard" className="hover:text-gold transition-colors">Mes Projets</Link>
                        <span>›</span>
                        <Link href={`/project/${project.id}`} className="hover:text-gold transition-colors">{project.name}</Link>
                        <span>›</span>
                        <span className="text-text-primary">Jalons</span>
                    </p>
                </div>
            </div>

            <div className="space-y-6 reveal-text reveal-delay-2">
                {project.milestones.length === 0 ? (
                    <Card className="p-8 text-center text-text-secondary">
                        Aucun jalon défini pour le moment.
                    </Card>
                ) : (
                    project.milestones.map((milestone: any) => (
                        <Card key={milestone.id.toString()} className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-text-accent/10 flex justify-between items-start">
                                <div>
                                    <h3 className="font-serif text-xl text-text-primary">{milestone.label}</h3>
                                    <p className="text-sm font-sans text-text-secondary mt-1">Poids dans le projet: {milestone.weight}%</p>
                                </div>
                                <span className={`text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider font-bold ${milestone.status === 'VALIDATED' ? 'bg-green-500/10 text-green-500' :
                                    milestone.status === 'IN_PROGRESS' ? 'bg-gold/10 text-gold' :
                                        'bg-bg-alt text-text-secondary'
                                    }`}>
                                    {milestone.status}
                                </span>
                            </div>

                            {milestone.inspections.length > 0 && (
                                <div className="bg-bg-alt/50 p-6">
                                    <h4 className="text-sm font-sans font-bold text-text-primary uppercase tracking-wider mb-4 border-b border-text-accent/10 pb-2">Rapports d'inspection associés</h4>
                                    <div className="space-y-3">
                                        {milestone.inspections.map((insp: any) => (
                                            <div key={insp.id} className="flex justify-between items-center bg-bg-card p-3 border border-text-accent/10 rounded-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gold/10 text-gold flex items-center justify-center">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-text-primary">Inspection de conformité</p>
                                                        <p className="text-xs text-text-secondary">Date: {new Date(insp.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                {insp.pdfUrl ? (
                                                    <a href={insp.pdfUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-gold hover:text-text-primary transition-colors uppercase tracking-wider">Voir le PDF</a>
                                                ) : (
                                                    <span className="text-xs text-text-secondary italic">En cours de génération</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    )))}
            </div>
        </div>
    )
}
