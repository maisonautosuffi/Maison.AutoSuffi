import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
            milestones ( * ),
            issues ( * )
        `)
        .eq('id', projectId)
        .single()

    // Filter out closed issues manually since Supabase doesn't support nested filtering out of the box easily without computed columns
    if (project?.issues) {
        project.issues = project.issues.filter((i: any) => i.status !== 'CLOSED')
    }

    // Sort milestones
    if (project?.milestones) {
        project.milestones.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }

    if (!project || project.clientUserId !== user.id) {
        redirect('/dashboard') // Or show a 404/not authorized page
    }

    return (
        <div className="space-y-8 reveal-text">

            <div className="flex items-center justify-between reveal-text reveal-delay-1">
                <div>
                    <h1 className="text-4xl font-serif text-text-primary mb-2">{project.name}</h1>
                    <p className="text-text-secondary font-sans flex items-center gap-2 text-sm">
                        <Link href="/dashboard" className="hover:text-gold transition-colors">Mes Projets</Link>
                        <span>›</span>
                        <span className="text-text-primary">{project.name}</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                        {project.status === 'ACTIVE' ? 'En cours' : project.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal-text reveal-delay-2">

                {/* Main Content: Timeline / Overview */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-8">
                        <h2 className="text-xl font-serif text-text-primary mb-6">Avancement Global</h2>
                        <div className="w-full bg-bg-alt rounded-sm h-2 mb-4 overflow-hidden">
                            <div className="bg-gold h-2 rounded-sm transition-all duration-1000 ease-out" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-sm font-sans mb-8">
                            <span className="text-text-secondary">Progression Globale</span>
                            <span className="text-gold font-bold text-lg">{project.progress}%</span>
                        </div>

                        <h3 className="text-lg font-serif text-text-primary mb-4 border-t border-text-accent/10 pt-6">Jalons Récents</h3>
                        {!project.milestones || project.milestones.length === 0 ? (
                            <p className="text-text-secondary text-sm">Aucun jalon défini pour le moment.</p>
                        ) : (
                            <div className="space-y-4">
                                {project.milestones.map((milestone: any) => (
                                    <div key={milestone.id.toString()} className="flex justify-between items-center border border-text-accent/10 p-4 rounded-sm">
                                        <div>
                                            <p className="font-sans font-medium text-text-primary">{milestone.label}</p>
                                            <p className="text-xs text-text-secondary mt-1">Ajouté le {new Date(milestone.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-sm uppercase tracking-wider font-bold ${milestone.status === 'VALIDATED' ? 'bg-green-500/10 text-green-500' : 'bg-gold/10 text-gold'}`}>
                                            {milestone.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar: Details & Actions */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-sm font-sans font-bold text-text-primary uppercase tracking-wider mb-4 border-b border-text-accent/10 pb-2">Informations</h3>
                        <div className="space-y-3 font-sans text-sm">
                            <div className="flex justify-between">
                                <span className="text-text-secondary">Emplacement</span>
                                <span className="text-text-primary">{project.location || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-secondary">Réserves Actives</span>
                                <span className={project.issues && project.issues.length > 0 ? "text-red-500 font-bold" : "text-text-primary"}>{project.issues ? project.issues.length : 0}</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gold/5 ring-1 ring-gold/20">
                        <h3 className="text-sm font-sans font-bold text-gold uppercase tracking-wider mb-4 border-b border-gold/20 pb-2">Documents & Médias</h3>
                        <p className="text-xs text-text-secondary mb-4">Accédez à votre coffre-fort numérique contenant les photos de chantier et rapports certifiés.</p>
                        <Button className="w-full text-xs" size="sm" variant="outline">
                            OUVRIR LE COFFRE-FORT
                        </Button>
                    </Card>
                </div>

            </div>
        </div>
    )
}
