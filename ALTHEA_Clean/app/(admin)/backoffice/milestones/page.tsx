import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function AdminMilestonesPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: milestones, error } = await supabase
        .from('project_milestones')
        .select(`
            *,
            project:projects!project_id ( name )
        `)
        .order('created_at', { ascending: false })

    if (error) console.error("Error fetching milestones:", error);

    const mappedMilestones = milestones || []

    return (
        <div className="space-y-6 reveal-text">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-text-primary mb-1">Jalons & Checklists</h1>
                    <p className="text-text-secondary font-sans text-sm">
                        Suivi global des jalons sur l'ensemble des chantiers en cours.
                    </p>
                </div>
                <Link href="/backoffice/milestones/new">
                    <Button>
                        + NOUVEAU JALON
                    </Button>
                </Link>
            </div>

            <Card className="p-0 overflow-hidden reveal-text reveal-delay-1">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-sm">
                        <thead className="bg-bg-alt text-text-secondary uppercase tracking-wider text-xs border-b border-text-accent/10">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Label</th>
                                <th className="px-6 py-4 font-semibold">Projet</th>
                                <th className="px-6 py-4 font-semibold">Date de création</th>
                                <th className="px-6 py-4 font-semibold text-center">Date Validation</th>
                                <th className="px-6 py-4 font-semibold text-center">Statut</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-text-accent/10">
                            {mappedMilestones.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                                        Aucun jalon défini.
                                    </td>
                                </tr>
                            ) : mappedMilestones.map((milestone: any) => (
                                <tr key={milestone.id} className="hover:bg-bg-alt/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-text-primary">{milestone.label}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-text-primary">{milestone.project?.name || 'Nom Inconnu'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-text-secondary">{new Date(milestone.created_at).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-text-secondary">{milestone.validated_at ? new Date(milestone.validated_at).toLocaleDateString() : '-'}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm ${milestone.status === 'VALIDATED' ? 'bg-green-500/10 text-green-600' :
                                            milestone.status === 'IN_PROGRESS' ? 'bg-gold/10 text-gold' :
                                                'bg-bg-alt text-text-secondary'
                                            }`}>
                                            {milestone.status === 'VALIDATED' ? 'VALIDÉ' :
                                                milestone.status === 'IN_PROGRESS' ? 'EN COURS' : 'NON DÉBUTÉ'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/backoffice/milestones/${milestone.id}`}>
                                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                GÉRER
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
