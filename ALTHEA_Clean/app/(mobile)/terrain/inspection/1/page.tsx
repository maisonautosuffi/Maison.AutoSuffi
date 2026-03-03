"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CameraCapture } from '@/components/ui/CameraCapture';
import { ArrowLeft, CheckCircle2, ClipboardCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function InspectionPage() {
    const [step, setStep] = useState(1);
    const [checklist, setChecklist] = useState([
        { id: 1, label: "Vérification des fondations", checked: false },
        { id: 2, label: "Mesure de l'armature ferraille", checked: false },
        { id: 3, label: "Contrôle du coulage béton", checked: false }
    ]);
    const [proofFile, setProofFile] = useState<File | null>(null);

    const toggleCheck = (id: number) => {
        setChecklist(checklist.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const allChecked = checklist.every(item => item.checked);

    return (
        <div className="min-h-screen bg-bg-main font-sans pb-24">
            {/* Header */}
            <header className="bg-brand-confidence text-white p-4 sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                    <Link href="/terrain" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-lg font-serif tracking-wide">Inspection #1</h1>
                        <p className="text-brand-accent text-xs">Villa Saly - Gros Œuvre</p>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between px-2 relative">
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-white/20 z-0"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-green-400 z-0 transition-all duration-500" style={{ width: step === 1 ? '0%' : '100%' }}></div>

                    <div className={`relative z-10 flex flex-col items-center gap-1 ${step >= 1 ? 'text-white' : 'text-white/50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-green-500 text-white' : 'bg-brand-confidence border-2 border-white/50'}`}>
                            1
                        </div>
                        <span className="text-[10px] uppercase tracking-wider">Checklist</span>
                    </div>

                    <div className={`relative z-10 flex flex-col items-center gap-1 ${step >= 2 ? 'text-white' : 'text-white/50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-green-500 text-white' : 'bg-brand-confidence border-2 border-white/50'}`}>
                            2
                        </div>
                        <span className="text-[10px] uppercase tracking-wider">Preuve In-App</span>
                    </div>
                </div>
            </header>

            <main className="p-4 mt-4">
                {step === 1 && (
                    <div className="space-y-6 reveal-text">
                        <div className="mb-6">
                            <h2 className="text-2xl font-serif text-brand-confidence flex items-center gap-2">
                                <ClipboardCheck className="w-6 h-6 text-brand-accent" />
                                Points de contrôle
                            </h2>
                            <p className="text-sm text-text-secondary mt-1">
                                Validez chaque point avant de pouvoir prendre la photo (Tap target géant).
                            </p>
                        </div>

                        <div className="space-y-4">
                            {checklist.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => toggleCheck(item.id)}
                                    className={`p-6 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 shadow-sm ${item.checked
                                            ? 'bg-green-50/50 border-green-500 shadow-green-500/10'
                                            : 'bg-white border-text-accent/20 hover:border-brand-accent/50'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${item.checked ? 'bg-green-500 text-white' : 'bg-bg-alt border-2 border-text-accent/30'
                                        }`}>
                                        {item.checked && <CheckCircle2 className="w-5 h-5 pointer-events-none" />}
                                    </div>
                                    <span className={`text-lg font-medium transition-colors ${item.checked ? 'text-brand-confidence' : 'text-text-primary'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <Button
                                className="w-full py-6 text-lg shadow-lg h-auto"
                                size="lg"
                                disabled={!allChecked}
                                onClick={() => setStep(2)}
                            >
                                PASSER À LA PREUVE VISUELLE
                            </Button>
                            {!allChecked && (
                                <p className="text-center text-xs text-brand-accent font-medium mt-3 flex items-center justify-center gap-1.5">
                                    <AlertCircle className="w-4 h-4" />
                                    Veuillez cocher tous les points
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 reveal-text">
                        <div className="mb-6">
                            <CameraCapture onCapture={setProofFile} />
                        </div>

                        {proofFile && (
                            <div className="pt-4 reveal-text">
                                <Link href="/terrain" className="block w-full">
                                    <Button className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 shadow-lg h-auto text-white" size="lg">
                                        <CheckCircle2 className="w-6 h-6 mr-2" />
                                        SOUMETTRE L'INSPECTION
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
