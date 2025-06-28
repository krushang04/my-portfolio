import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Project types
export interface Skill {
  id: string;
  name: string;
  iconUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  skills: Array<string | { name: string; iconUrl?: string }>;
}

// General Skill type
export interface GeneralSkill {
  id: string;
  name: string;
  iconUrl?: string;
  level?: number;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GeneralSkillInput {
  name: string;
  iconUrl?: string;
  order?: number;
}

// Profile types
export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  email: string;
  location: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  resumeUrl?: string;
  calLink?: string;
  showAvatar: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileInput {
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  email: string;
  location: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  resumeUrl?: string;
  calLink?: string;
  showAvatar?: boolean;
}

// Projects API
export const projectsApi = {
  getAll: async () => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  create: async (project: ProjectInput) => {
    const response = await api.post<Project>('/projects', project);
    return response.data;
  },

  update: async (id: string, project: ProjectInput) => {
    const response = await api.put<Project>(`/projects/${id}`, project);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// Skills API
export const skillsApi = {
  getAll: async () => {
    const response = await api.get<Skill[]>('/skills');
    return response.data;
  },

  create: async (skill: { name: string; iconUrl?: string }) => {
    const response = await api.post<Skill>('/skills', skill);
    return response.data;
  },
};

// General Skills API
export const generalSkillsApi = {
  getAll: async () => {
    const response = await api.get<GeneralSkill[]>('/general-skills');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<GeneralSkill>(`/general-skills/${id}`);
    return response.data;
  },

  create: async (skill: GeneralSkillInput) => {
    const response = await api.post<GeneralSkill>('/general-skills', skill);
    return response.data;
  },

  update: async (id: string, skill: GeneralSkillInput) => {
    const response = await api.put<GeneralSkill>(`/general-skills/${id}`, skill);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/general-skills/${id}`);
    return response.data;
  },
};

// Profile API
export const profileApi = {
  get: async () => {
    const response = await api.get<Profile>('/profile');
    return response.data;
  },

  update: async (profile: ProfileInput & { id: string }) => {
    const response = await api.put<Profile>('/profile', profile);
    return response.data;
  },

  create: async (profile: ProfileInput) => {
    const response = await api.post<Profile>('/profile', profile);
    return response.data;
  }
};

export default api; 