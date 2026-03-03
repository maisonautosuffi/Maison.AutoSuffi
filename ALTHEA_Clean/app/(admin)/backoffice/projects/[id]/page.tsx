import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { UploadDocumentForm } from './UploadDocumentForm'
import { CheckCircle2, XCircle, AlertCircle, Terminal, FileText, UploadCloud, Image as ImageIcon } from 'lucide-react'

export default async function AdminProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: project } = await supabase
        .from('projects')
        .select(`
            *,
            client:profiles!client_user_id ( * ),
            issues:issues ( * ),
            milestones:project_milestones ( * ),
            team:project_team ( *, profiles ( * ) ),
            documents ( * )
        `)
        .eq('id', id)
        .single()

    if (!project) {
        return (
            <div className="p-12 text-center text-text-secondary">
                <h1 className="text-2xl font-serif text-brand-confidence mb-2">Projet non trouvé</h1>
                <p>Le projet <strong>{id}</strong> n'existe pas ou a été supprimé.</p>
                <Link href="/backoffice/projects" className="mt-4 inline-block">
                    <Button variant="outline">Retour à la liste</Button>
                </Link>
            </div>
        )
    }

    const { data: rawAuditLog } = await supabase
        .from('audit_events')
        .select(`
            id,
            action,
            details,
            created_at,
            actor:profiles!actor_id ( full_name, role )
        `)
        .eq('project_id', id)
        .order('created_at', { ascending: false })

    const auditLog = rawAuditLog || [];

    // Mock Ops incoming validations for demonstration
    const pendingValidations = project.milestones?.filter((m: any) => m.status === 'PENDING').length > 0
        ? project.milestones?.filter((m: any) => m.status === 'PENDING')
        : [{ id: 'mock-1', label: 'Coulage Béton Armé', status: 'PENDING_REVIEW' }];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/backoffice/projects" className="text-text-secondary hover:text-brand-confidence transition-colors flex items-center gap-2 font-sans font-medium text-sm">
                    ← Retour au registre
                </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-text-accent/10 pb-6">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-serif text-brand-confidence mb-2">{project.name}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-sans">
                        <span className="bg-brand-confidence/5 text-brand-confidence px-3 py-1 rounded-sm border border-brand-confidence/10 uppercase tracking-wider font-bold text-xs">
                            {project.status}
                        </span>
                        <span className="text-text-secondary border-l border-text-accent/20 pl-3">
                            <span className="opacity-60">Client:</span> <span className="text-text-primary font-medium">{project.client?.fullName || project.client_name || 'Non défini'}</span>
                        </span>
                        <span className="text-text-secondary border-l border-text-accent/20 pl-3">
                            <span className="opacity-60">ID:</span> <span className="font-mono text-xs">{project.id.slice(0, 8)}</span>
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-brand-confidence border-brand-confidence hover:bg-brand-confidence hover:text-white">
                        Éditer le contrat
                    </Button>
                </div>
            </div>

            {/* Ops Validation Module */}
            <div className="mb-8">
                <h2 className="text-xl font-serif text-brand-confidence mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-brand-accent" />
                    Validation Qualité (Sécurité des Preuves)
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    {pendingValidations.map((val: any) => (
                        <Card key={val.id} className="p-6 border-l-4 border-l-brand-accent shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] bg-brand-accent text-white px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold">À vérifier</span>
                                    <span className="text-xs text-text-secondary font-mono">Soumis il y a 1h par Tech_01</span>
                                </div>
                                <h3 className="font-sans font-bold text-text-primary text-lg">{val.label}</h3>
                                <div className="mt-3 flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-sm text-text-secondary cursor-pointer hover:text-brand-confidence transition-colors">
                                        <ImageIcon className="w-4 h-4" />
                                        <span>2 Photos Certifiées (In-App)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-text-secondary cursor-pointer hover:text-brand-confidence transition-colors">
                                        <FileText className="w-4 h-4" />
                                        <span>Checklist (3/3)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Button className="flex-1 md:flex-none border-red-500 text-red-600 hover:bg-red-50" variant="outline">
                                    <XCircle className="w-4 h-4 mr-2" />
                                    REJETER
                                </Button>
                                <Button className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white shadow-sm">
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    CERTIFIER CONFORME
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column: Documents & Milestones */}
                <div className="space-y-8">
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-serif text-brand-confidence flex items-center gap-2">
                                <UploadCloud className="w-5 h-5 text-brand-accent" />
                                Coffre-Fort Documents
                            </h2>
                        </div>

                        <div className="mb-6 bg-bg-alt/50 p-4 border border-text-accent/10 rounded-lg">
                            <UploadDocumentForm projectId={project.id} />
                        </div>

                        {project.documents && project.documents.length > 0 ? (
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-bg-alt/50 border-b border-text-accent/10">
                                    <tr>
                                        <th className="px-4 py-3 font-sans font-bold text-text-secondary uppercase tracking-widest text-[10px]">Document</th>
                                        <th className="px-4 py-3 font-sans font-bold text-text-secondary uppercase tracking-widest text-[10px]">Date</th>
                                        <th className="px-4 py-3 text-right font-sans font-bold text-text-secondary uppercase tracking-widest text-[10px]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-text-accent/10">
                                    {project.documents.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((doc: any) => (
                                        <tr key={doc.id} className="hover:bg-bg-alt transition-colors">
                                            <td className="px-4 py-3 text-text-primary font-medium flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-brand-accent" />
                                                <span className="truncate max-w-[150px]">{doc.name}</span>
                                            </td>
                                            <td className="px-4 py-3 text-text-secondary font-mono text-xs">{new Date(doc.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-right">
                                                <a href={doc.url} download target="_blank" rel="noreferrer" className="text-brand-confidence hover:underline text-xs font-bold uppercase tracking-wider">
                                                    DL
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-8 text-text-secondary bg-bg-main border border-dashed border-text-accent/20 rounded-lg">
                                Aucun document sécurisé.
                            </div>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-lg font-serif text-brand-confidence mb-4">Suivi des Jalons (Total: {project.milestones?.length || 0})</h2>
                        {/* Placeholder for Milestone list */}
                        <div className="h-32 flex items-center justify-center bg-bg-alt border border-text-accent/10 rounded-lg">
                            <span className="text-sm text-text-secondary uppercase font-bold tracking-widest">Voir le détail du registre</span>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Audit Trail */}
                <div className="space-y-6">
                    <Card className="p-0 overflow-hidden border-none shadow-md ring-1 ring-brand-confidence/10">
                        <div className="bg-brand-confidence p-4 flex items-center justify-between">
                            <h2 className="text-lg font-serif text-white flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-brand-accent" />
                                Audit Trail
                            </h2>
                            <span className="bg-green-500/20 text-green-400 border border-green-400/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">
                                Append-Only
                            </span>
                        </div>
                        <div className="bg-[#1C1917] p-4 h-[500px] overflow-y-auto font-mono text-xs text-green-400/80 space-y-3">
                            {auditLog.map((log: any) => (
                                <div key={log.id} className="border-b border-white/5 pb-3">
                                    <div className="flex justify-between items-start mb-1 opacity-60">
                                        <span>[{new Date(log.created_at).toLocaleString('fr-FR')}]</span>
                                        <span>IP: Secure</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-brand-accent uppercase font-bold">{log.action}</span>
                                        <span className="text-white opacity-50">by</span>
                                        <span className="text-white bg-white/10 px-1 rounded">{log.actor?.full_name || log.actor?.role || 'System'}</span>
                                    </div>
                                    <div className="text-white/80 break-words leading-relaxed pl-4 border-l-2 border-brand-accent/30">
                                        {log.details || 'Aucun détail fourni.'}
                                    </div>
                                </div>
                            ))}
                            {/* Blinking cursor to simulate live terminal */}
                            <div className="flex items-center mt-4 opacity-50">
                                <span>&gt; LTHEA_SYSTEM_AWAITING_EVENTS</span>
                                <span className="w-2 h-4 bg-brand-accent ml-1 animate-pulse"></span>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    )
}
