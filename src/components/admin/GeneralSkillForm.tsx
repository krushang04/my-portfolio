"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type GeneralSkillData = {
  id?: string;
  name: string;
  iconUrl?: string;
  order: number;
};

type GeneralSkillFormProps = {
  initialData?: GeneralSkillData;
  onSubmit: (data: GeneralSkillData) => void;
  onCancel: () => void;
};

const defaultSkill: GeneralSkillData = {
  name: '',
  iconUrl: '',
  order: 0,
};

export default function GeneralSkillForm({ 
  initialData = defaultSkill, 
  onSubmit, 
  onCancel 
}: GeneralSkillFormProps) {
  const [formData, setFormData] = useState<GeneralSkillData>(initialData);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle number fields
    if (name === 'order') {
      // Use the numeric value or 0 if empty/invalid
      const numValue = value === '' ? 0 : parseInt(value, 10);
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{initialData.id ? 'Edit Skill' : 'New Skill'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData.id ? 'Update' : 'Create'} Skill
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
} 