import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            // For security, generic message
            return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
        }

        // Create Session (Simple Cookie for now)
        // In prod, use JWT or proper session management
        const sessionData = JSON.stringify({
            userId: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        });

        (await cookies()).set('auth_session', sessionData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return NextResponse.json({ success: true, user: { name: user.name, role: user.role } });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
