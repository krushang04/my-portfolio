import { RainbowButton } from "@/components/ui/rainbowbutton";
import Link from "next/link";
import Image from "next/image";

import ContentContainer from "@/components/layout/ContentContainer";
import { cn } from "@/lib/utils";
import { SiLinkedin } from "react-icons/si";

// Preload the gradient animation
const gradientAnimation = {
  backgroundImage: "linear-gradient(to right, #c471ed, #f64f59)",
  backgroundSize: "100% auto",
  display: "inline-block",
  lineHeight: "1.2",
};

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
}

const AnimatedGradientText = ({ text, className }: AnimatedGradientTextProps) => {
  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent py-1 leading-tight", className)}
      style={gradientAnimation}
    >
      {text}
    </span>
  );
};

interface HeroProps {
  name: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  demoLinkText?: string;
  demoLinkHref?: string;
  calLink?: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  showAvatar?: boolean;
}

const Hero = ({
  name,
  description,
  primaryButtonText,
  secondaryButtonText,
  demoLinkText,
  demoLinkHref,
  calLink,
  avatarUrl,
  linkedinUrl,
  showAvatar = true,
}: HeroProps) => {
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <section className="pt-24 md:pt-32 pb-10 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <ContentContainer>
          <div className={`flex flex-row gap-4 md:gap-8 items-center ${avatarUrl && showAvatar ? 'sm:justify-between' : 'justify-center'}`}>
            {/* Content - Prioritize text content */}
            <div className={`w-full ${avatarUrl && showAvatar ? 'sm:w-2/3' : 'w-full'} text-left`}>
              <h1 className="flex flex-wrap text-5xl sm:text-5xl md:text-7xl font-bold mb-5 text-gray-900 dark:text-white items-baseline gap-2 md:gap-3">
                <span className="text-4xl sm:text-4xl md:text-6xl whitespace-nowrap">Hello, I&apos;m</span>
                <AnimatedGradientText text={firstName} className="text-5xl sm:text-5xl md:text-7xl whitespace-nowrap" />
                {lastName && (
                  <AnimatedGradientText text={lastName} className="text-5xl sm:text-5xl md:text-7xl whitespace-nowrap" />
                )}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-7 max-w-2xl">
                {description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-start w-full">
                {calLink ? (
                  <Link href={calLink} target="_blank" rel="noopener noreferrer" className="w-full">
                    <RainbowButton
                      variant="default"
                      size="lg"
                      className="w-full"
                    >
                      {primaryButtonText}
                    </RainbowButton>
                  </Link>
                ) : (
                  <RainbowButton
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    {primaryButtonText}
                  </RainbowButton>
                )}
                
                {linkedinUrl ? (
                  <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                    <RainbowButton
                      variant="default"
                      size="lg"
                      className="w-full"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {secondaryButtonText}
                        <SiLinkedin className="h-5 w-5" />
                      </span>
                    </RainbowButton>
                  </Link>
                ) : (
                  <RainbowButton
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {secondaryButtonText}
                      <SiLinkedin className="h-5 w-5" />
                    </span>
                  </RainbowButton>
                )}
              </div>
              
              {demoLinkText && demoLinkHref && (
                <div className="mt-8 text-center md:text-left">
                  <Link href={demoLinkHref} className="text-blue-500 hover:underline">
                    {demoLinkText}
                  </Link>
                </div>
              )}
            </div>
            
            {/* Avatar - Load with lower priority */}
            {avatarUrl && showAvatar && (
              <div className="hidden sm:flex flex-shrink-0 w-1/3 justify-end">
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg">
                  <Image 
                    src={avatarUrl} 
                    alt={name}
                    fill
                    className="object-cover"
                    loading="eager"
                    sizes="(max-width: 768px) 160px, 224px"
                    quality={90}
                  />
                </div>
              </div>
            )}
          </div>
        </ContentContainer>
      </div>
    </section>
  );
};

export default Hero; 