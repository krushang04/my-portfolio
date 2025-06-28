"use client";

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, FolderKanban, Code, Briefcase, Quote } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  projects: number;
  skills: number;
  experience: number;
  quotes: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    experience: 0,
    quotes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, skillsRes, experienceRes, quotesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/experience'),
        fetch('/api/quotes')
      ]);

      const [projects, skills, experience, quotes] = await Promise.all([
        projectsRes.json(),
        skillsRes.json(),
        experienceRes.json(),
        quotesRes.json()
      ]);

      setStats({
        projects: projects.length,
        skills: skills.length,
        experience: experience.length,
        quotes: quotes.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your portfolio content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
            Loading dashboard stats...
          </div>
        ) : (
          <>
            <Link href="/admin/projects">
              <Card className="p-6 border dark:border-gray-800 hover:shadow-md transition-all duration-200 dark:bg-[#242529] relative overflow-hidden group cursor-pointer">
                <div className="absolute right-3 top-3 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-full">
                  <FolderKanban className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-full transition-all duration-300 group-hover:scale-125"></div>
                <h2 className="text-xl font-semibold mb-2">Projects</h2>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.projects}</p>
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total projects</p>
                  <ArrowUpRight className="h-3 w-3 text-indigo-500" />
                </div>
              </Card>
            </Link>
            
            <Link href="/admin/skills">
              <Card className="p-6 border dark:border-gray-800 hover:shadow-md transition-all duration-200 dark:bg-[#242529] relative overflow-hidden group cursor-pointer">
                <div className="absolute right-3 top-3 bg-pink-50 dark:bg-pink-900/20 p-2 rounded-full">
                  <Code className="h-5 w-5 text-pink-500" />
                </div>
                <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-gradient-to-br from-pink-500/10 to-purple-500/5 rounded-full transition-all duration-300 group-hover:scale-125"></div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.skills}</p>
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total skills</p>
                  <ArrowUpRight className="h-3 w-3 text-pink-500" />
                </div>
              </Card>
            </Link>
            
            <Link href="/admin/experience">
              <Card className="p-6 border dark:border-gray-800 hover:shadow-md transition-all duration-200 dark:bg-[#242529] relative overflow-hidden group cursor-pointer">
                <div className="absolute right-3 top-3 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-purple-500" />
                </div>
                <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 rounded-full transition-all duration-300 group-hover:scale-125"></div>
                <h2 className="text-xl font-semibold mb-2">Experience</h2>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.experience}</p>
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Work experiences</p>
                  <ArrowUpRight className="h-3 w-3 text-purple-500" />
                </div>
              </Card>
            </Link>

            <Link href="/admin/quotes">
              <Card className="p-6 border dark:border-gray-800 hover:shadow-md transition-all duration-200 dark:bg-[#242529] relative overflow-hidden group cursor-pointer">
                <div className="absolute right-3 top-3 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                  <Quote className="h-5 w-5 text-blue-500" />
                </div>
                <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-full transition-all duration-300 group-hover:scale-125"></div>
                <h2 className="text-xl font-semibold mb-2">Quotes</h2>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.quotes}</p>
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total quotes</p>
                  <ArrowUpRight className="h-3 w-3 text-blue-500" />
                </div>
              </Card>
            </Link>
          </>
        )}
      </div>
    </div>
  );
} 