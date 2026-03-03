import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ConfigProvider } from "@/context/ConfigContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AXIOMIA | Tiers de Confiance & AMO",
  description: "Bâtissez sereinement en Afrique. Assistance à Maîtrise d'Ouvrage experte, suivi de chantier transparent et paiements sécurisés pour la diaspora.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

import Analytics from "@/components/Analytics";
import { ToastProvider } from "@/context/ToastContext";

import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg-main text-text-primary antialiased selection:bg-gold selection:text-white">
        <ConfigProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
              <Analytics />
            </ToastProvider>
          </AuthProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
