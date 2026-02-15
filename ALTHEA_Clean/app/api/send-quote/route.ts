import { NextRequest, NextResponse } from 'next/server';
import { generateQuotePDF, ProjectQuote } from '@/lib/pdf-generator';
import { sendEmail, getWelcomeEmailTemplate } from '@/lib/email-service';

export async function POST(request: NextRequest) {
    try {
        const quoteData: ProjectQuote = await request.json();

        // Generate PDF
        const pdfBlob = await generateQuotePDF(quoteData);
        const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());

        // Prepare project details for email
        const projectDetails = `
            <strong>Modèle:</strong> ${quoteData.model}<br>
            <strong>Collection:</strong> ${quoteData.collection}<br>
            <strong>Surface:</strong> ${quoteData.surface} m²<br>
            <strong>Budget estimé:</strong> ${formatCurrency(quoteData.total)}
        `;

        // Send email with PDF attachment
        const emailResult = await sendEmail({
            to: quoteData.email,
            subject: `Votre devis ALTHÉA - ${quoteData.model} ${quoteData.collection}`,
            html: getWelcomeEmailTemplate(quoteData.clientName, projectDetails),
            attachments: [
                {
                    filename: `Devis_ALTHEA_${quoteData.model}_${Date.now()}.pdf`,
                    content: pdfBuffer,
                }
            ]
        });

        if (!emailResult.success) {
            return NextResponse.json(
                { error: 'Failed to send email', details: emailResult.error },
                { status: 500 }
            );
        }

        // Return PDF as base64 for client download
        const pdfBase64 = pdfBuffer.toString('base64');

        return NextResponse.json({
            success: true,
            messageId: emailResult.messageId,
            pdfBase64,
            message: 'Devis envoyé par email avec succès'
        });

    } catch (error) {
        console.error('Error generating quote:', error);
        return NextResponse.json(
            { error: 'Failed to generate quote', details: error },
            { status: 500 }
        );
    }
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount) + ' FCFA';
}
