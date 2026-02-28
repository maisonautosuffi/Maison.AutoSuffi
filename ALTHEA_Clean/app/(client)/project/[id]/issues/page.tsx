import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
export default async function IssuesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: projectId } = await params
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: project } = await supabase
        .from('project')
        .select(`
            *,
            issues ( * ),
            deliveries ( * )
        `)
        .eq('id', projectId)
        .single()

    // Sort desc manually if needed
    if (project?.issues) project.issues.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    if (project?.deliveries) project.deliveries.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    if (!project || project.clientUserId !== user.id) {
        redirect('/dashboard')
    }

    const openIssues = project.issues ? project.issues.filter((i: any) => i.status !== 'CLOSED') : []
    const closedIssues = project.issues ? project.issues.filter((i: any) => i.status === 'CLOSED') : []

    return (
        <div className="space-y-8 reveal-text">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 reveal-text reveal-delay-1">
                <div>
                    <h1 className="text-3xl font-serif text-text-primary mb-2">Suivi des Réserves & Livraisons</h1>
                    <p className="text-text-secondary font-sans flex items-center gap-2 text-sm">
                        <Link href="/dashboard" className="hover:text-gold transition-colors">Mes Projets</Link>
                        <span>›</span>
                        <Link href={`/project/${project.id}`} className="hover:text-gold transition-colors">{project.name}</Link>
                        <span>›</span>
                        <span className="text-text-primary">Levées de réserves</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal-text reveal-delay-2">
                {/* Issues section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-serif text-text-primary border-b border-text-accent/10 pb-2">Réserves (Punch list)</h2>

                    {openIssues.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-sans font-bold text-red-500 uppercase tracking-wider">En cours de traitement ({openIssues.length})</h3>
                            {openIssues.map((issue: any) => (
                                <Card key={issue.id} className="p-5 border-l-4 border-l-red-500 bg-red-500/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-red-600 bg-red-500/10 px-2 py-1 rounded uppercase">{issue.priority}</span>
                                        <span className="text-xs text-text-secondary">{new Date(issue.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="font-sans font-medium text-text-primary mb-1">{issue.category}</h4>
                                    <p className="text-sm text-text-secondary">{issue.description}</p>
                                </Card>
                            ))}
                        </div>
                    )}

                    {closedIssues.length > 0 && (
                        <div className="space-y-4 mt-8">
                            <h3 className="text-sm font-sans font-bold text-green-600 uppercase tracking-wider">Réserves levées ({closedIssues.length})</h3>
                            {closedIssues.map((issue: any) => (
                                <Card key={issue.id} className="p-5 border-l-4 border-l-green-500 bg-green-500/5 opacity-75">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-green-700 bg-green-500/10 px-2 py-1 rounded uppercase">LEVÉE LE {issue.closedAt ? new Date(issue.closedAt).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                    <h4 className="font-sans font-medium text-text-primary mb-1 line-through decoration-green-500/50">{issue.category}</h4>
                                    <p className="text-sm text-text-secondary">{issue.description}</p>
                                </Card>
                            ))}
                        </div>
                    )}

                    {(!project.issues || project.issues.length === 0) && (
                        <Card className="p-8 text-center text-text-secondary">
                            Aucune réserve n'a été émise sur ce projet.
                        </Card>
                    )}
                </div>

                {/* Deliveries section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-serif text-text-primary border-b border-text-accent/10 pb-2">Journal des Livraisons</h2>

                    {project.deliveries && project.deliveries.length > 0 ? (
                        <div className="space-y-4">
                            {project.deliveries.map((delivery: any) => (
                                <Card key={delivery.id} className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-sans font-medium text-text-primary">{delivery.material}</h4>
                                            <p className="text-xs text-text-secondary mt-1">Quantité: {delivery.quantity} {delivery.unit}</p>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${delivery.status === 'RECEIVED' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                                            }`}>
                                            {delivery.status}
                                        </span>
                                    </div>
                                    {delivery.status === 'ANOMALY' && delivery.anomalyDetails && (
                                        <div className="mt-3 p-3 bg-red-500/5 rounded border border-red-500/10">
                                            <p className="text-xs text-red-600 font-medium">Anomalie signalée:</p>
                                            <p className="text-xs text-text-secondary mt-1">{delivery.anomalyDetails}</p>
                                        </div>
                                    )}
                                    <div className="mt-4 pt-4 border-t border-text-accent/5 flex justify-between items-center text-xs text-text-secondary">
                                        <span>Fournisseur: {delivery.supplier || 'Non renseigné'}</span>
                                        <span>Reçu le {new Date(delivery.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="p-8 text-center text-text-secondary">
                            Aucune livraison enregistrée pour le moment.
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
