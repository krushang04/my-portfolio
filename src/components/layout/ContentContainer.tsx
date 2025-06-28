import React from 'react';
import { cn } from '@/lib/utils';

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

/**
 * A container component that applies consistent max-width across the application
 */
const ContentContainer: React.FC<ContentContainerProps> = ({ 
  children, 
  className,
  noPadding = false
}) => {
  return (
    <div className={cn(
      "max-w-3xl mx-auto", 
      !noPadding && "px-4 md:px-0",
      className
    )}>
      {children}
    </div>
  );
};
    
export default ContentContainer; 