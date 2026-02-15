import type { Metadata } from "next";
import { Montserrat, Lato, Playfair_Display } from "next/font/google";
import { ConfigProvider } from "@/context/ConfigContext";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Added weights for UI
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ALTHÉA | Sanctuaire de Paix",
  description: "Propriété éco-responsable et sérénité minérale en Afrique.",
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
    <html lang="fr" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
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
