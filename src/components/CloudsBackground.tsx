
import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

type CloudsBackgroundProps = {
  variant?: 'light' | 'default';
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'normal' | 'fast';
};

const CloudsBackground = ({
  variant = 'default',
  density = 'medium',
  speed = 'normal'
}: CloudsBackgroundProps) => {
  const cloudContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  // Set loading state to false after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Determine number of clouds based on density
  const getCloudCount = () => {
    switch (density) {
      case 'low': return 4;
      case 'medium': return 8;
      case 'high': return 12;
      default: return 8;
    }
  };
  
  // Get cloud variant class
  const getCloudColorClass = () => {
    if (variant === 'light') {
      return theme === 'dark' ? 'text-slate-800/30' : 'text-cloud-light';
    }
    return theme === 'dark' ? 'text-slate-800/40' : 'text-cloud';
  };

  // Get animation duration based on speed
  const getAnimationDuration = (baseDuration: number) => {
    switch (speed) {
      case 'slow': return baseDuration * 1.5;
      case 'fast': return baseDuration * 0.5;
      default: return baseDuration;
    }
  };
  
  // Create random number within range
  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // Generate clouds
  const cloudCount = getCloudCount();
  const clouds = Array.from({ length: cloudCount }).map((_, index) => {
    const size = random(40, 120);
    const top = random(5, 80);
    const left = random(-20, 100);
    const opacity = random(30, 80) / 100;
    const delay = random(0, 15);
    const baseDuration = random(25, 45);
    const duration = getAnimationDuration(baseDuration);
    const zIndex = random(-10, -5);
    
    return {
      id: index,
      style: {
        width: `${size}px`,
        height: `${Math.floor(size * 0.6)}px`,
        top: `${top}%`,
        left: `${left}%`,
        opacity,
        zIndex,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }
    };
  });

  return (
    <div ref={cloudContainerRef} className="cloud-background">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`absolute ${getCloudColorClass()} opacity-${Math.floor(cloud.style.opacity * 100)} ${isLoading ? 'animate-cloud-drift-2' : 'animate-cloud-drift-1'} pointer-events-none`}
          style={{
            width: cloud.style.width,
            height: cloud.style.height,
            top: cloud.style.top,
            left: cloud.style.left,
            zIndex: cloud.style.zIndex,
            animationDelay: cloud.style.animationDelay,
            animationDuration: cloud.style.animationDuration,
          }}
        >
          <svg 
            viewBox="0 0 200 120" 
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M0 100 C30 130, 75 130, 100 100 S140 80, 200 100 V0 H0 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CloudsBackground;
