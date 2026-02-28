import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-bg-alt font-sans">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-bg-dark text-text-light hidden md:flex md:flex-col shadow-xl z-20">
                <div className="p-6 border-b border-text-accent/20">
                    <span className="font-serif text-2xl tracking-wide text-white">ALTHÉA</span>
                    <span className="block text-xs uppercase tracking-widest text-gold mt-1">Opérations & Admin</span>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <a href="/backoffice" className="block px-4 py-3 rounded-md text-sm font-medium text-white bg-white/10 hover:bg-gold/20 hover:text-gold transition-colors">Dashboard</a>
                    <a href="/backoffice/projects" className="block px-4 py-3 rounded-md text-sm font-medium text-text-accent hover:bg-white/5 hover:text-white transition-colors">Projets</a>
                    <a href="/backoffice/milestones" className="block px-4 py-3 rounded-md text-sm font-medium text-text-accent hover:bg-white/5 hover:text-white transition-colors">Checklists & Jalons</a>
                    <a href="/backoffice/users" className="block px-4 py-3 rounded-md text-sm font-medium text-text-accent hover:bg-white/5 hover:text-white transition-colors">Utilisateurs</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-16 bg-bg-card border-b border-text-accent/20 flex items-center justify-between px-6 shadow-sm z-10 sticky top-0">
                    <div className="font-sans font-medium text-text-primary tracking-wide">Administration</div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs uppercase tracking-widest text-text-secondary bg-text-accent/10 px-3 py-1 rounded-full ring-1 ring-text-accent/20">Admin</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-bg-main relative">
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
