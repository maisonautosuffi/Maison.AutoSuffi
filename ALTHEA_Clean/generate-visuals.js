// Script temporaire pour générer les visuels des villas
const fs = require('fs');
const path = require('path');
const https = require('https');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const villaPrompts = [
    {
        name: 'mandela',
        prompt: 'Photorealistic 3D architectural render of a modern African luxury villa called "Mandela". Contemporary minimalist design with emphasis on harmony and natural integration. Features: clean geometric lines, large glass panels, natural stone fa������ade, wood accents, flat roof with solar panels, infinity pool, surrounded by lush African tropical vegetation. Warm golden hour lighting, professional architecture photography, ultra-detailed, 8K quality'
    },
    {
        name: 'sankara',
        prompt: 'Photorealistic 3D architectural render of an ultra-modern off-grid African villa called "Sankara". Visionary autonomous design. Features: sleek contemporary architecture, extensive solar panel arrays, rainwater collection system visible, green roof with vegetation, modern wind turbine, large windows, natural materials (bamboo, recycled wood), minimal environmental footprint. Sunset lighting, professional architecture photography, 8K quality'
    },
    {
        name: 'lumumba',
        prompt: 'Photorealistic 3D architectural render of a bold, prestigious African villa called "Lumumba". Grand contemporary architecture symbolizing independence and resilience. Features: imposing angular design, dramatic cantilevers, floor-to-ceiling windows, concrete and steel structure with African hardwood elements, expansive terraces, monumental entrance, mature trees. Dramatic twilight lighting, professional architecture photography, ultra-detailed, 8K quality'
    },
    {
        name: 'senghor',
        prompt: 'Photorealistic 3D architectural render of a poetic nature-integrated African villa called "Senghor". Biophilic organic design in perfect symbiosis with landscape. Features: curved flowing forms, green walls and roofs, natural stone and wood materials, large openings toward nature, water features (pond/stream), native African plants integration, earth-toned palette. Natural daylight, professional architecture photography, 8K quality'
    },
    {
        name: 'cheikh-anta-diop',
        prompt: 'Photorealistic 3D architectural render of a spacious family-oriented African villa called "Cheikh Anta Diop". Generous heritage-celebrating design. Features: large open floor plan, multiple terraces for gatherings, courtyard with traditional African elements, mix of modern and cultural architectural details, warm earth tones, large communal spaces, shaded outdoor areas. Warm afternoon lighting, professional architecture photography, 8K quality'
    },
    {
        name: 'nkrumah',
        prompt: 'Photorealistic 3D architectural render of a futuristic Pan-African villa called "Nkrumah". Bold innovative design for tomorrow\'s pioneers. Features: striking avant-garde architecture, smart glass façade, geometric patterns inspired by African art, integrated technology (visible solar panels, smart systems), metallic accents with warm wood, dramatic angular forms, innovative materials. Dynamic lighting, professional architecture photography, ultra-modern, 8K quality'
    }
];

async function generateImage(prompt, outputName) {
    const requestBody = JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1792x1024',
        quality: 'hd',
        style: 'natural'
    });

    const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/images/generations',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Length': Buffer.byteLength(requestBody)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', async () => {
                if (res.statusCode === 200) {
                    const response = JSON.parse(data);
                    const imageUrl = response.data[0].url;

                    // Download image
                    const imageReq = https.get(imageUrl, (imageRes) => {
                        const outputPath = path.join(__dirname, 'public', 'models', `${outputName}.png`);
                        const fileStream = fs.createWriteStream(outputPath);
                        imageRes.pipe(fileStream);

                        fileStream.on('finish', () => {
                            fileStream.close();
                            console.log(`✅ Generated: ${outputName}.png`);
                            resolve(outputPath);
                        });
                    });

                    imageReq.on('error', reject);
                } else {
                    reject(new Error(`API Error: ${res.statusCode} - ${data}`));
                }
            });
        });

        req.on('error', reject);
        req.write(requestBody);
        req.end();
    });
}

async function generateAll() {
    // Create models directory if not exists
    const modelsDir = path.join(__dirname, 'public', 'models');
    if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir, { recursive: true });
    }

    console.log('🎨 Generating villa renders with DALL-E 3...\n');

    for (const villa of villaPrompts) {
        try {
            await generateImage(villa.prompt, villa.name);
            // Wait 2 seconds between requests to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            console.error(`❌ Error generating ${villa.name}:`, error.message);
        }
    }

    console.log('\n✅ All renders generated!');
}

generateAll();
