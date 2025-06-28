"use client";

import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Hero from "@/components/sections/Hero";
import Quotes from "@/components/sections/Quotes";
import { EducationItem, Quote } from "@/lib/types";
import { Project, GeneralSkill, Profile } from "@/lib/api";

interface HomeClientProps {
  profile: Profile | null;
  projects: Project[];
  skills: GeneralSkill[];
  education: EducationItem[];
  randomQuote: Quote | null;
}

export default function HomeClient({
  profile,
  projects,
  skills,
  education,
  randomQuote
}: HomeClientProps) {
  return (
    <div className="min-h-screen">
      {profile ? (
        <Hero
          name={profile.name}
          description={profile.bio}
          primaryButtonText="Book a Meet"
          secondaryButtonText="Message on "
          calLink={profile.calLink}
          avatarUrl={profile.avatarUrl}
          linkedinUrl={profile.linkedinUrl}
          showAvatar={profile.showAvatar}
        />
      ) : (
        <Hero
          name="Your Name"
          description="Add your bio in the admin profile section"
          primaryButtonText="Book a Meet"
          secondaryButtonText="Message on "
        />
      )}
      
      {/* All sections with pre-fetched data */}
      <Experience />
      <Education education={education} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      {randomQuote && <Quotes quotes={[randomQuote]} />}
    </div>
  );
} 