"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';

export type EducationData = {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  order: number;
  logoUrl?: string;
};

type EducationFormProps = {
  initialData?: EducationData;
  onSubmit: (data: EducationData) => void;
  onCancel: () => void;
};

const defaultEducation: EducationData = {
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
  achievements: [],
  order: 0,
  logoUrl: '',
};

export default function EducationForm({ initialData = defaultEducation, onSubmit, onCancel }: EducationFormProps) {
  const [formData, setFormData] = useState<EducationData>(initialData);
  const [achievementInput, setAchievementInput] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, achievementInput.trim()]
      });
      setAchievementInput('');
    }
  };
  
  const handleRemoveAchievement = (achievementToRemove: string) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter(achievement => achievement !== achievementToRemove)
    });
  };
  
  const handleLogoChange = (url: string) => {
    setFormData({ ...formData, logoUrl: url });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{initialData.id ? 'Edit Education' : 'New Education'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="institutionLogo">Institution Logo</Label>
            <ImageUpload
              value={formData.logoUrl || ''}
              onChange={handleLogoChange}
              className="w-full max-w-xs"
              height="h-36"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload an institution logo (recommended: square PNG with transparent background)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a description of your education experience..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Achievements</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Achievement"
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
              />
              <Button type="button" onClick={handleAddAchievement}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.achievements.map((achievement) => (
                <div
                  key={achievement}
                  className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                >
                  <span>{achievement}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(achievement)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData.id ? 'Update' : 'Create'} Education
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
} 