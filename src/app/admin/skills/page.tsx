"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Pencil, Trash2, Plus, X, Save, ListPlus } from 'lucide-react';
import GeneralSkillForm, { GeneralSkillData } from '@/components/admin/GeneralSkillForm';
import toast from 'react-hot-toast';
import { startProgress, doneProgress } from '@/lib/nprogress';

export default function SkillsPage() {
  const [skills, setSkills] = useState<GeneralSkillData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<GeneralSkillData | undefined>();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(true);
  const [quickAddName, setQuickAddName] = useState('');
  const [isBulkAddOpen, setIsBulkAddOpen] = useState(false);
  const [bulkSkillsInput, setBulkSkillsInput] = useState('');
  const [bulkSkillsPreview, setBulkSkillsPreview] = useState<string[]>([]);
  
  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    // Parse and preview bulk skills input
    if (bulkSkillsInput.trim()) {
      const parsedSkills = bulkSkillsInput
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      setBulkSkillsPreview(parsedSkills);
    } else {
      setBulkSkillsPreview([]);
    }
  }, [bulkSkillsInput]);

  // Toggle functions
  const toggleQuickAdd = () => {
    if (isBulkAddOpen) {
      setIsBulkAddOpen(false);
      setIsQuickAddOpen(true);
    } else {
      // If quick add is already open and we click the button again, just close it
      setIsQuickAddOpen(!isQuickAddOpen);
    }
  };

  const toggleBulkAdd = () => {
    if (isBulkAddOpen) {
      // If bulk add is already open and we click the button again, close it and show quick add
      setIsBulkAddOpen(false);
      setIsQuickAddOpen(true);
    } else {
      // Otherwise, open bulk add and close quick add
      setIsBulkAddOpen(true);
      setIsQuickAddOpen(false);
    }
  };

  const fetchSkills = async () => {
    startProgress();
    try {
      const response = await fetch('/api/general-skills');
      const data = await response.json();
      if (Array.isArray(data)) {
        setSkills(data);
      } else if (data && typeof data === 'object') {
        const skillsArray = data.skills || [];
        setSkills(skillsArray);
      } else {
        console.error('Unexpected response format for skills data:', data);
        setSkills([]);
      }
      doneProgress();
    } catch (error) {
      console.error('Error fetching skills data:', error);
      setSkills([]);
      doneProgress();
      toast.error('Failed to load skills');
    }
  };

  const handleSubmit = async (data: GeneralSkillData) => {
    startProgress();
    try {
      const url = data.id ? `/api/general-skills/${data.id}` : '/api/general-skills';
      const method = data.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchSkills();
        setIsFormOpen(false);
        setEditingSkill(undefined);
        doneProgress();
        toast.success(data.id ? 'Skill updated' : 'Skill added');
      } else {
        throw new Error('Failed to save skill');
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      doneProgress();
      toast.error('Failed to save skill');
    }
  };

  const handleQuickAdd = async () => {
    if (!quickAddName.trim()) return;
    
    startProgress();
    try {
      const newSkill = {
        name: quickAddName,
        order: skills.length + 1
      };
      
      const response = await fetch('/api/general-skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSkill),
      });

      if (response.ok) {
        fetchSkills();
        setQuickAddName('');
        // Don't close quick add after adding a skill
        doneProgress();
        toast.success('Skill added');
      } else {
        throw new Error('Failed to add skill');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      doneProgress();
      toast.error('Failed to add skill');
    }
  };

  const handleBulkAdd = async () => {
    if (!bulkSkillsPreview.length) return;
    
    startProgress();
    let addedCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < bulkSkillsPreview.length; i++) {
      try {
        const skillName = bulkSkillsPreview[i];
        
        // Skip if skill name already exists
        if (skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
          continue;
        }
        
        const newSkill = {
          name: skillName,
          order: skills.length + addedCount + 1
        };
        
        const response = await fetch('/api/general-skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSkill),
        });

        if (response.ok) {
          addedCount++;
        } else {
          failedCount++;
        }
      } catch (error) {
        console.error('Error adding skill:', error);
        failedCount++;
      }
    }
    
    fetchSkills();
    setBulkSkillsInput('');
    // After bulk add, close bulk and open quick add
    setIsBulkAddOpen(false);
    setIsQuickAddOpen(true);
    doneProgress();
    
    if (addedCount > 0 && failedCount === 0) {
      toast.success(`Added ${addedCount} skills successfully`);
    } else if (addedCount > 0 && failedCount > 0) {
      toast.success(`Added ${addedCount} skills, ${failedCount} failed`);
    } else if (addedCount === 0) {
      toast.error('Failed to add skills');
    }
  };

  const handleEdit = (skill: GeneralSkillData) => {
    setEditingSkill(skill);
    setIsFormOpen(true);
    // Close quick add and bulk add when editing
    setIsQuickAddOpen(false);
    setIsBulkAddOpen(false);
  };

  const handleDelete = async (id: string) => {
    startProgress();
    try {
      const response = await fetch(`/api/general-skills/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSkills();
        doneProgress();
        toast.success('Skill deleted');
      } else {
        throw new Error('Failed to delete skill');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      doneProgress();
      toast.error('Failed to delete skill');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your general skills
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={isQuickAddOpen ? "default" : "outline"}
            size="sm"
            onClick={toggleQuickAdd}
            className={isQuickAddOpen ? "bg-indigo-500 hover:bg-indigo-600" : "dark:border-gray-700 dark:hover:bg-gray-800"}
          >
            <Plus className="h-4 w-4 mr-1" />
            Quick Add
          </Button>
          <Button 
            variant={isBulkAddOpen ? "default" : "outline"}
            size="sm"
            onClick={toggleBulkAdd}
            className={isBulkAddOpen ? "bg-purple-500 hover:bg-purple-600" : "dark:border-gray-700 dark:hover:bg-gray-800"}
          >
            <ListPlus className="h-4 w-4 mr-1" />
            Bulk Add
          </Button>
          <Button 
            onClick={() => {
              setIsFormOpen(true);
              setIsQuickAddOpen(false);
              setIsBulkAddOpen(false);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Advanced
          </Button>
        </div>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <GeneralSkillForm
            initialData={editingSkill}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingSkill(undefined);
              // Show quick add form when canceling the advanced form
              setIsQuickAddOpen(true);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          {isQuickAddOpen && (
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border-b border-indigo-100 dark:border-indigo-800/30 flex items-center gap-2">
              <Input 
                placeholder="Enter skill name (e.g. React, TypeScript)"
                value={quickAddName}
                onChange={(e) => setQuickAddName(e.target.value)}
                className="max-w-sm dark:bg-gray-800 dark:border-gray-700"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleQuickAdd();
                  } else if (e.key === 'Escape') {
                    setIsQuickAddOpen(false);
                  }
                }}
              />
              <Button 
                onClick={handleQuickAdd}
                disabled={!quickAddName.trim()}
                size="sm"
                className="bg-indigo-500 hover:bg-indigo-600"
              >
                <Save className="h-4 w-4 mr-1" />
                Add
              </Button>
              <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                Press Enter to add, Esc to close
              </div>
            </div>
          )}
          
          {isBulkAddOpen && (
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-b border-purple-100 dark:border-purple-800/30">
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Add multiple skills at once (comma-separated)
                </label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="React, TypeScript, Next.js, TailwindCSS"
                    value={bulkSkillsInput}
                    onChange={(e) => setBulkSkillsInput(e.target.value)}
                    className="dark:bg-gray-800 dark:border-gray-700"
                    autoFocus
                  />
                  <Button 
                    onClick={handleBulkAdd}
                    disabled={bulkSkillsPreview.length === 0}
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600 whitespace-nowrap"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Add All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsBulkAddOpen(false);
                      setIsQuickAddOpen(true);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {bulkSkillsPreview.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Preview ({bulkSkillsPreview.length} skills to add):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bulkSkillsPreview.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-800/40 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {Array.isArray(skills) && skills.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {skills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{skill.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-500">{skill.order}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(skill)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(skill.id!)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No skills found. Add your first skill.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 