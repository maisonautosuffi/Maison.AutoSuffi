import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'

export default async function AdminDashboardPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() { return cookieStore.getAll() }
        },
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const [{ count: projectCount }, { count: activeProfiles }] = await Promise.all([
        supabase.from('project').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
    ])

    return (
        <div className="space-y-8 reveal-text">
            <div>
                <h1 className="text-3xl font-serif text-text-primary tracking-wide mb-2">Vue d'ensemble Opérations</h1>
                <p className="text-text-secondary font-sans text-sm">
                    Suivez l'avancement global des projets et jalons.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-text reveal-delay-1">
                <Card className="p-6">
                    <p className="text-text-accent uppercase tracking-widest text-xs font-bold mb-2">Projets Actifs</p>
                    <p className="text-4xl font-serif text-text-primary">{projectCount}</p>
                </Card>
                <Card className="p-6">
                    <p className="text-text-accent uppercase tracking-widest text-xs font-bold mb-2">Jalons en attente</p>
                    <p className="text-4xl font-serif text-gold">5</p>
                </Card>
                <Card className="p-6">
                    <p className="text-text-accent uppercase tracking-widest text-xs font-bold mb-2">Réserves Ouvertes</p>
                    <p className="text-4xl font-serif text-red-500">3</p>
                </Card>
                <Card className="p-6">
                    <p className="text-text-accent uppercase tracking-widest text-xs font-bold mb-2">Profils Inscrits</p>
                    <p className="text-4xl font-serif text-text-primary">{activeProfiles}</p>
                </Card>
            </div>

            <div className="mt-12 reveal-text reveal-delay-2">
                <h2 className="text-xl font-serif text-text-primary mb-6">Dernières Activités</h2>
                <Card className="p-8 text-center bg-bg-card/50">
                    <p className="text-text-secondary">Aucune activité récente.</p>
                </Card>
            </div>
        </div>
    )
}
