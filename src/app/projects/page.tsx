import { Project } from "@/lib/api";
import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Featured Projects",
};

// Fetch projects server-side
async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects`, { 
    cache: 'no-store' 
  });
  const projects = await res.json() as Project[];
  
  // Get only featured projects and sort by order
  return projects
    .filter(project => project.featured)
    .sort((a, b) => a.order - b.order);
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-midnight pt-20">
      <ProjectsClient projects={projects} />
    </div>
  );
} 