'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ChevronRight, ArrowLeft, Shield, Eye, Crown, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Animation variants for Framer Motion
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0
    })
}

export default function OnboardingWizard() {
    const router = useRouter()

    // Wizard State
    const [step, setStep] = useState(1)
    const [direction, setDirection] = useState(1) // 1 forward, -1 backward
    const totalSteps = 4

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        projectNature: '',
        budget: '',
        startDate: '',
        selectedPack: ''
    })

    const handleNext = () => {
        if (step < totalSteps) {
            setDirection(1)
            setStep(prev => prev + 1)
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setDirection(-1)
            setStep(prev => prev - 1)
        }
    }

    const handleSubmit = () => {
        // Here we would normally validate and send to Supabase
        console.log("Form submitted with data:", formData)

        // Neo-bank style redirect to success or dashboard
        router.push('/dashboard/chantier')
    }

    // Handlers for specific fields that act like buttons
    const setSelection = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    // --- STEP RENDERING ---

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-serif text-[#0A192F]">Vos informations</h2>
                <p className="text-slate-500 font-light">Le socle de votre espace sécurisé.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Prénom"
                    placeholder="Ex: Jean"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <Input
                    label="Nom"
                    placeholder="Ex: Dupont"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
            </div>
            <Input
                label="Email"
                type="email"
                placeholder="jean.dupont@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div className="pt-4">
                <Button
                    className="w-full h-12 rounded-full bg-brand-confidence hover:bg-brand-confidence-hover"
                    onClick={handleNext}
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
                >
                    Continuer <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    )

    const renderStep2 = () => {
        const countries = ["Sénégal", "Côte d'Ivoire", "Cameroun", "RDC", "Autre"]
        const natures = ["Villa", "Immeuble de rapport", "Rénovation"]

        return (
            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-serif text-[#0A192F]">Le Projet</h2>
                    <p className="text-slate-500 font-light">Où se réalise votre vision ?</p>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-sans text-slate-700">Pays de construction</label>
                    <div className="flex flex-wrap gap-3">
                        {countries.map(country => (
                            <button
                                key={country}
                                onClick={() => setSelection('country', country)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${formData.country === country ? 'bg-brand-confidence text-white border-brand-confidence' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>

                <Input
                    label="Ville ou Région"
                    placeholder="Ex: Abidjan, Cocody"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />

                <div className="space-y-4 pt-2">
                    <label className="block text-sm font-sans text-slate-700">Nature du projet</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {natures.map(nat => (
                            <div
                                key={nat}
                                onClick={() => setSelection('projectNature', nat)}
                                className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${formData.projectNature === nat ? 'border-brand-confidence bg-brand-confidence/5 ring-1 ring-brand-confidence' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                            >
                                <span className={`text-sm font-medium ${formData.projectNature === nat ? 'text-brand-confidence' : 'text-slate-700'}`}>{nat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <Button variant="outline" className="h-12 w-12 rounded-full p-0 shrink-0" onClick={handleBack}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        className="w-full h-12 rounded-full bg-brand-confidence hover:bg-brand-confidence-hover"
                        onClick={handleNext}
                        disabled={!formData.country || !formData.city || !formData.projectNature}
                    >
                        Continuer
                    </Button>
                </div>
            </div>
        )
    }

    const renderStep3 = () => {
        const startDates = ["Bientôt (1-3 mois)", "Dans 6 mois", "L'année prochaine"]

        return (
            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-serif text-[#0A192F]">Budget & Planning</h2>
                    <p className="text-slate-500 font-light">Pour préparer le meilleur accompagnement.</p>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-sans text-slate-700">Budget estimé (en Euros)</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">€</span>
                        <input
                            type="number"
                            placeholder="Ex: 150000"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-confidence focus:ring-1 focus:ring-brand-confidence transition-all"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <label className="block text-sm font-sans text-slate-700">Date de début souhaitée</label>
                    <div className="space-y-3">
                        {startDates.map(date => (
                            <div
                                key={date}
                                onClick={() => setSelection('startDate', date)}
                                className={`flex items-center justify-between cursor-pointer border rounded-xl p-4 transition-all ${formData.startDate === date ? 'border-brand-confidence bg-brand-confidence/5 ring-1 ring-brand-confidence' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                            >
                                <span className={`text-sm font-medium ${formData.startDate === date ? 'text-brand-confidence' : 'text-slate-700'}`}>{date}</span>
                                {formData.startDate === date && <CheckCircle2 className="w-5 h-5 text-brand-confidence" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <Button variant="outline" className="h-12 w-12 rounded-full p-0 shrink-0" onClick={handleBack}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        className="w-full h-12 rounded-full bg-brand-confidence hover:bg-brand-confidence-hover"
                        onClick={handleNext}
                        disabled={!formData.budget || !formData.startDate}
                    >
                        Continuer
                    </Button>
                </div>
            </div>
        )
    }

    const renderStep4 = () => {
        return (
            <div className="space-y-6">
                <div className="space-y-2 text-center mb-8">
                    <h2 className="text-2xl font-serif text-[#0A192F]">Le Choix Axiomia</h2>
                    <p className="text-slate-500 font-light">Sélectionnez votre niveau de sécurité pour débloquer votre espace.</p>
                </div>

                <div className="space-y-4">
                    {/* Pack 1 */}
                    <div
                        onClick={() => setSelection('selectedPack', 'œil')}
                        className={`relative cursor-pointer border-2 rounded-2xl p-5 transition-all flex items-start gap-4 ${formData.selectedPack === 'œil' ? 'border-brand-accent bg-brand-accent/5' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                        <div className={`p-3 rounded-full ${formData.selectedPack === 'œil' ? 'bg-brand-accent text-[#0A192F]' : 'bg-slate-100 text-slate-400'}`}>
                            <Eye className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-serif text-lg text-[#0A192F]">Pack "L'Œil"</h3>
                            <p className="text-sm font-light text-slate-500 mt-1">Visibilité pure. Suivi par drone et rapports de chantier réguliers. Aucune intervention financière.</p>
                        </div>
                    </div>

                    {/* Pack 2 - RECOMMENDED */}
                    <div
                        onClick={() => setSelection('selectedPack', 'bouclier')}
                        className={`relative cursor-pointer border-2 rounded-2xl p-5 transition-all flex items-start gap-4 ${formData.selectedPack === 'bouclier' ? 'border-brand-confidence bg-[#0A192F] text-white' : 'border-[#0A192F] bg-white '}`}
                    >
                        {formData.selectedPack !== 'bouclier' && (
                            <div className="absolute -top-3 right-4 bg-brand-accent text-[#0A192F] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                Recommandé
                            </div>
                        )}
                        <div className={`p-3 rounded-full ${formData.selectedPack === 'bouclier' ? 'bg-white/10 text-brand-accent' : 'bg-[#0A192F]/5 text-[#0A192F]'}`}>
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className={`font-serif text-lg ${formData.selectedPack === 'bouclier' ? 'text-white' : 'text-[#0A192F]'}`}>Pack "Le Bouclier"</h3>
                            <p className={`text-sm font-light mt-1 ${formData.selectedPack === 'bouclier' ? 'text-slate-300' : 'text-slate-500'}`}>
                                Contrôle qualité rigoureux ET sécurisation des fonds par Séquestre. Nous bloquons les paiements en cas de malfaçon.
                            </p>
                        </div>
                    </div>

                    {/* Pack 3 */}
                    <div
                        onClick={() => setSelection('selectedPack', 'delegation')}
                        className={`relative cursor-pointer border-2 rounded-2xl p-5 transition-all flex items-start gap-4 ${formData.selectedPack === 'delegation' ? 'border-brand-accent bg-brand-accent/5' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                        <div className={`p-3 rounded-full ${formData.selectedPack === 'delegation' ? 'bg-brand-accent text-[#0A192F]' : 'bg-slate-100 text-slate-400'}`}>
                            <Crown className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-serif text-lg text-[#0A192F]">Délégation Totale</h3>
                            <p className="text-sm font-light text-slate-500 mt-1">Gestion de A à Z. Du choix des artisans jusqu'à la remise des clés avec garantie de bonne fin.</p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex gap-3">
                    <Button variant="outline" className="h-14 w-14 rounded-full p-0 shrink-0 border-slate-200" onClick={handleBack}>
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </Button>
                    <Button
                        className="w-full h-14 rounded-full bg-brand-confidence hover:bg-brand-confidence-hover text-white shadow-xl"
                        onClick={handleSubmit}
                        disabled={!formData.selectedPack}
                    >
                        Créer mon espace sécurisé <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-4">

            {/* Header simple (Logo/Back to Home) */}
            <div className="absolute top-8 left-8">
                <button onClick={() => router.push('/')} className="text-xl font-serif text-[#0A192F] italic tracking-tight hover:opacity-80 transition-opacity">
                    Axiomia<span className="text-brand-accent">.</span>
                </button>
            </div>

            {/* Neo-bank Style Card Container */}
            <div className="w-full max-w-xl">

                {/* Progress Bar Container */}
                <div className="mb-8 px-2">
                    <div className="flex justify-between text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3 px-1">
                        <span>Étape {step} sur {totalSteps}</span>
                        {step === 1 && <span>Le Compte</span>}
                        {step === 2 && <span>Le Projet</span>}
                        {step === 3 && <span>Budget</span>}
                        {step === 4 && <span>Le Choix</span>}
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-brand-confidence"
                            initial={{ width: '25%' }}
                            animate={{ width: `${(step / totalSteps) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                {/* Main Card with Framer Motion AnimatePresence */}
                <Card className="bg-white border-0 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[2rem] p-6 sm:p-8 relative w-full overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="w-full"
                        >
                            {step === 1 && renderStep1()}
                            {step === 2 && renderStep2()}
                            {step === 3 && renderStep3()}
                            {step === 4 && renderStep4()}
                        </motion.div>
                    </AnimatePresence>
                </Card>

                {/* Footer security badge */}
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
                    <Shield className="w-4 h-4" />
                    <span className="font-light">Vos données sont chiffrées de bout en bout.</span>
                </div>
            </div>

        </main>
    )
}
