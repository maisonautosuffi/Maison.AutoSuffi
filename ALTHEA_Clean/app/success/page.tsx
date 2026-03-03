'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ShieldCheck, ArrowRight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-bg-main flex flex-col font-sans overflow-hidden relative">
            {/* Cinematic Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-green-500/5 blur-[120px] rounded-full"></div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl w-full text-center space-y-10"
                >
                    {/* Success Icon Animation */}
                    <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
                            className="absolute inset-0 bg-green-500/10 rounded-full"
                        />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 150, damping: 20 }}
                            className="absolute inset-4 bg-green-500/20 rounded-full"
                        />
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </motion.div>
                    </div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-4xl md:text-5xl font-serif text-brand-confidence leading-tight"
                        >
                            Paiement validé.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="text-xl text-text-secondary font-sans leading-relaxed"
                        >
                            Félicitations. Votre compte AXIOMIA et votre espace sécurisé sont officiellement activés.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="mx-auto max-w-sm bg-white border border-text-accent/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left space-y-4 mt-8"
                    >
                        <div className="flex items-center gap-3 pb-4 border-b border-text-accent/10">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-text-primary">Transactions chiffrées (AES-256)</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-secondary">
                            <FileText className="w-5 h-5 opacity-60" />
                            <span className="text-sm">Votre facture a été envoyée par email.</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="pt-8 flex flex-col items-center gap-4"
                    >
                        <Link href="/login" className="w-full max-w-sm">
                            <Button size="lg" className="w-full h-14 text-lg rounded-full shadow-xl shadow-brand-confidence/10 group">
                                Se connecter à l'espace Client
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    )
}
