
import { MapPin, Navigation } from 'lucide-react';

const LocationMap = () => {
  // Mock location data
  const locations = [
    { id: 1, name: 'San Francisco HQ', address: '123 Market St, San Francisco, CA', isPrimary: true },
    { id: 2, name: 'New York Office', address: '456 Broadway, New York, NY' },
    { id: 3, name: 'Chicago Distribution', address: '789 Michigan Ave, Chicago, IL' },
  ];

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Company Locations</h2>
        <p className="text-sm text-muted-foreground">Our offices and distribution centers</p>
      </div>
      
      <div className="relative bg-sky-50 h-80">
        {/* This would be replaced with an actual map integration */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-white">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M50,250 Q400,50 750,250 T50,250" 
                fill="none" 
                stroke="#0ea5e9" 
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <circle cx="50" cy="250" r="10" fill="#0ea5e9" />
              <circle cx="750" cy="250" r="10" fill="#0ea5e9" />
              <circle cx="400" cy="150" r="8" fill="#0ea5e9" />
            </svg>
          </div>
          
          {/* Location pins */}
          <div className="absolute left-[10%] top-[42%]">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-10 h-10 bg-sky-500/20 rounded-full animate-pulse-light"></div>
              <div className="bg-sky-500 text-white p-2 rounded-full z-10 relative">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div className="absolute left-[50%] top-[25%]">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-10 h-10 bg-sky-500/10 rounded-full animate-pulse-light"></div>
              <div className="bg-white text-sky-500 border border-sky-500 p-2 rounded-full z-10 relative">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div className="absolute left-[80%] top-[42%]">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-10 h-10 bg-sky-500/10 rounded-full animate-pulse-light"></div>
              <div className="bg-white text-sky-500 border border-sky-500 p-2 rounded-full z-10 relative">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          {/* Airplane moving */}
          <div className="absolute left-[45%] top-[35%] animate-fly-across">
            <div className="text-primary transform -rotate-45">
              <Navigation className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="space-y-2">
          {locations.map(location => (
            <div 
              key={location.id} 
              className={`p-3 rounded-lg border ${
                location.isPrimary ? 'border-sky-200 bg-sky-50' : 'border-gray-100 hover:bg-gray-50'
              } transition-colors cursor-pointer`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-lg ${location.isPrimary ? 'bg-sky-100 text-sky-600' : 'bg-gray-100 text-gray-600'}`}>
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
