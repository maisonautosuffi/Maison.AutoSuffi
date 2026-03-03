'use client'

import { Button } from '@/components/ui/Button'
import {
    Shield, Eye, Landmark, FileCheck, ArrowRight, CheckCircle2,
    Camera, Lock, Search, Play, Globe, Euro, Scale, CheckCircle,
    Clock, Building2, ChevronDown, Key, Inbox, Bell, MapPin,
    FileText, Check, Minus, LayoutDashboard
} from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 800], [0, 150]);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 1) => ({
            opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8 }
        })
    }

    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "Comment garantissez-vous la sécurité de mes fonds ?",
            a: "Vos versements sont placés sur un compte séquestre strict. AXIOMIA ne détient pas vos fonds. Nous inspectons le chantier et émettons un avis technique. Si celui-ci est favorable, vous autorisez vous-même le paiement à l'entreprise de construction."
        },
        {
            q: "Quel est le rôle exact d'AXIOMIA face à mon entrepreneur ?",
            a: "AXIOMIA est votre représentant technique impartial (Assistant à Maîtrise d'Ouvrage). Nous ne construisons pas. Nous auditons, structurons, contrôlons et validons le travail des entreprises que vous avez mandatées, pour défendre exclusivement vos intérêts."
        },
        {
            q: "Dans quels pays intervenez-vous ?",
            a: "Nous intervenons principalement en Afrique de l'Ouest (Sénégal, Côte d'Ivoire, et autres sur demande) via nos équipes locales d'ingénieurs qualifiés, tout en vous garantissant un encadrement juridique et un support basé en France."
        },
        {
            q: "Qui prend la décision finale en cas de malfaçon constatée ?",
            a: "Vous conservez le contrôle absolu. AXIOMIA émet des avis impartiaux. En cas de malfaçon, nous recommandons le blocage des fonds. Cependant, la décision finale de suspendre ou continuer les paiements vous appartient toujours."
        },
        {
            q: "AXIOMIA remplace-t-elle l'architecte ou le conducteur de travaux ?",
            a: "Non. Nous travaillons avec vos architectes et entrepreneurs. L'architecte conçoit (MOE), l'entrepreneur exécute, et AXIOMIA vous assiste (AMO) pour garantir que votre exigence et vos intérêts sont respectés sur le terrain."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAF9] selection:bg-brand-confidence selection:text-white pb-0 font-sans text-slate-800">

            {/* 1. HERO SECTION - LIGHT PREMIUM & AIRY */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-[#FAFAF9]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Copy */}
                    <div className="relative z-10 space-y-8 pr-0 lg:pr-12">
                        <motion.div
                            initial="hidden" animate="visible" custom={1} variants={fadeUpVariants}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-brand-confidence shadow-sm text-xs tracking-[0.2em] font-medium font-sans uppercase"
                        >
                            Assistance à Maîtrise d'Ouvrage
                        </motion.div>

                        <motion.h1
                            initial="hidden" animate="visible" custom={2} variants={fadeUpVariants}
                            className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif text-[#0A192F] leading-[1.1] tracking-tight"
                        >
                            Construire à distance, <br />
                            <span className="text-brand-accent italic font-normal">en toute sécurité.</span>
                        </motion.h1>

                        <motion.p
                            initial="hidden" animate="visible" custom={3} variants={fadeUpVariants}
                            className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-xl"
                        >
                            Un accompagnement structuré, transparent et rigoureux pour vous permettre de maîtriser chaque étape de votre vision immobilière.
                        </motion.p>

                        <motion.div
                            initial="hidden" animate="visible" custom={4} variants={fadeUpVariants}
                            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
                        >
                            <Link href="/tarifs" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full bg-[#0A192F] hover:bg-slate-800 text-white font-medium transition-all shadow-md hover:shadow-xl">
                                    Estimer mon projet
                                </Button>
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full bg-white text-[#0A192F] border-slate-200 hover:bg-slate-50 transition-all font-medium">
                                    Planifier un échange
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Image Masked */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full aspect-[4/3] lg:aspect-square md:rounded-[3rem] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 block"
                    >
                        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                            <Image
                                src="/images/hero-axiom.png"
                                alt="Villa contemporaine"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[3rem]"></div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SECTION FILIALE FRANÇAISE - TRUST */}
            <section className="py-24 px-4 bg-white border-y border-slate-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUpVariants} className="md:w-1/2 space-y-6">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                            <Scale className="w-5 h-5 text-[#0A192F]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-[#0A192F] leading-tight tracking-tight">
                            Une structure française. <br /><span className="italic text-brand-accent font-light">Un cadre sécurisé.</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-light leading-relaxed">
                            Afin d'offrir une garantie de sérieux indiscutable, AXIOMIA dispose d'une filiale en France. Ce choix vous assure un encadrement contractuel aux normes européennes.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                            {[
                                "Contrats en droit français",
                                "Facturation en euros",
                                "Conformité européenne",
                                "Support local réactif"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="md:w-1/2 w-full">
                        <div className="relative aspect-video rounded-3xl bg-slate-50 overflow-hidden shadow-lg border border-slate-100 group">
                            <Image
                                src="/images/architect-axiom.png"
                                alt="Sécurisation des dossiers"
                                fill
                                className="object-cover object-center mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. SECTION SÉCURISATION FINANCIÈRE */}
            <section className="py-24 px-4 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto space-y-16">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUpVariants} className="text-center max-w-3xl mx-auto space-y-6">
                        <h2 className="text-sm font-sans tracking-[0.2em] text-[#0A192F] uppercase font-semibold">Le Nerf de la Guerre</h2>
                        <h3 className="text-3xl md:text-5xl font-serif text-[#0A192F] tracking-tight">Vos fonds sécurisés.</h3>
                        <p className="text-lg text-slate-600 font-light leading-relaxed">
                            Nous savons que les litiges naissent souvent de paiements anticipés injustifiés. Notre protocole financier élimine ce risque à la racine.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Landmark className="w-6 h-6 text-[#0A192F]" />,
                                title: "Compte Séquestre Indépendant",
                                desc: "Vos règlements sont hébergés sur un compte séquestre strict. AXIOMIA ne détient pas ces fonds."
                            },
                            {
                                icon: <FileCheck className="w-6 h-6 text-[#0A192F]" />,
                                title: "Avis Technique à Chaque Jalon",
                                desc: "Nous inspectons physiquement le chantier et émettons un rapport objectif avant toute recommandation de paiement."
                            },
                            {
                                icon: <Key className="w-6 h-6 text-[#0A192F]" />,
                                title: "La Décision Vous Appartient",
                                desc: "Si l'avis est favorable, vous autorisez le versement. En cas de réserve, la décision finale de bloquer ou payer vous revient."
                            }
                        ].map((item, i) => (
                            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} variants={fadeUpVariants}
                                className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group"
                            >
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-serif text-[#0A192F] mb-4">{item.title}</h4>
                                <p className="text-slate-600 font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CONTRÔLE DES MATÉRIAUX */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full md:w-1/2 relative bg-slate-100 rounded-[2rem] p-8 border border-slate-200 flex items-center justify-center min-h-[400px] overflow-hidden">
                        <Image src="/images/materials-axiom.png" alt="Matériaux certifiés" fill className="object-cover mix-blend-multiply" />

                        <div className="relative z-10 bg-white p-6 shadow-2xl rounded-2xl border border-slate-100 w-full max-w-sm">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-xs uppercase tracking-widest text-[#0A192F] font-semibold">Réception Live</span>
                            </div>
                            <h4 className="font-serif text-xl border-slate-900 mb-2">Acier & Ciment validés</h4>
                            <p className="text-sm text-slate-500 font-light mb-6">Contrôle qualitatif et quantitatif effectué par notre ingénieur structure sur le site.</p>
                            <div className="flex gap-3">
                                <div className="h-14 w-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100"><Camera className="w-5 h-5 text-[#0A192F]" /></div>
                                <div className="h-14 w-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100"><MapPin className="w-5 h-5 text-[#0A192F]" /></div>
                                <div className="h-14 flex-1 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 text-green-700 text-sm font-medium">Avis Émis</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUpVariants} className="w-full md:w-1/2 space-y-6 text-left">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#0A192F] leading-tight tracking-tight">
                            Contrôle à la réception <br /><span className="italic text-brand-accent font-light">des matériaux.</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-light leading-relaxed">
                            La vigilance débute avant le premier coup de pelle. Nous inspectons chaque livraison majeure pour garantir qu'aucun matériau de second choix n'est utilisé sur votre chantier.
                        </p>
                        <ul className="space-y-4 mt-8">
                            {[
                                "Vérification stricte des quantités livrées",
                                "Contrôle qualitatif selon le cahier des charges (CCTP)",
                                "Preuves par photos géolocalisées et horodatées",
                                "Notification en temps réel sur votre espace"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5 shrink-0" />
                                    <span className="text-slate-700 font-light">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* 5. MÉTHODE EN 5 ÉTAPES - TIMELINE ÉPURÉE */}
            <section className="py-24 px-4 bg-[#FAFAF9] border-y border-slate-100">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#0A192F] tracking-tight">Une Méthode Structurée</h2>
                        <p className="text-lg font-light text-slate-600 max-w-xl mx-auto">De la conception à la remise des clés, chaque phase suit un processus certifié et transparent.</p>
                    </div>

                    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16 py-4">
                        {[
                            { title: "Structuration du projet", desc: "Mise en place du cadre, analyse des plans et mise en sécurité financière." },
                            { title: "Définition des jalons", desc: "Établissement d'un calendrier strict où chaque jalon nécessite notre validation." },
                            { title: "Contrôles terrain documentés", desc: "Inspections physiques régulières par nos ingénieurs (matériaux, gros oeuvre, finitions)." },
                            { title: "Avis technique & validation", desc: "Rapports clairs vous permettant d'autoriser ou de suspendre le paiement du jalon." },
                            { title: "Réception structurée", desc: "Levée minutieuse des réserves et livraison de votre Dossier final certifié." }
                        ].map((step, i) => (
                            <motion.div
                                key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true, margin: "-50px" }}
                                className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                            >
                                <span className="absolute -left-[3.25rem] md:-left-[4.25rem] top-8 bg-white border-2 border-[#0A192F] text-[#0A192F] text-sm font-sans font-bold w-10 h-10 flex items-center justify-center rounded-full z-10">
                                    {i + 1}
                                </span>
                                <h4 className="text-xl md:text-2xl font-serif text-[#0A192F] mb-2">{step.title}</h4>
                                <p className="text-slate-600 font-light leading-relaxed mb-0">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. OFFRES PREMIUM - CLAIRES ET VALORISANTES */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#0A192F] tracking-tight">Le niveau de maîtrise désiré.</h2>
                        <p className="text-lg font-light text-slate-600 max-w-2xl mx-auto">Découvrez nos solutions d’accompagnement évolutives, conçues pour vous offrir une sérénité complète.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                        {[
                            {
                                name: "VISIO",
                                subtitle: "Supervision détaillée",
                                gain: "Clarté & visibilité complète du chantier.",
                                features: ["Audit initial", "Structuration des jalons", "Dashboard sécurisé", "Rapports mensuels", "Coffre-fort documentaire"]
                            },
                            {
                                name: "CONTROL",
                                subtitle: "Contrôle qualité actif",
                                gain: "La garantie d'un chantier conforme.",
                                isMain: true,
                                features: ["Tout AXIOMIA VISIO", "Inspections physiques", "Checklists techniques", "Rapport qualité certifié", "Gestion des réserves"]
                            },
                            {
                                name: "PILOT",
                                subtitle: "Maîtrise d'oeuvre déléguée",
                                gain: "Supervision stratégique & financière.",
                                features: ["Tout AXIOMIA CONTROL", "Chef de projet dédié", "Planification détaillée", "Coordination des acteurs", "Validation des paiements"]
                            },
                            {
                                name: "SIGNATURE",
                                subtitle: "Accompagnement intégral",
                                gain: "Le pilotage global clé en main.",
                                features: ["Tout AXIOMIA PILOT", "Appels d'offres", "Sécurisation foncière", "Gestion financière", "Suivi post-livraison"]
                            }
                        ].map((tier, i) => (
                            <div key={i} className={`flex flex-col bg-white border ${tier.isMain ? 'border-[#0A192F] shadow-xl relative' : 'border-slate-200 shadow-sm'} p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300`}>
                                {tier.isMain && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A192F] text-white text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full">Recommandé</div>}
                                <div className="mb-8">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-slate-400 mb-2">AXIOMIA</h3>
                                    <h4 className="text-2xl font-serif text-[#0A192F] mb-1">{tier.name}</h4>
                                    <p className="text-sm text-slate-500 font-light mb-4">{tier.subtitle}</p>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <p className="text-sm font-medium text-[#0A192F]">{tier.gain}</p>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {tier.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-slate-600 font-light">
                                            <Check className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/tarifs" className="mt-auto">
                                    <Button variant={tier.isMain ? "primary" : "outline"} className={`w-full rounded-full h-12 font-medium ${tier.isMain ? 'bg-[#0A192F] hover:bg-slate-800 text-white' : 'border-slate-200 text-[#0A192F] hover:bg-slate-50'}`}>
                                        Voir le détail
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. PLATEFORME TECHNOLOGIQUE - THE DARK ACCENT */}
            <section className="py-24 px-4 bg-[#0A192F] text-white overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem]">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                            <LayoutDashboard className="w-5 h-5 text-brand-accent" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                            Une transparence totale, <br /><span className="italic font-light text-slate-300">sur votre Dashboard.</span>
                        </h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            Nous vous offrons un accès exclusif à notre technologie propriétaire. Tout est documenté, horodaté et traçable. Construire à des kilomètres de chez vous n'aura jamais semblé aussi proche.
                        </p>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-6 pt-6 font-light">
                            {[
                                { icon: <ArrowRight className="w-4 h-4 text-brand-accent" />, title: "Audit Trail Sécurisé" },
                                { icon: <ArrowRight className="w-4 h-4 text-brand-accent" />, title: "Alerte en Temps Réel" },
                                { icon: <ArrowRight className="w-4 h-4 text-brand-accent" />, title: "Historique des Validations" },
                                { icon: <ArrowRight className="w-4 h-4 text-brand-accent" />, title: "Stockage Documentaire" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    {item.icon}
                                    <span className="text-sm text-slate-300">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative aspect-video lg:aspect-square bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl overflow-hidden flex flex-col gap-4">
                        {/* Minimalist Tech Dashboard Illusion */}
                        <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                            <div className="text-xs tracking-widest uppercase font-sans text-slate-400">Projet : Résidence Saly</div>
                            <div className="px-3 py-1 bg-brand-accent/20 text-brand-accent text-xs rounded-full border border-brand-accent/30 font-medium">Jalon Actif</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-24 bg-slate-900 rounded-2xl flex flex-col justify-center px-5 border border-slate-700/50">
                                <span className="text-xs text-slate-400 mb-1">Dernier Rapport</span>
                                <span className="text-sm font-medium text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Favorable</span>
                            </div>
                            <div className="h-24 bg-slate-900 rounded-2xl flex flex-col justify-center px-5 border border-slate-700/50">
                                <span className="text-xs text-slate-400 mb-1">Budget</span>
                                <span className="text-sm font-medium text-white">Validation Requise</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-700/50 p-5 space-y-4">
                            <div className="text-xs text-slate-400">Photos Récentes (Fondations)</div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="h-16 bg-slate-800 rounded-xl"></div>
                                <div className="h-16 bg-slate-800 rounded-xl"></div>
                                <div className="h-16 bg-slate-800 rounded-xl"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 8. ENGAGEMENTS AXIOMIA */}
            <section className="py-24 px-4 bg-white border-b border-slate-100">
                <div className="max-w-6xl mx-auto text-center space-y-12">
                    <h2 className="text-3xl md:text-5xl font-serif text-[#0A192F] tracking-tight">Nos Engagements</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-slate-100 pt-12">
                        {[
                            { icon: Shield, text: "Indépendance Totale" },
                            { icon: Clock, text: "Rotation Inspecteurs" },
                            { icon: FileCheck, text: "Normes Strictes" },
                            { icon: Search, text: "Traçabilité 100%" },
                            { icon: Euro, text: "Transparence Budget" }
                        ].map((eng, i) => {
                            const Icon = eng.icon;
                            return (
                                <div key={i} className="flex flex-col items-center gap-4 group">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-brand-accent/10 transition-colors">
                                        <Icon className="w-5 h-5 text-[#0A192F] group-hover:text-brand-accent transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">{eng.text}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 9. FAQ */}
            <section className="py-24 px-4 bg-[#FAFAF9]">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#0A192F] tracking-tight">Questions Fréquentes</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                >
                                    <span className="font-serif text-lg text-[#0A192F] font-medium">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-6 text-slate-600 font-light leading-relaxed">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. CTA FINAL - DARK BLUE CONFIDENCE */}
            <section className="py-24 px-4 bg-[#FAFAF9]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto bg-[#0A192F] rounded-[3rem] p-12 md:p-20 text-center shadow-2xl shadow-slate-200/50"
                >
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Un projet structuré commence par une conversation.</h2>
                        <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">Parlez-nous de votre vision architecturale. Nos ingénieurs vous présenteront le cadre d'accompagnement AXIOMIA adapté à vos exigences.</p>

                        <div className="pt-8 flex flex-col justify-center items-center">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full bg-white text-[#0A192F] hover:bg-slate-50 font-medium shadow-xl transition-all">
                                    Planifier un échange confidentiel
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
