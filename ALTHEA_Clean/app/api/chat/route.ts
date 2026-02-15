import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 501 }); // 501 Not Implemented
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o', // Or gpt-3.5-turbo if preferred
                messages: [
                    {
                        role: 'system',
                        content: `Tu es l'assistant virtuel expert d'ALTHÉA, un promoteur immobilier de luxe écologique opérant au Sénégal (Dakar, Saly, Somone) et au Cameroun (Douala).
            
            TES MISSIONS :
            1. Guider l'utilisateur vers le modèle de villa idéal (Mandela, Sankara, Lumumba).
            2. Répondre aux questions techniques (Autonomie solaire, DTP, Matériaux).
            3. Rassurer sur la fiabilité (Garanties, Délais 8-12 mois).

            TONTON :
            Professionnel, chaleureux, "Premium", empathique. Tu utilises des émojis avec parcimonie.

            INFOS CLÉS :
            - Délais : 8 à 12 mois.
            - Prix : À partir de 45 Millions FCFA (Hors terrain).
            - Apport : 30% à la réservation.
            - Financement : Bancaire (CBAO, BOA...) ou Echéancier direct.
            `
                    },
                    ...messages
                ],
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI API Error:", errorData);
            return NextResponse.json({ error: 'OpenAI API Error', details: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
