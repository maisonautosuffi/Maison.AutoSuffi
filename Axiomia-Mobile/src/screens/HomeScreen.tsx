import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SyncService, PendingInspection } from '../services/SyncService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

const MOCK_MISSIONS = [
    {
        id: 'chantier_demo_01',
        name: 'Villa Dakar - Almadies',
        step: 'Jalon : Élévation des murs',
        address: 'Point E, Dakar',
        status: 'todo',
        coords: { latitude: 48.8566, longitude: 2.3522 }
    },
    {
        id: 'chantier_demo_02',
        name: 'Résidence Saly Portudal',
        step: 'Jalon : Coulage Fondation',
        address: 'Saly Niakhniakhal, Mbour',
        status: 'validated',
        coords: { latitude: 14.4379, longitude: -17.0000 }
    },
    {
        id: 'chantier_demo_03',
        name: 'Maison Individuelle Thiès',
        step: 'Jalon : Charpente et Toiture',
        address: 'Quartier Mbour 1, Thiès',
        status: 'todo',
        coords: { latitude: 14.7937, longitude: -16.9388 }
    }
];

export default function HomeScreen({ navigation }: Props) {
    const [pendingCount, setPendingCount] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);
    const [missions, setMissions] = useState(MOCK_MISSIONS);

    useFocusEffect(
        React.useCallback(() => {
            checkPendingInspections();
        }, [])
    );

    const checkPendingInspections = async () => {
        try {
            const existing = await AsyncStorage.getItem('PENDING_INSPECTIONS');
            if (existing) {
                const parsed: PendingInspection[] = JSON.parse(existing);
                setPendingCount(parsed.length);

                const pendingIds = parsed.map(p => p.chantierId);
                setMissions(currentMissions =>
                    currentMissions.map(m => {
                        if (m.status === 'todo' && pendingIds.includes(m.id)) {
                            return { ...m, status: 'pending_sync' };
                        }
                        return m;
                    })
                );
            } else {
                setPendingCount(0);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleGlobalSync = async () => {
        if (pendingCount === 0) return;

        setIsSyncing(true);
        try {
            const result = await SyncService.syncPendingInspections();
            Alert.alert("Synchronisation", result.message);
            await checkPendingInspections();
        } catch (error) {
            Alert.alert("Erreur", "La synchronisation globale a échoué.");
        } finally {
            setIsSyncing(false);
        }
    };

    const navigateToMissionDetail = (mission: typeof MOCK_MISSIONS[0]) => {
        if (mission.status === 'validated') {
            Alert.alert("Mission terminée", "Cette inspection a déjà été validée.");
            return;
        }

        navigation.navigate('MissionDetail', {
            missionId: mission.id,
            missionTitle: mission.name,
            milestoneLabel: mission.step,
            latitude: mission.coords.latitude,
            longitude: mission.coords.longitude,
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'todo':
                return <View style={[styles.badge, { backgroundColor: '#f59e0b' }]}><Text style={styles.badgeText}>À FAIRE</Text></View>;
            case 'pending_sync':
                return <View style={[styles.badge, { backgroundColor: '#3b82f6' }]}><Text style={styles.badgeText}>EN ATTENTE DE SYNCHRO</Text></View>;
            case 'validated':
                return <View style={[styles.badge, { backgroundColor: '#10b981' }]}><Text style={styles.badgeText}>VALIDÉ</Text></View>;
            default:
                return null;
        }
    };

    const renderMissionCard = ({ item }: { item: typeof MOCK_MISSIONS[0] }) => (
        <TouchableOpacity
            style={[styles.card, item.status === 'validated' && styles.cardDisabled]}
            onPress={() => navigateToMissionDetail(item)}
            activeOpacity={0.8}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                {getStatusBadge(item.status)}
            </View>

            <Text style={styles.cardStep}>{item.step}</Text>

            <View style={styles.cardFooter}>
                <Text style={styles.cardAddress}>📍 {item.address}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Bonjour,</Text>
                    <Text style={styles.inspectorName}>M. L'Inspecteur</Text>
                </View>

                <TouchableOpacity style={styles.syncButton} onPress={handleGlobalSync} disabled={isSyncing}>
                    {isSyncing ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.syncButtonText}>🔄 Sync</Text>
                    )}
                    {pendingCount > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationText}>{pendingCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>MISSIONS DU JOUR</Text>

                <FlatList
                    data={missions}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMissionCard}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#1e293b',
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
    },
    greeting: {
        color: '#94a3b8',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    inspectorName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 2,
    },
    syncButton: {
        backgroundColor: '#3b82f6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        position: 'relative',
    },
    syncButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    notificationBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#ef4444',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1e293b',
    },
    notificationText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    sectionContainer: {
        flex: 1,
        paddingTop: 24,
    },
    sectionTitle: {
        color: '#94a3b8',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginLeft: 20,
        marginBottom: 16,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#3b82f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    cardDisabled: {
        opacity: 0.6,
        borderLeftColor: '#10b981',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    cardStep: {
        color: '#cbd5e1',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 8,
        borderRadius: 8,
    },
    cardAddress: {
        color: '#94a3b8',
        fontSize: 13,
    }
});
