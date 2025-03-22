
import { useEffect, useState } from 'react';

type DroneLoadingProps = {
  isLoading?: boolean;
};

const DroneLoading = ({ isLoading = false }: DroneLoadingProps) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
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
          className="animate-float-slow"
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
        </svg>
        <div className="mt-4 text-center font-medium">Loading...</div>
      </div>
    </div>
  );
};

export default DroneLoading;
