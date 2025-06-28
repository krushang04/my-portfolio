"use client";

import { RainbowButton } from "@/components/ui/rainbowbutton";
import { useState } from "react";
import Link from "next/link";

export default function DemoPage() {
  const [animationSpeed, setAnimationSpeed] = useState(3);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-midnight p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Rainbow Button Demo
      </h1>
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Button Variants</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Default Variant</h3>
            <RainbowButton 
              variant="default" 
              size="lg"
              style={{ 
                animation: `rainbow ${animationSpeed}s linear infinite` 
              }}
            >
              Default Button
            </RainbowButton>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Outline Variant</h3>
            <RainbowButton 
              variant="outline" 
              size="lg"
              style={{ 
                animation: `rainbow ${animationSpeed}s linear infinite` 
              }}
            >
              Outline Button
            </RainbowButton>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Default with Custom Style</h3>
            <RainbowButton 
              variant="default" 
              size="lg"
              style={{ 
                animation: `rainbow ${animationSpeed}s linear infinite` 
              }}
            >
              Custom Style
            </RainbowButton>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Button Sizes</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <RainbowButton 
            variant="default" 
            size="sm"
            style={{ 
              animation: `rainbow ${animationSpeed}s linear infinite` 
            }}
          >
            Small
          </RainbowButton>
          
          <RainbowButton 
            variant="default" 
            size="default"
            style={{ 
              animation: `rainbow ${animationSpeed}s linear infinite` 
            }}
          >
            Default
          </RainbowButton>
          
          <RainbowButton 
            variant="default" 
            size="lg"
            style={{ 
              animation: `rainbow ${animationSpeed}s linear infinite` 
            }}
          >
            Large
          </RainbowButton>
        </div>
        
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Animation Speed</h2>
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-xs">
            <label htmlFor="speed-slider" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Animation Speed: {animationSpeed}s
            </label>
            <input 
              id="speed-slider" 
              type="range" 
              min="1" 
              max="10" 
              value={animationSpeed} 
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
          
          <RainbowButton 
            variant="default" 
            size="lg"
            style={{ 
              animation: `rainbow ${animationSpeed}s linear infinite` 
            }}
          >
            Speed: {animationSpeed}s
          </RainbowButton>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">How It Works</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The button has a black background with two rainbow gradient elements:
          </p>
          <ol className="list-decimal pl-5 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
            <li>A thin line at the bottom with a subtle blur effect</li>
            <li>A more blurred, wider glow underneath for the shadow effect</li>
          </ol>
          <p className="text-gray-700 dark:text-gray-300">
            Both elements use the CSS variables (--color-1 through --color-5) and animate with the rainbow keyframe animation.
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
        <span className="mx-2">•</span>
        <Link href="/demo/advanced" className="text-blue-500 hover:underline">
          Advanced Demo
        </Link>
      </div>
    </div>
  );
} 