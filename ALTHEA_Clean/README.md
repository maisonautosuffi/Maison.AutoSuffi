# ALTHÉA - Sanctuaire de Paix (2026)

> **Architecture d'Exception & Suivi Digital en Afrique de l'Ouest**

## 🌟 Aperçu
ALTHÉA est une plateforme immobilière haut de gamme nouvelle génération, fusionnant l'esthétique "Sand & Stone" (inspirée du Groupe Ilios) avec une gestion de projet rigoureuse (Dashboard Ingénieur, Suivi Client).

### Stack Technique
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Langage**: TypeScript
- **Style**: CSS Modules (Variables Globales) + Glassmorphism
- **Base de Données**: SQLite (Dev) / PostgreSQL (Prod) via [Prisma](https://www.prisma.io/)
- **Auth**: Context API + Rôles (Client, Ingénieur, Tech, Admin)

## 🎨 Design System (2026)
Le projet utilise une palette stricte pour garantir l'ambiance "Luxe Organique":
- **Sable (Fond)**: `#FAFAF9`
- **Pierre (Texte)**: `#1c1917`
- **Or (Accent)**: `#b08d55`
- **Police**: `Cormorant Garamond` (Titres) & `Montserrat` (Corps)

## 🚀 Installation

1.  **Cloner le projet**
    ```bash
    git clone https://github.com/votre-user/althea.git
    cd althea
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configurer la Base de Données**
    ```bash
    # Créer le fichier .env (voir .env.example)
    npx prisma generate
    npx prisma db push
    # (Optionnel) Seeder la base
    npx prisma db seed
    ```

4.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```
    Ouvrir [http://localhost:3000](http://localhost:3000)

## 📂 Structure Clé
- `app/(site)`: Pages publiques (Home, Models, Blog) avec Header/Footer.
- `app/dashboard`: Espace connecté (protégé par AuthContext).
- `components/layout`: Header, Footer, Navigation.
- `components/dashboard`: Widgets métiers (Planning, Trésorerie, Photos).
- `prisma`: Schéma de données.

## ⚠️ Notes de Déploiement
- Assurez-vous de définir `DATABASE_URL` en production.
- Le dossier `public/` contient les assets haute définition (dont `hero-final.jpg`).

---
*Développé avec passion pour ALTHÉA.*
