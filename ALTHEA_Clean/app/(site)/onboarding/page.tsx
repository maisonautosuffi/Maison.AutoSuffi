import type { Metadata } from 'next';
import ChatInterface from '@/components/chat/ChatInterface';

export const metadata: Metadata = {
    title: "Inscription | ALTHÉA",
    description: "Discutez avec notre assistant pour créer votre espace.",
};

export default function OnboardingPage() {
    return (
        <div style={{
            minHeight: '100vh',
            paddingTop: '20px'
            /* Background handled by global space-blue theme */
        }}>
            <ChatInterface />
        </div>
    );
}
