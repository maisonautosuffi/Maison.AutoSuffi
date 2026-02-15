import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ProjectQuote {
    clientName: string;
    email: string;
    phone: string;
    model: string;
    collection: string;
    surface: number;
    hasTerrain: boolean;
    terrainSurface?: number;
    orientation: string;

    // Costs
    infrastructure: number;
    construction: number;
    monthlyService: number;
    estimatedDuration: number; // months
    total: number;

    createdAt: Date;
}

export async function generateQuotePDF(quote: ProjectQuote): Promise<Blob> {
    const doc = new jsPDF();

    // Branding Colors
    const copperColor: [number, number, number] = [184, 134, 11]; // Metallic Gold/Copper (Primary)
    const charcoalColor: [number, number, number] = [45, 45, 45]; // Dark Grey (Text)
    const slateColor: [number, number, number] = [100, 100, 100]; // Slate Grey (Secondary Text)
    const lightColor: [number, number, number] = [249, 249, 245]; // Off-white/Cream (Background)

    // Header with logo placeholder
    doc.setFillColor(...copperColor);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('ALTHÉA', 20, 25);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Votre Villa, Notre Expertise', 20, 32);

    // Document title
    doc.setTextColor(...charcoalColor);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('DEVIS ESTIMATIF', 20, 55);

    doc.setFontSize(10);
    doc.setTextColor(...slateColor);
    doc.setFont('helvetica', 'normal');
    doc.text(`Généré le ${new Date(quote.createdAt).toLocaleDateString('fr-FR')}`, 20, 62);
    doc.text(`Référence: ALT-${Date.now().toString().slice(-8)}`, 20, 68);

    // Client Information
    let yPos = 80;
    doc.setFontSize(14);
    doc.setTextColor(...charcoalColor);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS CLIENT', 20, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...slateColor);
    doc.text(`Nom: ${quote.clientName}`, 20, yPos);
    yPos += 6;
    doc.text(`Email: ${quote.email}`, 20, yPos);
    yPos += 6;
    doc.text(`Téléphone: ${quote.phone}`, 20, yPos);

    // Project Details
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(...charcoalColor);
    doc.setFont('helvetica', 'bold');
    doc.text('DÉTAILS DU PROJET', 20, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...slateColor);
    doc.text(`Modèle: ${quote.model}`, 20, yPos);
    yPos += 6;
    doc.text(`Collection: ${quote.collection}`, 20, yPos);
    yPos += 6;
    doc.text(`Surface habitable: ${quote.surface} m²`, 20, yPos);
    yPos += 6;
    doc.text(`Terrain: ${quote.hasTerrain ? `Oui (${quote.terrainSurface} m²)` : 'Non'}`, 20, yPos);
    yPos += 6;
    doc.text(`Orientation: ${quote.orientation}`, 20, yPos);

    // Cost Breakdown Table
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(...charcoalColor);
    doc.setFont('helvetica', 'bold');
    doc.text('DÉCOMPOSITION DES COÛTS', 20, yPos);

    yPos += 5;

    const tableData = [
        ['Infrastructure Digital Twin', 'Installation matérielle (Starlink, Caméra 4K, Mât)', formatCurrency(quote.infrastructure)],
        ['Construction', `${quote.surface} m² x ${formatCurrency(quote.construction / quote.surface)}/m²`, formatCurrency(quote.construction)],
        ['Service Mensuel', `${quote.estimatedDuration} mois x 98 500 FCFA`, formatCurrency(quote.monthlyService * quote.estimatedDuration)],
    ];

    autoTable(doc, {
        startY: yPos,
        head: [['Poste', 'Description', 'Montant']],
        body: tableData,
        theme: 'striped',
        headStyles: {
            fillColor: copperColor,
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 10
        },
        bodyStyles: {
            fontSize: 9,
            textColor: charcoalColor
        },
        columnStyles: {
            0: { cellWidth: 50 },
            1: { cellWidth: 90 },
            2: { cellWidth: 40, halign: 'right', fontStyle: 'bold' }
        },
        margin: { left: 20, right: 20 }
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, finalY, 170, 12, 'F');

    doc.setFontSize(14);
    doc.setTextColor(...charcoalColor);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL PROJET ESTIMÉ', 25, finalY + 8);
    doc.text(formatCurrency(quote.total), 185, finalY + 8, { align: 'right' });

    // Important Notes
    yPos = finalY + 25;
    doc.setFontSize(12);
    doc.setTextColor(...copperColor);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS IMPORTANTES', 20, yPos);

    yPos += 8;
    doc.setFontSize(9);
    doc.setTextColor(...slateColor);
    doc.setFont('helvetica', 'normal');

    const notes = [
        '• Ce devis est valable 30 jours à compter de la date d\'émission',
        '• Prix hors acquisition foncière',
        '• Délai de construction estimé: 4 mois après obtention du permis',
        '• Garantie décennale incluse',
        '• Possibilité de financement bancaire avec nos partenaires'
    ];

    notes.forEach(note => {
        doc.text(note, 20, yPos);
        yPos += 5;
    });

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFillColor(...copperColor);
    doc.rect(0, pageHeight - 25, 210, 25, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('ALTHÉA - Construction Intelligente et Connectée', 105, pageHeight - 15, { align: 'center' });
    doc.text('Email: contact@althea.sn | Tél: +221 XX XXX XX XX', 105, pageHeight - 10, { align: 'center' });
    doc.text('www.althea.sn', 105, pageHeight - 5, { align: 'center' });

    // Convert to Blob
    const pdfBlob = doc.output('blob');
    return pdfBlob;
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount) + ' FCFA';
}

// Helper to download PDF
export function downloadPDF(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
