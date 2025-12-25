import { useQuery } from "@tanstack/react-query";
import { fetchProfile, fetchSkills, fetchProjects, type Profile, type Skill, type Project } from "@/lib/api";

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
