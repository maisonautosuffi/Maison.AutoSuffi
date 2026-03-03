import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Mentions Légales | AXIOMIA',
    description: 'Mentions légales et informations réglementaires du cabinet AXIOMIA.',
};

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-24 px-4 font-sans text-slate-700">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                <h1 className="text-4xl font-serif text-[#0A192F] mb-8">Mentions Légales</h1>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">1. Éditeur du site</h2>
                        <p className="mb-2">Le site <strong>AXIOMIA</strong> est édité par la société AXIOMIA SAS.</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)</li>
                            <li><strong>Siège social :</strong> Paris, France</li>
                            <li><strong>Email de contact :</strong> contact@axiomia.com</li>
                            <li><strong>Téléphone :</strong> +221 33 800 00 00</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">2. Hébergement</h2>
                        <p>
                            Ce site est hébergé par Vercel Inc.<br />
                            340 S Lemon Ave #4133<br />
                            Walnut, CA 91789, USA
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">3. Propriété intellectuelle</h2>
                        <p>
                            L'ensemble du contenu (textes, images, vidéos, structure du site) est la propriété exclusive d'AXIOMIA ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'éditeur.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">4. Responsabilité</h2>
                        <p>
                            AXIOMIA s'efforce de fournir sur son site des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des oublis, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                    <Link href="/" className="text-[#0A192F] hover:underline font-medium">
                        &larr; Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
