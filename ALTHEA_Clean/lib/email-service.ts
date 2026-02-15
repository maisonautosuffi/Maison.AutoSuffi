import nodemailer from 'nodemailer';

export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    attachments?: Array<{
        filename: string;
        content: Buffer | string;
    }>;
}

// Create reusable transporter
const createTransporter = () => {
    // For development, use Ethereal (fake SMTP)
    // For production, replace with real SMTP credentials
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

export async function sendEmail(options: EmailOptions) {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"ALTHÉA" <${process.env.SMTP_FROM || 'contact@althea.sn'}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        attachments: options.attachments,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, error };
    }
}

// Email Templates

export function getWelcomeEmailTemplate(clientName: string, projectDetails: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #2D2D2D;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #B8860B, #DAA520);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
        }
        .content {
            background: #F9F9F9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .button {
            display: inline-block;
            background: #B8860B;
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 30px;
            margin: 20px 0;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #E5E5E5;
            color: #646464;
            font-size: 14px;
        }
        .highlight {
            background: #FFF9E6;
            padding: 15px;
            border-left: 4px solid #B8860B;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ALTHÉA</h1>
        <p>Votre Villa, Notre Expertise</p>
    </div>
    
    <div class="content">
        <h2>Bonjour ${clientName},</h2>
        
        <p>Merci pour votre intérêt pour ALTHÉA ! Nous sommes ravis de vous accompagner dans votre projet de construction.</p>
        
        <div class="highlight">
            <strong>Récapitulatif de votre projet :</strong><br>
            ${projectDetails}
        </div>
        
        <p>Vous trouverez en pièce jointe votre <strong>devis estimatif détaillé</strong>.</p>
        
        <h3>Prochaines étapes :</h3>
        <ol>
            <li>Prenez rendez-vous avec notre équipe pour affiner votre projet</li>
            <li>Visitez notre showroom ou un chantier en cours</li>
            <li>Explorez nos options de financement avec nos partenaires bancaires</li>
        </ol>
        
        <center>
            <a href="https://althea.sn/contact" class="button">Prendre Rendez-vous</a>
        </center>
        
        <p>Notre équipe est à votre disposition pour répondre à toutes vos questions.</p>
        
        <p>À très bientôt,<br>
        <strong>L'équipe ALTHÉA</strong></p>
    </div>
    
    <div class="footer">
        <p>ALTHÉA - Construction Intelligente et Connectée</p>
        <p>Email: contact@althea.sn | Tél: +221 XX XXX XX XX</p>
        <p><a href="https://althea.sn">www.althea.sn</a></p>
    </div>
</body>
</html>
    `;
}

export function getFollowUpEmailTemplate(clientName: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #2D2D2D;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #B8860B, #DAA520);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #F9F9F9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .button {
            display: inline-block;
            background: #B8860B;
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 30px;
            margin: 20px 0;
            font-weight: bold;
        }
        .faq-item {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 6px;
            border-left: 3px solid #B8860B;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #E5E5E5;
            color: #646464;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ALTHÉA</h1>
    </div>
    
    <div class="content">
        <h2>Bonjour ${clientName},</h2>
        
        <p>Nous espérons que vous avez bien reçu votre devis estimatif il y a quelques jours.</p>
        
        <p>Avez-vous des questions sur votre projet ? Nous sommes là pour vous aider !</p>
        
        <h3>Questions fréquentes :</h3>
        
        <div class="faq-item">
            <strong>💰 Comment financer mon projet ?</strong><br>
            Nous travaillons avec 4 banques partenaires. Taux à partir de 6%.
        </div>
        
        <div class="faq-item">
            <strong>⏱️ Quels sont les délais ?</strong><br>
            Construction en 4 mois après obtention du permis.
        </div>
        
        <div class="faq-item">
            <strong>🏗️ Puis-je suivre mon chantier ?</strong><br>
            Oui ! Via notre plateforme Digital Twin 24/7.
        </div>
        
        <center>
            <a href="https://wa.me/221XXXXXXXXX" class="button">Discuter sur WhatsApp</a>
        </center>
        
        <p>Cordialement,<br>
        <strong>L'équipe ALTHÉA</strong></p>
    </div>
    
    <div class="footer">
        <p>ALTHÉA - Construction Intelligente et Connectée</p>
        <p>Email: contact@althea.sn | Tél: +221 XX XXX XX XX</p>
    </div>
</body>
</html>
    `;
}

export function getFinalOfferEmailTemplate(clientName: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #2D2D2D;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #B8860B, #DAA520);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #F9F9F9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .offer-box {
            background: linear-gradient(135deg, #FFF9E6, #FFFBF0);
            border: 2px solid #B8860B;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .offer-box h2 {
            color: #B8860B;
            margin: 0 0 10px 0;
        }
        .button {
            display: inline-block;
            background: #B8860B;
            color: white;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 30px;
            margin: 20px 0;
            font-weight: bold;
            font-size: 16px;
        }
        .testimonial {
            background: white;
            padding: 20px;
            border-left: 4px solid #B8860B;
            margin: 20px 0;
            font-style: italic;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #E5E5E5;
            color: #646464;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ALTHÉA</h1>
        <p>Offre Spéciale - Dernière Chance</p>
    </div>
    
    <div class="content">
        <h2>Bonjour ${clientName},</h2>
        
        <p>Nous n'avons pas encore eu de vos nouvelles concernant votre projet de villa.</p>
        
        <div class="offer-box">
            <h2>🎁 OFFRE EXCLUSIVE</h2>
            <p style="font-size: 18px; margin: 15px 0;">
                <strong>-2% sur votre projet</strong><br>
                si vous signez dans les 15 jours
            </p>
            <p style="font-size: 14px; color: #646464;">
                Offre valable jusqu'au ${new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
            </p>
        </div>
        
        <h3>Ce que disent nos clients :</h3>
        
        <div class="testimonial">
            "Suivre mon chantier depuis Paris via l'app était incroyable. Livraison en 4 mois pile comme promis."
            <br><strong>- Mamadou D., Villa Mandela 150m²</strong>
        </div>
        
        <center>
            <a href="https://althea.sn/contact-chat" class="button">Profiter de l'Offre</a>
        </center>
        
        <p>Cette offre est limitée et ne sera pas renouvelée.</p>
        
        <p>Cordialement,<br>
        <strong>L'équipe ALTHÉA</strong></p>
    </div>
    
    <div class="footer">
        <p>ALTHÉA - Construction Intelligente et Connectée</p>
        <p>Email: contact@althea.sn | Tél: +221 XX XXX XX XX</p>
        <p><a href="https://althea.sn/unsubscribe">Se désabonner</a></p>
    </div>
</body>
</html>
    `;
}
