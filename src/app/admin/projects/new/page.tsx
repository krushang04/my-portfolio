"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import type { ProjectData } from '@/components/admin/ProjectForm';
import { projectsApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import { startProgress, doneProgress } from '@/lib/nprogress';

export default function NewProjectPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: ProjectData) => {
    // Start progress bar
    startProgress();
    
    try {
      await projectsApi.create(data);
      
      // Complete progress
      doneProgress();
      
      toast.success(
        <div className="flex">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <div>
            <div className="font-medium">Project Created</div>
            <div className="text-sm">The project was created successfully.</div>
          </div>
        </div>
      );
      
      // Navigate after a short delay to allow the toast to be seen
      setTimeout(() => {
        router.push('/admin/projects');
      }, 1000);
    } catch (error) {
      console.error('Error creating project:', error);
      
      // Complete progress on error
      doneProgress();
      
      toast.error(
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="font-medium">Error Creating Project</div>
            <div className="text-sm">Failed to create project. Please try again.</div>
          </div>
        </div>
      );
    }
  };
  
  const handleCancel = () => {
    router.push('/admin/projects');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Project</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add a new project to your portfolio
        </p>
      </div>
      
      <ProjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
} 