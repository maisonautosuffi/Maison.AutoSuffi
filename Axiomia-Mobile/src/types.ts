export type RootStackParamList = {
    Home: undefined;
    MissionDetail: {
        missionId: string;
        missionTitle: string;
        milestoneLabel: string;
        latitude: number;
        longitude: number;
        capturedCheckpointId?: string;
    };
    SecureCamera: {
        missionId: string;
        missionName: string;
        checkpointId: string;
        controlPointName: string;
        latitude: number;
        longitude: number;
    };
};
