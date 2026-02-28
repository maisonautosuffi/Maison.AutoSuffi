import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="space-y-8 reveal-text">
            <div>
                <h1 className="text-3xl font-serif text-text-primary mb-1">Paramètres du compte</h1>
                <p className="text-text-secondary font-sans text-sm">Gérez vos informations personnelles et vos préférences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-text reveal-delay-1">
                <Card className="p-6">
                    <h2 className="font-serif text-xl border-b border-text-accent/10 pb-3 mb-4">Profil Utilisateur</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Nom Complet</label>
                            <input type="text" defaultValue={profile?.fullName || ''} className="w-full bg-bg-alt border border-text-accent/20 rounded-sm p-2 text-text-primary focus:border-gold outline-none" disabled />
                        </div>
                        <div>
                            <label className="block text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Email</label>
                            <input type="email" defaultValue={profile?.email || ''} className="w-full bg-bg-alt border border-text-accent/20 rounded-sm p-2 text-text-primary focus:border-gold outline-none" disabled />
                        </div>
                        <div>
                            <label className="block text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Téléphone</label>
                            <input type="tel" defaultValue={profile?.phone || ''} className="w-full bg-bg-alt border border-text-accent/20 rounded-sm p-2 text-text-primary focus:border-gold outline-none" disabled />
                        </div>
                        <Button type="button" variant="outline" className="w-full mt-2">Mettre à jour le profil (Bientôt disponible)</Button>
                    </form>
                </Card>

                <Card className="p-6">
                    <h2 className="font-serif text-xl border-b border-text-accent/10 pb-3 mb-4">Sécurité & MFA</h2>
                    <p className="text-sm text-text-secondary mb-4">
                        Authentification à deux facteurs pour sécuriser l'accès à vos projets.
                    </p>
                    <div className="bg-bg-alt/50 p-4 border border-text-accent/10 rounded flex justify-between items-center">
                        <div>
                            <p className="font-bold text-text-primary text-sm">MFA Status</p>
                            <p className="text-xs text-red-500">Désactivé</p>
                        </div>
                        <Button variant="primary" size="sm">Activer Config</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
