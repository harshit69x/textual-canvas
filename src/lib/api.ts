const API_BASE_URL = "https://portfolio-backend-xo4p.onrender.com";

// Types
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  shortBio: string;
  email: string;
  location: string;
  socialLinks: SocialLink[];
  featuredSkills: string[];
  isAvailable: boolean;
  resumeUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
  status: string;
  yearsOfExperience?: number;
  icon?: string;
  isVisible: boolean;
  displayOrder?: number;
}

export interface Project {
  _id: string;
  title?: string;
  name?: string;
  type: "manual" | "github";
  description?: string;
  githubUrl?: string;
  homepageUrl?: string;
  language?: string;
  techStack?: string[];
  customTechnologies?: string[];
  stars?: number;
  forks?: number;
  isVisible: boolean;
  isFeatured?: boolean;
  isPinned?: boolean;
  lastUpdated?: string;
  category?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

// API Functions
export async function fetchProfile(): Promise<Profile> {
  const response = await fetch(`${API_BASE_URL}/profile`);
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  const result: ApiResponse<Profile> = await response.json();
  return result.data;
}

export async function fetchSkills(): Promise<Skill[]> {
  const response = await fetch(`${API_BASE_URL}/public/skills`);
  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }
  const result: ApiResponse<Skill[]> = await response.json();
  return result.data;
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/public/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const result: ApiResponse<Project[]> = await response.json();
  return result.data;
}

export async function fetchDashboardStats() {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  const result = await response.json();
  return result.data;
}
