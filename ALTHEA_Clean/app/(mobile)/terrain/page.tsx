import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function TerrainPage() {
    return (
        <div className="p-4 space-y-6 reveal-text">

            <div className="flex items-center justify-between reveal-text reveal-delay-1">
                <h1 className="text-xl font-serif text-text-primary tracking-wide">Tableau de bord</h1>
                <div className="bg-bg-card text-text-secondary px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 ring-1 ring-text-accent/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-sans font-medium uppercase tracking-widest">Connecté</span>
                </div>
            </div>

            <Card className="p-0 overflow-hidden reveal-text reveal-delay-2">
                <div className="p-5 border-b border-text-accent/10 flex justify-between items-center">
                    <h2 className="font-sans font-medium text-text-primary">Inspections du jour</h2>
                    <span className="bg-gold/10 text-gold text-xs px-2.5 py-1 rounded-sm font-bold">2</span>
                </div>

                <div className="divide-y divide-text-accent/10">
                    <div className="p-5 hover:bg-bg-alt transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="font-sans font-semibold text-text-primary text-sm">Villa Saly - Lot A</p>
                                <p className="text-xs font-sans text-text-secondary mt-1">Gros œuvre - Murs rdc</p>
                            </div>
                            <span className="text-[10px] font-sans text-text-accent bg-text-accent/10 px-2 py-1 rounded-sm uppercase tracking-wider">
                                14:00
                            </span>
                        </div>
                        <Button className="w-full text-xs py-2" size="sm">
                            DÉMARRER L'INSPECTION
                        </Button>
                    </div>

                    <div className="p-5 hover:bg-bg-alt transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="font-sans font-semibold text-text-primary text-sm">Tour Almadies</p>
                                <p className="text-xs font-sans text-text-secondary mt-1">Fondations profonds</p>
                            </div>
                            <span className="text-[10px] font-sans text-text-accent bg-text-accent/10 px-2 py-1 rounded-sm uppercase tracking-wider">
                                16:30
                            </span>
                        </div>
                        <Button variant="outline" className="w-full text-xs py-2" size="sm">
                            DÉMARRER L'INSPECTION
                        </Button>
                    </div>
                </div>
            </Card>

            <Card className="p-5 bg-gold/5 ring-gold/20 flex items-center justify-between reveal-text reveal-delay-3">
                <div>
                    <p className="text-xs font-sans font-semibold text-gold uppercase tracking-wider mb-1">Dernière Synchronisation</p>
                    <p className="text-[10px] text-text-secondary">Il y a quelques instants</p>
                </div>
                <button className="text-gold hover:text-text-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
            </Card>
        </div>
    )
}
