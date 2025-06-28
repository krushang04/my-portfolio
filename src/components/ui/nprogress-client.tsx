'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

export function NProgressClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure NProgress once on component mount
    NProgress.configure({
      minimum: 0.25,
      easing: 'ease',
      speed: 700,
      showSpinner: false,
      trickleSpeed: 100,
    });
    
    // Directly apply the Instagram gradient to ensure it overrides defaults
    const applyGradient = () => {
      const bar = document.querySelector('#nprogress .bar');
      if (bar) {
        const style = bar as HTMLElement;
        style.style.background = 'linear-gradient(to right, #FFDC80, #FCAF45, #F77737, #F56040, #FD1D1D, #E1306C, #C13584, #833AB4, #5851DB)';
        style.style.backgroundSize = '400% 400%';
        style.style.animation = 'instagramGradient 2s ease infinite';
      }
    };
    
    // Add observer to catch any nprogress elements being added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        applyGradient();
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Start NProgress when route changes
    NProgress.start();
    
    // Wait for animation to complete before finishing
    const timer = setTimeout(() => {
      NProgress.done(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      NProgress.done(true);
    };
  }, [pathname, searchParams]);

  return null;
} 