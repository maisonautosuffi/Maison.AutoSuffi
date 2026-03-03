'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function TarifsPage() {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 1) => ({
            opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 }
        })
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const cardVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    return (
        <div className="min-h-screen bg-bg-main pt-32 pb-24 px-4 overflow-hidden">
            <motion.div
                initial="hidden" animate="visible" variants={staggerContainer}
                className="max-w-4xl mx-auto text-center space-y-4 mb-20"
            >
                <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-confidence leading-tight">Transparence totale. <br /><span className="text-brand-accent italic">Sécurité absolue.</span></motion.h1>
                <motion.p variants={fadeUp} custom={2} className="font-sans text-text-secondary text-lg max-w-xl mx-auto">
                    Nos honoraires sont clairs, justifiés et liés à des jalons de livraison factuels pour garantir votre tranquillité d'esprit.
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden" animate="visible" variants={staggerContainer}
                className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >

                {/* PACK ESSENTIEL */}
                <motion.div variants={cardVariant}>
                    <Card className="flex flex-col h-full border border-text-accent/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="space-y-2 mb-6">
                            <h3 className="text-xl font-serif text-brand-confidence">Essentiel</h3>
                            <p className="text-sm font-sans text-text-secondary">Suivi & visibilité</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-serif text-brand-confidence">79€</span>
                            <span className="text-text-accent text-sm"> /mois</span>
                            <p className="text-xs text-text-accent mt-1">+ Setup 249€</p>
                        </div>
                        <ul className="space-y-3 font-sans text-sm text-text-secondary flex-grow mb-8">
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Dashboard Client</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Timeline de Jalons</li>
                            <li className="flex items-start gap-2 text-text-accent"><Check className="w-4 h-4 text-text-accent/30 shrink-0 mt-0.5" /> Sans inspections physiques</li>
                        </ul>
                        <Link
                            href="/checkout/essentiel"
                            className="w-full inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest transition-all duration-300 rounded-lg px-6 py-3 text-sm border border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-main"
                        >
                            Choisir ce Pack
                        </Link>
                    </Card>
                </motion.div>

                {/* PACK QUALITÉ */}
                <motion.div variants={cardVariant}>
                    <Card className="flex flex-col h-full border border-brand-accent/30 shadow-lg relative hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-white px-4 py-1 text-xs font-sans font-medium rounded-full uppercase tracking-wider shadow-md">
                            Populaire
                        </div>
                        <div className="space-y-2 mb-6 mt-2">
                            <h3 className="text-xl font-serif text-brand-confidence">Qualité</h3>
                            <p className="text-sm font-sans text-text-secondary">Contrôle & inspections</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-serif text-brand-confidence">149€</span>
                            <span className="text-text-accent text-sm"> /mois</span>
                            <p className="text-xs text-text-accent mt-1">+ Setup 349€</p>
                        </div>
                        <ul className="space-y-3 font-sans text-sm text-text-secondary flex-grow mb-8">
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Inclus Pack Essentiel</li>
                            <li className="flex items-start gap-2 font-medium text-brand-confidence"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Inspections physiques</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Preuves horodatées in-app</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Relevé des réserves</li>
                        </ul>
                        <Link
                            href="/checkout/qualite"
                            className="w-full inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg rounded-lg px-6 py-3 text-sm bg-brand-confidence text-white hover:bg-brand-confidence-hover"
                        >
                            Choisir ce Pack
                        </Link>
                    </Card>
                </motion.div>

                {/* PACK PILOTAGE */}
                <motion.div variants={cardVariant}>
                    <Card className="flex flex-col h-full border border-text-accent/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="space-y-2 mb-6">
                            <h3 className="text-xl font-serif text-brand-confidence">Pilotage (AMO)</h3>
                            <p className="text-sm font-sans text-text-secondary">Coordination Complète</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-serif text-brand-confidence">299€</span>
                            <span className="text-text-accent text-sm"> /mois</span>
                            <p className="text-xs text-text-accent mt-1">+ Setup 590€ ou % budget</p>
                        </div>
                        <ul className="space-y-3 font-sans text-sm text-text-secondary flex-grow mb-8">
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Inclus Pack Qualité</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Coordination intervenants</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Réception matériaux</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Levée des réserves active</li>
                        </ul>
                        <Link
                            href="/checkout/pilotage"
                            className="w-full inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest transition-all duration-300 rounded-lg px-6 py-3 text-sm border border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-main"
                        >
                            Choisir ce Pack
                        </Link>
                    </Card>
                </motion.div>

                {/* PACK SERENITY */}
                <motion.div variants={cardVariant}>
                    <Card className="flex flex-col h-full border border-brand-confidence bg-brand-confidence text-white hover:shadow-2xl hover:shadow-brand-confidence/20 hover:-translate-y-1 transition-all duration-300">
                        <div className="space-y-2 mb-6">
                            <h3 className="text-xl font-serif text-white">Full Serenity</h3>
                            <p className="text-sm font-sans text-text-accent">Délégation intégrale</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-serif text-white">399€</span>
                            <span className="text-text-accent text-sm"> /mois</span>
                            <p className="text-xs text-text-accent mt-1">+ Setup 790€ ou % budget</p>
                        </div>
                        <ul className="space-y-3 font-sans text-text-light/80 flex-grow mb-8">
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Inclus Pack Pilotage</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Gestion financière totale</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Déblocage PSP intégré</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> Dossier Final certifié</li>
                        </ul>
                        <Link
                            href="/contact"
                            className="w-full inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest transition-all duration-300 rounded-lg px-6 py-3 text-sm border border-white text-brand-confidence bg-white hover:bg-brand-accent hover:border-brand-accent hover:text-white"
                        >
                            Demander un devis
                        </Link>
                    </Card>
                </motion.div>

            </motion.div>

            <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} viewport={{ once: true }}
                className="max-w-4xl mx-auto mt-16 text-center"
            >
                <p className="font-sans text-text-secondary text-sm">
                    * Les coûts de Setup et abonnements peuvent varier selon la surface et la localisation (ville/pays) de la construction.
                </p>
            </motion.div>
        </div>
    )
}
