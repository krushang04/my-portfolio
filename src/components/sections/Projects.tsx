"use client";

import ProjectCard from "./ProjectCard";
import ContentContainer from "@/components/layout/ContentContainer";
import { ProjectsProps } from "@/lib/types";

// Component now accepts projects as props
const Projects = ({ projects = [] }: ProjectsProps) => {
  if (!projects || projects.length === 0) return null; // Show nothing if no projects

  return (
    <section id="projects" className="py-12 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Projects
        </h2>
        <ContentContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.imageUrl}
                technologies={project.skills.map(skill => skill.name)}
                websiteUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            ))}
          </div>
        </ContentContainer>
      </div>
    </section>
  );
};

export default Projects; 