import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Politique de Confidentialité | ALTHÉA",
};

export default function PrivacyPage() {
    return (
        <div style={{ padding: '100px 5% 4rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-montserrat)', marginBottom: '2rem' }}>Politique de Confidentialité</h1>

            <p style={{ marginBottom: '1rem' }}>
                Chez ALTHÉA, la confiance est notre fondation. Nous nous engageons à protéger vos données personnelles.
            </p>

            <section style={{ marginBottom: '2rem' }}>
                <h3>1. Collecte des données</h3>
                <p>
                    Nous collectons les informations que vous nous fournissez via le formulaire de contact
                    (nom, email, projet) uniquement dans le but de répondre à vore demande.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h3>2. Utilisation des données</h3>
                <p>
                    Vos données ne sont jamais vendues à des tiers. Elles sont utilisées pour :
                    Gérer votre dossier client, vous envoyer des informations sur votre projet (DTP),
                    et améliorer nos services.
                </p>
            </section>

            <section>
                <h3>3. Vos droits</h3>
                <p>
                    Conformément aux lois en vigueur, vous disposez d'un droit d'accès, de rectification
                    et de suppression de vos données. Contactez dpo@althea.africa.
                </p>
            </section>
        </div>
    );
}
