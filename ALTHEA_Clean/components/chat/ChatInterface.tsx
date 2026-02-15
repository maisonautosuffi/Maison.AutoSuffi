'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useConfig } from '@/context/ConfigContext';
import styles from './ChatInterface.module.css';

type Message = {
    id: number;
    text: string;
    sender: 'agent' | 'user';
    image?: string;
};

type UserData = {
    name?: string;
    projectType?: string;
    hasTerrain?: boolean; // Keep this for logic, even if not explicitly asked in new flow
    terrainSurface?: string;
    constructionShape?: string;
    budget?: string;
};

// --- Knowledge Base & Intent Detection ---
const knowledgeBase = {
    locations: {
        keywords: ['ou', 'zone', 'lieu', 'ville', 'region', 'dakar', 'saly', 'douala'],
        response: "Nous construisons principalement au Sénégal (Dakar, Petite Côte : Saly, Somone) et désormais à Douala au Cameroun."
    },
    delays: {
        keywords: ['quand', 'duree', 'temps', 'delai', 'combien de temps', 'livraison'],
        response: "Nos délais de construction sont de 8 à 12 mois clés en main. Une livraison anticipée est possible selon l'avancement."
    },
    price: {
        keywords: ['prix', 'cout', 'tarif', 'combien', 'budget', 'cher'],
        response: "Nos villas commencent à partir de 45 millions FCFA (Hors terrain) pour la gamme Indigo. Le prix final dépend de la surface et des finitions."
    },
    terrain: {
        keywords: ['terrain', 'parcelle', 'foncier'],
        response: "Si vous n'avez pas encore de terrain, nous pouvons vous mettre en relation avec nos partenaires fonciers fiables."
    }
};

const detectIntent = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    for (const [key, data] of Object.entries(knowledgeBase)) {
        if (data.keywords.some(k => lowerInput.includes(k))) {
            return data.response;
        }
    }
    return null;
};


