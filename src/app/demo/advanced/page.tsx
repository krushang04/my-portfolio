"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdvancedDemoPage() {
  const [color1, setColor1] = useState("hsl(0, 100%, 63%)");    // Red
  const [color2, setColor2] = useState("hsl(270, 100%, 63%)");  // Purple
  const [color3, setColor3] = useState("hsl(210, 100%, 63%)");  // Blue
  const [color4, setColor4] = useState("hsl(195, 100%, 63%)");  // Cyan
  const [color5, setColor5] = useState("hsl(90, 100%, 63%)");   // Green
  const [animationSpeed, setAnimationSpeed] = useState(3);
  
  const customGradientStyle = {
    backgroundImage: `linear-gradient(to right, ${color1}, ${color5}, ${color3}, ${color4}, ${color2})`,
    backgroundSize: "200% auto",
    animation: `rainbow ${animationSpeed}s linear infinite`,
  };
  
  const customTextGradientStyle = {
    backgroundImage: `linear-gradient(to right, ${color1}, ${color5}, ${color3}, ${color4}, ${color2})`,
    backgroundSize: "200% auto",
    animation: `rainbow ${animationSpeed}s linear infinite`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-midnight p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Advanced Rainbow Button Demo
      </h1>
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Custom Gradient Colors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Color 1 (Red)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={color1.startsWith("hsl") ? hslToHex(color1) : color1}
                onChange={(e) => setColor1(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border-0"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Color 2 (Purple)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={color2.startsWith("hsl") ? hslToHex(color2) : color2}
                onChange={(e) => setColor2(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border-0"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Color 3 (Blue)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={color3.startsWith("hsl") ? hslToHex(color3) : color3}
                onChange={(e) => setColor3(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border-0"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Color 4 (Cyan)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={color4.startsWith("hsl") ? hslToHex(color4) : color4}
                onChange={(e) => setColor4(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border-0"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Color 5 (Green)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={color5.startsWith("hsl") ? hslToHex(color5) : color5}
                onChange={(e) => setColor5(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border-0"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Animation Speed: {animationSpeed}s
          </label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={animationSpeed} 
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Custom Background Gradient</h3>
            <button 
              className="h-11 px-8 rounded-md text-white font-medium inline-flex items-center justify-center"
              style={customGradientStyle}
            >
              Custom Gradient Button
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Custom Text Gradient</h3>
            <button 
              className="h-11 px-8 rounded-md font-medium inline-flex items-center justify-center border-2 border-gray-200 dark:border-gray-700"
              style={customTextGradientStyle}
            >
              Custom Text Gradient
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">CSS Code</h2>
          
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-300">
              {`:root {
  --color-1: ${color1.startsWith("hsl") ? color1.match(/\d+, \d+%, \d+%/)?.[0] : "0 100% 63%"};
  --color-2: ${color2.startsWith("hsl") ? color2.match(/\d+, \d+%, \d+%/)?.[0] : "270 100% 63%"};
  --color-3: ${color3.startsWith("hsl") ? color3.match(/\d+, \d+%, \d+%/)?.[0] : "210 100% 63%"};
  --color-4: ${color4.startsWith("hsl") ? color4.match(/\d+, \d+%, \d+%/)?.[0] : "195 100% 63%"};
  --color-5: ${color5.startsWith("hsl") ? color5.match(/\d+, \d+%, \d+%/)?.[0] : "90 100% 63%"};
}

/* Custom Gradient CSS */
.rainbow-button {
  background-image: linear-gradient(to right, 
    hsl(var(--color-1)), 
    hsl(var(--color-5)), 
    hsl(var(--color-3)), 
    hsl(var(--color-4)), 
    hsl(var(--color-2))
  );
  background-size: 200% auto;
  animation: rainbow ${animationSpeed}s linear infinite;
}

.rainbow-text {
  background-image: linear-gradient(to right, 
    hsl(var(--color-1)), 
    hsl(var(--color-5)), 
    hsl(var(--color-3)), 
    hsl(var(--color-4)), 
    hsl(var(--color-2))
  );
  background-size: 200% auto;
  animation: rainbow ${animationSpeed}s linear infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes rainbow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`}
            </pre>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center space-x-4">
        <Link href="/demo" className="text-blue-500 hover:underline">
          Back to Basic Demo
        </Link>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// Helper function to convert HSL to HEX for color inputs
function hslToHex(hsl: string): string {
  try {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/) || 
                 hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%,\s*[\d.]+\)/) ||
                 hsl.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
    
    if (!match) return "#ff0080"; // Default if parsing fails
    
    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (x: number): string => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch {
    return "#ff0080"; // Default if any error occurs
  }
} 