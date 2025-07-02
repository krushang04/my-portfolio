import ContentContainer from "@/components/layout/ContentContainer";
import Image from "next/image";
import { EducationProps } from "@/lib/types";

const Education = ({ education = [] }: EducationProps) => {
  // Format date from ISO string to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-12 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Education
        </h2>
        
        <ContentContainer>
          <div className="space-y-8">
            {education.map((edu) => {
              const hasContent = edu.description || (edu.achievements && edu.achievements.length > 0);
              
              return (
                <div key={edu.id} className="group">
                  {/* Header - Always visible */}
                  <div className="flex items-center gap-4">
                    {/* Institution Logo - Using first letter as fallback */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300">
                      {edu.logoUrl ? (
                        <Image
                          src={edu.logoUrl}
                          alt={`${edu.institution} logo`}
                          fill
                          sizes="(max-width: 768px) 48px, 56px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">
                          {edu.institution.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Institution Info */}
                    <div className="flex-grow min-w-0 flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                        <p>
                          <span className="block sm:hidden">Nirma University</span>
                          <span className="hidden sm:inline">{edu.institution}</span>
                        </p>
                        </h3>
                      </div>
                      <p className="text-gray-900 dark:text-white text-xs md:text-sm">
                        {edu.degree} in {edu.field}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {edu.location}
                      </p>
                    </div>

                    {/* Duration */}
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                    </span>
                  </div>

                  {/* Content - Always visible if exists */}
                  {hasContent && (
                    <div className="mt-4" style={{ marginLeft: 'calc(4rem + 1.5rem)' }}>
                      {edu.description && (
                        <p className="text-sm md:text-base mb-4 text-gray-600 dark:text-gray-300">
                          {edu.description}
                        </p>
                      )}
                      
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 mb-2">Achievements:</p>
                          <ul className="list-disc list-inside space-y-2 mb-4">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ContentContainer>
      </div>
    </section>
  );
};

export default Education; 