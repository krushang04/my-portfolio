"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useProfile } from "@/lib/context/ProfileContext";
import ContentContainer from "./ContentContainer";

const Footer = () => {
  const { profile } = useProfile();

  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800 mt-20">
      <ContentContainer>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-2">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            {profile?.twitterUrl && (
              <Link
                href={profile.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-thin text-sm"
                aria-label="Twitter/X"
              >
                X <ArrowUpRight className="h-3 w-3" />
              </Link>
            )}

            {profile?.githubUrl && (
              <Link
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-thin text-sm"
                aria-label="GitHub"
              >
                GitHub <ArrowUpRight className="h-3 w-3" />
              </Link>
            )}

            {profile?.linkedinUrl && (
              <Link
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-thin text-sm"
                aria-label="LinkedIn"
              >
                LinkedIn <ArrowUpRight className="h-3 w-3" />
              </Link>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-thin text-sm"
                aria-label="Email"
              >
                Email <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Designed and Developed by{" "}
              <Link
                href={profile?.linkedinUrl || "https://x.com/deepxtwt"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
              >
                {profile?.name || "Deep Patel"}
              </Link>
            </p>
          </div>
        </div>
      </ContentContainer>
    </footer>
  );
};

export default Footer; 