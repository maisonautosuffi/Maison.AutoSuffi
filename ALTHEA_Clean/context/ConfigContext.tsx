'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ConfigData = {
    model?: string;
    collection?: 'Sable' | 'Cuivre' | 'Indigo';
    hasTerrain?: boolean;
    budget?: string;
};

interface ConfigContextType {
    config: ConfigData;
    setConfig: (data: ConfigData) => void;
    updateConfig: (data: Partial<ConfigData>) => void;
    startSimulation: (collection: 'Sable' | 'Cuivre' | 'Indigo') => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<ConfigData>({});

    const updateConfig = (data: Partial<ConfigData>) => {
        setConfig(prev => ({ ...prev, ...data }));
    };

    const startSimulation = (collection: 'Sable' | 'Cuivre' | 'Indigo') => {
        updateConfig({ collection });
        // Dispatch custom event or use router to open chat/dashboard
        // For now, we'll rely on the ChatInterface reading this context
    };

    return (
        <ConfigContext.Provider value={{ config, setConfig, updateConfig, startSimulation }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
