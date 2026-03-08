/**
 * Simulation de l'intégration Stripe Connect pour la séquestration et répartition des fonds.
 */

// Interface pour la simulation d'un PaymentIntent
export interface EscrowPaymentIntent {
    id: string;
    amount: number;
    currency: string;
    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
    capture_method: 'automatic' | 'manual';
    on_behalf_of?: string; // Compte Stripe Connect du constructeur (si applicable)
    transfer_data?: {
        destination: string; // Compte de destination
    };
}

/**
 * Crée une intention de paiement avec séquestre (fonds capturés mais non distribués).
 * @param amount Montant en centimes (ex: 1500000 = 15000.00€)
 * @param currency Devise (ex: 'eur')
 * @param destinationAccountId L'ID du compte Stripe Connect du constructeur
 * @returns EscrowPaymentIntent
 */
export async function createEscrowPaymentIntent(
    amount: number,
    currency: string,
    destinationAccountId: string
): Promise<EscrowPaymentIntent> {
    // Dans un vrai projet, on utiliserait le SDK Stripe:
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount,
    //   currency,
    //   capture_method: 'manual', // Les fonds sont "Hold" (séquestrés) sur la carte du client
    //   transfer_data: {
    //     destination: destinationAccountId,
    //   },
    // });

    console.log(`[Stripe Simulation] Création d'un Payment Intent (Séquestre) de ${amount / 100} ${currency.toUpperCase()} vers la dest: ${destinationAccountId}`);

    return {
        id: `pi_mock_escrow_${Date.now()}`,
        amount,
        currency,
        status: 'requires_capture', // Attente de déblocage
        capture_method: 'manual',
        transfer_data: {
            destination: destinationAccountId
        }
    };
}

/**
 * Libère les fonds séquestrés vers le constructeur (avec prélèvement de la commission d'Axiomia).
 * @param paymentIntentId L'ID du paiement initial séquestré
 * @param applicationFeeAmount Le montant de la commission Axiomia (en centimes)
 * @returns Le statut du paiement ("succeeded")
 */
export async function releaseFunds(
    paymentIntentId: string,
    applicationFeeAmount: number
): Promise<{ success: boolean; message: string; capturedAmount: number; feeCollected: number }> {
    // Dans un vrai projet, on capturerait le PaymentIntent en spécifiant l'application_fee_amount:
    // const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId, {
    //   application_fee_amount: applicationFeeAmount,
    // });

    console.log(`[Stripe Simulation] Libération des fonds pour ${paymentIntentId}`);
    console.log(`[Stripe Simulation] Commission Axiomia prélevée : ${applicationFeeAmount / 100} €`);

    return {
        success: true,
        message: "Fonds libérés avec succès",
        capturedAmount: 1500000, // Simulation d'un montant capturé
        feeCollected: applicationFeeAmount,
    };
}
