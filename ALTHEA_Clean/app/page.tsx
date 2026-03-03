'use client'

import { Button } from '@/components/ui/Button'
import { Shield, Eye, Landmark, FileCheck, ArrowRight, CheckCircle2, Camera, Lock, Search, Play } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export default function Home() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 1) => ({
            opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        })
    }

    return (
        <div className="min-h-screen bg-bg-main selection:bg-brand-confidence selection:text-white pb-20">
            {/* HERO SECTION - CINEMATIC PARALLAX */}
            <section className="relative flex flex-col items-center justify-center h-screen px-4 overflow-hidden">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0 origin-top"
                >
                    <Image
                        src="/images/hero_architecture.png"
                        alt="Villa de luxe en construction avec outils digitaux"
                        fill
                        className="object-cover object-center scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-confidence/90 via-brand-confidence/70 to-bg-main backdrop-blur-[2px]" />
                </motion.div>

                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 mt-24">
                    <motion.div
                        initial="hidden" animate="visible" custom={1} variants={fadeUpVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white shadow-xl text-sm tracking-widest font-medium font-sans mb-6 backdrop-blur-md uppercase"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent"></span>
                        </span>
                        L'AMO d'Élite pour la Diaspora
                    </motion.div>

                    <motion.h1
                        initial="hidden" animate="visible" custom={2} variants={fadeUpVariants}
                        className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-white leading-[1.05] drop-shadow-2xl"
                    >
                        Prouver. Sécuriser. <br />
                        <span className="text-brand-accent italic font-light">en toute maîtrise.</span>
                    </motion.h1>

                    <motion.p
                        initial="hidden" animate="visible" custom={3} variants={fadeUpVariants}
                        className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-sans font-light leading-relaxed drop-shadow-md"
                    >
                        AXIOMIA — La maîtrise à chaque étape. Le cabinet d'ingénierie qui transforme l'incertitude de la construction à distance en une garantie indéniable.
                    </motion.p>

                    <motion.div
                        initial="hidden" animate="visible" custom={4} variants={fadeUpVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
                    >
                        <Link href="/tarifs">
                            <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-sm shadow-xl shadow-brand-confidence/20 bg-brand-confidence hover:bg-brand-confidence-hover text-white font-medium transition-all hover:-translate-y-1">
                                Sécuriser mon projet
                            </Button>
                        </Link>
                        <Link href="/methodologie">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-sm bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20 transition-all group border">
                                <Play className="mr-3 w-5 h-5 fill-white/80 group-hover:fill-white transition-all" />
                                Voir la méthode AXIOMIA
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Découvrir</span>
                    <div className="w-[1px] h-16 border-l border-dashed border-white/40" />
                </motion.div>
            </section>

            {/* NOTRE APPROCHE - VULGARISÉE */}
            <section className="py-32 px-4 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants} custom={1}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <h2 className="text-sm font-sans tracking-[0.2em] text-brand-accent uppercase font-semibold">Le Constat</h2>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-confidence leading-tight">
                                WhatsApp n'est pas un <br /><span className="italic text-text-secondary">outil de suivi.</span>
                            </h3>
                        </div>
                        <div className="space-y-6 text-lg text-text-secondary font-sans font-light leading-relaxed border-l-2 border-brand-accent/30 pl-6">
                            <p>La construction à l'étranger souffre d'un mal profond : le décalage entre les belles paroles de vos prestataires et la réalité du chantier.</p>
                            <p>Chez Axiomia, notre approche repose sur une certitude visuelle inaltérable. Nous avons créé un pont digital de confiance, normé Banque Privée, entre le terrain et votre smartphone.</p>
                        </div>

                        <ul className="space-y-5 pt-4">
                            {[
                                "Inspecteurs assermentés locaux",
                                "Preuves immuables horodatées & géolocalisées",
                                "Déblocage des fonds uniquement au jalon vérifié"
                            ].map((item, i) => (
                                <motion.li custom={i + 3} variants={fadeUpVariants} key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-black/5">
                                    <div className="bg-brand-accent/10 p-2 rounded-full">
                                        <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                                    </div>
                                    <span className="font-medium text-brand-confidence">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}
                        className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group"
                    >
                        <Image
                            src="/images/axiomia-hero-1.png"
                            alt="Ingénieur AXIOMIA sur un chantier premium"
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-confidence/80 via-brand-confidence/10 to-transparent opacity-80 mix-blend-multiply" />

                        {/* Floating Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }}
                            className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/50"
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-brand-confidence rounded-full flex items-center justify-center shrink-0 shadow-inner">
                                    <Lock className="w-6 h-6 text-brand-accent" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-xl text-brand-confidence font-semibold mb-1">Piste d'Audit Sécurisée</h4>
                                    <p className="text-sm font-sans text-text-secondary leading-snug">Aucune photo ne modifiée. Tout est capturé en direct (horodatage garanti).</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </section>

            {/* PREUVE PAR L'IMAGE (NEW GALLERY SECTION) */}
            <section className="py-32 px-4 bg-brand-confidence text-white relative">
                <div className="max-w-7xl mx-auto space-y-16">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="text-center space-y-6 max-w-3xl mx-auto">
                        <h2 className="text-brand-accent text-sm tracking-[0.2em] font-bold uppercase">La Transparence</h2>
                        <h3 className="text-4xl md:text-5xl font-serif">La preuve par l'image.</h3>
                        <p className="text-gray-400 font-light text-lg">Retrouvez dans votre espace client les rapports d'inspection de chaque jalon. Vous voyez exactement ce que nous voyons.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "Fondations", date: "12 Oct 2025", status: "Validé" },
                            { step: "Élévation Murs", date: "05 Nov 2025", status: "Validé" },
                            { step: "Charpente / Toiture", date: "En cours", status: "Inspection imminente" }
                        ].map((item, i) => (
                            <motion.div
                                key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUpVariants}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10"
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Camera className="w-16 h-16 text-white" />
                                </div>
                                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-1">{item.date}</p>
                                            <h4 className="text-xl font-serif text-white">{item.step}</h4>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${item.status === 'Validé' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'}`}>
                                            {item.status}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE 4 PILLARS - ANIMATED */}
            <section className="py-32 px-4 bg-bg-main relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-brand-confidence/5 blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto space-y-24 relative z-10">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
                        className="text-center space-y-6"
                    >
                        <h2 className="text-sm font-sans tracking-[0.2em] text-brand-accent uppercase font-semibold">Exigence</h2>
                        <h3 className="text-4xl md:text-6xl font-serif text-brand-confidence">Le Standard Banque Privée</h3>
                        <p className="font-sans text-text-secondary text-xl max-w-2xl mx-auto font-light">Quatre piliers inébranlables pour sécuriser votre investissement à chaque stade.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[
                            {
                                icon: <Search className="w-8 h-8 text-white" />,
                                title: "Audit & Lancement",
                                desc: "Analyse foncière, étude de faisabilité rigoureuse et élaboration de contrats tripartites sécurisés."
                            },
                            {
                                icon: <Eye className="w-8 h-8 text-white" />,
                                title: "Suivi Intransigeant",
                                desc: "Inspections physiques sans préavis, photos géolocalisées inaltérables et rapports détaillés."
                            },
                            {
                                icon: <Landmark className="w-8 h-8 text-white" />,
                                title: "Finance Transparente",
                                desc: "Vos paiements ne sont débloqués qu'après validation stricte et factuelle des jalons de construction."
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-white" />,
                                title: "Réception Garantie",
                                desc: "Accompagnement final, dossier d'ouvrages exécutés complet et levée systématique des réserves."
                            }
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUpVariants}
                                className="p-8 rounded-[2rem] bg-white shadow-xl shadow-brand-confidence/5 border border-brand-confidence/5 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
                                <div className="w-16 h-16 rounded-2xl bg-brand-confidence flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                                    {pillar.icon}
                                </div>
                                <h4 className="text-2xl font-serif text-brand-confidence mb-4 leading-snug">{pillar.title}</h4>
                                <p className="text-base font-sans text-text-secondary leading-relaxed font-light">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto bg-brand-confidence rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[url('/images/hero_architecture.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-confidence via-brand-confidence/80 to-transparent" />

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white">Prêt à bâtir dans les règles de l'art ?</h2>
                        <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">AXIOMIA — Rigueur & Transparence. Rejoignez les investisseurs qui exigent l'excellence structurelle pour leurs projets en Afrique.</p>
                        <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/tarifs">
                                <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-sm bg-brand-accent hover:bg-brand-accent-hover text-white font-medium shadow-xl transition-all hover:-translate-y-1">
                                    Découvrir nos Masterpacks
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-sm bg-transparent text-white border-white/30 hover:bg-white/10 transition-all font-medium border">
                                    Contacter le Cabinet
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
