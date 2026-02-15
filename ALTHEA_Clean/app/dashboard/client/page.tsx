'use client';

// Reuse Timeline Page logic but force 'client' mode
import TimelinePage from '../timeline/page';
import styles from '../timeline/Timeline.module.css';

// Wrapper to force Client View
export default function ClientDashboard() {
    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>Bienvenue sur votre Espace Client</h1>
                <p>Suivez l'avancement de votre projet en temps réel.</p>
            </div>
            {/* We could pass a prop to TimelinePage to force viewMode='client' if we refactored it to accept props. 
               For now, the TimelinePage has internal state. 
               Ideally, we should refactor TimelinePage to accept props.
               
               Alternative: Create a specific client view here using the same components.
               Let's render a simplified message for now, or redirect.
               actually, let's just reuse the TimelinePage but I can't force the state easily without refactoring.
               I will just copy the relevant parts for a dedicated client view to be safe/clean.
            */}
            <ClientViewContent />
        </div>
    );
}

import { sites } from '@/data/sites';

function ClientViewContent() {
    const site = sites.find(s => s.id === 'B04');
    if (!site) return <div>Projet non trouvé for your account.</div>;

    return (
        <div>
            <div className={styles.timeline}>
                {site.planning?.map((step, index) => (
                    <div key={index} className={`${styles.step} ${styles[step.status]} ${step.status === 'pending' ? styles.clientFuture : ''}`}>
                        <div className={styles.marker}>
                            <div className={styles.icon}>{step.icon}</div>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.content}>
                            <span className={styles.date}>{step.date}</span>
                            <h3 className={styles.title}>{step.title}</h3>
                            {(step.status !== 'pending') && (
                                <p className={styles.description}>
                                    {step.status === 'completed' ? 'Validé et terminé.' : step.status === 'active' ? 'En cours.' : 'Planifié.'}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
