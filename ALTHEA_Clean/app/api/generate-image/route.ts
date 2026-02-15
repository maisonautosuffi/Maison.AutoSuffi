import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Best practice: Use a singleton for Prisma in a real app

export const maxDuration = 60; // 60 secondes max

const GenerateImageSchema = z.object({
    prompt: z.string().min(10).max(2000),
    email: z.string().email().optional().or(z.literal('')),
    mode: z.enum(['single', 'pack']).default('single')
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validationResult = GenerateImageSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({ error: 'Format invalide', details: validationResult.error }, { status: 400 });
        }

        const { prompt, mode, email } = validationResult.data;
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) return NextResponse.json({ error: 'Config missing' }, { status: 501 });

        // 1. ANALYSE ET DÉFINITION DU STYLE (Homogénéité)
        const defineStyle = async (basePrompt: string): Promise<string> => {
            try {
                const res = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini',
                        messages: [
                            { role: "system", content: "You are a Design Director. Extract the architectural style, materials, location, and mood from the user's description. Output a concise 'Style DNA' string (max 40 words) that describes the visual identity to ensure consistency across multiple renders (e.g., 'Minimalist concrete villa, tropical vegetation, sunset lighting, warm tones')." },
                            { role: "user", content: basePrompt }
                        ],
                        max_tokens: 60
                    }),
                });
                const data = await res.json();
                return data.choices[0]?.message?.content?.trim() || basePrompt;
            } catch (e) {
                return basePrompt;
            }
        };

        // 2. ENRICHISSEMENT SPÉCIFIQUE (Strict Subject)
        const enhancePrompt = async (basePrompt: string, styleDNA: string, role: 'facade' | 'garden' | 'rear'): Promise<string> => {
            const systemPrompts = {
                facade: `CONTEXT: ${styleDNA}. TYPE: PRIVATE SINGLE-FAMILY VILLA (NOT a hotel, NOT a public building). TASK: Generate a photorealistic FRONT FACADE view. CAMERA: Eye-level from the street/driveway. FOCUS: The main entrance, domestic scale, welcoming atmosphere. ATMOSPHERE: Warm, inhabited, residential. NO signage, NO lobby, NO hotel features.`,
                rear: `CONTEXT: ${styleDNA}. TYPE: PRIVATE FAMILY HOME. TASK: Generate a photorealistic REAR FACADE view (Garden side). CAMERA: Eye-level from the garden. FOCUS: The connection between the living room and the outdoors, large bay windows opening to the terrace/pool. ATMOSPHERE: Intimate, cosy, family lifestyle.`,
                garden: `CONTEXT: ${styleDNA}. TYPE: PRIVATE GARDEN. TASK: Generate a wider view of the LANDSCAPED GARDEN and POOL area. CAMERA: Slightly elevated or wide angle. FOCUS: The potential for family activities, relaxation, greenery. The house is visible but secondary to the garden layout. ATMOSPHERE: Peaceful, private, enclosed nature. NOT a resort.`
            };

            try {
                const res = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini',
                        messages: [
                            { role: "system", content: systemPrompts[role] },
                            { role: "user", content: `User Request: ${basePrompt}` }
                        ],
                        max_tokens: 150
                    }),
                });
                const data = await res.json();
                return data.choices[0]?.message?.content?.trim() || basePrompt;
            } catch (e) {
                return basePrompt;
            }
        };

        // 2b. Fonction de génération d'image
        const generateImage = async (enhancedPrompt: string) => {
            const res = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                body: JSON.stringify({
                    model: 'dall-e-3',
                    prompt: enhancedPrompt,
                    n: 1,
                    size: '1024x1024',
                    quality: 'standard', // 'hd' is better but more expensive, standard is faster
                    response_format: 'url',
                    style: 'natural' // 'natural' is less "AI-looking" than 'vivid'
                }),
            });
            if (!res.ok) throw await res.json();
            const data = await res.json();
            return data.data[0].url;
        };

        let results = [];

        if (mode === 'pack') {
            // A. Définir le Style DNA pour l'homogénéité
            const styleDNA = await defineStyle(prompt);
            console.log("Style DNA:", styleDNA);

            // B. Générer les prompts spécifiques en parallèle
            const [pFacade, pRear, pGarden] = await Promise.all([
                enhancePrompt(prompt, styleDNA, 'facade'),
                enhancePrompt(prompt, styleDNA, 'rear'),
                enhancePrompt(prompt, styleDNA, 'garden')
            ]);

            console.log("--- Prompts ---");
            console.log("Facade:", pFacade);
            console.log("Rear:", pRear);
            console.log("Garden:", pGarden);

            // C. Générer les images (Séquentiel pour éviter rate-limit ou parallèle si quota ok)
            // Pour DALL-E 3, éviter le parallèle massif si tier bas. On tente le parallèle ici.
            const imagePromises = [
                generateImage(pFacade),
                generateImage(pRear),
                generateImage(pGarden)
            ];

            // map pour gérer les erreurs individuelles (retourner null si fail)
            results = await Promise.all(imagePromises.map(p => p.catch(e => {
                console.error("Gen Error:", e);
                return null;
            })));

        } else {
            const styleDNA = await defineStyle(prompt);
            const enhanced = await enhancePrompt(prompt, styleDNA, 'facade');
            const url = await generateImage(enhanced);
            results = [url];
        }

        const finalResults = results.filter(url => url !== null);
        if (finalResults.length === 0) throw new Error("Échec de la génération");

        // 3. CREATE LEAD (Capture Logic)
        if (email && email.trim() !== '') {
            try {
                // Upsert logic based on email
                const existingLead = await prisma.lead.findFirst({
                    where: { email: email }
                });

                if (existingLead) {
                    // Check if there are existing images and append
                    let existingImages = [];
                    try {
                        if (existingLead.generatedImages) {
                            existingImages = JSON.parse(existingLead.generatedImages);
                        }
                    } catch (e) { }

                    const newImages = [...existingImages, ...finalResults];

                    await prisma.lead.update({
                        where: { id: existingLead.id },
                        data: {
                            notes: existingLead.notes ? existingLead.notes + "\n\n" + prompt : prompt,
                            generatedImages: JSON.stringify(newImages),
                            updatedAt: new Date()
                        }
                    });
                } else {
                    await prisma.lead.create({
                        data: {
                            email: email,
                            notes: `Génération Studio: ${prompt}`,
                            generatedImages: JSON.stringify(finalResults),
                            source: 'STUDIO_IA',
                            status: 'NEW'
                        }
                    });
                }
                console.log(`Lead captured/updated for ${email}`);
            } catch (dbError) {
                console.error("Failed to save lead:", dbError);
                // Don't fail the request if DB save fails, just log it.
            }
        }

        return NextResponse.json({ data: finalResults });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: 'Server Error', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
    }
}
