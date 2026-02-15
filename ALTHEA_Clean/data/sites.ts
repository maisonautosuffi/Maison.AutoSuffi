export const sites = [
    {
        id: 'A12',
        name: 'Villa Sankara #A12',
        location: 'Saly, Sénégal',
        client: 'M. Diop',
        status: 'ACTIVE',
        progress: 35,
        currentPhase: 'Gros Œuvre',
        sensors: { temp: '28°C', humidity: '65%', noise: '45dB' },
        team: {
            engineer: 'Sophie (BIM)',
            technician: 'Jean (Contrôle)',
            client: 'M. Diop'
        },
        coordinates: { lat: 14.4436, lng: -17.0148 }, // Saly
        milestones: [
            { id: 1, label: 'Validation des fondations', status: 'VALIDATED', date: '2026-01-15' },
            { id: 2, label: 'Coulage Dalle RDC', status: 'VALIDATED', date: '2026-02-01' },
            { id: 3, label: 'Élévation Murs R+1', status: 'PENDING_TECH', date: null },
            { id: 4, label: 'Pose Charpente', status: 'TODO', date: null },
        ],
        planning: [
            { date: "15 Jan 2026", title: "Signature Contrat", status: "completed", icon: "✍️" },
            { date: "10 Fév 2026", title: "Implantation", status: "completed", icon: "🚜" },
            { date: "12 Mar 2026", title: "Coulage Dalle", status: "completed", icon: "🏗️" },
            { date: "15 Avr 2026", title: "Élévation Murs", status: "active", icon: "🧱" },
            { date: "30 Juin 2026", title: "Hors d'Eau", status: "pending", icon: "🏠" }
        ],
        materials: [
            { id: 1, item: "Ciment (50 sacs)", status: "RECEIVED", date: "2026-02-10" },
            { id: 2, item: "Ferraillage (HA 10/12)", status: "ORDERED", date: "2026-02-15 (Prévu)" },
            { id: 3, item: "Briques 20x20", status: "PENDING", date: "-" }
        ]
    },
    {
        id: 'B04',
        name: 'Villa Mandela #B04',
        location: 'Douala, Cameroun',
        client: 'Mme. Eto\'o',
        status: 'CRITICAL',
        progress: 15,
        currentPhase: 'Fondations',
        sensors: { temp: '31°C', humidity: '80%', noise: '72dB' },
        team: {
            engineer: 'Marc (Ingé Chef)',
            technician: 'Paul (Terrain)',
            client: 'Mme. Eto\'o'
        },
        coordinates: { lat: 4.0511, lng: 9.7679 }, // Douala
        milestones: [
            { id: 1, label: 'Validation Étude de Sol G2', status: 'VALIDATED', date: '2026-02-01' },
            { id: 2, label: 'Implantation Géomètre', status: 'VALIDATED', date: '2026-02-05' },
            { id: 3, label: 'Excavation & Fouilles', status: 'CHECKED', date: '2026-02-10' }, // Waiting for Eng Validation
            { id: 4, label: 'Inspection Ferraillage Fondations', status: 'TODO', date: null },
            { id: 5, label: 'Coulage Semelles Filantes', status: 'TODO', date: null },
            { id: 6, label: 'Inspection Ferraillage Poteaux', status: 'TODO', date: null },
        ],
        planning: [
            { date: "01 Fév 2026", title: "Étude de Sol", status: "completed", icon: "🔬" },
            { date: "05 Fév 2026", title: "Implantation", status: "completed", icon: "📍" },
            { date: "15 Fév 2026", title: "Fondations", status: "active", icon: "🏗️" },
            { date: "10 Mar 2026", title: "Dalle Basse", status: "pending", icon: "🧱" }
        ],
        materials: [
            { id: 1, item: "Béton C25/30 (Toupie)", status: "ORDERED", date: "2026-02-18" },
            { id: 2, item: "Armatures Semelles", status: "RECEIVED", date: "2026-02-11" }
        ]
    }
];
