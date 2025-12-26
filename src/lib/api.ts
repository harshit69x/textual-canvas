const API_BASE_URL = "https://portfolio-backend-xo4p.onrender.com/api";

// Types
export interface Location {
  city?: string;
  state?: string;
  country?: string;
}

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  shortBio: string;
  email: string;
  location?: Location | string;
  socialLinks: SocialLink[];
  featuredSkills: string[];
  isAvailable: boolean;
  resumeUrl?: string;
  avatarUrl?: string;
}

export interface SocialLink {
  _id?: string;
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
  coverImage?: string;
  status?: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  isVisible: boolean;
  isPinned?: boolean;
  readTime?: number;
  postUrl?: string;
}

export interface ProjectInExperience {
  _id: string;
  name: string;
  description?: string;
  techStack: string[];
  role?: string;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  location?: Location | string;
  locationType?: "On-site" | "Remote" | "Hybrid";
  employmentType?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  technologies: string[];
  projects: ProjectInExperience[];
  isVisible: boolean;
  displayOrder?: number;
}

export interface DashboardStats {
  totalGitHubRepos: number;
  visibleRepos: number;
  featuredRepos: number;
  totalSkills: number;
  totalProjects: number;
  featuredProjects: number;
  totalBlogs: number;
  publishedBlogs: number;
  skillCategories: number;
  topLanguages: string[];
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
  // Fetch all visible projects (high limit to get all)
  const response = await fetch(`${API_BASE_URL}/public/projects?limit=100`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const result: ApiResponse<Project[]> = await response.json();
  return result.data;
}

export async function fetchBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/public/blogs`);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const result: ApiResponse<Blog[]> = await response.json();
  return result.data;
}

export async function fetchBlog(id: string): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/public/blogs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  const result: ApiResponse<Blog> = await response.json();
  return result.data;
}

export async function fetchExperiences(): Promise<Experience[]> {
  const response = await fetch(`${API_BASE_URL}/experiences`);
  if (!response.ok) {
    throw new Error("Failed to fetch experiences");
  }
  const result: ApiResponse<Experience[]> = await response.json();
  return result.data;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  const result: ApiResponse<DashboardStats> = await response.json();
  return result.data;
}

// Health check
export async function checkHealth(): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error("API health check failed");
  }
  return response.json();
}
