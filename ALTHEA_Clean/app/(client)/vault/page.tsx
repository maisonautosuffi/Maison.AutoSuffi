import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function GlobalVaultPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    // Fetch all documents across all projects for this user
    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            id,
            name,
            documents (*)
        `)
        .eq('client_user_id', user.id)

    if (error) console.error("Error fetching projects for vault:", error);

    const allDocs = (projects || []).flatMap((p: any) =>
        (p.documents || []).map((d: any) => ({ ...d, projectName: p.name, project_id: p.id }))
    ).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return (
        <div className="space-y-8 reveal-text">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-text-primary mb-1">Coffre-fort Global</h1>
                    <p className="text-text-secondary font-sans text-sm">Tous les documents liés à l'ensemble de vos projets.</p>
                </div>
            </div>

            <Card className="p-0 overflow-hidden reveal-text reveal-delay-1">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-bg-alt border-b border-text-accent/10">
                            <tr>
                                <th className="px-6 py-4 font-sans font-bold text-text-secondary uppercase tracking-wider text-xs">Nom du fichier</th>
                                <th className="px-6 py-4 font-sans font-bold text-text-secondary uppercase tracking-wider text-xs">Catégorie</th>
                                <th className="px-6 py-4 font-sans font-bold text-text-secondary uppercase tracking-wider text-xs">Projet</th>
                                <th className="px-6 py-4 font-sans font-bold text-text-secondary uppercase tracking-wider text-xs">Date</th>
                                <th className="px-6 py-4 text-right font-sans font-bold text-text-secondary uppercase tracking-wider text-xs">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-text-accent/10">
                            {allDocs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                                        Aucun document déposé.
                                    </td>
                                </tr>
                            ) : (
                                allDocs.map((doc: any) => (
                                    <tr key={doc.id} className="hover:bg-bg-alt/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-bg-card border border-text-accent/20 flex items-center justify-center text-text-secondary">
                                                    📄
                                                </div>
                                                <span className="font-medium text-text-primary font-sans">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-text-secondary">
                                            <span className="bg-bg-alt px-2 py-1 rounded text-xs border border-text-accent/10">{doc.category}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/project/${doc.project_id}`} className="text-gold hover:underline">
                                                {doc.projectName}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-text-secondary">
                                            {new Date(doc.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href={doc.url} download target="_blank" rel="noreferrer">
                                                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre">
                                                    TÉLÉCHARGER
                                                </Button>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
