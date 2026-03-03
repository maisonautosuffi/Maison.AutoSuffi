import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function AdminUsersPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    // Fetch all profiles from public.profiles
    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('createdAt', { ascending: false })

    const profilesList = profiles || []

    return (
        <div className="space-y-6 reveal-text">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-text-primary mb-1">Utilisateurs & Rôles</h1>
                    <p className="text-text-secondary font-sans text-sm">
                        Gérez les accès, les clients et le personnel sur la plateforme.
                    </p>
                </div>
                <Link href="/backoffice/users/invite">
                    <Button>
                        + INVITATION
                    </Button>
                </Link>
            </div>

            <Card className="p-0 overflow-hidden reveal-text reveal-delay-1">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-sm">
                        <thead className="bg-bg-alt text-text-secondary uppercase tracking-wider text-xs border-b border-text-accent/10">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Utilisateur</th>
                                <th className="px-6 py-4 font-semibold">Téléphone</th>
                                <th className="px-6 py-4 font-semibold">Rôle</th>
                                <th className="px-6 py-4 font-semibold text-center">Date d'inscription</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-text-accent/10">
                            {profilesList.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                                        Aucun profil trouvé.
                                    </td>
                                </tr>
                            ) : profilesList.map((profile: any) => (
                                <tr key={profile.id} className="hover:bg-bg-alt/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-text-primary">{profile.fullName || 'Utilisateur sans nom'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-text-secondary">{profile.phone || 'Non renseigné'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm ${profile.role === 'admin' ? 'bg-red-500/10 text-red-600' :
                                            profile.role === 'client' ? 'bg-gold/10 text-gold' :
                                                'bg-blue-500/10 text-blue-600'
                                            }`}>
                                            {profile.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-text-secondary">{new Date(profile.createdAt).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            MODIFIER
                                        </Button>
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
