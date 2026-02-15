import type { Metadata } from 'next';
import ChatInterface from '@/components/chat/ChatInterface';

export const metadata: Metadata = {
    title: "Contact | ALTHÉA",
    description: "Parlons de votre projet.",
};

export default function ContactChatPage() {
    return (
        <div style={{
            minHeight: '100vh',
            paddingTop: '150px', // Increased to avoid header overlap
            backgroundColor: 'var(--color-cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ChatInterface />
        </div>
    );
}
