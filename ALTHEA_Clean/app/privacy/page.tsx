import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Données Personnelles | AXIOMIA',
    description: 'Politique de confidentialité et gestion des données personnelles chez AXIOMIA.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-24 px-4 font-sans text-slate-700">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                <h1 className="text-4xl font-serif text-[#0A192F] mb-8">Données Personnelles</h1>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">1. Introduction</h2>
                        <p>
                            Cette politique de confidentialité décrit comment la société <strong>AXIOMIA</strong> collecte, utilise et protège vos informations personnelles lorsque vous utilisez notre site web et nos services d'Accompagnement à la Maîtrise d'Ouvrage (AMO).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">2. Données collectées</h2>
                        <p className="mb-2">Nous pouvons collecter et traiter les données suivantes :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Informations d'identité (Nom, prénom, nationalité).</li>
                            <li>Coordonnées (Adresse email, numéro de téléphone, adresse postale).</li>
                            <li>Informations relatives à votre projet immobilier (Localisation, budget, plans, etc.).</li>
                            <li>Données de connexion et d'utilisation du site (Cookies, adresse IP).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">3. Utilisation des données</h2>
                        <p className="mb-2">Vos informations sont principalement utilisées pour :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Vous fournir nos services d'AMO et gérer la relation client.</li>
                            <li>Vous ouvrir un espace client sécurisé sur notre plateforme.</li>
                            <li>Communiquer avec vous (notifications de chantier, rapports, facturation).</li>
                            <li>Améliorer l'expérience utilisateur et la sécurité de notre site.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">4. Sécurité et Partage</h2>
                        <p>
                            Nous mettons en œuvre des mesures de sécurité rigoureuses pour protéger vos données contre tout accès non autorisé. Vos données ne sont jamais vendues à des fins commerciales. Elles peuvent être partagées uniquement avec nos partenaires de confiance (notaires, sous-traitants validés) dans le cadre strict de l'exécution de votre projet, et toujours avec votre accord.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">5. Vos droits</h2>
                        <p>
                            Conformément à la réglementation en vigueur (notamment le RGPD européen et les lois locales comme la CDP au Sénégal), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, veuillez nous contacter à <strong>contact@axiomia.com</strong>.
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
