import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
export default async function DashboardPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() { return cookieStore.getAll() }
        }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: projects } = await supabase
        .from('project')
        .select('*')
        .eq('clientUserId', user.id)
        .order('createdAt', { ascending: false })

    const projectsList = projects || []

    return (
        <div className="space-y-8 reveal-text">
            <div>
                <h1 className="text-4xl font-serif text-text-primary mb-2">Mes Projets</h1>
                <p className="text-text-secondary font-sans">
                    Bienvenue dans votre espace client ALTHÉA.
                </p>
            </div>

            {projectsList.length === 0 ? (
                <Card className="p-8 text-center text-text-secondary">
                    <p className="mb-4">Vous n'avez aucun projet en cours pour le moment.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-text reveal-delay-1">
                    {projectsList.map((project) => (
                        <Card key={project.id} className="p-0 overflow-hidden flex flex-col h-full">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="font-serif text-xl tracking-wide text-text-primary">{project.name}</h2>
                                    <span className="bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                                        {project.status === 'PRE_STUDY' ? 'À l\'étude' : 'En cours'}
                                    </span>
                                </div>
                                <div className="w-full bg-bg-alt rounded-sm h-1.5 mb-6 overflow-hidden">
                                    <div className="bg-gold h-1.5 rounded-sm transition-all duration-1000 ease-out" style={{ width: "15%" }}></div>
                                </div>
                                <div className="flex justify-between text-sm font-sans mb-2">
                                    <span className="text-text-secondary">Emplacement:</span>
                                    <span className="text-text-primary font-medium">{project.location || 'Non spécifié'}</span>
                                </div>
                                <div className="flex justify-between text-sm font-sans">
                                    <span className="text-text-secondary">Avancement:</span>
                                    <span className="text-gold font-bold">{project.progress}%</span>
                                </div>
                            </div>
                            <div className="bg-bg-alt px-6 py-4 border-t border-text-accent/10">
                                <Button variant="ghost" className="w-full justify-center text-sm font-semibold">
                                    VOIR LE PROJET →
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
