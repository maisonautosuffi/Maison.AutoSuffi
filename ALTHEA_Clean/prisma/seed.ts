import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await prisma.user.upsert({
        where: { email: 'test@althea.sn' },
        update: {},
        create: {
            email: 'test@althea.sn',
            name: 'Mamadou Diallo',
            phone: '+221771234567',
            password: hashedPassword,
            role: 'CLIENT',
        },
    });

    console.log('✅ Created user:', user.email);

    // Create test project
    const project = await prisma.project.create({
        data: {
            userId: user.id,
            name: 'Villa Familiale Dakar',
            collection: 'CUIVRE',
            status: 'PRE_STUDY',
            desiredSurface: 150,
            hasTerrain: true,
            terrainSurface: 400,
            orientation: 'Sud',
            budget: '100 000 000 FCFA',
            estimatedCost: '117 177 800 FCFA',
            pricePerM2: '754 500 FCFA',
        },
    });

    console.log('✅ Created project:', project.name);

    // Create chat session
    const chatSession = await prisma.chatSession.create({
        data: {
            userId: user.id,
            projectId: project.id,
            messages: {
                create: [
                    {
                        sender: 'AGENT',
                        content: "Bonjour ! Je suis l'assistant ALTHÉA. Comment puis-je vous aider aujourd'hui ?",
                    },
                    {
                        sender: 'USER',
                        content: 'Je souhaite construire une villa familiale',
                    },
                    {
                        sender: 'AGENT',
                        content: 'Excellent ! Avez-vous déjà un terrain ?',
                    },
                ],
            },
        },
    });

    console.log('✅ Created chat session with', 3, 'messages');

    // Create sample document
    const document = await prisma.document.create({
        data: {
            projectId: project.id,
            name: 'Plan de masse.pdf',
            type: 'PLAN',
            url: '/uploads/plan-masse-example.pdf',
            size: 2048576, // 2MB
            mimeType: 'application/pdf',
        },
    });

    console.log('✅ Created document:', document.name);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest credentials:');
    console.log('  Email: test@althea.sn');
    console.log('  Password: password123');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
