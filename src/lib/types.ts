// Common types used throughout the application
import { Project, GeneralSkill } from '@/lib/api';

// Define Experience type
export interface Experience {
  id: string;
  company: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  logoUrl?: string;
}

// Define Education type
export interface EducationItem {
  id: string;
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
  createdAt?: string;
  updatedAt?: string;
}

// Define Quote type
export interface Quote {
  id: string;
  text: string;
  author: string;
}

// Component Props
export interface ExperienceProps {
  experiences: Experience[];
}

export interface ProjectsProps {
  projects: Project[];
}

export interface SkillsProps {
  skills: GeneralSkill[];
}

export interface EducationProps {
  education: EducationItem[];
}

export interface QuotesProps {
  quotes: Quote[];
} 