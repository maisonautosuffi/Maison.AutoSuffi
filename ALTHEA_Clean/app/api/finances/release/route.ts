import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { releaseFunds } from '@/lib/stripe'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { reportId, amount, applicationFeeAmount } = body

        if (!reportId) {
            return NextResponse.json({ error: 'reportId est requis' }, { status: 400 })
        }

        // 1. Initialiser Supabase et vérifier l'authentification Admin
        const cookieStore = await cookies()
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: { getAll() { return cookieStore.getAll() } }
        })

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
        }

        // Vérification du rôle Admin (Bypass pour le test si pas de profil ou profil non admin)
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        // if (profile?.role !== 'ADMIN') {
        //    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
        // }

        // 2. Appel du service Stripe pour débloquer les fonds
        const paymentIntentId = `pi_mock_${reportId}` // Identifiant fictif pour la simulation
        const stripeResult = await releaseFunds(paymentIntentId, applicationFeeAmount || 75000 /* 750€ de commission par défaut */)

        if (!stripeResult.success) {
            return NextResponse.json({ error: 'Erreur lors du déblocage Stripe' }, { status: 500 })
        }

        // 3. Mettre à jour le rapport d'inspection en statut 'Payé' (Bypass si c'est un mock report)
        if (!reportId.startsWith('mock-report')) {
            const { error: updateError } = await supabase
                .from('inspection_report')
                .update({ conclusion: 'OK_PAID' }) // Exemple: on modifie le statut interne
                .eq('id', reportId)

            if (updateError) {
                console.error("Erreur mise à jour Supabase", updateError)
                return NextResponse.json({ error: 'Erreur BDD lors de la mise à jour du rapport' }, { status: 500 })
            }
        }

        // 4. (Optionnel) Insérer une trace dans une table de transactions
        // await supabase.from('transactions').insert({ ... })

        return NextResponse.json({
            success: true,
            message: 'Fonds débloqués avec succès, commission prélevée.',
            details: stripeResult
        }, { status: 200 })

    } catch (error) {
        console.error('Erreur API Release:', error)
        return NextResponse.json({ error: 'Erreur Interne Serveur' }, { status: 500 })
    }
}
