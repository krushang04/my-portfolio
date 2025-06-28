"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  websiteUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  websiteUrl,
  githubUrl,
}: ProjectCardProps) => {
  return (
    <Card className="relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardContent className="relative flex-1 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
            {image ? (
              <Image
                src={image}
                alt={`${title} logo`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white">
              {title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-transparent"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="relative px-6 py-4 flex gap-3">
        {githubUrl && (
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              variant="outline"
              size="default"
              className="w-full gap-2 h-9 text-sm"
            >
              <Github className="h-4 w-4" />
              Source
            </Button>
          </Link>
        )}
        {websiteUrl && (
          <Link href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              variant="outline"
              size="default"
              className="w-full gap-2 h-9 text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              Website
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard; 