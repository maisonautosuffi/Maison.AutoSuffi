import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { InviteForm } from './InviteForm'

export const metadata = {
    title: 'Nouvelle Invitation | ALTHÉA'
}

export default async function InviteUserPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    return (
        <div className="space-y-6 reveal-text max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/backoffice/users" className="text-text-secondary hover:text-text-primary transition-colors">
                    ← Retour aux utilisateurs
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-serif text-text-primary mb-1">Inviter un Utilisateur</h1>
                <p className="text-text-secondary font-sans text-sm">
                    Envoyez une invitation pour rejoindre votre espace. Le destinataire recevra un email.
                </p>
            </div>

            <div className="mt-8">
                <InviteForm />
            </div>
        </div>
    )
}
