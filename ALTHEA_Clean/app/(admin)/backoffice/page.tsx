import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Search, Plus, TrendingUp, AlertCircle, Building2, MoreHorizontal } from 'lucide-react'

// Mock Data pour le tableau de bord Administrateur
const ADMIN_KPIS = [
    { title: "Volume Séquestré", value: "1.2M €", icon: TrendingUp, color: "text-emerald-500", trend: "+12% ce mois" },
    { title: "Chantiers Actifs", value: "42", icon: Building2, color: "text-brand-confidence", trend: "3 nouveaux" },
    { title: "Alertes / Litiges", value: "2", icon: AlertCircle, color: "text-orange-500", trend: "Action requise" },
];

const RECENT_PROJECTS = [
    { id: "PRJ-001", client: "Sow & Co", country: "Sénégal", progress: 45, nextMilestone: "Élévation des murs", status: "Action Requise", statusColor: "bg-orange-100 text-orange-700 border-orange-200" },
    { id: "PRJ-002", client: "Famille Diallo", country: "Côte d'Ivoire", progress: 80, nextMilestone: "Toiture", status: "En cours", statusColor: "bg-green-100 text-green-700 border-green-200" },
    { id: "PRJ-003", client: "Moussa Diagne", country: "Sénégal", progress: 15, nextMilestone: "Fondations", status: "Alerte Retard", statusColor: "bg-red-100 text-red-700 border-red-200" },
    { id: "PRJ-004", client: "Awa Ndiaye", country: "Cameroun", progress: 95, nextMilestone: "Remise des clés", status: "En cours", statusColor: "bg-green-100 text-green-700 border-green-200" },
    { id: "PRJ-005", client: "SCI Horizon", country: "RDC", progress: 0, nextMilestone: "Signature", status: "En attente fonds", statusColor: "bg-slate-100 text-slate-700 border-slate-200" },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* EN-TÊTE PAGE / HEADER INTERNE */}
            <div>
                <h1 className="text-3xl font-serif text-[#0A192F]">Axiomia Control Center</h1>
                <p className="text-slate-500 mt-1">Vue d'ensemble et pilotage financier. Bienvenue, Administrateur.</p>
            </div>

            {/* WIDGETS KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ADMIN_KPIS.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={index} className="p-6 rounded-2xl border-slate-100 shadow-sm bg-white hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-medium text-slate-600 font-sans">{kpi.title}</h3>
                                <div className={`p-2 rounded-lg bg-slate-50 ${kpi.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-3xl font-serif text-[#0A192F] tracking-tight">{kpi.value}</p>
                                <p className="text-sm font-medium text-slate-500 mt-2">{kpi.trend}</p>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* TABLEAU DES CHANTIERS EN COURS */}
            <Card className="rounded-2xl border-slate-100 shadow-sm bg-white overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="font-serif text-xl text-[#0A192F]">Chantiers en cours d'exécution</h2>
                    <Button variant="outline" className="text-sm font-medium border-slate-200 text-slate-600 bg-white hover:bg-slate-50">
                        Voir tout
                    </Button>
                </div>

                {/* Structure DataTable Mobile-Friendly */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Client / Référence</th>
                                <th className="px-6 py-4">Pays</th>
                                <th className="px-6 py-4">Progression</th>
                                <th className="px-6 py-4">Prochain Jalon</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {RECENT_PROJECTS.map((project) => (
                                <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-[#0A192F]">{project.client}</p>
                                        <p className="text-xs text-slate-500">{project.id}</p>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                                        {/* Drapeau textuel / Emoji */}
                                        {project.country === 'Sénégal' && '🇸🇳'}
                                        {project.country === "Côte d'Ivoire" && '🇨🇮'}
                                        {project.country === 'Cameroun' && '🇨🇲'}
                                        {project.country === 'RDC' && '🇨🇩'}
                                        {project.country}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-[#0A192F] w-8">{project.progress}%</span>
                                            <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-brand-confidence h-full rounded-full" style={{ width: `${project.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {project.nextMilestone}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${project.statusColor}`}>
                                            {project.status}
                                        </span>
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
