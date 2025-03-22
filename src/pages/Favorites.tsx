
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Package, HeartOff, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CloudsBackground from '@/components/CloudsBackground';
import ProductCard, { Product } from '@/components/ProductCard';

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Product[]>([]);
  
  // Simulating data fetch
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setFavorites([
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
          id: 5,
          name: "Bluetooth Speaker",
          category: "Electronics",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
          estimatedDelivery: "3-4 days",
          rating: 4.2
        },
        {
          id: 6,
          name: "Leather Backpack",
          category: "Fashion",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
          estimatedDelivery: "1-2 days",
          rating: 4.6
        }
      ]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const removeFavorite = (productId: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(product => product.id !== productId));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Page header */}
        <div className="relative bg-gradient-to-r from-sky-400 to-blue-500 text-white overflow-hidden">
          <CloudsBackground variant="light" density="low" />
          <div className="page-container relative z-10 py-12">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Favorites</h1>
            </div>
            <p className="max-w-2xl mt-2">Your favorite products all in one place. Save items you love and come back to them later.</p>
          </div>
        </div>
        
        {/* Favorites content */}
        <div className="page-container py-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map(product => (
                    <div key={product.id} className="relative group">
                      <ProductCard product={product} />
                      <button
                        onClick={() => removeFavorite(product.id)}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center p-3 bg-gray-100 text-gray-500 rounded-full mb-4">
                    <HeartOff className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You haven't added any products to your favorites yet. Browse our catalog and click the heart icon to add items.
                  </p>
                  <Link to="/products" className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 font-medium transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Browse Products</span>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Recommended for you */}
        <div className="bg-gray-50 py-16">
          <div className="page-container">
            <h2 className="text-2xl font-bold mb-8">Recommended For You</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 2,
                  name: "Smart Watch",
                  category: "Electronics",
                  price: 299.99,
                  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
                  rating: 4.5
                },
                {
                  id: 3,
                  name: "Camera Drone",
                  category: "Electronics",
                  price: 599.99,
                  image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80",
                  rating: 4.7
                },
                {
                  id: 4,
                  name: "Coffee Maker",
                  category: "Home & Kitchen",
                  price: 89.99,
                  image: "https://images.unsplash.com/photo-1570287356730-bf70dadbd56c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  rating: 4.3
                },
                {
                  id: 7,
                  name: "Smart Home Hub",
                  category: "Electronics",
                  price: 199.99,
                  image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  isNew: true,
                  rating: 4.4
                }
              ].map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
