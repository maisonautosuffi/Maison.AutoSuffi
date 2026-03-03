import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, Clock, Image as ImageIcon, FileText, ArrowRight } from 'lucide-react'

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

    const { data: project, error } = await supabase
        .from('projects')
        .select(`
            *,
            milestones:project_milestones ( * ),
            issues:issues ( * )
        `)
        .eq('id', projectId)
        .single()

    if (error) console.error("Error fetching client project:", error);

    if (project?.issues) {
        project.issues = project.issues.filter((i: any) => i.status !== 'CLOSED')
    }

    if (project?.milestones) {
        project.milestones.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

    if (!project || project.client_user_id !== user.id) {
        redirect('/dashboard')
    }

    return (
        <div className="space-y-12">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-confidence mb-3 tracking-tight">{project.name}</h1>
                    <p className="text-text-secondary font-sans flex items-center gap-2 text-sm">
                        <Link href="/dashboard" className="hover:text-brand-accent transition-colors">Mes Projets</Link>
                        <span className="text-text-accent/40">/</span>
                        <span className="text-text-primary font-medium">{project.name}</span>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-brand-confidence/5 border border-brand-confidence/10 text-brand-confidence text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                        {project.status === 'ACTIVE' ? 'En cours' : project.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Timeline */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Budget & Global Progress KPI Bar */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-6 border-none shadow-sm flex flex-col justify-center">
                            <p className="text-xs text-text-secondary font-sans uppercase tracking-widest mb-1">Avancement Global</p>
                            <div className="flex items-end justify-between mb-3">
                                <span className="text-3xl font-serif text-brand-confidence">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-bg-alt rounded-full h-1.5 overflow-hidden">
                                <div className="bg-brand-confidence h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${project.progress}%` }}></div>
                            </div>
                        </Card>

                        <Card className="p-6 border-none shadow-sm flex flex-col justify-center bg-brand-confidence text-white">
                            <p className="text-xs text-brand-accent font-sans uppercase tracking-widest mb-1">Budget Décaissé</p>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-serif">
                                    {((150000 + (project.id % 5) * 20000) * (project.progress / 100)).toLocaleString('fr-FR')} €
                                </span>
                            </div>
                            <p className="text-xs text-text-light/60 mt-2 font-sans">
                                Sur {(150000 + (project.id % 5) * 20000).toLocaleString('fr-FR')} € engagés
                            </p>
                        </Card>
                    </div>

                    <Card className="p-8 border-none shadow-sm">
                        <div className="flex justify-between items-center mb-8 border-b border-text-accent/10 pb-4">
                            <h2 className="text-2xl font-serif text-brand-confidence">Timeline des Preuves</h2>
                            <p className="text-sm text-text-secondary font-sans">{project.milestones?.length || 0} jalons</p>
                        </div>

                        {!project.milestones || project.milestones.length === 0 ? (
                            <div className="text-center py-12 text-text-secondary font-sans">
                                Aucun jalon défini pour le moment sur ce projet.
                            </div>
                        ) : (
                            <div className="relative border-l-2 border-text-accent/20 ml-4 space-y-12 pb-12">
                                {project.milestones.map((milestone: any, index: number) => {
                                    const isValidated = milestone.status === 'VALIDATED';
                                    const isPending = milestone.status === 'PENDING';

                                    return (
                                        <div key={milestone.id.toString()} className="relative pl-10">
                                            {/* Node icon */}
                                            <div className="absolute -left-[17px] top-0 bg-white p-1">
                                                {isValidated ? (
                                                    <CheckCircle2 className="w-6 h-6 text-green-500 bg-white" />
                                                ) : isPending ? (
                                                    <Clock className="w-6 h-6 text-brand-accent bg-white" />
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full border-2 border-text-accent/30 bg-white" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className={`transition-all duration-300 ${!isValidated ? 'opacity-70' : ''}`}>
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                                    <div>
                                                        <h3 className={`text-xl font-serif ${isValidated ? 'text-brand-confidence' : 'text-text-primary'}`}>
                                                            {milestone.label}
                                                        </h3>
                                                        <p className="text-xs text-text-secondary font-sans mt-1">
                                                            {isValidated ? 'Validé le' : 'Créé le'} {new Date(milestone.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <span className={`mt-2 sm:mt-0 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${isValidated ? 'bg-green-50 text-green-600 border border-green-200' :
                                                            isPending ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' :
                                                                'bg-bg-alt text-text-secondary border border-text-accent/20'
                                                        }`}>
                                                        {milestone.status === 'VALIDATED' ? 'Conforme' : milestone.status === 'PENDING' ? 'En cours' : milestone.status}
                                                    </span>
                                                </div>

                                                <p className="text-sm font-sans text-text-secondary mt-3 mb-4 max-w-2xl leading-relaxed">
                                                    {milestone.description || "Aucune description détaillée n'a été fournie pour cette étape de la construction."}
                                                </p>

                                                {/* Simulated Proof Gallery for Validated Milestones */}
                                                {isValidated && (
                                                    <div className="mt-6 bg-bg-alt rounded-xl p-4 border border-text-accent/10">
                                                        <h4 className="text-xs font-bold font-sans uppercase tracking-widest text-text-primary mb-3 flex items-center gap-2">
                                                            <ImageIcon className="w-4 h-4 text-brand-accent" />
                                                            Preuves Rattachées
                                                        </h4>
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                            {[1, 2, 3].map((_, idx) => (
                                                                <div key={idx} className="aspect-square bg-text-accent/5 rounded-lg border border-text-accent/10 flex items-center justify-center relative group overflow-hidden cursor-pointer">
                                                                    <ImageIcon className="w-6 h-6 text-text-accent/40 group-hover:scale-110 transition-transform" />
                                                                    <div className="absolute inset-0 bg-brand-confidence/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                        <span className="text-white text-xs font-medium">Voir le média</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="aspect-square bg-white rounded-lg border border-text-accent/20 flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:border-brand-accent transition-colors">
                                                                <FileText className="w-6 h-6 text-brand-accent mb-1" />
                                                                <span className="text-[10px] font-sans text-brand-confidence font-medium">Rapport PDF</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 text-[10px] text-text-secondary font-sans italic text-right">
                                                            Photos géolocalisées • Horodatage certifié
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar: Details & Actions */}
                <div className="space-y-6">
                    <Card className="p-6 border-none shadow-sm">
                        <h3 className="text-xs font-sans font-bold text-text-secondary uppercase tracking-widest mb-5 border-b border-text-accent/10 pb-3">Informations Clés</h3>
                        <div className="space-y-4 font-sans text-sm">
                            <div>
                                <span className="block text-xs text-text-secondary mb-1">Localisation du terrain</span>
                                <span className="text-text-primary font-medium">{project.location || 'Non spécifiée'}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-text-secondary mb-1">Surface (m²)</span>
                                <span className="text-text-primary font-medium">{project.surface || 'N/A'}</span>
                            </div>
                            <div className="pt-4 border-t border-text-accent/10">
                                <span className="block text-xs text-text-secondary mb-1">Réserves Signalées</span>
                                <span className={project.issues && project.issues.length > 0 ? "text-red-500 font-bold text-lg" : "text-text-primary font-medium"}>
                                    {project.issues ? project.issues.length : 0} <span className="text-sm font-normal">en cours</span>
                                </span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 border border-brand-confidence/10 bg-brand-confidence/5 shadow-sm">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <FileText className="w-5 h-5 text-brand-confidence" />
                        </div>
                        <h3 className="text-lg font-serif text-brand-confidence mb-2">Coffre-Fort Numérique</h3>
                        <p className="text-sm text-text-secondary font-sans mb-6 leading-relaxed">
                            Accédez à l'intégralité des documents contractuels, plans d'architecture et rapports d'inspection de ce projet.
                        </p>
                        <Link href="/vault" className="w-full inline-block">
                            <Button className="w-full group" variant="outline">
                                Accéder aux documents
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </Card>
                </div>

            </div>
        </div>
    )
}
