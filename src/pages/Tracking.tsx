
import { useState } from 'react';
import { Package, PlaneTakeoff, MapPin, Check, Info, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CloudsBackground from '@/components/CloudsBackground';
import { cn } from '@/lib/utils';

type DeliveryStatus = 'processing' | 'dispatched' | 'in-transit' | 'out-for-delivery' | 'delivered';

type TrackingResult = {
  trackingNumber: string;
  status: DeliveryStatus;
  estimatedDelivery: string;
  product: {
    name: string;
    image: string;
  };
  timeline: {
    status: string;
    location: string;
    date: string;
    time: string;
    completed: boolean;
  }[];
  currentLocation: {
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      if (trackingNumber === 'ERROR') {
        setError('Invalid tracking number. Please check and try again.');
        setTrackingResult(null);
      } else {
        // Mock data
        setTrackingResult({
          trackingNumber: trackingNumber,
          status: 'in-transit',
          estimatedDelivery: 'May 15, 2023',
          product: {
            name: 'Wireless Headphones',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          },
          timeline: [
            {
              status: 'Order Processed',
              location: 'Tokyo, Japan',
              date: 'May 10, 2023',
              time: '09:15 AM',
              completed: true
            },
            {
              status: 'Package Dispatched',
              location: 'Tokyo, Japan',
              date: 'May 11, 2023',
              time: '02:30 PM',
              completed: true
            },
            {
              status: 'In Transit',
              location: 'Hong Kong, China',
              date: 'May 12, 2023',
              time: '11:45 AM',
              completed: true
            },
            {
              status: 'Out for Delivery',
              location: 'San Francisco, USA',
              date: 'May 14, 2023',
              time: '08:00 AM',
              completed: false
            },
            {
              status: 'Delivered',
              location: 'San Francisco, USA',
              date: 'Pending',
              time: 'Pending',
              completed: false
            }
          ],
          currentLocation: {
            city: 'San Francisco',
            country: 'USA',
            coordinates: {
              lat: 37.7749,
              lng: -122.4194
            }
          }
        });
      }
      setLoading(false);
    }, 1500);
  };
  
  const getStatusClass = (status: DeliveryStatus) => {
    switch(status) {
      case 'processing':
        return 'text-gray-600 bg-gray-100';
      case 'dispatched':
        return 'text-amber-600 bg-amber-100';
      case 'in-transit':
        return 'text-sky-600 bg-sky-100';
      case 'out-for-delivery':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusText = (status: DeliveryStatus) => {
    switch(status) {
      case 'processing':
        return 'Processing';
      case 'dispatched':
        return 'Dispatched';
      case 'in-transit':
        return 'In Transit';
      case 'out-for-delivery':
        return 'Out For Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };
  
  const getStatusIcon = (status: DeliveryStatus) => {
    switch(status) {
      case 'processing':
        return Package;
      case 'dispatched':
        return Package;
      case 'in-transit':
        return PlaneTakeoff;
      case 'out-for-delivery':
        return Truck;
      case 'delivered':
        return Check;
      default:
        return Package;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero section */}
        <section className="relative bg-gradient-to-r from-sky-400 to-blue-500 text-white overflow-hidden">
          <CloudsBackground variant="light" density="low" />
          <div className="page-container py-16 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Package</h1>
              <p className="text-white/80 mb-8">
                Enter your tracking number to get real-time updates on your package's location and delivery status.
              </p>
              
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className={cn(
                      "block w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:ring-2",
                      error 
                        ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                        : "border-transparent focus:border-sky-300 focus:ring-sky-200"
                    )}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-white text-primary hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    'Track Package'
                  )}
                </button>
              </form>
              
              {error && (
                <div className="mt-3 text-left bg-red-100/20 text-white rounded-lg p-3 flex items-start">
                  <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Wave effect at bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80">
              <path fill="#ffffff" fillOpacity="1" d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Results section */}
        {trackingResult && (
          <section className="py-12 bg-white">
            <div className="page-container">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Package Info */}
                  <div className="lg:w-1/3">
                    <div className="glass-card rounded-2xl overflow-hidden">
                      <div className="relative h-48 bg-gray-50">
                        <img 
                          src={trackingResult.product.image}
                          alt={trackingResult.product.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      
                      <div className="p-5 space-y-3">
                        <h3 className="font-medium">{trackingResult.product.name}</h3>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Tracking Number</span>
                            <span className="text-sm font-medium">{trackingResult.trackingNumber}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <span className={`text-sm font-medium pill ${getStatusClass(trackingResult.status)}`}>
                              {getStatusText(trackingResult.status)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Expected Delivery</span>
                            <span className="text-sm font-medium">{trackingResult.estimatedDelivery}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Current Location</span>
                            <span className="text-sm font-medium">
                              {trackingResult.currentLocation.city}, {trackingResult.currentLocation.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tracking Timeline */}
                  <div className="lg:w-2/3">
                    <div className="glass-card rounded-2xl p-5">
                      <h3 className="font-medium mb-5">Tracking History</h3>
                      
                      <div className="space-y-6">
                        {trackingResult.timeline.map((event, index) => (
                          <div key={index} className="flex">
                            <div className="flex flex-col items-center mr-4">
                              <div className={cn(
                                "rounded-full w-8 h-8 flex items-center justify-center mb-1",
                                event.completed 
                                  ? "bg-primary text-white" 
                                  : "bg-gray-100 text-gray-400"
                              )}>
                                {event.completed ? (
                                  <Check className="h-5 w-5" />
                                ) : (
                                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                )}
                              </div>
                              {index < trackingResult.timeline.length - 1 && (
                                <div className={cn(
                                  "w-0.5 h-full", 
                                  event.completed 
                                    ? "bg-primary" 
                                    : "bg-gray-200"
                                )}></div>
                              )}
                            </div>
                            
                            <div className={cn(
                              "flex-1 pb-6",
                              event.completed ? "" : "opacity-60"
                            )}>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                                <h4 className="font-medium">{event.status}</h4>
                                <div className="mt-1 sm:mt-0 text-sm text-muted-foreground">
                                  {event.date} • {event.time}
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map section */}
                <div className="mt-8 glass-card rounded-2xl overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="font-medium">Package Location</h3>
                  </div>
                  
                  <div className="h-80 bg-sky-50 relative">
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
                      
                      {/* Plane moving */}
                      <div className="absolute left-[45%] top-[35%] animate-fly-across">
                        <div className="text-primary transform -rotate-45">
                          <PlaneTakeoff className="h-8 w-8" />
                        </div>
                      </div>
                      
                      {/* Current location pin */}
                      <div className="absolute left-[80%] top-[40%]">
                        <div className="relative">
                          <div className="absolute -top-2 -left-2 w-10 h-10 bg-sky-500/20 rounded-full animate-pulse-light"></div>
                          <div className="bg-sky-500 text-white p-2 rounded-full z-10 relative">
                            <MapPin className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-2 bg-white text-foreground text-sm px-3 py-1.5 rounded-md shadow-sm whitespace-nowrap subtle-shadow">
                          {trackingResult.currentLocation.city}, {trackingResult.currentLocation.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-primary text-white hover:bg-primary/90 transition-colors">
                    Get Delivery Updates
                  </button>
                  <button className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-gray-200 hover:border-gray-300 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* How it Works */}
        <section className="py-16 bg-gray-50">
          <div className="page-container">
            <h2 className="text-2xl font-bold text-center mb-12">How Sky Delivery Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card rounded-2xl p-6 text-center hover-scale">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 text-primary mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ship Your Package</h3>
                <p className="text-muted-foreground">
                  Choose from our range of shipping options including express air delivery and standard ground shipping.
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center hover-scale">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 text-primary mb-4">
                  <PlaneTakeoff className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Track in Real-Time</h3>
                <p className="text-muted-foreground">
                  Follow your package's journey with our advanced tracking system that provides real-time updates.
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center hover-scale">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 text-primary mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Receive Delivery</h3>
                <p className="text-muted-foreground">
                  Get notifications when your package is out for delivery and receive it at your doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="page-container">
            <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How do I track my package?",
                  answer: "You can track your package by entering your tracking number in the tracking form above. The tracking number is provided to you in your order confirmation email."
                },
                {
                  question: "What if my tracking number doesn't work?",
                  answer: "If your tracking number doesn't work, it may be too soon after your purchase. Please wait 24 hours after receiving your order confirmation. If it still doesn't work, please contact our customer support."
                },
                {
                  question: "How often is the tracking information updated?",
                  answer: "Tracking information is typically updated every 24 hours. During peak shipping periods, updates may be less frequent."
                },
                {
                  question: "Can I change my delivery address?",
                  answer: "Once a package is in transit, the delivery address cannot be changed. Please contact customer support immediately if you need to make any changes to your delivery details."
                },
                {
                  question: "What does 'In Transit' status mean?",
                  answer: "In Transit means your package is on its way to the destination. It could be traveling by air, ground, or a combination of transportation methods."
                }
              ].map((faq, index) => (
                <div key={index} className="glass-card rounded-2xl overflow-hidden">
                  <div className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center cursor-pointer">
                      <h3 className="font-medium">{faq.question}</h3>
                      <div className="h-5 w-5 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Import Truck icon for use in the page
const Truck = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 17h4V5H2v12h3" />
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
      <path d="M14 17h1" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
};

export default Tracking;
