"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import ExperienceForm, { ExperienceData } from '@/components/admin/ExperienceForm';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<ExperienceData | undefined>();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      const data = await response.json();
      console.log('Experiences data:', data);
      if (Array.isArray(data)) {
        setExperiences(data);
      } else if (data && typeof data === 'object') {
        const experiencesArray = data.experiences || [];
        setExperiences(experiencesArray);
      } else {
        console.error('Unexpected response format for experiences:', data);
        setExperiences([]);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
      setExperiences([]);
    }
  };

  const handleSubmit = async (data: ExperienceData) => {
    try {
      const url = data.id ? `/api/experience/${data.id}` : '/api/experience';
      const method = data.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchExperiences();
        setIsFormOpen(false);
        setEditingExperience(undefined);
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleEdit = (experience: ExperienceData) => {
    // Format dates for the form inputs
    const formattedExperience = {
      ...experience,
      startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
      endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
    };
    setEditingExperience(formattedExperience);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        const response = await fetch(`/api/experience/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchExperiences();
        }
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your work experience
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <ExperienceForm
            initialData={editingExperience}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingExperience(undefined);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {Array.isArray(experiences) && experiences.length > 0 ? (
          experiences.map((experience) => (
            <Card key={experience.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{experience.title}</h2>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <span>{experience.company}</span>
                      <span className="mx-2">•</span>
                      <span>{experience.location}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(experience.startDate).toLocaleDateString()} - {' '}
                      {experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString()
                        : 'Present'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(experience)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(experience.id!)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 my-4">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No experiences found. Add your first experience.</p>
          </div>
        )}
      </div>
    </div>
  );
} 