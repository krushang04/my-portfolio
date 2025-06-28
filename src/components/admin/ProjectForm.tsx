"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X, ExternalLink, Github, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';

export type ProjectData = {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  skills: Array<{ name: string }>;
};

type ProjectFormProps = {
  initialData?: ProjectData;
  onSubmit: (data: ProjectData) => void;
  onCancel: () => void;
};

const defaultProject: ProjectData = {
  title: '',
  description: '',
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
  featured: false,
  order: 0,
  skills: [],
};

export default function ProjectForm({ initialData = defaultProject, onSubmit, onCancel }: ProjectFormProps) {
  // Convert any existing skills with iconUrl to the new format
  const formattedInitialData = {
    ...initialData,
    skills: initialData.skills.map(skill => ({ name: skill.name }))
  };

  const [formData, setFormData] = useState<ProjectData>(formattedInitialData);
  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle number fields
    if (name === 'order') {
      const numValue = value === '' ? 0 : parseInt(value, 10);
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, featured: checked });
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: skillInput.trim() }]
      });
      setSkillInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill.name !== skillToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageChange = (url: string) => {
    setFormData({ ...formData, imageUrl: url });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-md">
        <CardHeader className="border-b bg-gray-50 dark:bg-gray-800/50">
          <CardTitle className="text-xl">{initialData.id ? 'Edit Project' : 'Create New Project'}</CardTitle>
          <CardDescription>
            {initialData.id
              ? 'Update your project information and preferences'
              : 'Fill in the details to create a new project'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Project Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Basic Information</h3>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                required
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                required
                className="min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Project Image */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project Image</h3>

            <div className="space-y-2">
              <Label htmlFor="projectImage" className="text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Project Image</span>
              </Label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={handleImageChange}
                className="w-48 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors"
                height="h-48"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a screenshot or thumbnail for your project (recommended size: 480×480px)
              </p>
            </div>
          </div>

          {/* Project Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project Links</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="githubUrl" className="text-sm font-medium flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>GitHub URL</span>
                </Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveUrl" className="text-sm font-medium flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Live URL</span>
                </Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://your-project-demo.com"
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Project Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project Settings</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="order" className="text-sm font-medium">Display Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleChange}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500">Lower numbers will display first</p>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md border">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-blue-500"
                />
                <div>
                  <Label htmlFor="featured" className="font-medium">Featured Project</Label>
                  <p className="text-xs text-gray-500">Featured projects appear on the homepage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Skills */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project Skills & Technologies</h3>

            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Skill name (e.g. React, Node.js) - Press Enter to add"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  variant="secondary"
                >
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No skills added yet</p>
                )}

                {formData.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm border"
                  >
                    <span>{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="text-gray-500 hover:text-red-500 ml-1"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 pt-2 border-t bg-gray-50 dark:bg-gray-800/50">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {initialData.id ? 'Update' : 'Create'} Project
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
} 