export default function ChatInterface() {
    const { config } = useConfig();
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Bonjour ! Je suis l'assistant ALTHÉA. Avez-vous un projet de construction ou souhaitez-vous explorer nos modèles ?", sender: 'agent' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(0);

    const [userData, setUserData] = useState<UserData>({});
    const [isTyping, setIsTyping] = useState(false);
    const [lastKeyword, setLastKeyword] = useState<string>("");

    // AI Logic State
    const [analysis, setAnalysis] = useState({
        autonomyScore: 0,
        luxuryScore: 0,
        natureScore: 0
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Auto-scroll logic
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [messages, isTyping]);


    // Auto-start simulation if context is present
    useEffect(() => {
        if (config.collection && step === 0 && messages.length === 1) {
            const startText = `J'ai bien noté votre intérêt pour la Collection ${config.collection}. Excellent choix. Pour affiner votre projet, avez-vous déjà un terrain ?`;

            setMessages([
                { id: 1, text: startText, sender: 'agent' }
            ]);
            setUserData(prev => ({ ...prev, projectType: `Collection ${config.collection}` }));
            setStep(2); // Jump to Terrain question
        }
    }, [config.collection]);

    // Auto-focus effect
    useEffect(() => {
        if (!isTyping) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isTyping, step]);

    // Helper to render Visual Options
    const renderVisualOptions = () => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.sender === 'agent' && lastMsg.text.includes("forme de la construction")) {
            return (
                <div className={styles.visualOptionsGrid}>
                    <button onClick={() => customHandleSend("Forme en L")} className={styles.visualOption}>
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                            <path d="M20 20 V80 H80" />
                        </svg>
                        <span>Forme en L</span>
                    </button>
                    <button onClick={() => customHandleSend("Forme en U")} className={styles.visualOption}>
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                            <path d="M20 20 V80 H80 V20" />
                        </svg>
                        <span>Forme en U</span>
                    </button>
                    <button onClick={() => customHandleSend("Rectangle")} className={styles.visualOption}>
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                            <rect x="20" y="30" width="60" height="40" />
                        </svg>
                        <span>Rectangle</span>
                    </button>
                    <button onClick={() => customHandleSend("Organique")} className={styles.visualOption}>
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                            <path d="M20 50 C20 20, 80 20, 80 50 C80 80, 20 80, 20 50" />
                        </svg>
                        <span>Organique</span>
                    </button>
                </div>
            );
        }
        return null;
    };

    const customHandleSend = (text: string) => {
        setInputValue(text);
        handleSendWithText(text);
    };

    // Helper: Call the AI API
    const callChatAPI = async (userMessage: string) => {
        try {
            // Construct message history for context
            // We'll take the last few messages + system prompt is handled in API
            const apiMessages = messages.map(m => ({
                role: m.sender === 'agent' ? 'assistant' : 'user',
                content: m.text
            }));

            // Add current user message since it's not in state yet during execution of this function? 
            // Actually handleSendWithText adds it to state, but state update is async.
            // Better to pass explicit history.
            apiMessages.push({ role: 'user', content: userMessage });

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages })
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error(error);
            return null; // Fallback to local logic
        }
    };

    const handleSendWithText = async (text: string) => {
        if (!text.trim()) return;

        const currentInput = text;
        const newUserMessage: Message = {
            id: Date.now(),
            text: currentInput,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Try API first
        const apiResponse = await callChatAPI(currentInput);

        if (apiResponse) {
            // If API works, use it!
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: apiResponse,
                    sender: 'agent'
                }]);
                setIsTyping(false);
            }, 500); // Small delay for natural feel
        } else {
            // Fallback to local logic if API fails or no key
            processAIResponse(currentInput);
        }
    };

    // Refactored logic to be reusable
    const processAIResponse = (currentInput: string) => {
        setTimeout(() => {
            let responseText = '';
            let nextStep = step + 1;
            const inputLower = currentInput.toLowerCase();

            // --- INTENT INTERRUPTION CHECK ---
            // If the user asks a specific question unrelated to the current step flow
            const intentResponse = detectIntent(currentInput);
            if (intentResponse) {
                // Respond to the question but don't advance the step yet
                // Or maybe respond and then repeat the previous question?
                // For simplicity, let's respond and ask to continue relevant to current step.

                // Construct a "come back" phrase based on current step
                let comeBackPhrase = "";
                if (step === 0) comeBackPhrase = "Mais dites-moi, quel est votre prénom ?";
                else if (step === 1) comeBackPhrase = "Revenons à votre projet : est-ce pour y habiter ou investir ?";
                else if (step === 2) comeBackPhrase = "Concernant le terrain, en avez-vous déjà un ?";
                else if (step === 9) comeBackPhrase = "Quel budget envisagez-vous pour ce projet ?";
                else comeBackPhrase = "Pouvons-nous continuer sur votre projet ?";

                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: `${intentResponse}\n\n${comeBackPhrase}`,
                    sender: 'agent'
                }]);
                setIsTyping(false);
                return; // Don't advance step logic
            }


            // --- STEP 0: NAME ---
            if (step === 0) {
                setUserData(prev => ({ ...prev, name: currentInput }));
                responseText = `Enchanté, ${currentInput}. Pour commencer, quel est le *rêve* derrière ce projet ? (Une résidence principale pour la famille, une maison secondaire, ou un investissement ?)`;

                // --- STEP 1: PROJECT TYPE (Branching Point) ---
            } else if (step === 1) {
                setUserData(prev => ({ ...prev, projectType: currentInput }));

                if (inputLower.includes('invest') || inputLower.includes('loca')) {
                    setAnalysis(prev => ({ ...prev, luxuryScore: prev.luxuryScore + 2 }));
                    setLastKeyword('invest');
                    responseText = "L'investissement demande une esthétique séduisante et durable. Avez-vous déjà repéré un terrain (au Sénégal ou Cameroun) ?";
                } else if (inputLower.includes('famill') || inputLower.includes('principale')) {
                    setLastKeyword('family');
                    responseText = "Un projet de vie, c'est passionnant. Avez-vous déjà le terrain idéal pour accueillir votre famille ?";
                } else {
                    setLastKeyword('secondary');
                    responseText = "Pour ce havre de paix, disposez-vous déjà du terrain ?";
                }

                // --- STEP 2: TERRAIN ---
            } else if (step === 2) {
                const hasTerrain = inputLower.includes('oui') || inputLower.includes('yes') || inputLower.includes('déjà');
                setUserData(prev => ({ ...prev, hasTerrain }));

                if (hasTerrain) {
                    if (inputLower.includes('douala') || inputLower.includes('cameroun')) {
                        responseText = "Douala est une ville dynamique ! Quelle est la superficie approximative de votre terrain là-bas ?";
                    } else {
                        responseText = "Parfait. Quelle est sa superficie approximative ? (Cela déterminera l'emprise au sol possible)";
                    }
                } else {
                    responseText = "Pas de souci, nous pouvons concevoir le modèle avant le terrain. Avez-vous une préférence pour la forme de la construction ? (L, U, Rectangle...)";
                    nextStep = 4; // Skip Surface
                }

                // --- STEP 3: SURFACE ---
            } else if (step === 3) {
                setUserData(prev => ({ ...prev, terrainSurface: currentInput }));
                responseText = "C'est noté. Sur cette surface, quelle forme de construction vous inspire ? (En L pour un patio, en U pour l'intimité, ou Compacte ?)";

                // --- STEP 4: SHAPE -> AUTONOMY ---
            } else if (step === 4) {
                setUserData(prev => ({ ...prev, constructionShape: currentInput }));

                // Contextual transition based on Project Type
                if (lastKeyword === 'invest') {
                    responseText = "Pour maximiser la rentabilité : quelle importance accordez-vous à l'autonomie énergétique (Solaire / Off-grid) ?";
                } else {
                    responseText = "Pour votre confort au quotidien (et éviter les coupures) : visez-vous une autonomie énergétique totale via le solaire ?";
                }

                // --- STEP 5: AUTONOMY -> EXPERIENCED VOLUME ---
            } else if (step === 5) {
                if (inputLower.includes('autono') || inputLower.includes('solaire') || inputLower.includes('oui')) {
                    setAnalysis(prev => ({ ...prev, autonomyScore: prev.autonomyScore + 3 }));
                }

                responseText = "Parlons ambiance intérieure. Préférez-vous des volumes ouverts 'Cathédrale' baignés de lumière, ou une succession d'espaces feutrés et intimes (Cocooning) ?";

                // --- STEP 6: VOLUME -> STYLE ---
            } else if (step === 6) {
                if (inputLower.includes('intime') || inputLower.includes('cocoon')) {
                    setAnalysis(prev => ({ ...prev, natureScore: prev.natureScore + 1 }));
                } else {
                    setAnalysis(prev => ({ ...prev, luxuryScore: prev.luxuryScore + 2 }));
                }

                responseText = "Et pour l'allure extérieure : êtes-vous touché par le minimalisme radical (Lignes pures), ou par une architecture qui fusionne avec la nature (Organique) ?";

                // --- STEP 7: STYLE -> MATERIALS ---
            } else if (step === 7) {
                if (inputLower.includes('nature') || inputLower.includes('organ') || inputLower.includes('fusion')) {
                    setAnalysis(prev => ({ ...prev, natureScore: prev.natureScore + 3 }));
                }

                responseText = "Dernière touche esthétique : quels matériaux vous font vibrer ? (Le Béton brut et le Verre, ou la Pierre naturelle et le Bois ?)";

                // --- STEP 8: MATERIALS -> BUDGET (NEW FLOW) ---
            } else if (step === 8) {
                let tempReason = "";
                if (inputLower.includes('pierre') || inputLower.includes('bois') || inputLower.includes('terre')) {
                    tempReason = "chaleureux";
                } else {
                    tempReason = "moderne";
                }
                setLastKeyword(tempReason);

                if (inputLower.includes('pierre') || inputLower.includes('bois')) {
                    setAnalysis(prev => ({ ...prev, natureScore: prev.natureScore + 2 }));
                }

                responseText = "C'est enregistré. Avant de vous présenter une simulation, une question essentielle : quelle enveloppe budgétaire envisagez-vous ?\n(Nos projets démarrent généralement à 45M FCFA)";

                // --- STEP 9: BUDGET -> GENERATION (NEW FLOW) ---
            } else if (step === 9) {
                setUserData(prev => ({ ...prev, budget: currentInput }));
                const userBudget = currentInput;

                let detectedStyle = 'modern';
                let styleReason = "une architecture contemporaine épurée";

                if (analysis.natureScore >= 5) {
                    detectedStyle = 'organic';
                    styleReason = "une fusion totale avec l'élément végétal";
                } else if (analysis.natureScore >= 3 || lastKeyword === 'chaleureux') {
                    detectedStyle = 'traditional';
                    styleReason = "une signature authentique et chaleureuse";
                } else {
                    detectedStyle = 'modern';
                    styleReason = "un design radical et lumineux";
                }

                const analysisText = `Merci. Avec un budget de ${userBudget}, je peux concevoir ${styleReason} sans faire de compromis sur la qualité. Je lance la simulation 3D...`;

                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: analysisText,
                    sender: 'agent'
                }]);

                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 10,
                        text: "Calcul de la lumière et des textures en cours...",
                        sender: 'agent'
                    }]);

                    setIsTyping(true);

                    setTimeout(() => {
                        const imageUrl = `/concepts/${detectedStyle}.png`; // Ensure these local placeholders exist or use remote
                        setMessages(prev => [...prev, {
                            id: Date.now() + 50,
                            text: "Voici la simulation 3D haute définition de votre future villa :",
                            sender: 'agent',
                            image: imageUrl
                        }]);

                        setTimeout(() => {
                            setMessages(prev => [...prev, {
                                id: Date.now() + 100,
                                text: "Cette vision vous inspire-t-elle ? (Oui / Non)",
                                sender: 'agent'
                            }]);
                            setStep(10); // Validation step
                            setIsTyping(false);
                        }, 4000);

                    }, 4000);
                }, 1500);

                return;

                // --- STEP 10: VALIDATION / RECOMMENDATION / END (NEW FLOW) ---
            } else if (step === 10) {
                if (inputLower.includes('non') || inputLower.includes('pas')) {
                    responseText = "Nous ajusterons le style ensemble avec l'architecte. Voici les modèles techniques ALTHÉA compatibles avec votre budget.";
                } else {
                    responseText = "Excellent. Voici les modèles ALTHÉA qui correspondent à cette esthétique et à votre budget.";
                }

                let matches = [];
                if (userData.projectType?.toLowerCase().includes('invest')) {
                    matches.push({ model: 'Sankara', score: 98, reason: "Optimisé pour l'investissement locatif (faibles charges)." });
                } else {
                    if (analysis.autonomyScore >= 3) matches.push({ model: 'Sankara', score: 95, reason: "Indépendance énergétique totale." });
                    if (analysis.luxuryScore >= 4) matches.push({ model: 'Lumumba', score: 96, reason: "Prestige et grandeur architecturale." });
                    if (analysis.natureScore >= 4) matches.push({ model: 'Senghor', score: 94, reason: "Intégration paysagère parfaite." });

                    // New Models: Cheikh Anta Diop & Nkrumah
                    if (userData.projectType?.toLowerCase().includes('famill')) {
                        matches.push({ model: 'Cheikh Anta Diop', score: 97, reason: "L'espace idéal pour la grande famille et l'héritage." });
                    }
                    if (analysis.luxuryScore >= 3 && analysis.autonomyScore >= 2) {
                        matches.push({ model: 'Nkrumah', score: 95, reason: "Une vision futuriste et audacieuse." });
                    }
                }

                if (matches.length === 0) matches.push({ model: 'Mandela', score: 90, reason: "Le meilleur rapport surface/prix." });

                // Sort
                matches.sort((a, b) => b.score - a.score);

                let recText = "";
                if (matches.length > 1) {
                    recText = `Top recommandations :\n\n1. Villa ${matches[0].model} (${matches[0].score}%)\n➜ ${matches[0].reason}\n\n2. Villa ${matches[1].model} (${matches[1].score}%)\n➜ ${matches[1].reason}`;
                } else {
                    recText = `La Villa ${matches[0].model} est la réponse idéale (${matches[0].score}%).\n\n➜ ${matches[0].reason}`;
                }

                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 10,
                        text: recText,
                        sender: 'agent'
                    }]);

                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            id: Date.now() + 20,
                            text: "Je finalise votre dossier 'Esquisse & Faisabilité'. Vous allez être redirigé vers votre Espace Client pour découvrir les plans détaillés.",
                            sender: 'agent'
                        }]);

                        localStorage.setItem('althea_user', JSON.stringify({
                            name: userData.name,
                            projectType: userData.projectType,
                            budget: userData.budget,
                            isAuthenticated: true
                        }));

                        setTimeout(() => {
                            router.push('/dashboard');
                        }, 4000);

                    }, 2500);
                }, 1000);

                setIsTyping(false);
                return;
            }

            const newAgentMessage: Message = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'agent'
            };
            setMessages(prev => [...prev, newAgentMessage]);
            setIsTyping(false);
            setStep(nextStep);

        }, 1500);
    };

    const handleSend = () => {
        if (isTyping || !inputValue.trim()) return;
        handleSendWithText(inputValue);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Image
                        src="/logo-new.png"
                        alt="Althéa"
                        width={90}
                        height={90}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <div className={styles.title}>Assistant ALTHÉA</div>
            </div>

            <div className={styles.messagesArea}>
                {messages
                    .map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.message} ${msg.sender === 'agent' ? styles.agentMessage : styles.userMessage}`}
                            style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {msg.text}
                            {msg.image && (
                                <div className={styles.generatedImageContainer}>
                                    <Image
                                        src={msg.image}
                                        alt="Proposition AI"
                                        width={500}
                                        height={300}
                                        style={{ borderRadius: '8px', marginTop: '1rem', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                {renderVisualOptions()}

                {isTyping && <div className={styles.typing}>ALTHÉA réfléchit...</div>}
                <div ref={messagesEndRef} />
            </div>

            {
                !renderVisualOptions() && (
                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Écrivez votre message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            // disabled={isTyping} Removed to keep focus
                            autoFocus
                            ref={inputRef}
                        />
                        <button
                            className={styles.button}
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isTyping}
                        >
                            Envoyer
                        </button>
                    </div>
                )
            }
        </div >
    );
}
