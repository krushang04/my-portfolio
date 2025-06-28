"use client";

import { ThemeProvider } from "next-themes";
import { ProfileProvider, useProfile } from "@/lib/context/ProfileContext";
import { ToastProvider } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { NProgressClient } from "@/components/ui/nprogress-client";

// Component that handles loading state
function ContentWithLoading({ children }: { children: React.ReactNode }) {
  const { loading: profileLoading } = useProfile();
  const [isLoading, setIsLoading] = useState(true);

  // Set up loading state
  useEffect(() => {
    if (!profileLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [profileLoading]);

  return (
    <>
      {isLoading && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--midnight)',
            zIndex: 9999
          }}
          className="dark:bg-midnight"
        />
      )}
      
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  );
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  // Admin section
  if (isAdminPage) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        storageKey="portfolio-admin-theme"
      >
        <ProfileProvider>
          <ToastProvider>
            <Suspense fallback={null}>
              <NProgressClient />
            </Suspense>
            <main>
              {children}
            </main>
          </ToastProvider>
        </ProfileProvider>
      </ThemeProvider>
    );
  }

  // For public section, show a full-page overlay during loading
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="portfolio-public-theme"
    >
      <ProfileProvider>
        <ToastProvider>
          <ContentWithLoading>
            <Navbar isAdmin={false} />
            <main>
              {children}
            </main>
            <Footer />
          </ContentWithLoading>
        </ToastProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
} 