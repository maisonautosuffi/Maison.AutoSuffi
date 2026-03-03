'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AlertCircle, CheckCircle2, ShieldCheck, Eye, Lock, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MethodologiePage() {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 1) => ({
            opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        })
    }

    const staggerList = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const listItem = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    }

    return (
        <div className="min-h-screen bg-bg-main pt-32 pb-24 overflow-hidden selection:bg-brand-confidence selection:text-white">

            {/* HERO INTRODUCTION */}
            <motion.section
                initial="hidden" animate="visible" variants={staggerList}
                className="max-w-5xl mx-auto text-center space-y-8 mb-32 px-4"
            >
                <motion.div variants={fadeUp} custom={1} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-accent/10 text-brand-accent text-sm tracking-[0.15em] uppercase font-bold font-sans backdrop-blur-sm border border-brand-accent/20">
                    <ShieldCheck className="w-4 h-4" />
                    Notre Approche Pédagogique
                </motion.div>
                <motion.h1 variants={fadeUp} custom={2} className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-confidence leading-[1.1]">
                    Construire à distance :<br /> <span className="text-brand-accent italic font-light">Éradiquer le risque.</span>
                </motion.h1>
                <motion.p variants={fadeUp} custom={3} className="font-sans text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
                    Comprendre pourquoi les projets échouent est la première étape. Notre méthode repose sur un principe absolu : <strong className="font-semibold text-brand-confidence">on ne paie que ce qui est factuellement prouvé.</strong>
                </motion.p>
            </motion.section>

            {/* SPLIT SECTION : RISQUES VS METHODE */}
            <section className="px-4 mb-32 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-brand-accent/5 rounded-[100%] blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
                    {/* LES RISQUES (PROBLEME) */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerList}
                        className="space-y-12"
                    >
                        <motion.div variants={fadeUp} className="space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-serif text-brand-confidence flex items-center gap-4">
                                <div className="p-3 bg-red-50 text-red-500 rounded-2xl shadow-sm border border-red-100">
                                    <AlertCircle className="w-8 h-8" />
                                </div>
                                Les Pièges
                            </h2>
                            <p className="text-text-secondary text-lg">La réalité amère des chantiers non surveillés.</p>
                        </motion.div>

                        <motion.ul variants={staggerList} className="space-y-5">
                            {[
                                "Délais élastiques sans aucune justification factuelle ni pénalité.",
                                "Matériaux facturés au prix fort, remplacés par de la contrefaçon.",
                                "Malfaçons structurelles invisibles découvertes une fois les murs fermés.",
                                "Avances de fonds détournées car débloquées à l'aveugle.",
                                "Relations familiales détruites par le manque cruel de transparence."
                            ].map((risk, i) => (
                                <motion.li key={i} variants={listItem} className="flex gap-5 p-6 rounded-3xl bg-white/60 hover:bg-white backdrop-blur-md border border-red-500/10 shadow-sm hover:shadow-xl transition-all group">
                                    <span className="font-serif text-red-400 font-bold text-2xl mt-0.5 group-hover:scale-110 transition-transform">0{i + 1}.</span>
                                    <p className="font-sans text-text-secondary text-base leading-relaxed group-hover:text-text-primary transition-colors">{risk}</p>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* NOTRE METHODE (SOLUTION) */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerList}
                        className="space-y-12"
                    >
                        <motion.div variants={fadeUp} className="space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-serif text-brand-confidence flex items-center gap-4">
                                <div className="p-3 bg-brand-accent/20 text-brand-accent rounded-2xl shadow-sm border border-brand-accent/30">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                Le Bouclier AXIOMIA
                            </h2>
                            <p className="text-text-secondary text-lg">La certitude imposée par le processus.</p>
                        </motion.div>

                        <motion.ul variants={staggerList} className="space-y-5">
                            {[
                                "Paiements séquestrés. Déblocage conditionné à la validation par nos ingénieurs.",
                                "Inspections inopinées par des experts indépendants assermentés sur place.",
                                "Contrôle de conformité strict des matériaux lors de la livraison.",
                                "Preuves par l'image : Géolocalisation et horodatage certifiés.",
                                "Espace Client sécurisé : Suivez l'avancée de votre capital en temps réel."
                            ].map((solution, i) => (
                                <motion.li key={i} variants={listItem} className="flex gap-5 p-6 rounded-3xl bg-brand-confidence border border-white/10 shadow-2xl text-white group hover:-translate-y-1 transition-all">
                                    <span className="font-serif text-brand-accent font-bold text-2xl mt-0.5 group-hover:text-white transition-colors">0{i + 1}.</span>
                                    <p className="font-sans text-white/80 text-base leading-relaxed group-hover:text-white transition-colors">{solution}</p>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </section>

            {/* A JALON EXPLAINED - DEEP DIVE */}
            <motion.section
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                className="max-w-6xl mx-auto mt-32 px-4"
            >
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-black/5 p-8 md:p-16 lg:p-24">
                    {/* Background abstract shape */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-confidence/5 rounded-full blur-[80px] origin-center translate-x-1/2 -translate-y-1/4 pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-brand-accent text-sm font-bold tracking-[0.2em] uppercase">
                                    <Eye className="w-4 h-4" /> La Mécanique
                                </div>
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-confidence leading-[1.1]">Qu'est-ce qu'un <br /><span className="italic text-brand-accent">Jalon</span> ?</h3>
                            </div>

                            <p className="font-sans text-text-secondary text-lg leading-relaxed">
                                Dans le milieu bancaire, on ne paie jamais sur de simples promesses. Un Jalon (Milestone) n'est pas une date, c'est une <strong className="text-brand-confidence">réalité physique constatée</strong> sur le chantier qui déclenche un protocole strict :
                            </p>

                            <ul className="space-y-6 font-sans text-text-primary">
                                {[
                                    { icon: <CheckCircle2 className="w-6 h-6 text-brand-accent" />, text: "Checklist Qualité validée par l'inspecteur." },
                                    { icon: <Lock className="w-6 h-6 text-brand-accent" />, text: "Photos Inaltérables (horodatées & localisées)." },
                                    { icon: <FileText className="w-6 h-6 text-brand-accent" />, text: "Rapport PDF officiel mis à votre disposition." },
                                    { icon: <ShieldCheck className="w-6 h-6 text-green-600" />, text: "Déblocage Sécurisé des fonds alloués." }
                                ].map((item, idx) => (
                                    <motion.li key={idx} variants={listItem} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-bg-alt transition-colors">
                                        <div className="mt-1 bg-brand-confidence/5 p-2 rounded-xl">{item.icon}</div>
                                        <span className="text-lg font-medium text-brand-confidence">{item.text}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col space-y-8 relative">
                            {/* Decorative elements for glossary */}
                            <div className="absolute -left-8 -top-8 w-24 h-24 bg-brand-accent/20 rounded-full blur-xl" />

                            <div className="w-full bg-brand-confidence text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                                <h4 className="font-serif text-3xl mb-8 text-brand-accent border-b border-white/10 pb-6">Glossaire de l'Investisseur</h4>
                                <div className="space-y-8 relative z-10">
                                    <div>
                                        <strong className="text-white text-xl block mb-2">A.M.O</strong>
                                        <span className="text-base text-gray-300 leading-relaxed block">Assistance à Maîtrise d'Ouvrage. Vos yeux, vos oreilles et votre bouclier technique sur le terrain.</span>
                                    </div>
                                    <div>
                                        <strong className="text-white text-xl block mb-2">Levée de Réserves</strong>
                                        <span className="text-base text-gray-300 leading-relaxed block">L'obligation pour l'entreprise de corriger les malfaçons identifiées avant de recevoir son solde tout compte.</span>
                                    </div>
                                    <div>
                                        <strong className="text-white text-xl block mb-2">Réception Contradictoire</strong>
                                        <span className="text-base text-gray-300 leading-relaxed block">Acte juridique par lequel vous acceptez officiellement l'ouvrage, marquant le début des garanties légales.</span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/tarifs" className="w-full mt-4 group">
                                <Button size="lg" className="w-full h-16 rounded-[1.5rem] text-lg bg-white border border-brand-confidence/10 text-brand-confidence hover:bg-brand-confidence hover:text-white transition-all duration-300 shadow-xl shadow-brand-confidence/5 flex items-center justify-between px-8">
                                    <span>Explorer nos forfaits AMO</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    )
}
