'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
        <div className="min-h-screen bg-bg-main pt-32 pb-24 px-4 overflow-hidden">
            <motion.div
                initial="hidden" animate="visible" variants={staggerList}
                className="max-w-4xl mx-auto text-center space-y-6 mb-20"
            >
                <motion.div variants={fadeUp} custom={1} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-sm tracking-wide font-medium font-sans mb-2">
                    Notre Approche Pédagogique
                </motion.div>
                <motion.h1 variants={fadeUp} custom={2} className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-confidence leading-tight">Construire en Afrique depuis l'étranger :<br /> <span className="text-brand-accent italic">Éviter les erreurs.</span></motion.h1>
                <motion.p variants={fadeUp} custom={3} className="font-sans text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                    Comprendre pourquoi les projets échouent est la première étape. Notre méthode anti-risque repose sur un principe simple : <strong className="font-medium text-brand-confidence">on ne paie que ce qui est prouvé.</strong>
                </motion.p>
            </motion.div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
                {/* LES RISQUES */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerList}
                    className="space-y-8"
                >
                    <motion.h2 variants={fadeUp} className="text-3xl font-serif text-brand-confidence flex items-center gap-3">
                        <AlertCircle className="text-red-500 w-8 h-8" /> Les Risques Fréquents
                    </motion.h2>
                    <motion.ul variants={staggerList} className="space-y-4">
                        {[
                            "Délais qui s'allongent sans justification factuelle.",
                            "Matériaux facturés mais jamais livrés ou remplacés par de la basse qualité.",
                            "Malfaçons structurelles découvertes trop tard.",
                            "Fonds détournés car débloqués sans vérification de l'avancement.",
                            "Relations familiales ou amicales dégradées par le manque de transparence."
                        ].map((risk, i) => (
                            <motion.li key={i} variants={listItem} className="flex gap-4 p-5 rounded-2xl bg-white border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="font-serif text-red-500 font-bold text-xl">0{i + 1}.</span>
                                <p className="font-sans text-text-primary text-sm leading-relaxed mt-1">{risk}</p>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                {/* NOTRE METHODE */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerList}
                    className="space-y-8"
                >
                    <motion.h2 variants={fadeUp} className="text-3xl font-serif text-brand-confidence flex items-center gap-3">
                        <CheckCircle2 className="text-brand-accent w-8 h-8" /> La Méthode Anti-Risque
                    </motion.h2>
                    <motion.ul variants={staggerList} className="space-y-4">
                        {[
                            "Paiements conditionnés. Séquestre ou déblocage direct PSP uniquement après validation d'un jalon.",
                            "Contrôle de conformité des matériaux lors de la réception chantier avec photos.",
                            "Inspections inopinées et régulières par nos experts indépendants.",
                            "Preuves par l'image : Géolocalisation stricte et horodatage certifié de chaque média.",
                            "Transparence totale via votre Espace Privé : aucune information n'est occultée."
                        ].map((solution, i) => (
                            <motion.li key={i} variants={listItem} className="flex gap-4 p-5 rounded-2xl bg-brand-confidence border border-brand-confidence/10 shadow-lg text-white">
                                <span className="font-serif text-brand-accent font-bold text-xl">0{i + 1}.</span>
                                <p className="font-sans text-white/90 text-sm leading-relaxed mt-1">{solution}</p>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </div>

            {/* A JALON EXPLAINED */}
            <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                className="max-w-5xl mx-auto mt-32"
            >
                <Card className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl overflow-hidden relative border-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-confidence/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="space-y-8">
                            <h3 className="text-4xl lg:text-5xl font-serif text-brand-confidence">Qu'est-ce qu'un Jalon ?</h3>
                            <p className="font-sans text-text-secondary text-lg leading-relaxed">
                                Un Jalon (Milestone) n'est pas une simple date. C'est un ensemble d'objectifs physiques sur le chantier qui déclenchent :
                            </p>
                            <ul className="space-y-4 font-sans text-text-primary">
                                {[
                                    { text: "Une Checklist Qualité remplie par nos inspecteurs." },
                                    { text: "Des Photos Géolocalisées (fondations coulées, charpente posée)." },
                                    { text: "Un Rapport PDF validant l'étape." },
                                    { text: "Le Déblocage Sécurisé de la tranche de paiement associée." }
                                ].map((item, idx) => (
                                    <motion.li key={idx} variants={listItem} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-brand-accent" />
                                        <span>{item.text}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-8">
                            <div className="w-full max-w-sm bg-bg-main rounded-3xl p-8 border border-text-accent/10 text-left shadow-sm">
                                <h4 className="font-serif text-2xl mb-6 text-brand-confidence border-b border-text-accent/10 pb-4">Glossaire AMO</h4>
                                <div className="space-y-5">
                                    <div><strong className="text-brand-confidence block mb-1">AMO</strong> <span className="text-sm text-text-secondary leading-relaxed inline-block">Assistance à Maîtrise d'Ouvrage (votre conseiller expert).</span></div>
                                    <div><strong className="text-brand-confidence block mb-1">Réserves</strong> <span className="text-sm text-text-secondary leading-relaxed inline-block">Défauts notés à corriger avant paiement final.</span></div>
                                    <div><strong className="text-brand-confidence block mb-1">Réception</strong> <span className="text-sm text-text-secondary leading-relaxed inline-block">Le moment où vous acceptez officiellement l'ouvrage.</span></div>
                                </div>
                            </div>
                            <Link href="/tarifs" className="w-full max-w-sm">
                                <Button size="lg" className="w-full h-14 rounded-full text-lg shadow-xl shadow-brand-confidence/10">Voir nos offres d'accompagnement</Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
