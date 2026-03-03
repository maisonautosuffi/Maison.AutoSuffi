import React from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single()

    const role = profile?.role || 'client'

    if (role === 'technicien' || role === 'ingenieur') {
        redirect('/terrain')
    }

    return (
        <div className="flex h-screen bg-bg-alt font-sans">
            {/* Client Sidebar */}
            <aside className="w-64 bg-bg-card border-r border-text-accent/20 hidden md:flex md:flex-col shadow-sm">
                <div className="p-6 border-b border-text-accent/20">
                    <span className="font-serif text-2xl text-text-primary tracking-wide">AXIOMIA</span>
                    <span className="block text-xs uppercase tracking-widest text-gold mt-1">Client Space</span>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <Link href="/dashboard" className="block px-4 py-3 rounded-md text-sm font-medium text-text-primary bg-text-accent/5 hover:bg-gold/10 hover:text-gold transition-colors">Mes Projets</Link>
                    <Link href="/vault" className="block px-4 py-3 rounded-md text-sm font-medium text-text-secondary hover:bg-text-accent/5 transition-colors">Coffre-fort</Link>
                    <Link href="/settings" className="block px-4 py-3 rounded-md text-sm font-medium text-text-secondary hover:bg-text-accent/5 transition-colors">Paramètres</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-16 bg-bg-card/80 backdrop-blur-md border-b border-text-accent/20 flex items-center justify-between px-6 z-10 sticky top-0">
                    <div className="font-serif text-xl tracking-wide text-text-primary md:hidden">AXIOMIA</div>
                    <div className="ml-auto flex items-center gap-4">
                        <button className="text-text-secondary hover:text-gold transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex justify-center items-center text-gold font-medium text-sm ring-1 ring-gold/30">
                            C
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                    {/* Decorative subtle background element */}
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
                        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
