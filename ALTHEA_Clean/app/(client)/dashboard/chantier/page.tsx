'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Lock, FileText, CheckCircle2, Hourglass, Camera, MapPin, Calendar, ArrowRight, X, UserCheck, ShieldCheck, Zap, Droplet, Paintbrush, Key } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock Data
const MOCK_DATA = {
    project: {
        name: "Villa Dakar - Almadies",
        startDate: "12 Janvier 2026",
        status: "En cours",
        budgetTotal: 120000,
        budgetSecured: 25000,
        progress: 45,
        currentPhase: "Élévation des murs",
        actionRequired: "Le rapport des fondations est prêt."
    },
    milestones: [
        { id: 1, title: "Fondations", status: "completed", description: "Terminé et Payé", icon: CheckCircle2, iconColor: "text-green-500", bgColor: "bg-green-50" },
        { id: 2, title: "Élévation des murs", status: "in_progress", description: "En cours d'inspection", icon: Hourglass, iconColor: "text-orange-500", bgColor: "bg-orange-50" },
        { id: 3, title: "Toiture", status: "locked", description: "Fonds bloqués", icon: Lock, iconColor: "text-slate-400", bgColor: "bg-slate-50" },
        { id: 4, title: "Second œuvre", status: "locked", description: "Fonds bloqués", icon: Lock, iconColor: "text-slate-400", bgColor: "bg-slate-50" },
    ],
    extendedMilestones: [
        { id: 1, title: "Fondations", status: "completed", description: "Rapport validé le 12 Jan 2026", icon: CheckCircle2, iconColor: "text-green-500", bgColor: "bg-green-50" },
        { id: 2, title: "Élévation des murs", status: "in_progress", description: "Inspection de la maçonnerie en cours", icon: Hourglass, iconColor: "text-orange-500", bgColor: "bg-orange-50" },
        { id: 3, title: "Toiture", status: "locked", description: "Charpente et couverture", icon: Lock, iconColor: "text-slate-400", bgColor: "bg-slate-50" },
        { id: 4, title: "Second œuvre", status: "locked", description: "Isolation et cloisons internes", icon: Lock, iconColor: "text-slate-400", bgColor: "bg-slate-50" },
        { id: 5, title: "Électricité & Plomberie", status: "locked", description: "Gaines, câblages et réseaux d'eau", icon: Zap, iconColor: "text-slate-400", bgColor: "bg-slate-50" },
        { id: 6, title: "Menuiseries extérieures", status: "locked", description: "Pose des fenêtres et portes", icon: Droplet, iconColor: "text-slate-400", bgColor: "bg-slate-50" },
        { id: 7, title: "Peintures et Finitions", status: "locked", description: "Revêtements de sol et murs", icon: Paintbrush, iconColor: "text-slate-400", bgColor: "bg-slate-50" },
        { id: 8, title: "Réception et Remise des clés", status: "locked", description: "Audit final et livraison", icon: Key, iconColor: "text-slate-400", bgColor: "bg-slate-50" },
    ],
    photos: [
        { id: 1, src: "https://images.unsplash.com/photo-1541888081622-1d5e12812678?w=500&q=80", date: "Il y a 2 jours", alt: "Vue fondation" },
        { id: 2, src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80", date: "Il y a 5 jours", alt: "Ferraillage" },
        { id: 3, src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=80", date: "Il y a 10 jours", alt: "Installation de grue" },
        { id: 4, src: "https://images.unsplash.com/photo-1504307651254-35680f356f58?w=500&q=80", date: "Il y a 12 jours", alt: "Plan de masse" },
    ]
}

export default function DashboardChantierPage() {
    // État pour afficher ou non la modale de validation de rapport
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    // État pour afficher le Sheet du planning
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    // État pour simuler le déblocage réussi sans backend
    const [isFondsDebloques, setIsFondsDebloques] = useState(false);

    const handleApprouver = () => {
        setIsFondsDebloques(true);
        setTimeout(() => setIsReportModalOpen(false), 2000); // Fermeture auto après succès
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-4 sm:p-6 lg:p-8 font-sans pb-24 relative">

            {/* 1. LE HEADER */}
            <div className="max-w-7xl mx-auto mb-8 space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl sm:text-4xl font-serif text-[#0A192F]">{MOCK_DATA.project.name}</h1>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200 uppercase tracking-wider">
                        {MOCK_DATA.project.status}
                    </span>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-sm">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Début du chantier : {MOCK_DATA.project.startDate}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Sénégal</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-6">

                {/* 2. LA RANGÉE DES WIDGETS (3 Cartes en haut) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Widget 1: Le Séquestre */}
                    <Card className="bg-white p-6 rounded-2xl border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-confidence/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-serif text-lg text-[#0A192F] font-medium">Fonds Sécurisés</h3>
                            <div className="p-2 bg-brand-confidence/10 rounded-lg text-brand-confidence">
                                <Lock className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl font-serif text-brand-confidence tracking-tight">
                                {MOCK_DATA.project.budgetSecured.toLocaleString('fr-FR')} <span className="text-2xl">€</span>
                            </p>
                            <p className="text-sm font-light text-slate-500">
                                Sur un budget total de {MOCK_DATA.project.budgetTotal.toLocaleString('fr-FR')} €
                            </p>
                        </div>
                    </Card>

                    {/* Widget 2: L'Avancement */}
                    <Card className="bg-white p-6 rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-serif text-lg text-[#0A192F] font-medium">Progression Globale</h3>
                            <span className="text-xl font-bold text-brand-confidence">{MOCK_DATA.project.progress}%</span>
                        </div>
                        <div className="space-y-3">
                            {/* Shadcn/Tailwind style Progress Bar */}
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-brand-confidence h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                                    style={{ width: `${MOCK_DATA.project.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm font-medium text-slate-600">
                                Phase actuelle : <span className="font-light text-slate-500">{MOCK_DATA.project.currentPhase}</span>
                            </p>
                        </div>
                    </Card>

                    {/* Widget 3: Action Requise (Le CTA) */}
                    <Card className="bg-[#0A192F] p-6 rounded-2xl shadow-lg text-white border-0 flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-4 -translate-y-4">
                            <FileText className="w-24 h-24 text-white" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-orange-500/30">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                Action requise
                            </div>
                            <h3 className="text-xl font-serif mb-2 leading-tight text-white/90">
                                {MOCK_DATA.project.actionRequired}
                            </h3>
                        </div>
                        {isFondsDebloques ? (
                            <Button disabled className="w-full bg-green-500 text-white rounded-xl font-semibold shadow-lg relative z-10 mt-6 h-12">
                                <ShieldCheck className="w-5 h-5 mr-2" /> Débloqué avec succès
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setIsReportModalOpen(true)}
                                className="w-full bg-brand-accent hover:bg-brand-accent-hover text-[#0A192F] rounded-xl font-semibold shadow-lg relative z-10 mt-6 h-12"
                            >
                                Consulter & Débloquer les fonds
                            </Button>
                        )}
                    </Card>
                </div>

                {/* TWO COLUMN LAYOUT: TIMELINE (Left) vs PREUVES (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">

                    {/* 3. LA TIMELINE DES JALONS (Section Gauche - 1 colonne sur les grands écrans) */}
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-xl font-serif text-[#0A192F] flex items-center gap-2">
                            Jalons du projet
                        </h2>
                        <Card className="bg-white p-6 rounded-2xl border-slate-100 shadow-sm">
                            <div className="space-y-0 py-2">
                                {MOCK_DATA.milestones.map((milestone, index) => {
                                    const Icon = milestone.icon;
                                    const isLast = index === MOCK_DATA.milestones.length - 1;
                                    return (
                                        <div key={milestone.id} className="flex gap-4">
                                            {/* Colonne de l'icône et de la ligne */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full ${milestone.bgColor} border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10`}>
                                                    <Icon className={`w-4 h-4 ${milestone.iconColor}`} />
                                                </div>
                                                {!isLast && <div className="w-0.5 h-full bg-slate-100 -mt-1" />}
                                            </div>

                                            {/* Colonne du texte */}
                                            <div className="space-y-1 pb-8 pt-1">
                                                <h4 className={`font-serif text-lg ${milestone.status === 'locked' ? 'text-slate-400' : 'text-[#0A192F]'}`}>
                                                    {milestone.title}
                                                </h4>
                                                <p className={`text-sm ${milestone.status === 'locked' ? 'text-slate-400 font-light' : 'text-slate-500 font-medium'}`}>
                                                    {milestone.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <Button variant="outline" className="w-full mt-2 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 h-11 text-sm">
                                Voir le planning complet
                            </Button>
                        </Card>
                    </div>

                    {/* 4. LE CENTRE DES PREUVES (Section Droite - 2 colonnes sur les grands écrans) */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-end">
                            <h2 className="text-xl font-serif text-[#0A192F] flex items-center gap-2">
                                Dernières inspections terrain
                            </h2>
                            <Button variant="ghost" className="text-brand-confidence hover:text-[#0A192F] hover:bg-brand-confidence/5 text-sm font-medium -mb-1">
                                Toutes les galeries <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>

                        <Card className="bg-white p-6 rounded-2xl border-slate-100 shadow-sm overflow-hidden">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {MOCK_DATA.photos.map((photo) => (
                                    <div key={photo.id} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 cursor-pointer">
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

                                        <div className="absolute bottom-0 left-0 p-4 w-full">
                                            <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium mb-1 drop-shadow-md">
                                                <Camera className="w-3.5 h-3.5" />
                                                <span>{photo.alt}</span>
                                            </div>
                                            <span className="text-white/70 text-[10px] uppercase tracking-wider font-bold drop-shadow-md">
                                                {photo.date}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                </div>
            </div>

            {/* MODALE DU RAPPORT D'INSPECTION (Simulée) */}
            <AnimatePresence>
                {isReportModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => !isFondsDebloques && setIsReportModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* En-tête de la modale */}
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h3 className="font-serif text-xl text-[#0A192F]">Rapport d'Inspection Terrain</h3>
                                    <p className="text-sm text-slate-500 font-light">Phase : Fondations (Validation requise)</p>
                                </div>
                                {!isFondsDebloques && (
                                    <button onClick={() => setIsReportModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Contenu Scrollable */}
                            <div className="p-6 overflow-y-auto space-y-6">
                                {/* Profil Inspecteur */}
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-12 h-12 bg-brand-confidence/10 text-brand-confidence rounded-full flex items-center justify-center shrink-0">
                                        <UserCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#0A192F]">Inspecté par Dr. Amadou Faye</p>
                                        <p className="text-sm text-slate-500">Expert en Génie Civil (Agréé Axiomia) • Le 12 Janvier 2026 à 14h30</p>
                                    </div>
                                </div>

                                {/* Résumé de l'expert */}
                                <div className="space-y-2">
                                    <h4 className="font-medium text-slate-700">Conclusion de l'expert</h4>
                                    <p className="text-slate-600 font-light text-sm leading-relaxed pb-4 border-b border-slate-100">
                                        « Après vérification des plans d'exécution et du coulage des armatures selon les normes parasismiques en vigueur (Eurocode 8), l'intégrité structurelle des fondations est certifiée CONFORME. Le béton présente une résistance idéale à H+72. Aucun vice caché n'est à signaler. L'étape d'élévation des murs peut être entamée en toute sécurité. »
                                    </p>
                                </div>

                                {/* Preuve visuelle prioritaire */}
                                <div className="space-y-2">
                                    <h4 className="font-medium text-slate-700">Preuve Photographique Horodatée</h4>
                                    <div className="rounded-xl overflow-hidden border border-slate-100 relative">
                                        <img src="https://images.unsplash.com/photo-1541888081622-1d5e12812678?w=800&q=80" alt="Preuve" className="w-full aspect-video object-cover" />
                                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> 14.6937° N, 17.4441° W
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer / Bouton d'Action */}
                            <div className="p-6 bg-slate-50 border-t border-slate-100">
                                {isFondsDebloques ? (
                                    <div className="w-full flex items-center justify-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl font-medium border border-green-200">
                                        <ShieldCheck className="w-6 h-6" />
                                        Fonds débloqués pour l'Artisan (Transfert en cours...)
                                    </div>
                                ) : (
                                    <Button
                                        onClick={handleApprouver}
                                        className="w-full bg-[#0A192F] hover:bg-brand-confidence text-white rounded-xl h-14 text-base shadow-xl"
                                    >
                                        Approuver le rapport & Débloquer les fonds
                                        <Lock className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* SHEET DU PLANNING COMPLET (Panneau coulissant droit) */}
            <AnimatePresence>
                {isSheetOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end">
                        {/* Overlay sombre */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsSheetOpen(false)}
                        />

                        {/* Panneau latéral (Sheet) */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
                        >
                            {/* Header du Sheet */}
                            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
                                <div>
                                    <h3 className="font-serif text-xl text-[#0A192F]">Planning détaillé du chantier</h3>
                                    <p className="text-sm text-slate-500 font-light mt-0.5">Toutes les étapes de votre projet</p>
                                </div>
                                <button onClick={() => setIsSheetOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Contenu Scrollable (Timeline complète) */}
                            <div className="flex-1 overflow-y-auto px-6 py-8">
                                <div className="space-y-0 relative border-l-2 border-slate-100 ml-4 py-2">
                                    {MOCK_DATA.extendedMilestones.map((milestone, index) => {
                                        const Icon = milestone.icon;
                                        return (
                                            <div key={milestone.id} className="relative pl-8 mb-8 last:mb-0">
                                                {/* Line marker icon */}
                                                <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full ${milestone.bgColor} border-2 border-white shadow-sm flex items-center justify-center`}>
                                                    <Icon className={`w-4 h-4 ${milestone.iconColor}`} />
                                                </div>

                                                <div className="space-y-1 pt-1">
                                                    <h4 className={`font-serif text-lg ${milestone.status === 'locked' ? 'text-slate-400' : 'text-[#0A192F]'}`}>
                                                        {milestone.title}
                                                    </h4>
                                                    <p className={`text-sm ${milestone.status === 'locked' ? 'text-slate-400 font-light' : 'text-slate-500 font-medium'}`}>
                                                        {milestone.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Footer du Sheet */}
                            <div className="p-6 border-t border-slate-100 bg-white">
                                <Button
                                    onClick={() => setIsSheetOpen(false)}
                                    className="w-full bg-[#0A192F] hover:bg-brand-confidence text-white rounded-xl h-12 text-sm shadow-md"
                                >
                                    Fermer le planning
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
