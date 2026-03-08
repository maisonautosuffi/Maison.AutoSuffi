import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import * as Network from 'expo-network';

const PENDING_INSPECTIONS_KEY = 'PENDING_INSPECTIONS';

export interface PendingInspection {
    id: string;
    localUri: string;
    chantierId: string;
    latitude: number;
    longitude: number;
    timestamp: string;
}

export const SyncService = {
    // 1. Sauvegarde locale (quand on prend la photo hors-ligne ou avant l'upload)
    saveInspectionLocally: async (
        photoUri: string,
        chantierId: string,
        latitude: number,
        longitude: number
    ) => {
        try {
            // Déplacer la photo vers un dossier permanent
            const fileName = `${Date.now()}_${chantierId}.jpg`;
            const documentDir = FileSystem.documentDirectory + 'inspections/';

            const dirInfo = await FileSystem.getInfoAsync(documentDir);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(documentDir, { intermediates: true });
            }

            const localUri = documentDir + fileName;
            await FileSystem.copyAsync({
                from: photoUri,
                to: localUri
            });

            const newInspection: PendingInspection = {
                id: Date.now().toString(),
                localUri,
                chantierId,
                latitude,
                longitude,
                timestamp: new Date().toISOString()
            };

            // Ajouter à AsyncStorage
            const existing = await AsyncStorage.getItem(PENDING_INSPECTIONS_KEY);
            const pendingInspections: PendingInspection[] = existing ? JSON.parse(existing) : [];
            pendingInspections.push(newInspection);

            await AsyncStorage.setItem(PENDING_INSPECTIONS_KEY, JSON.stringify(pendingInspections));

            return newInspection;
        } catch (error) {
            console.error("Erreur lors de la sauvegarde locale:", error);
            throw error;
        }
    },

    // 2. Synchronisation vers Supabase
    syncPendingInspections: async () => {
        try {
            const networkState = await Network.getNetworkStateAsync();
            // Si pas de réseau, on arrête
            if (!networkState.isConnected || !networkState.isInternetReachable) {
                return { success: false, message: "Pas de connexion internet. Synchronisation en attente." };
            }

            const existing = await AsyncStorage.getItem(PENDING_INSPECTIONS_KEY);
            if (!existing) return { success: true, message: "Aucune inspection en attente." };

            const pendingInspections: PendingInspection[] = JSON.parse(existing);
            if (pendingInspections.length === 0) return { success: true, message: "Aucune inspection en attente." };

            const remainingInspections: PendingInspection[] = [];
            let syncedCount = 0;

            for (const inspection of pendingInspections) {
                try {
                    const fileInfo = await FileSystem.getInfoAsync(inspection.localUri);
                    if (!fileInfo.exists) {
                        console.warn(`Fichier introuvable pour l'inspection ${inspection.id}`);
                        continue; // Fichier perdu = on ne garde pas en attente
                    }

                    // Fetch local file en Blob (supporté depuis RN récent pour les form-data / binary)
                    const fileResponse = await fetch(inspection.localUri);
                    const blob = await fileResponse.blob();

                    // Upload vers Supabase Storage, depuis le bucket 'inspections'
                    const filePath = `${inspection.chantierId}/${inspection.id}.jpg`;

                    const { error: uploadError } = await supabase.storage
                        .from('inspections')
                        .upload(filePath, blob, {
                            contentType: 'image/jpeg',
                            upsert: false
                        });

                    if (uploadError) {
                        console.error("Erreur upload Supabase pour ID:", inspection.id, uploadError.message);
                        remainingInspections.push(inspection); // Échec, on garde pour plus tard
                    } else {
                        // Upload Storage OK. Vous pouvez aussi rajouter une insertion dans une table `inspections_reports` ici
                        const { error: dbError } = await supabase
                            .from('inspections_reports')
                            .insert([
                                {
                                    chantier_id: inspection.chantierId,
                                    image_path: filePath,
                                    latitude: inspection.latitude,
                                    longitude: inspection.longitude,
                                    captured_at: inspection.timestamp
                                }
                            ]);

                        if (dbError) {
                            console.error("Erreur DB pour ID:", inspection.id, dbError.message);
                            // Optionnel: On peut considérer que c'est un échec si la DB plante, on supprime l'image du storage et on réessaie plus tard
                            remainingInspections.push(inspection);
                        } else {
                            syncedCount++;
                            // Nettoyage du fichier local
                            await FileSystem.deleteAsync(inspection.localUri, { idempotent: true });
                        }
                    }
                } catch (err) {
                    console.error("Exception lors de l'upload de l'inspection:", inspection.id, err);
                    remainingInspections.push(inspection); // En cas d'erreur inattendue (ex: timeout), on garde
                }
            }

            // Mettre à jour SQLite / AsyncStorage avec ceux restants
            await AsyncStorage.setItem(PENDING_INSPECTIONS_KEY, JSON.stringify(remainingInspections));

            return {
                success: remainingInspections.length === 0,
                message: `${syncedCount} inspection(s) synchronisée(s). ${remainingInspections.length} restante(s).`
            };

        } catch (error) {
            console.error("Erreur Sync globale:", error);
            return { success: false, message: "Erreur lors de la synchronisation globale." };
        }
    }
};
