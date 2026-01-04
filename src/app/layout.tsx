import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import ParticlesBackground from "@/components/ParticlesBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wesley.dev | Portfólio",
  description: "Portfólio de um desenvolvedor especialista em automação, React e arquiteturas escaláveis. Confira meus projetos e entre em contato.",
};

export const viewport = {
  themeColor: '#0B0F14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B0F14] text-white`}
      >
        {/* Particles Background - Fixed behind everything */}
        <ParticlesBackground />

        {/* Main Content - Above particles */}
        <div className="relative z-10 pointer-events-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
