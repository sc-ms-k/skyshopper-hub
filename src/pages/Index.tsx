
import { useEffect, useState } from 'react';
import { Package, PlaneTakeoff, ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import CloudsBackground from '@/components/CloudsBackground';
import ProductCard, { Product } from '@/components/ProductCard';
import ProductStatusGraph from '@/components/ProductStatusGraph';
import LocationMap from '@/components/LocationMap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isNew: true,
      estimatedDelivery: "2-3 days",
      rating: 4.8
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
      estimatedDelivery: "1-2 days",
      inTransit: true,
      rating: 4.5
    },
    {
      id: 3,
      name: "Camera Drone",
      category: "Electronics",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80",
      estimatedDelivery: "4-5 days",
      rating: 4.7
    },
    {
      id: 4,
      name: "Coffee Maker",
      category: "Home & Kitchen",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1570287356730-bf70dadbd56c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isNew: true,
      estimatedDelivery: "2-3 days",
      rating: 4.3
    }
  ]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <section className="relative py-16 bg-white">
        <CloudsBackground variant="light" density="low" />
        <div className="page-container relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground">Explore our newest and most popular items</p>
            </div>
            <a 
              href="/products" 
              className="group flex items-center text-sm font-medium text-primary"
            >
              View all products
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Statistics and Map */}
      <section className="relative py-16 bg-gradient-to-b from-white to-sky-50">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <ProductStatusGraph />
            </div>
            <div className="w-full lg:w-1/2">
              <LocationMap />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="relative py-20 bg-gradient-to-r from-sky-400 to-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full -mt-20 -mr-20"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-white rounded-full -mb-20 -ml-20"></div>
        </div>
        
        <div className="page-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <PlaneTakeoff className="h-5 w-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Tracking Your Deliveries Today
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Get real-time updates, notifications, and estimated delivery times for all your packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 font-medium flex items-center justify-center space-x-2 transition-colors">
                <Package className="h-5 w-5" />
                <span>Track Your Package</span>
              </button>
              <button className="bg-transparent hover:bg-white/10 border border-white text-white rounded-full px-8 py-3 font-medium transition-colors">
                Sign Up for Free
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
