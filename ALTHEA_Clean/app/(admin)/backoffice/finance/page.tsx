import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Search, TrendingUp, HandCoins, Building2, MoreHorizontal, ArrowUpRight, ArrowDownRight, RefreshCw, FileText } from 'lucide-react'

// Mock Data pour les widgets financiers
const FINANCE_KPIS = [
    { title: "Volume Total Séquestré", value: "1 250 400 €", icon: LockIcon, color: "text-brand-confidence", bg: "bg-brand-confidence/10", border: "border-brand-confidence/20" },
    { title: "Fonds Libérés (All-time)", value: "3 450 000 €", icon: HandCoins, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    { title: "Revenus Axiomia (Commissions)", value: "184 200 €", icon: TrendingUp, color: "text-brand-accent", bg: "bg-brand-accent/10", border: "border-brand-accent/20" },
];

// Helper icon pour contourner le conflit d'import si 'Lock' n'est pas dispo
function LockIcon(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
}

// Mock Data transactions
const TRANSACTIONS_DATA = [
    { id: "TX-2026-001", date: "12 Jan 2026, 14:32", project: "Villa Dakar - Almadies", type: "Dépôt Client", amount: "+ 25 000 €", typeIcon: ArrowDownRight, amountColor: "text-green-600", status: "Réussi", statusColor: "bg-green-100 text-green-700" },
    { id: "TX-2026-002", date: "11 Jan 2026, 09:15", project: "Famille Diallo (Abidjan)", type: "Déblocage Jalon", amount: "- 15 000 €", typeIcon: ArrowUpRight, amountColor: "text-[#0A192F]", status: "Réussi", statusColor: "bg-green-100 text-green-700" },
    { id: "TX-2026-003", date: "11 Jan 2026, 09:15", project: "Axiomia Corporate", type: "Prélèvement Commission", amount: "+ 750 €", typeIcon: HandCoins, amountColor: "text-brand-accent font-bold", status: "Réussi", statusColor: "bg-green-100 text-green-700" },
    { id: "TX-2026-004", date: "10 Jan 2026, 16:45", project: "Awa Ndiaye (Cameroun)", type: "Déblocage Jalon", amount: "- 40 000 €", typeIcon: RefreshCw, amountColor: "text-slate-500", status: "En transit", statusColor: "bg-orange-100 text-orange-700" },
    { id: "TX-2026-005", date: "08 Jan 2026, 11:00", project: "Sow & Co", type: "Dépôt Client", amount: "+ 120 000 €", typeIcon: ArrowDownRight, amountColor: "text-green-600", status: "Réussi", statusColor: "bg-green-100 text-green-700" },
];

export default function FinancePage() {
    return (
        <div className="space-y-8">
            {/* EN-TÊTE PAGE / HEADER INTERNE */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-[#0A192F]">Trésorerie & Séquestre</h1>
                    <p className="text-slate-500 mt-1">Plateforme Axiomia Pay - Pilotage centralisé des flux financiers.</p>
                </div>
                <Button variant="outline" className="border-slate-200 text-slate-600 h-11 px-5 shadow-sm bg-white">
                    Exporter le journal comptable
                </Button>
            </div>

            {/* WIDGETS KPIs FINANCIERS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FINANCE_KPIS.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={index} className={`p-6 rounded-2xl border ${kpi.border} shadow-sm bg-white hover:shadow-md transition-shadow`}>
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-medium text-[#0A192F] font-sans">{kpi.title}</h3>
                                <div className={`p-2.5 rounded-xl ${kpi.bg} ${kpi.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className={`text-4xl font-serif tracking-tight ${index === 2 ? 'text-brand-accent' : 'text-[#0A192F]'}`}>{kpi.value}</p>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* TABLEAU DES TRANSACTIONS */}
            <Card className="rounded-2xl border-slate-100 shadow-sm bg-white overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="font-serif text-xl text-[#0A192F]">Dernières Transactions</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-sm font-medium border-slate-200 text-slate-600 bg-white hover:bg-slate-50 h-9">
                            Filtrer par type
                        </Button>
                    </div>
                </div>

                {/* Structure DataTable */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Date / TXID</th>
                                <th className="px-6 py-4">Chantier / Source</th>
                                <th className="px-6 py-4">Type d'opération</th>
                                <th className="px-6 py-4 text-right">Montant</th>
                                <th className="px-6 py-4 text-center">Statut Axiomia Pay</th>
                                <th className="px-6 py-4 text-right">Reçu</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {TRANSACTIONS_DATA.map((tx) => {
                                const TypeIcon = tx.typeIcon;
                                return (
                                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[#0A192F]">{tx.date}</p>
                                            <p className="text-xs text-slate-400 font-mono mt-0.5">{tx.id}</p>
                                        </td>
                                        <td className="px-6 py-4 text-[#0A192F] font-medium">
                                            {tx.project}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <TypeIcon className="w-4 h-4 text-slate-400" />
                                                {tx.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`font-serif text-lg tracking-tight ${tx.amountColor}`}>
                                                {tx.amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${tx.statusColor}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-brand-confidence hover:bg-brand-confidence/10 rounded-full">
                                                <FileText className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
