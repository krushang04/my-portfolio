"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import type { ProjectData } from '@/components/admin/ProjectForm';
import { Project, projectsApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { startProgress, doneProgress } from '@/lib/nprogress';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProject = async () => {
      startProgress();
      
      try {
        const data = await projectsApi.getById(params.id as string);
        setProject(data);
        doneProgress();
      } catch (err) {
        setError('Failed to load project');
        console.error('Error fetching project:', err);
        
        doneProgress();
        toast.error(
          <div className="flex">
            <XCircle className="h-5 w-5 text-red-500 mr-2" />
            <div>
              <div className="font-medium">Error Loading Project</div>
              <div className="text-sm">Failed to load project details.</div>
            </div>
          </div>
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);
  
  const handleSubmit = async (data: ProjectData) => {
    startProgress();
    
    try {
      await projectsApi.update(params.id as string, data);
      
      doneProgress();
      toast.success(
        <div className="flex">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <div>
            <div className="font-medium">Project Updated</div>
            <div className="text-sm">The project was updated successfully.</div>
          </div>
        </div>
      );
      
      // Navigate after a short delay to allow the toast to be seen
      setTimeout(() => {
        router.push('/admin/projects');
      }, 1000);
    } catch (error) {
      console.error('Error updating project:', error);
      
      doneProgress();
      toast.error(
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="font-medium">Error Updating Project</div>
            <div className="text-sm">Failed to update project. Please try again.</div>
          </div>
        </div>
      );
    }
  };
  
  const handleCancel = () => {
    router.push('/admin/projects');
  };
  
  if (error) return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        {error}
      </div>
    </div>
  );
  
  if (!project && !loading) return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 p-4 rounded-md flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        Project not found
      </div>
    </div>
  );
  
  if (loading) return null;
  
  return (
    <div className="space-y-6 pb-0 mb-0 relative">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update project details
        </p>
      </div>
      
      <ProjectForm 
        initialData={project as unknown as ProjectData} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  );
} 