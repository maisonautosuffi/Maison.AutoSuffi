import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: { getAll() { return cookieStore.getAll(); } }
        });

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const { data, error } = await supabase
            .from('delivery')
            .insert({
                projectId: body.projectId,
                material: body.material,
                quantity: body.quantity || 1,
                unit: body.unit || 'u',
                status: body.status || 'OK',
                anomalyDetails: body.anomalyDetails || null,
                receivedById: user.id
            })
            .select()
            .single();

        if (error) {
            console.error('Delivery DB Error:', error);
            return NextResponse.json({ error: 'Failed to record delivery' }, { status: 500 });
        }

        // Optional: Log audit trail
        await supabase.from('audit_trail').insert({
            userId: user.id,
            action: 'CREATE_DELIVERY',
            entityType: 'DELIVERY',
            entityId: data.id,
            details: { material: data.material, status: data.status }
        });

        return NextResponse.json({ success: true, delivery: data });
    } catch (error) {
        console.error('Deliveries API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
