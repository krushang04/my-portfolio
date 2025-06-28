"use client";

import ContentContainer from "@/components/layout/ContentContainer";
import { RiDoubleQuotesR } from "react-icons/ri";
import { QuotesProps } from "@/lib/types";

export default function Quotes({ quotes = [] }: QuotesProps) {
  if (!quotes || quotes.length === 0) {
    return null;
  }

  // Use the pre-selected quote (will be the only one in the array)
  const quote = quotes[0];

  return (
    <section id="quotes" className="py-12 bg-gray-50 dark:bg-midnight">
      <ContentContainer>
        <div className="relative max-w-3xl mx-auto">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 md:p-8">
            <RiDoubleQuotesR className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 h-20 md:h-32 w-20 md:w-32 text-gray-200 dark:text-gray-800 rotate-180 opacity-70" />
            <div className="relative z-10">
              <p className="text-lg md:text-xl italic text-gray-500 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed pl-4 md:pl-0">
                &ldquo;{quote.text}&rdquo;
              </p>
              <footer className="text-sm md:text-base italic text-blue-600 dark:text-blue-400 text-right font-medium">
                — {quote.author}
              </footer>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
} 