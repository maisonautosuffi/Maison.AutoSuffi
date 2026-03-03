'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Check, ShieldCheck, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react'

const PACK_DETAILS: Record<string, { title: string, price: string, setup: string, desc: string }> = {
    'essentiel': { title: 'Essentiel', price: '79€', setup: '249€', desc: 'Suivi & visibilité' },
    'qualite': { title: 'Qualité', price: '149€', setup: '349€', desc: 'Contrôle & inspections' },
    'pilotage': { title: 'Pilotage', price: '299€', setup: '590€', desc: 'Coordination complète' }
}

export default function CinematicCheckoutPage() {
    const params = useParams()
    const router = useRouter()
    const packSlug = params.pack as string
    const pack = PACK_DETAILS[packSlug]

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        location: '',
        budget: '',
        projectType: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    if (!pack) {
        return <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 text-brand-confidence font-serif text-2xl">Pack introuvable.</div>
    }

    const nextStep = () => setStep(s => Math.min(s + 1, 4))
    const prevStep = () => setStep(s => Math.max(s - 1, 1))

    return (
        <div className="min-h-screen bg-bg-main flex flex-col font-sans overflow-hidden relative">
            {/* Cinematic Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-confidence/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/5 blur-[120px] rounded-full"></div>
            </div>

            {/* Header / Progress */}
            <header className="px-6 md:px-12 py-8 flex justify-between items-center z-10">
                <div onClick={() => router.push('/tarifs')} className="font-serif text-2xl tracking-wide text-brand-confidence cursor-pointer">AXIOMIA</div>
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-500 ease-in-out ${i <= step ? 'w-8 bg-brand-accent' : 'w-4 bg-text-accent/20'}`} />
                    ))}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
                <AnimatePresence mode="wait">

                    {/* STEP 1: WELCOME & PACK CONFIRMATION */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-2xl w-full text-center space-y-12"
                        >
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-confidence leading-tight">
                                    Excellente décision.
                                </h1>
                                <p className="text-xl text-text-secondary font-sans leading-relaxed">
                                    Vous avez choisi le Pack <span className="text-brand-confidence font-semibold">{pack.title}</span>. <br className="hidden md:block" />Nous allons configurer votre espace sécurisé.
                                </p>
                            </div>

                            <div className="mx-auto max-w-sm bg-white/40 backdrop-blur-xl border border-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left">
                                <div className="flex justify-between items-start mb-6 border-b border-text-accent/10 pb-6">
                                    <div>
                                        <h3 className="font-serif text-2xl text-brand-confidence mb-1">Pack {pack.title}</h3>
                                        <p className="text-sm text-text-secondary">{pack.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-serif text-brand-confidence">{pack.price}</span>
                                        <span className="text-text-accent text-sm">/mois</span>
                                    </div>
                                </div>
                                <ul className="space-y-4 text-sm text-text-secondary">
                                    <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-brand-accent" /> Sécurisation des données via cryptage</li>
                                    <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-brand-accent" /> Espace coffre-fort dédié inclus</li>
                                    <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-brand-accent" /> Accès backoffice en temps réel</li>
                                </ul>
                            </div>

                            <Button size="lg" onClick={nextStep} className="px-8 py-6 text-lg group shadow-xl shadow-brand-confidence/10 hover:shadow-2xl hover:shadow-brand-confidence/20 transition-all rounded-full">
                                Commencer la configuration
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    )}

                    {/* STEP 2: PROJECT CONTEXT */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="max-w-xl w-full space-y-8"
                        >
                            <div className="text-center space-y-3 mb-12">
                                <h2 className="text-3xl md:text-4xl font-serif text-brand-confidence">Parlez-nous du projet.</h2>
                                <p className="text-text-secondary">Ajustons le calibrage de votre plateforme.</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2 ml-1">Ville de construction (Afrique)</label>
                                    <Input
                                        placeholder="Ex: Abidjan, Dakar, Douala..."
                                        className="h-14 text-lg bg-white/50 backdrop-blur-md"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2 ml-1">Type de bien</label>
                                    <select
                                        className="w-full rounded-md border border-text-accent/20 bg-white/50 backdrop-blur-md px-3 py-2 text-lg h-14 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-confidence focus-visible:ring-offset-2"
                                        value={formData.projectType}
                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                    >
                                        <option value="">Sélectionner...</option>
                                        <option value="villa">Villa Résidentielle</option>
                                        <option value="immeuble">Immeuble de rapport</option>
                                        <option value="commercial">Bâtiment commercial</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2 ml-1">Budget estimatif (en CFA ou €)</label>
                                    <Input
                                        placeholder="Ex: 80 000 €"
                                        className="h-14 text-lg bg-white/50 backdrop-blur-md"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button variant="ghost" onClick={prevStep} className="text-text-secondary hover:text-brand-confidence">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Retour
                                </Button>
                                <Button onClick={nextStep} className="px-8 rounded-full shadow-lg" disabled={!formData.location || !formData.projectType}>
                                    Continuer
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: IDENTITY */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="max-w-xl w-full space-y-8"
                        >
                            <div className="text-center space-y-3 mb-12">
                                <h2 className="text-3xl md:text-4xl font-serif text-brand-confidence">À qui avons-nous l'honneur ?</h2>
                                <p className="text-text-secondary">Ces informations sécuriseront votre accès.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2 ml-1">Prénom</label>
                                        <Input
                                            placeholder="John"
                                            className="h-14 text-lg bg-white/50 backdrop-blur-md"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2 ml-1">Nom</label>
                                        <Input
                                            placeholder="Doe"
                                            className="h-14 text-lg bg-white/50 backdrop-blur-md"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2 ml-1">Email (Identifiant sécurisé)</label>
                                    <Input
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        className="h-14 text-lg bg-white/50 backdrop-blur-md"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button variant="ghost" onClick={prevStep} className="text-text-secondary hover:text-brand-confidence">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Retour
                                </Button>
                                <Button onClick={nextStep} className="px-8 rounded-full shadow-lg" disabled={!formData.firstName || !formData.email}>
                                    Vérification
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: FINALIZATION */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-2xl w-full text-center space-y-10"
                        >
                            <div className="mx-auto w-16 h-16 bg-brand-confidence rounded-full flex items-center justify-center shadow-lg shadow-brand-confidence/20 mb-8">
                                <ShieldCheck className="w-8 h-8 text-brand-accent" />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-4xl font-serif text-brand-confidence">Tout est prêt, {formData.firstName}.</h2>
                                <p className="text-text-secondary">Votre environnement est généré. La dernière étape consiste à régler le Setup initial pour activer le déploiement de vos outils AXIOMIA.</p>
                            </div>

                            <div className="mx-auto max-w-sm bg-white border border-text-accent/10 p-6 rounded-2xl shadow-sm text-left">
                                <div className="flex justify-between text-sm mb-3">
                                    <span className="text-text-secondary">Abonnement ({pack.title})</span>
                                    <span className="font-medium text-text-primary">{pack.price} /mois</span>
                                </div>
                                <div className="flex justify-between text-sm mb-6">
                                    <span className="text-text-secondary">Frais de Setup Initial</span>
                                    <span className="font-medium text-text-primary">{pack.setup}</span>
                                </div>
                                <div className="pt-4 border-t border-text-accent/10 flex justify-between items-center">
                                    <span className="font-medium text-brand-confidence">Total à régler aujourd'hui</span>
                                    <span className="text-2xl font-serif text-brand-confidence">{pack.setup}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <Button
                                    size="lg"
                                    onClick={() => router.push('/success')}
                                    className="w-full max-w-sm h-14 text-lg rounded-full shadow-xl shadow-brand-confidence/10 flex items-center justify-center gap-2 group"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Accéder au paiement sécurisé
                                </Button>
                                <div className="flex items-center gap-2 text-xs text-text-secondary opacity-60">
                                    <ShieldCheck className="w-3 h-3" /> Paiement chiffré AES-256 via Stripe
                                </div>
                            </div>

                            <div className="pt-8">
                                <Button variant="ghost" onClick={prevStep} className="text-text-secondary text-sm">
                                    Modifier mes informations
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}
