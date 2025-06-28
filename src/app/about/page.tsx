import ContentContainer from "@/components/layout/ContentContainer";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Fetch about content server-side
async function getAboutContent() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/about`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return data.content || '';
  } catch (error) {
    console.error('Error fetching about content:', error);
    return '';
  }
}

export default async function AboutPage() {
  const aboutContent = await getAboutContent();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-midnight pt-20">
      <div className="container mx-auto px-4 py-8">
        <ContentContainer>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            About Me
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            {aboutContent ? (
              <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
            ) : (
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                Updating soon...
              </p>
            )}
          </div>
        </ContentContainer>
      </div>
    </div>
  );
} 