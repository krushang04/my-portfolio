"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  GraduationCap, 
  Code, 
  User, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Palette,
  FileText,
  Quote
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Profile', href: '/admin/profile', icon: User },
  { name: 'About', href: '/admin/about', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Education', href: '/admin/education', icon: GraduationCap },
  { name: 'Skills', href: '/admin/skills', icon: Code },
  { name: 'Quotes', href: '/admin/quotes', icon: Quote },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-white dark:bg-[#18191c] border-r border-gray-200 dark:border-gray-800 transition-all duration-300 h-screen overflow-y-hidden",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          {!collapsed && (
            <Link href="/admin" className="font-bold text-xl flex items-center gap-2">
              <Palette className="h-5 w-5 text-indigo-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Portfolio Admin
              </span>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <nav className="flex-1 p-2 space-y-1 mt-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-md transition-colors",
                pathname === item.href 
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 font-medium border-l-2 border-indigo-500" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white",
                collapsed && "justify-center border-l-0"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5", 
                pathname === item.href 
                  ? "text-indigo-500" 
                  : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white",
                collapsed ? "mx-0" : "mr-3"
              )} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {!collapsed && "Portfolio Admin v1.0"}
          </div>
        </div>
      </div>
    </aside>
  );
} 