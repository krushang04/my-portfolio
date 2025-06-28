import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Toaster } from 'sonner';
import AuthProvider from "@/components/providers/AuthProvider";
import prisma from "@/lib/prisma";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fetch site settings for metadata
async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: '1' }
    });
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  return {
    title: {
      default: settings?.title || "Krushang Parmar | Portfolio",
      template: "%s | Krushang Parmar"
    },
    description: settings?.description || "Personal portfolio showcasing my work, projects and professional experience",
    keywords: settings?.keywords?.split(',').map(k => k.trim()) || [],
    authors: [{ name: "Krushang Parmar" }],
    icons: {
      icon: '/favicon.ico'
    }
  };
}

// Server component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-midnight text-gray-900 dark:text-gray-50`}
        suppressHydrationWarning
        data-theme={settings?.darkModeDefault ? 'dark' : 'light'}
      >
        <AuthProvider>
          <Toaster position="bottom-right" theme="system" />
          <ClientLayout>
            {children}
          </ClientLayout>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
