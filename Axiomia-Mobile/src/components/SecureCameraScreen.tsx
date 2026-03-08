import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { SyncService } from '../services/SyncService';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SecureCameraRouteProp = RouteProp<RootStackParamList, 'SecureCamera'>;
type SecureCameraNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SecureCamera'>;

const MAX_DISTANCE_METERS = 100;

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3;
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export default function SecureCameraScreen() {
    const route = useRoute<SecureCameraRouteProp>();
    const navigation = useNavigation<SecureCameraNavigationProp>();
    const { missionId, missionName, checkpointId, controlPointName, latitude: targetLat, longitude: targetLng } = route.params;

    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [locationStatus, setLocationStatus] = useState<'searching' | 'valid' | 'invalid' | 'denied'>('searching');
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [isSyncing, setIsSyncing] = useState(false);

    const cameraRef = useRef<CameraView>(null);

    useEffect(() => {
        (async () => {
            if (!cameraPermission?.granted) {
                await requestCameraPermission();
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationStatus('denied');
                Alert.alert("Action bloquée", "L'accès au GPS est obligatoire pour garantir l'absence de fraude.");
                return;
            }

            try {
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Highest
                });
                setCurrentLocation(location);

                const distance = getDistance(
                    location.coords.latitude,
                    location.coords.longitude,
                    targetLat,
                    targetLng
                );

                if (distance <= MAX_DISTANCE_METERS) {
                    setLocationStatus('valid');
                } else {
                    setLocationStatus('invalid');
                    Alert.alert("Accès refusé", `Vous n'êtes pas sur le chantier. Écart avec la zone : ${Math.round(distance)} mètres.`);
                }
            } catch (error) {
                setLocationStatus('searching');
                Alert.alert("Erreur réseau/GPS", "Impossible d'obtenir votre position actuelle.");
            }
        })();
    }, [cameraPermission, targetLat, targetLng]); // Added targetLat, targetLng to dependencies

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const takePicture = async () => {
        if (locationStatus !== 'valid') {
            Alert.alert("Action bloquée", "Votre position GPS n'est pas validée.");
            return;
        }

        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                    base64: false,
                    exif: false
                });
                if (photo) setPhotoUri(photo.uri);
            } catch (e) {
                Alert.alert("Erreur", "La capture de la photo a échoué.");
            }
        }
    };

    const handleRetake = () => setPhotoUri(null);

    const handleSend = async () => {
        if (!photoUri || !currentLocation || isSyncing) return;
        setIsSyncing(true);

        try {
            // 1. Sauvegarde locale absolue (mode hors ligne by design)
            await SyncService.saveInspectionLocally(
                photoUri,
                missionId,
                currentLocation.coords.latitude,
                currentLocation.coords.longitude
            );

            // 2. Tentative de synchronisation vers Supabase s'il y a du réseau
            const syncResult = await SyncService.syncPendingInspections();

            if (syncResult.success) {
                Alert.alert("Succès", "Photo certifiée, uploadée et synchronisée avec le serveur.", [{ text: "OK", onPress: () => navigation.navigate('MissionDetail', { capturedCheckpointId: checkpointId } as any) }]);
            } else {
                Alert.alert("Mode Hors-Ligne", "L'inspection a été sécurisée localement. " + syncResult.message, [{ text: "OK", onPress: () => navigation.navigate('MissionDetail', { capturedCheckpointId: checkpointId } as any) }]);
            }

        } catch (e) {
            Alert.alert("Erreur critique", "Le processus de certification a échoué.");
        } finally {
            setIsSyncing(false);
        }
    };

    const renderWatermark = () => {
        if (!currentLocation) return null;
        return (
            <View style={styles.watermarkContainer}>
                <Text style={styles.watermarkText}>
                    {currentTime.toLocaleDateString('fr-FR')} à {currentTime.toLocaleTimeString('fr-FR')}
                </Text>
                <Text style={styles.watermarkText}>
                    Lat: {currentLocation.coords.latitude.toFixed(6)}
                </Text>
                <Text style={styles.watermarkText}>
                    Lng: {currentLocation.coords.longitude.toFixed(6)}
                </Text>
                <Text style={[styles.watermarkText, { color: '#4ade80', marginTop: 4 }]}>
                    ✓ CERTIFIÉ AXIOMIA ANTI-FRAUDE
                </Text>
                <Text style={[styles.watermarkText, { color: '#94a3b8', fontSize: 10, marginTop: 4 }]}>
                    CHANTIER: {missionName}
                </Text>
                <Text style={[styles.watermarkText, { color: '#fbbf24', fontSize: 10, marginTop: 2 }]}>
                    PREUVE: {controlPointName.toUpperCase()}
                </Text>
            </View>
        );
    };

    if (!cameraPermission || locationStatus === 'searching') {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Calibrage GPS & Caméra sécurisée...</Text>
            </View>
        );
    }

    if (locationStatus === 'denied' || locationStatus === 'invalid' || !cameraPermission.granted) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    {locationStatus === 'invalid' ? "⚠️ GEOFENCING ACTIF\nVous n'êtes pas sur la zone du projet." : "⚠️ Autorisations requises pour inspecter."}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>← Retour</Text>
                </TouchableOpacity>
                <View style={styles.gpsIndicatorContainer}>
                    <View style={[styles.statusDot, { backgroundColor: locationStatus === 'valid' ? '#4ade80' : '#ef4444' }]} />
                    <Text style={styles.statusText}>
                        {locationStatus === 'valid' ? 'GPS Verrouillé' : 'Recherche GPS...'}
                    </Text>
                </View>
            </View>

            {photoUri ? (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: photoUri }} style={styles.camera} />
                    {renderWatermark()}

                    <View style={styles.bottomControls}>
                        <TouchableOpacity style={styles.secondaryButton} onPress={handleRetake} disabled={isSyncing}>
                            <Text style={styles.secondaryButtonText}>Reprendre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.primaryButton, isSyncing && { opacity: 0.7 }]} onPress={handleSend} disabled={isSyncing}>
                            {isSyncing ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.primaryButtonText}>Valider l'Inspection</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.cameraContainer}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing="back"
                    />
                    {renderWatermark()}

                    <View style={styles.bottomControls}>
                        <View style={styles.captureButtonOuter}>
                            <TouchableOpacity
                                style={styles.captureButtonInner}
                                onPress={takePicture}
                                disabled={locationStatus !== 'valid'}
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    loadingContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: '#a1a1aa', marginTop: 12, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 },
    errorContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 },
    errorText: { color: '#ef4444', fontSize: 16, textAlign: 'center', fontWeight: 'bold', lineHeight: 24 },

    header: {
        position: 'absolute',
        top: 60,
        width: '100%',
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backButton: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    gpsIndicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
    },
    statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    statusText: { color: '#fff', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' },

    cameraContainer: { flex: 1 },
    previewContainer: { flex: 1, backgroundColor: '#000' },
    camera: { flex: 1 },

    watermarkContainer: {
        position: 'absolute',
        bottom: 140,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#4ade80',
        alignItems: 'flex-start',
    },
    watermarkText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        fontVariant: ['tabular-nums'],
        marginBottom: 2
    },

    bottomControls: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.85)',
        paddingHorizontal: 20,
    },
    captureButtonOuter: {
        width: 76, height: 76, borderRadius: 38,
        borderWidth: 4, borderColor: '#fff',
        justifyContent: 'center', alignItems: 'center',
    },
    captureButtonInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff' },

    primaryButton: { backgroundColor: '#2563eb', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12, marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 180 },
    primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
    secondaryButton: { backgroundColor: '#3f3f46', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12, marginRight: 10 },
    secondaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
