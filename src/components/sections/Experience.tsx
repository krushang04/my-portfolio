"use client";

import { useState, useEffect } from 'react';
import ContentContainer from '@/components/layout/ContentContainer';
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { ExperienceProps } from '@/lib/types';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [experiences, setExperiences] = useState<ExperienceProps['experiences']>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience');
        const data = await response.json();
        console.log({data})
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-12 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Experience
        </h2>
        
        <ContentContainer>
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="group">
                <div 
                  onClick={() => experience.description && toggleExpand(index)}
                  className={`flex items-center gap-4 ${experience.description ? 'cursor-pointer' : ''}`}
                >
                  {/* Company Logo */}
                  {experience.logoUrl ? (
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0">
                      <Image 
                        src={experience.logoUrl} 
                        alt={`${experience.company} logo`} 
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 flex-shrink-0 border border-gray-200 dark:border-gray-700 text-lg md:text-xl font-bold">
                      {experience.company.charAt(0)}
                    </div>
                  )}
                  
                  {/* Company Info */}
                  <div className="flex-grow min-w-0 flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                        {experience.company}
                      </h3>
                      {experience.description && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          {expandedIndex === index ? (
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-900 dark:text-white text-xs md:text-sm">
                      {experience.title}
                    </p>
                  </div>

                  {/* Duration */}
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                    {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                  </span>
                </div>

                {/* Expandable Content */}
                {expandedIndex === index && experience.description && (
                  <div className="mt-4" style={{ marginLeft: 'calc( 1.5rem)' }}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 p-4 rounded-lg bg-card md:text-base text-gray-600 dark:text-gray-300 whitespace-pre-line border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
                      {experience.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ContentContainer>
      </div>
    </section>
  );
};

export default Experience; 