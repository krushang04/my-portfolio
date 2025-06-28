"use client";

import { cn } from "@/lib/utils";
import ContentContainer from "@/components/layout/ContentContainer";
import { SkillsProps } from "@/lib/types";

const Skills = ({ skills = [] }: SkillsProps) => {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="py-12 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4 ">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Skills
        </h2>
        
        <ContentContainer>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className={cn(
                  "px-3 py-1 text-sm rounded-md",
                  "bg-zinc-800 border dark:bg-gray-100",
                  "text-zinc-300 dark:text-zinc-700",
                  "font-medium",
                  "transition-all duration-300",
                  "hover:shadow-lg"
                )}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </ContentContainer>
      </div>
    </section>
  );
};

export default Skills; 