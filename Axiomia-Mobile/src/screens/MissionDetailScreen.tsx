import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'MissionDetail'>;

interface Checkpoint {
    id: string;
    name: string;
    isCaptured: boolean;
}

export default function MissionDetailScreen({ route, navigation }: Props) {
    const { missionId, missionTitle, milestoneLabel } = route.params;

    // Mock data for the checklist
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([
        { id: '1', name: 'Profondeur des fouilles (> 80cm)', isCaptured: false },
        { id: '2', name: 'Diamètre du ferraillage (12mm)', isCaptured: false },
        { id: '3', name: 'Propreté du béton de propreté', isCaptured: false },
    ]);

    // Listen for captured photos returning from the Camera screen
    useEffect(() => {
        if (route.params?.capturedCheckpointId) {
            setCheckpoints(prev => prev.map(cp =>
                cp.id === route.params.capturedCheckpointId ? { ...cp, isCaptured: true } : cp
            ));
        }
    }, [route.params?.capturedCheckpointId]);

    const handleCapture = (checkpointId: string, checkpointName: string) => {
        navigation.navigate('SecureCamera', {
            missionId,
            missionName: missionTitle,
            checkpointId,
            controlPointName: checkpointName
        });
    };

    const handleSubmit = () => {
        alert('Rapport complet soumis avec succès !');
        navigation.goBack();
    };

    const allCaptured = checkpoints.every(cp => cp.isCaptured);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle} numberOfLines={1}>{missionTitle}</Text>
                    <Text style={styles.headerSubtitle}>{milestoneLabel}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Points de contrôle obligatoires</Text>
                <Text style={styles.sectionDesc}>Veuillez fournir une preuve photographique pour chaque point ci-dessous :</Text>

                {checkpoints.map(cp => (
                    <View key={cp.id} style={[styles.checkpointCard, cp.isCaptured && styles.checkpointCaptured]}>
                        <View style={styles.checkpointInfo}>
                            <View style={styles.checkpointHeader}>
                                {cp.isCaptured ? (
                                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                                ) : (
                                    <Ionicons name="alert-circle-outline" size={20} color="#F59E0B" />
                                )}
                                <Text style={styles.checkpointName}>{cp.name}</Text>
                            </View>
                            {cp.isCaptured && (
                                <Text style={styles.capturedText}>Preuve capturée ✅</Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={[styles.captureButton, cp.isCaptured && styles.captureButtonDone]}
                            onPress={() => handleCapture(cp.id, cp.name)}
                        >
                            <Ionicons name="camera" size={16} color={cp.isCaptured ? "#4B5563" : "#FFF"} />
                            <Text style={[styles.captureButtonText, cp.isCaptured && styles.captureButtonTextDone]}>
                                {cp.isCaptured ? "Reprendre" : "📷 Prendre la preuve"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.submitButton, !allCaptured && styles.submitButtonDisabled]}
                    disabled={!allCaptured}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Soumettre le rapport complet</Text>
                </TouchableOpacity>
                {!allCaptured && (
                    <Text style={styles.footerHint}>Complétez la checklist pour soumettre.</Text>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827', // Dark theme
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1F2937',
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        color: '#F9FAFB',
        fontSize: 18,
        fontWeight: '700',
    },
    headerSubtitle: {
        color: '#9CA3AF',
        fontSize: 14,
        marginTop: 2,
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        color: '#F3F4F6',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    sectionDesc: {
        color: '#9CA3AF',
        fontSize: 14,
        marginBottom: 20,
    },
    checkpointCard: {
        backgroundColor: '#1F2937',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
    },
    checkpointCaptured: {
        borderLeftColor: '#10B981',
        backgroundColor: '#1F2937',
    },
    checkpointInfo: {
        marginBottom: 16,
    },
    checkpointHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkpointName: {
        color: '#F9FAFB',
        fontSize: 15,
        fontWeight: '500',
        flex: 1,
    },
    capturedText: {
        color: '#10B981',
        fontSize: 12,
        marginTop: 8,
        marginLeft: 28,
        fontWeight: '500',
    },
    captureButton: {
        backgroundColor: '#3B82F6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    captureButtonDone: {
        backgroundColor: '#374151',
    },
    captureButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    captureButtonTextDone: {
        color: '#D1D5DB',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#1F2937',
        backgroundColor: '#111827',
    },
    submitButton: {
        backgroundColor: '#10B981',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#374151',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerHint: {
        color: '#9CA3AF',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 12,
    }
});
