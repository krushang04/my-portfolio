"use client";

import Projects from "@/components/sections/Projects";
import { ProjectsProps } from "@/lib/types";

export default function ProjectsClient({ projects }: ProjectsProps) {
  return <Projects projects={projects} />;
} 