import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
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

    if (role !== 'admin') {
        redirect('/dashboard')
    }

    return (
        <div className="flex h-screen bg-bg-alt font-sans">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-[#0A192F] text-slate-300 hidden md:flex md:flex-col shadow-xl z-20">
                <div className="p-6 border-b border-white/10">
                    <span className="font-serif text-2xl tracking-wide text-white">AXIOMIA</span>
                    <span className="block text-xs uppercase tracking-widest text-brand-accent mt-1">Control Center</span>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/backoffice" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                        Vue Globale
                    </Link>
                    <Link href="/backoffice/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-5V2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H2v17Z" /><path d="M11 22v-6" /><path d="M15 22v-6" /><path d="M7 22v-6" /></svg>
                        Chantiers
                    </Link>
                    <Link href="/backoffice/inspectors" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        Inspecteurs
                    </Link>
                    <Link href="/backoffice/finance" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        Flux Financiers
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative bg-[#F9FAFB]">
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shadow-sm z-10 sticky top-0">
                    <div className="flex z-10 w-96 max-w-lg relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </span>
                        <input type="text" placeholder="Rechercher un chantier, un client..." className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-12 pr-4 text-sm font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-confidence focus:ring-1 focus:ring-brand-confidence transition-all" />
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 bg-[#0A192F] hover:bg-brand-confidence text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-md transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            Nouvel Inspecteur
                        </button>
                        <div className="w-px h-8 bg-slate-200" />
                        <span className="text-xs uppercase tracking-widest font-bold text-[#0A192F] bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">Admin</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
