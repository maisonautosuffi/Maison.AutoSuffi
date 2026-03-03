import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Download, ShieldCheck, FolderLock } from 'lucide-react'

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
        <div className="space-y-10 reveal-text">
            {/* HEROBANNER FOR VAULT */}
            <div className="bg-brand-confidence rounded-[2rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px] -z-0" />
                <div className="relative z-10 space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 text-brand-accent text-sm font-bold tracking-widest uppercase">
                        <FolderLock className="w-4 h-4" /> Espace Sécurisé
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif leading-tight">Coffre-fort Global</h1>
                    <p className="text-gray-300 font-sans text-lg font-light leading-relaxed">
                        L'ensemble des documents légaux, techniques et financiers liés à vos projets. Conservés de manière indélébile et sécurisée.
                    </p>
                </div>
                <div className="relative z-10 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-6 shrink-0">
                    <div className="p-4 bg-brand-accent/20 rounded-2xl text-brand-accent">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-sans mb-1">Documents totaux</p>
                        <p className="text-3xl font-serif text-white">{allDocs.length}</p>
                    </div>
                </div>
            </div>

            {/* DOCUMENTS TABLE */}
            <Card className="p-0 overflow-hidden shadow-xl border-none bg-white rounded-[2rem] reveal-text reveal-delay-1">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-bg-main border-b border-black/5">
                            <tr>
                                <th className="px-8 py-6 font-sans font-semibold text-text-secondary uppercase tracking-[0.1em] text-xs">Nom du fichier</th>
                                <th className="px-8 py-6 font-sans font-semibold text-text-secondary uppercase tracking-[0.1em] text-xs">Catégorie</th>
                                <th className="px-8 py-6 font-sans font-semibold text-text-secondary uppercase tracking-[0.1em] text-xs">Projet</th>
                                <th className="px-8 py-6 font-sans font-semibold text-text-secondary uppercase tracking-[0.1em] text-xs">Date d'ajout</th>
                                <th className="px-8 py-6 text-right font-sans font-semibold text-text-secondary uppercase tracking-[0.1em] text-xs">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {allDocs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-text-secondary bg-bg-main/30">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <FolderLock className="w-12 h-12 text-black/10" />
                                            <p className="text-lg font-serif">Aucun document dans votre coffre</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                allDocs.map((doc: any) => (
                                    <tr key={doc.id} className="hover:bg-bg-main/50 transition-all duration-300 group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-brand-confidence/5 flex items-center justify-center text-brand-confidence group-hover:scale-110 group-hover:bg-brand-confidence group-hover:text-white transition-all">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-text-primary text-base">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-text-secondary">
                                            <span className="bg-brand-accent/10 text-brand-confidence px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide border border-brand-accent/20 uppercase">
                                                {doc.category || 'Non classé'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <Link href={`/project/${doc.project_id}`} className="text-brand-accent hover:text-brand-confidence font-medium hover:underline transition-colors">
                                                {doc.projectName}
                                            </Link>
                                        </td>
                                        <td className="px-8 py-5 text-text-secondary font-sans">
                                            {new Date(doc.created_at).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <a href={doc.url} download target="_blank" rel="noreferrer">
                                                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-all text-xs font-bold tracking-widest border-brand-confidence/20 text-brand-confidence hover:bg-brand-confidence hover:text-white rounded-full px-6 py-2 h-auto flex items-center gap-2">
                                                    <Download className="w-4 h-4" /> TÉLÉCHARGER
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
