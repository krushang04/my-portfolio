"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { Project, projectsApi } from '@/lib/api';
import { startProgress, doneProgress } from '@/lib/nprogress';
import toast from 'react-hot-toast';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    startProgress();
    
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
      doneProgress();
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
      
      doneProgress();
      toast.error('Failed to load projects. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    startProgress();
    
    try {
      await projectsApi.delete(id);
      setProjects(projects.filter(project => project.id !== id));
      doneProgress();
      toast.success('Project deleted successfully');
    } catch (err) {
      console.error('Error deleting project:', err);
      doneProgress();
      toast.error('Failed to delete project');
    }
  };
  
  const handleEditProject = (id: string) => {
    router.push(`/admin/projects/${id}/edit`);
  };
  
  const handleToggleFeatured = async (id: string, featured: boolean) => {
    startProgress();
    
    try {
      const project = projects.find(p => p.id === id);
      if (!project) return;
      
      const updatedProject = await projectsApi.update(id, {
        ...project,
        featured,
        skills: project.skills.map(skill => skill.id)
      });
      
      setProjects(projects.map(p => 
        p.id === id ? updatedProject : p
      ));
      
      doneProgress();
      toast.success(`Project ${featured ? 'featured' : 'unfeatured'} successfully`);
    } catch (err) {
      console.error('Error updating project featured status:', err);
      doneProgress();
      toast.error('Failed to update featured status');
    }
  };
  
  if (error) return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        {error}
      </div>
    </div>
  );
  
  if (loading) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Button onClick={() => router.push('/admin/projects/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative">
              {project.imageUrl ? (
                <Image 
                  src={project.imageUrl} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={index < 2}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
              <div 
                className="absolute top-2 right-2 bg-slate-800/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-md flex items-center gap-2 shadow-md"
                title={project.featured ? "Featured project" : "Not featured"}
              >
                <Switch
                  checked={project.featured}
                  onCheckedChange={(checked) => handleToggleFeatured(project.id, checked)}
                />
                <span className="font-medium">Featured</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditProject(project.id)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 