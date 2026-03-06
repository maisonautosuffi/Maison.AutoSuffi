import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Search, Plus, MoreHorizontal, ShieldCheck, Clock, Ban, UserCheck } from 'lucide-react'

// Mock Data pour le réseau d'inspecteurs
const INSPECTORS_DATA = [
    { id: "INS-001", name: "Dr. Amadou Faye", zone: "Dakar, Sénégal", kyc: "Vérifié", kycColor: "bg-green-100 text-green-700 border-green-200", missions: 4, reliability: 98 },
    { id: "INS-002", name: "Kouamé B.", zone: "Abidjan, RCI", kyc: "Vérifié", kycColor: "bg-green-100 text-green-700 border-green-200", missions: 2, reliability: 95 },
    { id: "INS-003", name: "Sarah M.", zone: "Douala, Cameroun", kyc: "Alerte KYC", kycColor: "bg-red-100 text-red-700 border-red-200", missions: 0, reliability: 0 },
    { id: "INS-004", name: "Jean-Paul K.", zone: "Kinshasa, RDC", kyc: "En attente", kycColor: "bg-orange-100 text-orange-700 border-orange-200", missions: 1, reliability: 100 },
    { id: "INS-005", name: "Fatou Diop", zone: "Thiès, Sénégal", kyc: "Vérifié", kycColor: "bg-green-100 text-green-700 border-green-200", missions: 12, reliability: 99 },
];

export default function InspectorsPage() {
    return (
        <div className="space-y-8">
            {/* EN-TÊTE PAGE / HEADER INTERNE */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-[#0A192F]">Réseau d'Inspecteurs Certifiés</h1>
                    <p className="text-slate-500 mt-1">Gérez vos experts tiers de confiance sur le terrain.</p>
                </div>
                <Button className="bg-[#0A192F] hover:bg-brand-confidence text-white rounded-xl shadow-md h-11 px-5">
                    <Plus className="w-4 h-4 mr-2" /> Enrôler un inspecteur
                </Button>
            </div>

            {/* TABLEAU DES INSPECTEURS */}
            <Card className="rounded-2xl border-slate-100 shadow-sm bg-white overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Rechercher un inspecteur..." className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm font-sans text-slate-900 focus:outline-none focus:border-brand-confidence focus:ring-1 focus:ring-brand-confidence transition-all" />
                    </div>
                </div>

                {/* Structure DataTable */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Nom de l'inspecteur</th>
                                <th className="px-6 py-4">Zone d'intervention</th>
                                <th className="px-6 py-4">Statut KYC</th>
                                <th className="px-6 py-4 text-center">Missions actives</th>
                                <th className="px-6 py-4">Fiabilité (Audit)</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {INSPECTORS_DATA.map((inspector) => (
                                <tr key={inspector.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-brand-confidence/10 text-brand-confidence flex items-center justify-center shrink-0">
                                                <UserCheck className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-[#0A192F]">{inspector.name}</p>
                                                <p className="text-xs text-slate-500">{inspector.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {inspector.zone}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider flex items-center w-fit gap-1 ${inspector.kycColor}`}>
                                            {inspector.kyc === "Vérifié" && <ShieldCheck className="w-3 h-3" />}
                                            {inspector.kyc === "En attente" && <Clock className="w-3 h-3" />}
                                            {inspector.kyc === "Alerte KYC" && <Ban className="w-3 h-3" />}
                                            {inspector.kyc}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-medium text-[#0A192F] bg-slate-100 px-3 py-1 rounded-lg">
                                            {inspector.missions}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div className={`h-full rounded-full ${inspector.reliability > 90 ? 'bg-green-500' : inspector.reliability > 0 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${inspector.reliability || 5}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 w-8">{inspector.reliability}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-[#0A192F] hover:bg-slate-100 rounded-full">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
