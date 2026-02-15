import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "CGV | ALTHÉA",
};

export default function CGVPage() {
    return (
        <div style={{ padding: '100px 5% 4rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-montserrat)', marginBottom: '2rem' }}>Conditions Générales de Vente</h1>

            <p style={{ marginBottom: '1rem' }}>
                Les présentes conditions régissent les relations contractuelles entre ALTHÉA et ses clients.
            </p>

            <section style={{ marginBottom: '2rem' }}>
                <h3>1. Objet</h3>
                <p>
                    ALTHÉA propose des services de construction de villas écologiques clés en main
                    avec suivi numérique (DTP).
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h3>2. Paiement</h3>
                <p>
                    Le paiement s'effectue par tranches selon l'avancement des travaux, validé
                    par les preuves visuelles du Digital Twin Project.
                </p>
            </section>

            <section>
                <h3>3. Garanties</h3>
                <p>
                    Nos constructions bénéficient de la garantie décennale et de la garantie de
                    parfait achèvement selon les normes en vigueur.
                </p>
            </section>
        </div>
    );
}
