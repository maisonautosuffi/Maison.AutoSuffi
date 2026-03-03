import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { MilestoneForm } from './MilestoneForm'

export const metadata = {
    title: 'Nouveau Jalon | AXIOMIA'
}

export default async function NewMilestonePage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    // Fetch projects to populate the project selection dropdown
    const { data: projects } = await supabase
        .from('projects')
        .select('id, name')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6 reveal-text max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/backoffice/milestones" className="text-text-secondary hover:text-text-primary transition-colors">
                    ← Retour aux jalons
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-serif text-text-primary mb-1">Nouveau Jalon</h1>
                <p className="text-text-secondary font-sans text-sm">
                    Créez un nouveau jalon et associez-le à un projet.
                </p>
            </div>

            <div className="mt-8">
                <MilestoneForm projects={projects || []} />
            </div>
        </div>
    )
}
