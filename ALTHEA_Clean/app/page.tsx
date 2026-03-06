'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Landmark, ShieldCheck, Video, Scale, CheckCircle2 } from 'lucide-react'

const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
        opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] as const } // Apple-like spring/ease
    })
}

export default function Home() {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-brand-confidence selection:text-white">

            {/* 1. HERO SECTION (Dark/Institutional Background) */}
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0A192F]">
                {/* Background Video Placeholder */}
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#0A192F]/70 z-10" />
                    {/* Placeholder for actual drone footage */}
                    <video
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                        autoPlay muted loop playsInline
                        poster="/images/hero-axiom.png" // Placeholder image if no video
                    >
                        <source src="/videos/drone-placeholder.mp4" type="video/mp4" />
                    </video>
                </motion.div>

                <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white space-y-10 mt-20">
                    <motion.h1
                        custom={1} initial="hidden" animate="visible" variants={fadeUpVariants}
                        className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif tracking-tight leading-[1.05] !text-white"
                    >
                        Construisez au pays. <br />
                        <span className="text-brand-accent italic font-light opacity-90">Nous sécurisons chaque brique.</span>
                    </motion.h1>

                    <motion.p
                        custom={2} initial="hidden" animate="visible" variants={fadeUpVariants}
                        className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Le premier Tiers de Confiance pour la diaspora. Suivi par drone, contrôle qualité strict et paiements par séquestre.
                    </motion.p>

                    <motion.div
                        custom={3} initial="hidden" animate="visible" variants={fadeUpVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-10"
                    >
                        <Button size="lg" className="h-14 px-10 text-base rounded-[2rem] bg-brand-accent text-[#0A192F] hover:bg-brand-accent-hover shadow-[0_0_40px_rgba(196,154,108,0.3)] border-0 font-medium transition-transform active:scale-95">
                            Estimer mon projet
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 text-base rounded-[2rem] bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all">
                            Comment ça marche
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* 2. LE PROBLÈME VS LA SOLUTION (Pure White Background for stark contrast) */}
            <section className="py-32 md:py-48 px-6 bg-white relative z-30 rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
                <div className="max-w-7xl mx-auto space-y-20">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        className="text-center max-w-3xl mx-auto space-y-6"
                    >
                        <motion.span variants={fadeUpVariants} className="uppercase tracking-[0.2em] text-xs font-semibold text-brand-accent">La Méthode Axiomia</motion.span>
                        <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-6xl font-serif text-[#0A192F] tracking-tight leading-tight">
                            La fin des chantiers hors de contrôle.
                        </motion.h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUpVariants}>
                            <Card className="h-full border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white p-12 rounded-[2rem] group">
                                <div className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                                    <Landmark className="w-7 h-7 text-[#0A192F]" />
                                </div>
                                <h3 className="text-2xl font-serif text-[#0A192F] mb-4">Séquestre Financier</h3>
                                <p className="text-slate-500 font-light leading-relaxed text-lg">
                                    Vos fonds sont bloqués en France. Nous ne débloquons les paiements qu'après la validation stricte de chaque étape des travaux sur le terrain.
                                </p>
                            </Card>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={2} variants={fadeUpVariants}>
                            <Card className="h-full border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white p-12 rounded-[2rem] group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-brand-confidence" />
                                <div className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                                    <ShieldCheck className="w-7 h-7 text-brand-confidence" />
                                </div>
                                <h3 className="text-2xl font-serif text-[#0A192F] mb-4">Zéro Malfaçon</h3>
                                <p className="text-slate-500 font-light leading-relaxed text-lg">
                                    Nos ingénieurs inspectent chaque étape sur le terrain (fondations, ferraillage, béton). Aucun compromis sur la qualité des matériaux et de l'exécution.
                                </p>
                            </Card>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={3} variants={fadeUpVariants}>
                            <Card className="h-full border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white p-12 rounded-[2rem] group">
                                <div className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                                    <Video className="w-7 h-7 text-[#0A192F]" />
                                </div>
                                <h3 className="text-2xl font-serif text-[#0A192F] mb-4">Transparence Totale</h3>
                                <p className="text-slate-500 font-light leading-relaxed text-lg">
                                    Suivez l'avancement en vidéo 360° et par drone directement depuis votre téléphone via votre espace sécurisé. Ne laissez plus place au doute.
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. L'AVANTAGE JURIDIQUE (Cleaned up, readable, distinct layers) */}
            <section className="py-32 px-6 bg-[#FAFAF9]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">

                    {/* Left text - Extremely clean and readable */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUpVariants}
                        className="md:w-1/2 space-y-10"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.2rem] bg-white shadow-sm border border-slate-200">
                            <Scale className="w-7 h-7 text-[#0A192F]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#0A192F] tracking-tight">
                            L'Avantage Juridique. <br />
                            <span className="italic font-light text-slate-500">Votre sérénité absolue.</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-light leading-relaxed">
                            Nous savons que construire à l'étranger représente un risque juridique. C'est pourquoi l'intégralité de nos contrats est soumise au Droit Français. Vos obligations et vos garanties sont claires, transparentes et exécutoires.
                        </p>
                        <ul className="space-y-5 pt-6 border-t border-slate-200">
                            {[
                                "Assistance contractuelle rédigée par des experts.",
                                "Fonds consignés auprès d'un établissement financier agréé.",
                                "Règles strictes de déblocage par étapes certifiées (Jalons).",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-5 text-slate-700">
                                    <div className="mt-1 bg-brand-confidence/10 p-1 rounded-full">
                                        <CheckCircle2 className="w-4 h-4 text-brand-confidence shrink-0" />
                                    </div>
                                    <span className="font-light text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right Card - Ethereal, clean, no overlapping massive icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="md:w-1/2 w-full"
                    >
                        <div className="bg-white border border-slate-100 p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] relative">

                            <div className="space-y-10">
                                <div className="inline-block border border-brand-accent/30 bg-brand-accent/5 uppercase tracking-widest text-[10px] font-semibold text-brand-accent px-4 py-1.5 rounded-full mb-2">
                                    Garantie Financière
                                </div>

                                <blockquote className="text-2xl font-serif leading-relaxed text-[#0A192F]">
                                    "L'argent reste en sécurité jusqu'à ce que nous et vous validions la qualité du travail accompli. C'est la promesse Axiomia."
                                </blockquote>

                                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex -space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 border-4 border-white shadow-sm flex items-center justify-center">
                                            <Landmark className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-[#0A192F] border-4 border-white shadow-sm flex items-center justify-center text-white font-serif italic text-sm">
                                            A*
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-slate-400 tracking-wide">Établissement Agréé</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    )
}
