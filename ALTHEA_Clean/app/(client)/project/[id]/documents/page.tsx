import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
export default async function DocumentVaultPage({ params }: { params: Promise<{ id: string }> }) {
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
            documents (
                *
            )
        `)
        .eq('id', projectId)
        .single()

    if (error) console.error("Error fetching project files:", error);

    // Sort documents desc as previously requested via Prisma
    if (project && project.documents) {
        project.documents.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    if (!project || project.client_user_id !== user.id) {
        redirect('/dashboard')
    }

    return (
        <div className="space-y-8 reveal-text">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 reveal-text reveal-delay-1">
                <div>
                    <h1 className="text-3xl font-serif text-text-primary mb-2">Coffre-fort Numérique</h1>
                    <p className="text-text-secondary font-sans flex items-center gap-2 text-sm">
                        <Link href="/dashboard" className="hover:text-gold transition-colors">Mes Projets</Link>
                        <span>›</span>
                        <Link href={`/project/${project.id}`} className="hover:text-gold transition-colors">{project.name}</Link>
                        <span>›</span>
                        <span className="text-text-primary">Documents</span>
                    </p>
                </div>
            </div>

            <Card className="p-0 overflow-hidden reveal-text reveal-delay-2">
                <div className="p-6 border-b border-text-accent/10">
                    <h2 className="font-serif text-xl text-text-primary">Vos Documents & Plans</h2>
                    <p className="text-sm text-text-secondary mt-1">
                        Retrouvez ici tous les rapports d'inspection, plans validés, et attestations d'avancement.
                    </p>
                </div>

                {project.documents.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-bg-alt rounded-full flex items-center justify-center mx-auto mb-4 text-text-accent/50">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <p className="text-text-secondary font-sans">Aucun document n'a encore été déposé pour ce projet.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-text-accent/10">
                        {project.documents.map((doc: any) => (
                            <li key={doc.id.toString()} className="p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center hover:bg-bg-alt transition-colors duration-200">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gold/10 text-gold rounded flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-sans font-medium text-text-primary">{doc.name}</p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary font-sans">
                                            <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                                            {doc.category && (
                                                <>
                                                    <span className="w-1 h-1 bg-text-accent/30 rounded-full"></span>
                                                    <span>{doc.category}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:text-right">
                                    <Button variant="outline" size="sm" className="text-xs">
                                        TÉLÉCHARGER
                                    </Button>
                                    {doc.size_bytes && (
                                        <p className="text-[10px] text-text-secondary mt-2">{(Number(doc.size_bytes) / 1024 / 1024).toFixed(2)} MB</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    )
}
