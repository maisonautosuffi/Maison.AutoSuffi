'use client'

import { Button } from '@/components/ui/Button'
import { Shield, Eye, Landmark, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 1) => ({
            opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        })
    }

    return (
        <div className="min-h-screen bg-bg-main selection:bg-brand-confidence selection:text-white">
            {/* HERO SECTION - CINEMATIC */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero_architecture.png"
                        alt="Villa de luxe en construction avec outils digitaux"
                        fill
                        className="object-cover object-center scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-bg-main/90 via-bg-main/80 to-bg-main/95 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 mt-12">
                    <motion.div
                        initial="hidden" animate="visible" custom={1} variants={fadeUpVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-confidence/10 border border-brand-confidence/20 text-brand-confidence text-sm tracking-wide font-medium font-sans mb-4 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                        L'Assistance à Maîtrise d'Ouvrage nouvelle génération
                    </motion.div>

                    <motion.h1
                        initial="hidden" animate="visible" custom={2} variants={fadeUpVariants}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-confidence leading-[1.1]"
                    >
                        Construire à distance, <br />
                        <span className="text-brand-accent italic">Preuve à l'appui.</span>
                    </motion.h1>

                    <motion.p
                        initial="hidden" animate="visible" custom={3} variants={fadeUpVariants}
                        className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-sans font-light leading-relaxed"
                    >
                        Prouvée par des images, sécurisée par des experts. Pour la diaspora africaine, nous garantissons la tranquillité d'esprit absolue via un suivi visuel horodaté.
                    </motion.p>

                    <motion.div
                        initial="hidden" animate="visible" custom={4} variants={fadeUpVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
                    >
                        <Link href="/tarifs">
                            <Button size="lg" className="w-full sm:w-auto shadow-2xl shadow-brand-confidence/20 h-14 px-8 text-base rounded-full">
                                Découvrir nos packs sécurisés
                            </Button>
                        </Link>
                        <Link href="/methodologie">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full bg-white/50 backdrop-blur-md group">
                                Comprendre la méthode
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-accent/60"
                >
                    <span className="text-xs uppercase tracking-widest font-medium">Découvrir</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-text-accent/60 to-transparent" />
                </motion.div>
            </section>

            {/* NOTRE APPROCHE - VULGARISÉE */}
            <section className="py-32 px-4 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants} custom={1}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-brand-confidence leading-tight">
                            Notre promesse : Ce que vous voyez est <span className="text-brand-accent italic">ce qui est fait.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-text-secondary font-sans font-light leading-relaxed">
                            <p>La construction à l'étranger souffre d'un mal profond : le décalage entre les belles paroles et la réalité du chantier. WhatsApp n'est pas un outil de suivi professionnel.</p>
                            <p>Chez ALTHÉA, notre approche repose sur une certitude visuelle inaltérable. Nous avons créé un pont digital de confiance entre votre chantier et votre smartphone.</p>
                        </div>

                        <ul className="space-y-4 pt-4">
                            {[
                                "Vos inspecteurs locaux certifient la conformité",
                                "Preuves immuables (Photos prises via notre application, sans filtre)",
                                "Vous ne débloquez les fonds qu'au vu de la preuve"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0" />
                                    <span className="font-medium text-text-primary text-base md:text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                        className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/images/hero_inspection.png"
                            alt="Inspecteur ALTHEA vérifiant un chantier avec une tablette"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-brand-confidence/10 mix-blend-multiply" />

                        {/* Floating Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
                            className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-xl text-brand-confidence">Piste d'Audit Sécurisée</h4>
                                    <p className="text-sm font-sans text-text-secondary">Chaque action est enregistrée et rendue infalsifiable.</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </section>


            {/* THE 4 PILLARS - ANIMATED */}
            <section className="py-32 px-4 bg-bg-main">
                <div className="max-w-6xl mx-auto space-y-20">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
                        className="text-center space-y-6"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-brand-confidence">Le Standard Banque Privée</h2>
                        <p className="font-sans text-text-secondary text-lg max-w-2xl mx-auto">Notre méthode repose sur 4 piliers inébranlables pour sécuriser votre investissement.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Shield className="w-6 h-6 text-brand-accent" />,
                                title: "Audit & Lancement",
                                desc: "Analyse foncière, étude de faisabilité et contrats tripartites sécurisés."
                            },
                            {
                                icon: <Eye className="w-6 h-6 text-brand-accent" />,
                                title: "Suivi & Qualité",
                                desc: "Inspections physiques rigoureuses, photos géolocalisées et rapports."
                            },
                            {
                                icon: <Landmark className="w-6 h-6 text-brand-accent" />,
                                title: "Finance Transparente",
                                desc: "Paiements débloqués uniquement après validation factuelle des jalons."
                            },
                            {
                                icon: <FileCheck className="w-6 h-6 text-brand-accent" />,
                                title: "Réception Garantie",
                                desc: "Dossier final complet, levée des réserves et réception contradictoire."
                            }
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUpVariants}
                                className="p-8 rounded-3xl bg-white border border-text-accent/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-bg-main flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-brand-confidence/5 transition-all">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-serif text-brand-confidence mb-4">{pillar.title}</h3>
                                <p className="text-sm font-sans text-text-secondary leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
