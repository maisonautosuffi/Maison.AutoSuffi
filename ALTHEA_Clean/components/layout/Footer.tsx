'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Merci pour votre inscription ! (Email: ${email})`);
        setEmail('');
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <div className={styles.newsletter}>
                    <h3>Restez informé</h3>
                    <p>Recevez nos dernières actualités et offres exclusives.</p>
                    <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">S'inscrire</button>
                    </form>
                </div>
                <div className={styles.socials}>
                    <a href="#" className={styles.socialIcon} aria-label="Facebook"><FaFacebookF /></a>
                    <a href="#" className={styles.socialIcon} aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><FaLinkedinIn /></a>
                    <a href="https://wa.me/221000000000" className={styles.socialIcon} aria-label="WhatsApp"><FaWhatsapp /></a>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.content}>
                <div className={styles.brand}>
                    <h3>ALTHÉA</h3>
                    <p>
                        Votre sanctuaire de paix.<br />
                        L'art de vivre en terre africaine.<br />
                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>RC/NINEA : 006987654 2V2</span>
                    </p>
                    <div className={styles.address}>
                        Immeuble Arc-en-ciel, Rte de Ouakam<br />
                        Dakar, Sénégal • Douala, Cameroun
                    </div>
                </div>

                <div className={styles.column}>
                    <h4>Navigation</h4>
                    <ul className={styles.links}>
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/models">Nos Collections</Link></li>
                        <li><Link href="#tarifs">Le Pack Tech</Link></li>
                        <li><Link href="/quartiers">Réalisations</Link></li>
                        <li><Link href="/login">Espace Client</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Ressources</h4>
                    <ul className={styles.links}>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/blog">Blog & Conseils</Link></li>
                        <li><Link href="/financement">Guide Financement</Link></li>
                        <li><Link href="/contact-chat">Devis en ligne</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Confiance & Sécurité</h4>
                    <ul className={styles.links}>
                        <li><Link href="/legal">Mentions Légales</Link></li>
                        <li><Link href="/privacy">Données Personnelles (CNDP)</Link></li>
                        <li className={styles.trustBadge}>
                            🔒 Paiement Sécurisé SSL
                        </li>
                        <li className={styles.trustBadge}>
                            🛡️ Données Cryptées
                        </li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Contact</h4>
                    <ul className={styles.links}>
                        <li><a href="mailto:contact@althea.africa">contact@althea.africa</a></li>
                        <li><a href="tel:+221338000000">+221 33 800 00 00</a></li>
                        <li style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#B08D79' }}>
                            "Réponse sous 24h garantie."
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p className={styles.copyright}>
                    © {new Date().getFullYear()} ALTHÉA. Tous droits réservés.
                </p>
                <div className={styles.partners}>
                    <span>Partenaires:</span> CBAO • BOA • Ecobank • Starlink
                </div>
            </div>
        </footer>
    );
};

export default Footer;
