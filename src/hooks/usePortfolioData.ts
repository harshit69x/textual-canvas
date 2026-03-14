import { useQuery } from "@tanstack/react-query";
import {
  fetchProfile,
  fetchSkills,
  fetchProjects,
  fetchBlogs,
  fetchBlog,
  fetchExperiences,
  fetchDashboardStats,
  type Profile,
  type Skill,
  type Project,
  type Blog,
  type Experience,
  type DashboardStats
} from "@/lib/api";

export function useProfile() {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSkills() {
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogs() {
  return useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlog(id: string) {
  return useQuery<Blog>({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

export function useExperiences() {
  return useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
}

// Utility hooks for computed data
export function useSkillsByCategory() {
  const { data: skills = [], ...rest } = useSkills();

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return { data: groupedSkills, ...rest };
}

export function useFeaturedProjects() {
  const { data: projects = [], ...rest } = useProjects();

  const featuredProjects = projects.filter(
    (project) => project.isFeatured || project.isPinned
  );

  return { data: featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 6), ...rest };
}
