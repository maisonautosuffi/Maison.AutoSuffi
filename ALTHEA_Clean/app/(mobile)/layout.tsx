import { Camera, ClipboardList, Package, User } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function MobileLayout({ children }: { children: React.ReactNode }) {
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

    if (role === 'client') {
        redirect('/dashboard')
    }

    return (
        <div className="flex flex-col h-screen bg-bg-main w-full max-w-md mx-auto relative shadow-2xl overflow-hidden font-sans">
            <header className="h-16 bg-brand-confidence text-white flex items-center justify-between px-6 shadow-md sticky top-0 z-20">
                <div className="font-serif text-lg tracking-widest text-brand-accent uppercase">LTHÉA Terrain</div>
                <div className="flex items-center gap-2 text-xs font-sans text-brand-accent tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 border border-white/20"></span>
                    En ligne
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24 bg-bg-alt relative">
                {/* Visual texture */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-confidence/5 to-transparent pointer-events-none"></div>
                {children}
            </main>

            {/* ENLARGED BOTTOM NAV FOR GLOVE USAGE */}
            <nav className="h-[88px] bg-bg-card border-t border-text-accent/20 flex items-center justify-around absolute bottom-0 w-full px-2 pb-safe-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.05)] z-20">
                <Link href="/terrain" className="flex flex-col items-center justify-center text-brand-confidence space-y-1.5 w-1/4 h-full">
                    <ClipboardList size={28} className="text-brand-accent" />
                    <span className="text-[11px] font-bold tracking-wide">Inspections</span>
                </Link>
                <Link href="/terrain/materials" className="flex flex-col items-center justify-center text-text-accent hover:text-brand-confidence transition-colors space-y-1.5 w-1/4 h-full">
                    <Package size={28} />
                    <span className="text-[11px] font-medium tracking-wide">Livraisons</span>
                </Link>
                <Link href="/terrain/issues" className="flex flex-col items-center justify-center text-text-accent hover:text-brand-confidence transition-colors space-y-1.5 w-1/4 h-full">
                    <div className="relative">
                        <Camera size={28} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-bg-card"></div>
                    </div>
                    <span className="text-[11px] font-medium tracking-wide">Réserves</span>
                </Link>
                <Link href="/terrain/profile" className="flex flex-col items-center justify-center text-text-accent hover:text-brand-confidence transition-colors space-y-1.5 w-1/4 h-full">
                    <User size={28} />
                    <span className="text-[11px] font-medium tracking-wide">Profil</span>
                </Link>
            </nav>
        </div>
    );
}
