import { Camera, ClipboardList, Package, User } from 'lucide-react';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-bg-main w-full max-w-md mx-auto relative shadow-2xl overflow-hidden font-sans">
            <header className="h-16 bg-bg-dark text-white flex items-center justify-between px-6 shadow-md sticky top-0 z-20">
                <div className="font-serif text-lg tracking-widest text-gold uppercase">Terrain</div>
                <div className="flex items-center gap-2 text-xs font-sans text-text-accent tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    En ligne
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-20 bg-bg-alt relative">
                {/* Visual texture */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-dark/5 to-transparent pointer-events-none"></div>
                {children}
            </main>

            <nav className="h-[72px] bg-bg-card border-t border-text-accent/20 flex items-center justify-around absolute bottom-0 w-full px-2 pb-safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-20">
                <a href="/terrain" className="flex flex-col items-center justify-center text-text-primary space-y-1.5 w-1/4 pt-1">
                    <ClipboardList size={22} className="text-gold" />
                    <span className="text-[10px] font-medium tracking-wide">Inspections</span>
                </a>
                <a href="/terrain/materials" className="flex flex-col items-center justify-center text-text-accent hover:text-text-primary transition-colors space-y-1.5 w-1/4 pt-1">
                    <Package size={22} />
                    <span className="text-[10px] font-medium tracking-wide">Livraisons</span>
                </a>
                <a href="/terrain/issues" className="flex flex-col items-center justify-center text-text-accent hover:text-text-primary transition-colors space-y-1.5 w-1/4 pt-1">
                    <div className="relative">
                        <Camera size={22} />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-card"></div>
                    </div>
                    <span className="text-[10px] font-medium tracking-wide">Réserves</span>
                </a>
                <a href="/terrain/profile" className="flex flex-col items-center justify-center text-text-accent hover:text-text-primary transition-colors space-y-1.5 w-1/4 pt-1">
                    <User size={22} />
                    <span className="text-[10px] font-medium tracking-wide">Profil</span>
                </a>
            </nav>
        </div>
    );
}
