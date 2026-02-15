import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const leadData = await request.json();

        const lead = await prisma.lead.create({
            data: {
                email: leadData.email,
                phone: leadData.phone,
                name: leadData.name,
                model: leadData.model,
                collection: leadData.collection,
                surface: leadData.surface,
                hasTerrain: leadData.hasTerrain,
                terrainSurface: leadData.terrainSurface,
                orientation: leadData.orientation,
                budget: leadData.budget,
                chatSessionId: leadData.chatSessionId,
                source: leadData.source || 'WEBSITE',
                status: 'NEW'
            }
        });

        return NextResponse.json({ success: true, lead });
    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json(
            { error: 'Failed to create lead' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const where = status ? { status } : {};

        const leads = await prisma.lead.findMany({
            where,
            include: {
                chatSession: {
                    include: {
                        messages: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({ leads });
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json(
            { error: 'Failed to fetch leads' },
            { status: 500 }
        );
    }
}
