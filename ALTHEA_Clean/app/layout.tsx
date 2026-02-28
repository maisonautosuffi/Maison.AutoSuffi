import type { Metadata, Viewport } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { ConfigProvider } from "@/context/ConfigContext";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ALTHÉA | Sanctuaire de Paix",
  description: "Propriété éco-responsable et sérénité minérale en Afrique.",
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
    <html lang="fr" className={`${cormorant.variable} ${montserrat.variable}`}>
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
