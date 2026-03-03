import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function AdminProjectsPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    // Fetch projects and join with profiles table based on client_user_id
    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            *,
            client:profiles!client_user_id ( * ),
            issues:issues ( count ),
            milestones:project_milestones ( count )
        `)
        .order('created_at', { ascending: false })

    if (error) console.error("Error fetching projects:", error);

    // In a real app we'd fetch actual counts. Here we add mock counts initially or fetch them accurately.
    const mappedProjects = (projects || []).map((p: any) => ({
        ...p,
        client: Array.isArray(p.client) ? p.client[0] : p.client, // Handle 1:1 join shape depending on FK constraints
        _count: {
            issues: p.issues?.[0]?.count || 0,
            milestones: p.milestones?.[0]?.count || 0
        }
    }))

    return (
        <div className="space-y-6 reveal-text">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-text-primary mb-1">Gestion des Projets</h1>
                    <p className="text-text-secondary font-sans text-sm">
                        Consultez et gérez l'ensemble des chantiers AXIOMIA.
                    </p>
                </div>
                <Link href="/backoffice/projects/new">
                    <Button>
                        + NOUVEAU PROJET
                    </Button>
                </Link>
            </div>

            <Card className="p-0 overflow-hidden reveal-text reveal-delay-1">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-sm">
                        <thead className="bg-bg-alt text-text-secondary uppercase tracking-wider text-xs border-b border-text-accent/10">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Projet</th>
                                <th className="px-6 py-4 font-semibold">Client</th>
                                <th className="px-6 py-4 font-semibold">Statut</th>
                                <th className="px-6 py-4 font-semibold text-center">Avancement</th>
                                <th className="px-6 py-4 font-semibold text-center">Réserves</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-text-accent/10">
                            {mappedProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                                        Aucun projet trouvé.
                                    </td>
                                </tr>
                            ) : mappedProjects.map((project: any) => (
                                <tr key={project.id} className="hover:bg-bg-alt/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-text-primary">{project.name}</div>
                                        <div className="text-xs text-text-secondary mt-1">{project.location || 'Localisation N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-text-primary">{project.client?.fullName || project.clientName || 'Non assigné'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm ${project.status === 'ACTIVE' ? 'bg-green-500/10 text-green-600' :
                                            project.status === 'PRE_STUDY' ? 'bg-gold/10 text-gold' :
                                                'bg-bg-alt text-text-secondary'
                                            }`}>
                                            {project.status === 'ACTIVE' ? 'EN COURS' : project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-text-primary">{project.progress}%</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={project._count.issues > 0 ? "text-red-500 font-bold" : "text-text-secondary"}>
                                            {project._count.issues}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/backoffice/projects/${project.id}`}>
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
