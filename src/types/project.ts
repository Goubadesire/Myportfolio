export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  order: number;
  createdAt: string;
}