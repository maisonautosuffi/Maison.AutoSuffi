import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RefreshCw, PlayCircle } from 'lucide-react'

export default function TerrainPage() {
    return (
        <div className="p-4 space-y-6">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-serif text-brand-confidence tracking-wide">Vos Missions</h1>
                <div className="bg-white text-text-secondary px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 border border-text-accent/10">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-confidence">Sync O.K.</span>
                </div>
            </div>

            <Card className="p-0 overflow-hidden shadow-md border-none ring-1 ring-text-accent/5">
                <div className="p-6 border-b border-text-accent/10 flex justify-between items-center bg-white">
                    <h2 className="font-sans font-bold text-text-primary uppercase tracking-wider text-sm">Inspections du jour</h2>
                    <span className="bg-brand-accent/10 text-brand-accent text-xs px-3 py-1.5 rounded-full font-bold">2 cibles</span>
                </div>

                <div className="divide-y divide-text-accent/10 bg-bg-main">
                    {/* Mission 1 */}
                    <div className="p-6 hover:bg-white transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="font-serif font-semibold text-brand-confidence text-lg">Villa Saly - Lot A</p>
                                <p className="text-sm font-sans text-text-secondary mt-1">Gros œuvre - Murs rdc</p>
                            </div>
                            <span className="text-xs font-sans font-bold text-brand-accent bg-brand-accent/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                                14:00
                            </span>
                        </div>
                        <Link href="/terrain/inspection/1" className="block w-full">
                            <Button className="w-full text-sm py-4 h-auto shadow-md shadow-brand-confidence/10" size="lg">
                                <PlayCircle className="w-5 h-5 mr-2" />
                                DÉMARRER
                            </Button>
                        </Link>
                    </div>

                    {/* Mission 2 */}
                    <div className="p-6 hover:bg-white transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="font-serif font-semibold text-brand-confidence text-lg">Tour Almadies</p>
                                <p className="text-sm font-sans text-text-secondary mt-1">Fondations profondes</p>
                            </div>
                            <span className="text-xs font-sans font-bold text-text-secondary bg-text-accent/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                                16:30
                            </span>
                        </div>
                        <Link href="/terrain/inspection/2" className="block w-full">
                            <Button variant="outline" className="w-full text-sm py-4 h-auto" size="lg">
                                DÉMARRER
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>

            <Card className="p-5 bg-brand-confidence/5 border-brand-confidence/10 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-xs font-sans font-bold text-brand-confidence uppercase tracking-wider mb-1">Dernière Synchronisation</p>
                    <p className="text-[11px] text-text-secondary font-medium">Il y a 3 minutes</p>
                </div>
                <button className="text-brand-accent hover:text-brand-confidence transition-colors p-2 bg-white rounded-full shadow-sm">
                    <RefreshCw className="w-5 h-5" />
                </button>
            </Card>
        </div>
    )
}
