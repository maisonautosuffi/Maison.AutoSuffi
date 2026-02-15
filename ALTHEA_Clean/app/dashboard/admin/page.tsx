'use client';

import { useState } from 'react';
import styles from './Admin.module.css';
import { useToast } from '@/context/ToastContext';
import { sites } from '@/data/sites';

// Mock DB
const initialUsers = [
    { id: 1, name: 'Admin Principal', email: 'admin@althea.com', role: 'admin', status: 'Active' },
    { id: 2, name: 'M. Diop (Client)', email: 'diop@client.com', role: 'client', status: 'Invité' },
    { id: 3, name: 'Jean (Contrôle)', email: 'jean@tech-site.com', role: 'control_tech', status: 'Active' },
    { id: 4, name: 'Sophie (BIM)', email: 'sophie@bim-studio.com', role: 'bim_engineer', status: 'Active' },
];

export default function AdminPage() {
    const { success, info } = useToast();
    const [users, setUsers] = useState(initialUsers);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'client' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        info(`Envoi de l'email d'invitation à ${formData.email}...`, "Traitement");

        setTimeout(() => {
            const newUser = {
                id: users.length + 1,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: 'Invité (Email envoyé)'
            };

            setUsers([...users, newUser]);
            success(`Compte créé ! Identifiants envoyés à ${formData.email}`, "Invitation Réussie");
            setFormData({ name: '', email: '', role: 'client' });
        }, 1500);
    };

    // Grouping
    const clients = users.filter(u => u.role === 'client');
    const fieldTechs = users.filter(u => u.role === 'control_tech');
    const officeEng = users.filter(u => u.role === 'bim_engineer' || u.role === 'admin');

    const UserList = ({ title, list, icon }: { title: string, list: typeof users, icon: string }) => (
        <div className={styles.card} style={{ marginBottom: '2rem' }}>
            <div className={styles.cardHeader} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{icon}</span> {title} ({list.length})
            </div>
            <div className={styles.userList}>
                {list.length === 0 && <div style={{ padding: '1.5rem', color: '#94a3b8', fontStyle: 'italic' }}>Aucun utilisateur</div>}
                {list.map(user => (
                    <div key={user.id} className={styles.userItem}>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user.name}</span>
                            <span className={styles.userEmail}>{user.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', color: user.status.includes('Invité') ? '#f59e0b' : '#10b981' }}>
                                {user.status}
                            </span>
                            <span className={`${styles.roleBadge} ${user.role === 'client' ? styles.roleClient :
                                user.role === 'control_tech' ? styles.roleTech : styles.roleAdmin
                                }`}>
                                {user.role === 'control_tech' ? 'Contrôleur Site' :
                                    user.role === 'bim_engineer' ? 'Ingé. Maquette' :
                                        user.role === 'client' ? 'Client' : 'Admin'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Administration & Accès</h1>
                    <p style={{ color: '#64748b' }}>Gestion dissociée : Clients • Terrain • Bureau d'Études</p>
                </div>
            </div>

            <div className={styles.grid}>
                {/* User Lists Column */}
                <div>
                    <UserList title="Espace Clients" list={clients} icon="👤" />
                    <UserList title="Techniciens de Contrôle (Terrain)" list={fieldTechs} icon="👷" />
                    <UserList title="Ingénieurs Maquette (BIM)" list={officeEng} icon="🖥️" />
                </div>

                {/* Create Form Column */}
                <div className={styles.card} style={{ height: 'fit-content', position: 'sticky', top: '2rem' }}>
                    <div className={styles.cardHeader}>
                        ➕ Nouvel Accès
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nom Complet</label>
                            <input
                                className={styles.input}
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="ex: Nom Prénom"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email Professionnel</label>
                            <input
                                className={styles.input}
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@domaine.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Type de Compte</label>
                            <select
                                className={styles.select}
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="client">👤 Client (Accès Lecture)</option>
                                <option value="control_tech">👷 Technicien Contrôle (App Mobile)</option>
                                <option value="bim_engineer">🖥️ Ingénieur Maquette (Upload BIM)</option>
                                <option value="admin">⚙️ Administrateur</option>
                            </select>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4', background: '#f1f5f9', padding: '0.75rem', borderRadius: '8px' }}>
                            <strong>Permissions :</strong><br />
                            {formData.role === 'client' && "• Vue Photos & Planning uniquement"}
                            {formData.role === 'control_tech' && "• Accès App Mobile & Scanner QR\n• Validation Étapes Terrain"}
                            {formData.role === 'bim_engineer' && "• Accès Studio & Upload Maquette\n• Gestion Documents Techniques"}
                            {formData.role === 'admin' && "• Accès Complet"}
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Créer et Envoyer l'Invitation
                        </button>
                    </form>
                </div>
            </div>
            {/* Global Site Overview */}
            <div style={{ marginTop: '3rem', gridColumn: 'span 2' }}>
                <h2 className={styles.sectionTitle} style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🌍 Supervision Globale ({sites.length} Chantiers)
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {sites.map(site => (
                        <div key={site.id} className={styles.card} style={{ borderLeft: `4px solid ${site.status === 'CRITICAL' ? '#ef4444' : '#22c55e'}` }}>
                            <div className={styles.cardHeader} style={{ justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 700 }}>{site.name}</span>
                                <span style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{site.currentPhase}</span>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.8rem', color: '#64748b' }}>
                                        <span>Avancement</span>
                                        <span>{site.progress}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${site.progress}%`, background: site.status === 'CRITICAL' ? '#ef4444' : '#3b82f6' }}></div>
                                    </div>
                                </div>

                                <div style={{ fontSize: '0.85rem', display: 'grid', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>👷</span> <strong>Tech:</strong> {site.team.technician || 'Non assigné'}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>⚡</span> <strong>Ingé:</strong> {site.team.engineer || 'Non assigné'}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>👤</span> <strong>Client:</strong> {site.team.client}
                                    </div>
                                </div>

                                <button style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    Gérer l'affectation
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
