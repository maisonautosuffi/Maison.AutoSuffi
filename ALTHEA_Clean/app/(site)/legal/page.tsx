import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Mentions Légales | ALTHÉA",
};

export default function LegalPage() {
    return (
        <div style={{ padding: '100px 5% 4rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-montserrat)', marginBottom: '2rem' }}>Mentions Légales</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h3>1. Éditeur du site</h3>
                <p>
                    Le site ALTHÉA est édité par la société ALTHÉA SAS.<br />
                    Siège social : Afrique de l'Ouest.<br />
                    R.C.S : Dakar XXXXX<br />
                    Email : corporate@althea.africa
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h3>2. Hébergement</h3>
                <p>
                    Le site est hébergé par Vercel Inc.<br />
                    340 S Lemon Ave #4133 Walnut, CA 91789, USA.
                </p>
            </section>

            <section>
                <h3>3. Propriété Intellectuelle</h3>
                <p>
                    L'ensemble de ce site relève de la législation internationale sur le droit d'auteur
                    et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                </p>
            </section>
        </div>
    );
}
