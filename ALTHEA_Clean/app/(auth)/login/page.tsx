import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { LoginForm } from './components/LoginForm'

export default async function LoginPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    if (supabaseUrl && supabaseAnonKey) {
        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: { getAll() { return cookieStore.getAll() } }
        })
        const { data: { user } } = await supabase.auth.getUser()
        if (user) redirect('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-alt py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Subtle background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
                <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-text-accent/10 blur-3xl"></div>
            </div>

            <Card className="max-w-md w-full space-y-8 z-10 p-10 md:p-12">
                <div className="text-center reveal-text">
                    <h2 className="text-4xl text-text-primary mb-2">
                        Axiomia
                    </h2>
                    <p className="text-sm font-sans tracking-widest text-gold uppercase mt-4 mb-8">
                        Sanctuaire de Paix
                    </p>
                    <p className="text-text-secondary font-sans text-sm">
                        Connectez-vous à votre espace projet.
                    </p>
                </div>

                <LoginForm />
            </Card>
        </div>
    )
}
