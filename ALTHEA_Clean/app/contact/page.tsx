import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Contact | AXIOMIA',
    description: 'Contactez AXIOMIA pour sécuriser et piloter votre projet de construction à distance.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-24 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#0A192F] mb-6 tracking-tight">
                        Parlons de votre projet
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Notre équipe d'ingénieurs et d'experts est à votre disposition pour analyser vos besoins et vous proposer la solution d'accompagnement la plus adaptée.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-serif text-[#0A192F] mb-6">Contactez-nous</h2>
                        <div className="space-y-6 text-slate-600">
                            <div>
                                <p className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-1">Email</p>
                                <a href="mailto:contact@axiomia.com" className="text-lg text-[#0A192F] hover:underline">contact@axiomia.com</a>
                            </div>
                            <div>
                                <p className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-1">Téléphone</p>
                                <a href="tel:+221338000000" className="text-lg text-[#0A192F] hover:underline">+221 33 800 00 00</a>
                            </div>
                            <div>
                                <p className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-1">WhatsApp</p>
                                <a href="https://wa.me/221000000000" target="_blank" rel="noreferrer" className="text-lg text-green-600 hover:underline">
                                    Discuter avec un conseiller
                                </a>
                            </div>
                            <div className="pt-6 border-t border-slate-100">
                                <p className="text-sm italic text-slate-500">
                                    "Nous garantissons une réponse personnalisée sous 24h."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A192F] p-8 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                        <h2 className="text-2xl font-serif mb-6">Nos Bureaux</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Siège Social - France</h3>
                                <p className="text-slate-300">Paris, France<br />Cadre juridique et conformité européenne.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Bureau de Liaison - Sénégal</h3>
                                <p className="text-slate-300">Immeuble Arc-en-ciel, Route de Ouakam<br />Dakar, Sénégal<br />Supervision opérationnelle Afrique de l'Ouest.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Bureau de Liaison - Côte d'Ivoire</h3>
                                <p className="text-slate-300">Abidjan, Côte d'Ivoire.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/" className="text-[#0A192F] hover:underline font-medium">
                        &larr; Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
