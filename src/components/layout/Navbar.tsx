"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiX, SiGithub, SiLinkedin, SiGmail } from "react-icons/si";
import { Home, User, FolderKanban, Settings, LayoutDashboard, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useProfile } from "@/lib/context/ProfileContext";
import { useEffect, useState } from "react";

interface NavbarProps {
  isAdmin?: boolean;
}

// AdminNavbar - simpler navigation for admin pages
const AdminNavbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl z-50">
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-600/10 border border-gray-200 dark:border-white/20 rounded-full shadow dark:shadow-none">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Admin Title */}
            <Link href="/admin" className="text-lg font-semibold">
              Admin Dashboard
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link href="/admin" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                <LayoutDashboard className="h-5 w-5" />
              </Link>
              
              <Link href="/admin/projects" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                <FolderKanban className="h-5 w-5" />
              </Link>
              
              <Link href="/admin/profile" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                <User className="h-5 w-5" />
              </Link>
              
              <Link href="/admin/settings" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Settings className="h-5 w-5" />
              </Link>
              
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Home className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// PublicNavbar - full navigation for public-facing pages
const PublicNavbar = () => {
  const { profile, loading } = useProfile();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // After component mounts, set mounted to true
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until component is mounted and profile data is loaded
  if (!mounted || loading) {
    // Optional: Return a placeholder with same height to prevent layout shift
    return <div className="h-16"></div>;
  }

  // Default social links that will be shown before profile data loads
  const defaultSocialLinks = {
    twitterUrl: false,
    githubUrl: false,
    linkedinUrl: false,
    email: false,
    resumeUrl: false,
  };

  // Social links from profile or defaults
  const socialLinks = {
    twitterUrl: profile?.twitterUrl || defaultSocialLinks.twitterUrl,
    githubUrl: profile?.githubUrl || defaultSocialLinks.githubUrl,
    linkedinUrl: profile?.linkedinUrl || defaultSocialLinks.linkedinUrl,
    email: profile?.email || defaultSocialLinks.email,
    resumeUrl: profile?.resumeUrl || defaultSocialLinks.resumeUrl,
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-xl z-50">
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-600/10 border border-gray-200 dark:border-white/20 rounded-full shadow dark:shadow-none">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center justify-between w-full">
              {/* Left: Resume */}
              <div className="flex-shrink-0">
                {socialLinks.resumeUrl && (
                  <Link 
                    href={profile?.resumeUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="rounded-full">
                      Resume
                    </Button>
                  </Link>
                )}
              </div>

              {/* Middle: Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.twitterUrl && (
                  <Link 
                    href={profile?.twitterUrl || '#'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    <SiX className="h-5 w-5" />
                  </Link>
                )}
                
                {socialLinks.githubUrl && (
                  <Link 
                    href={profile?.githubUrl || '#'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                  >
                    <SiGithub className="h-5 w-5" />
                  </Link>
                )}
                
                {socialLinks.linkedinUrl && (
                  <Link 
                    href={profile?.linkedinUrl || '#'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-500"
                  >
                    <SiLinkedin className="h-5 w-5" />
                  </Link>
                )}
                
                {socialLinks.email && (
                  <a 
                    href={`mailto:${profile?.email || ''}`}
                    className="text-gray-600 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-400"
                  >
                    <SiGmail className="h-5 w-5" />
                  </a>
                )}
              </div>

              {/* Right: Dropdown Menu */}
              <div className="flex items-center space-x-3">
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between w-full">
              {/* Left: Navigation Links */}
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                  </Link>   
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Home
                  </span>
                </div>
                
                <div className="relative group">
                  <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <User className="h-5 w-5" />
                    <span className="sr-only">About</span>
                  </Link>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    About
                  </span>
                </div>
                
                <div className="relative group">
                  <Link href="/projects" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <FolderKanban className="h-5 w-5" />
                    <span className="sr-only">Projects</span>
                  </Link>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Projects
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

              {/* Center: Social Links */}
              <div className="flex items-center space-x-6">
                {socialLinks.twitterUrl && (
                  <div className="relative group">
                    <Link 
                      href={profile?.twitterUrl || '#'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                    >
                      <SiX className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Twitter
                    </span>
                  </div>
                )}
                
                {socialLinks.githubUrl && (
                  <div className="relative group">
                    <Link 
                      href={profile?.githubUrl || '#'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-colors"
                    >
                      <SiGithub className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      GitHub
                    </span>
                  </div>
                )}
                
                {socialLinks.linkedinUrl && (
                  <div className="relative group">
                    <Link 
                      href={profile?.linkedinUrl || '#'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-500 transition-colors"
                    >
                      <SiLinkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      LinkedIn
                    </span>
                  </div>
                )}
                
                {socialLinks.email && (
                  <div className="relative group">
                    <a 
                      href={`mailto:${profile?.email || ''}`}
                      className="text-gray-600 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-400 transition-colors"
                    >
                      <SiGmail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </a>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Email
                    </span>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

              {/* Right: Resume and Theme Toggle */}
              <div className="flex items-center space-x-4">
                {socialLinks.resumeUrl && (
                  <div className="relative group">
                    <Link 
                      href={profile?.resumeUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="rounded-full">
                        Resume
                      </Button>
                    </Link>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      View Resume
                    </span>
                  </div>
                )}
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-50 dark:bg-midnight border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg md:hidden">
                <div className="flex flex-col space-y-4">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Home</span>
                  </Link>
                  
                  <Link 
                    href="/about" 
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">About</span>
                  </Link>
                  
                  <Link 
                    href="/projects" 
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FolderKanban className="h-5 w-5" />
                    <span className="font-medium">Projects</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main Navbar component that renders either AdminNavbar or PublicNavbar
const Navbar: React.FC<NavbarProps> = ({ isAdmin = false }) => {
  return isAdmin ? <AdminNavbar /> : <PublicNavbar />;
};

export default Navbar; 