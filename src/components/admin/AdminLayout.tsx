"use client";

import React from 'react';
import AdminSidebar from './AdminSidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Link from 'next/link';
import { ExternalLink, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' });
  };

  // If it's the login page, render children directly without the admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For other admin pages, render with the admin layout
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-midnight">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* Enhanced header with gradient border */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-6 relative">
          {/* Gradient border bottom in dark mode */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#5851DB] via-[#C13584] to-[#FFDC80] opacity-80 dark:opacity-100"></div>
          
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/settings?tab=account" 
              className="text-sm px-3 py-1.5 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Account
            </Link>
            <Link 
              href="/" 
              className="text-sm flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>Visit Site</span>
              <ExternalLink size={14} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <span>Logout</span>
              <LogOut size={14} />
            </button>
            <ThemeToggle />
          </div>
        </header>
        
        {/* Main content area with enhanced background and padding */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-[#1a1b1e] overflow-y-auto">
          <div className="container mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 