
import { useEffect, useRef } from 'react';
import { PlaneTakeoff, PackageCheck, Package } from 'lucide-react';
import CloudsBackground from './CloudsBackground';

const Hero = () => {
  const airplaneRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <CloudsBackground density="medium" />
      
      {/* Airplane Animation */}
      <div
        ref={airplaneRef}
        className="absolute z-10 animate-fly-in"
        style={{ 
          top: '20%',
          left: '-10%',
        }}
      >
        <div className="relative">
          <PlaneTakeoff
            size={60}
            className="text-primary transform -rotate-12"
          />
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-10 h-20 bg-gradient-to-t from-transparent to-sky-200/30 blur-md"></div>
        </div>
      </div>
      
      <div className="page-container relative z-10">
        <div className="max-w-3xl">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 pill bg-sky-100 text-sky-700 mb-2">
              <PackageCheck className="h-3.5 w-3.5" />
              <span>Fast & Reliable Delivery</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              Track Your Deliveries 
              <span className="text-primary"> From The Sky</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              Get real-time updates on your package location, receive notifications about new products, and enjoy a seamless delivery experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-3 font-medium flex items-center justify-center space-x-2 transition-colors">
                <Package className="h-5 w-5" />
                <span>Track Your Package</span>
              </button>
              
              <button className="bg-white hover:bg-sky-50 text-primary border border-sky-200 rounded-full px-8 py-3 font-medium transition-colors">
                Explore Products
              </button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="text-lg font-bold">15k+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              
              <div className="h-4 w-px bg-gray-200"></div>
              
              <div className="flex items-center space-x-2">
                <div className="text-lg font-bold">99%</div>
                <div className="text-sm text-muted-foreground">On-time Delivery</div>
              </div>
              
              <div className="h-4 w-px bg-gray-200"></div>
              
              <div className="flex items-center space-x-2">
                <div className="text-lg font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-50/80 to-transparent"></div>
    </div>
  );
};

export default Hero;
