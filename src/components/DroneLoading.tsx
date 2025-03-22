
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

type DroneLoadingProps = {
  isLoading?: boolean;
};

const DroneLoading = ({ isLoading = false }: DroneLoadingProps) => {
  const [visible, setVisible] = useState(isLoading);
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      
      // Create random particles for the drone's "trail"
      const newParticles = Array.from({ length: 20 }).map((_, index) => ({
        id: index,
        x: Math.random() * 60 - 30, // position relative to drone
        y: Math.random() * 20 + 80, // always below the drone
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1
      }));
      
      setParticles(newParticles);
    } else {
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className={`drone-loading ${!isLoading ? 'animate-fade-out' : ''}`}>
      <div className="relative">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-drone-fly"
        >
          {/* Drone Body */}
          <rect x="50" y="50" width="20" height="20" rx="2" className="fill-primary" />
          
          {/* Drone Arms */}
          <line x1="40" y1="60" x2="10" y2="60" stroke="currentColor" strokeWidth="3" />
          <line x1="80" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="3" />
          <line x1="60" y1="40" x2="60" y2="10" stroke="currentColor" strokeWidth="3" />
          <line x1="60" y1="80" x2="60" y2="110" stroke="currentColor" strokeWidth="3" />
          
          {/* Drone Motors/Propellers */}
          <circle cx="10" cy="60" r="8" className="fill-primary animate-spin-slow" />
          <circle cx="110" cy="60" r="8" className="fill-primary animate-spin-slow" />
          <circle cx="60" cy="10" r="8" className="fill-primary animate-spin-slow" />
          <circle cx="60" cy="110" r="8" className="fill-primary animate-spin-slow" />
          
          {/* Drone Camera */}
          <circle cx="60" cy="60" r="5" className={theme === "dark" ? "fill-slate-200" : "fill-slate-800"} />
          <circle cx="60" cy="60" r="2" className="fill-primary" />
          
          {/* Drone Lights */}
          <circle cx="45" cy="45" r="2" className="fill-amber-400 animate-pulse-light" />
          <circle cx="75" cy="45" r="2" className="fill-amber-400 animate-pulse-light" />
        </svg>
        
        {/* Particle effects */}
        {particles.map(particle => (
          <div 
            key={particle.id}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${60 + particle.x}px`, // center relative to the drone
              top: `${particle.y}px`,
              animation: `falling-particle ${particle.speed}s infinite linear`
            }}
          />
        ))}
        
        <div className="mt-6 text-center font-medium animate-pulse">Loading your sky experience...</div>
      </div>
    </div>
  );
}

export default DroneLoading;
