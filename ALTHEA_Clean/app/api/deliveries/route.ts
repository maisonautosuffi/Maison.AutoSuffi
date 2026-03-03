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
            .from('deliveries')
            .insert({
                project_id: body.projectId,
                material: body.material,
                quantity: body.quantity || 1,
                unit: body.unit || 'u',
                status: body.status || 'RECEIVED',
                anomaly_details: body.anomalyDetails || null,
                received_by_id: user.id
            })
            .select()
            .single();

        if (error) {
            console.error('Delivery DB Error:', error);
            return NextResponse.json({ error: 'Failed to record delivery: ' + error.message, details: error }, { status: 500 });
        }

        // Optional: Log audit trail
        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'CREATE_DELIVERY',
            resource_type: 'DELIVERY',
            resource_id: data.id,
            details: JSON.stringify({ material: data.material, status: data.status })
        });

        return NextResponse.json({ success: true, delivery: data });
    } catch (error) {
        console.error('Deliveries API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: { getAll() { return cookieStore.getAll() } }
        });

        let query = supabase.from('deliveries').select('*').order('created_at', { ascending: false });

        if (projectId) {
            query = query.eq('project_id', projectId);
        }

        const { data: deliveries, error } = await query;

        if (error) throw error;

        return NextResponse.json({ deliveries });
    } catch (error) {
        console.error('Error fetching deliveries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch deliveries' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
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
        const { id, projectId, anomalyDetails, receivedById, ...updates } = body;

        // Map keys to match DB schema
        if (projectId) updates.project_id = projectId;
        if (anomalyDetails !== undefined) updates.anomaly_details = anomalyDetails;
        if (receivedById) updates.received_by_id = receivedById;

        if (!id) {
            return NextResponse.json({ error: 'Delivery ID is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('deliveries')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Delivery Update Error:', error);
            return NextResponse.json({ error: 'Failed to update delivery' }, { status: 500 });
        }

        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'UPDATE_DELIVERY',
            resource_type: 'DELIVERY',
            resource_id: id,
            details: JSON.stringify(updates)
        });

        return NextResponse.json({ success: true, delivery: data });
    } catch (error) {
        console.error('Deliveries Update API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Delivery ID is required' }, { status: 400 });
        }

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

        const { error } = await supabase
            .from('deliveries')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delivery Delete Error:', error);
            return NextResponse.json({ error: 'Failed to delete delivery' }, { status: 500 });
        }

        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'DELETE_DELIVERY',
            resource_type: 'DELIVERY',
            resource_id: id,
            details: JSON.stringify({ deliveryId: id })
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Deliveries Delete API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
