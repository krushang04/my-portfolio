// Server component (no "use client" directive)
import HomeClient from "./HomeClient";
import { EducationItem, Quote } from "@/lib/types";
import { Project, GeneralSkill } from "@/lib/api";

// Fetch all data server-side
async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  try {
    // Fetch all data in parallel
    const [
      profileRes,
      projectsRes,
      skillsRes,
      educationRes,
      quotesRes
    ] = await Promise.all([
      fetch(`${baseUrl}/api/profile`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/projects`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/general-skills`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/education`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/quotes`, { cache: 'no-store' })
    ]);

    // Parse all responses in parallel
    const [
      profile,
      projects,
      skills,
      education,
      quotes
    ] = await Promise.all([
      profileRes.json(),
      projectsRes.json(),
      skillsRes.json(),
      educationRes.json(),
      quotesRes.json()
    ]);

    // Select a random quote on the server side
    const randomQuote = quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : null;

    return {
      profile,
      projects: projects as Project[],
      skills: skills as GeneralSkill[],
      education: education as EducationItem[],
      randomQuote: randomQuote as Quote
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return empty data structure in case of error
    return {
      profile: null,
      projects: [],
      skills: [],
      education: [],
      randomQuote: null
    };
  }
}

export default async function Home() {
  // Fetch all data at once on the server
  const data = await getData();
  
  // Sort projects data
  const sortedProjects = [...data.projects]
    .filter(project => project.featured)
    .sort((a, b) => a.order - b.order);
  
  // Pass the data to the client component
  return (
    <HomeClient 
      profile={data.profile}
      projects={sortedProjects}
      skills={data.skills}
      education={data.education}
      randomQuote={data.randomQuote}
    />
  );
}
