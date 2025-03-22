
import { useState, useEffect } from 'react';
import { Sliders, Filter, CheckCheck, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import CloudsBackground from '@/components/CloudsBackground';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Simulating data fetch
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setProducts([
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
        },
        {
          id: 7,
          name: "Smart Home Hub",
          category: "Electronics",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          isNew: true,
          estimatedDelivery: "2-3 days",
          rating: 4.4
        },
        {
          id: 8,
          name: "Fitness Tracker",
          category: "Electronics",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80",
          inTransit: true,
          estimatedDelivery: "Today",
          rating: 4.1
        }
      ]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const categories = [
    { name: 'All', count: 12 },
    { name: 'Electronics', count: 8 },
    { name: 'Home & Kitchen', count: 2 },
    { name: 'Fashion', count: 1 },
    { name: 'Beauty', count: 0 },
    { name: 'Sports', count: 0 },
    { name: 'Toys', count: 0 }
  ];
  
  const priceRanges = [
    { label: 'Under $50', value: 'under-50' },
    { label: '$50 to $100', value: '50-100' },
    { label: '$100 to $200', value: '100-200' },
    { label: '$200 to $500', value: '200-500' },
    { label: 'Over $500', value: 'over-500' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Page header */}
        <div className="relative bg-gradient-to-r from-sky-400 to-blue-500 text-white overflow-hidden">
          <CloudsBackground variant="light" density="low" />
          <div className="page-container relative z-10 py-12">
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="max-w-2xl mt-2">Browse our latest products and get them delivered to your doorstep with lightning-fast speeds.</p>
          </div>
        </div>
        
        {/* Product filtering and results */}
        <div className="page-container py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar filters - desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6 pb-8">
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div 
                        key={category.name} 
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="w-4 h-4 border rounded mr-2 group-hover:border-primary transition-colors flex items-center justify-center">
                            {category.name === 'All' && (
                              <CheckCheck className="w-3 h-3 text-primary" />
                            )}
                          </div>
                          <span className="text-sm group-hover:text-primary transition-colors">{category.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{category.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <div 
                        key={range.value} 
                        className="flex items-center group cursor-pointer"
                      >
                        <div className="w-4 h-4 border rounded mr-2 group-hover:border-primary transition-colors"></div>
                        <span className="text-sm group-hover:text-primary transition-colors">{range.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center group cursor-pointer">
                      <div className="w-4 h-4 border rounded mr-2 group-hover:border-primary transition-colors flex items-center justify-center">
                        <CheckCheck className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm group-hover:text-primary transition-colors">In Stock</span>
                    </div>
                    <div className="flex items-center group cursor-pointer">
                      <div className="w-4 h-4 border rounded mr-2 group-hover:border-primary transition-colors"></div>
                      <span className="text-sm group-hover:text-primary transition-colors">Out of Stock</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div 
                        key={rating} 
                        className="flex items-center group cursor-pointer"
                      >
                        <div className="w-4 h-4 border rounded mr-2 group-hover:border-primary transition-colors"></div>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-300"}`} 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm ml-1">& Up</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-sky-100 text-primary hover:bg-sky-200 rounded-lg py-2 px-4 text-sm font-medium transition-colors">
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {/* Mobile filter toggle */}
              <div className="md:hidden mb-4">
                <button 
                  onClick={() => setFilterOpen(!filterOpen)} 
                  className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm font-medium"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                
                {filterOpen && (
                  <div className="mt-4 border rounded-lg p-4 animate-fade-in">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Categories</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {categories.slice(0, 4).map(category => (
                            <div 
                              key={category.name}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-4 h-4 border rounded flex items-center justify-center">
                                {category.name === 'All' && (
                                  <CheckCheck className="w-3 h-3 text-primary" />
                                )}
                              </div>
                              <span className="text-sm">{category.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Price Range</h3>
                        <div className="space-y-1">
                          {priceRanges.slice(0, 3).map(range => (
                            <div 
                              key={range.value}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-4 h-4 border rounded"></div>
                              <span className="text-sm">{range.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-white border border-gray-200 rounded-lg py-1.5 text-sm">
                          Reset
                        </button>
                        <button className="flex-1 bg-primary text-white rounded-lg py-1.5 text-sm">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sort and results info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <p className="text-muted-foreground text-sm">
                  Showing <span className="font-medium text-foreground">{products.length}</span> products
                </p>
                
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <span className="text-sm">Sort by:</span>
                  <select className="bg-white border border-gray-200 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-primary">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>
              
              {/* Loading state */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
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
                  {/* Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  {/* Empty state */}
                  {products.length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center p-3 bg-sky-100 text-primary rounded-full mb-4">
                        <Package className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No products found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search to find what you're looking for.
                      </p>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                        Clear Filters
                      </button>
                    </div>
                  )}
                  
                  {/* Pagination */}
                  <div className="flex justify-center mt-12">
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                      <button className="px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
                        Previous
                      </button>
                      <button className="px-4 py-2 text-sm bg-primary text-white">1</button>
                      <button className="px-4 py-2 text-sm hover:bg-gray-50">2</button>
                      <button className="px-4 py-2 text-sm hover:bg-gray-50">3</button>
                      <button className="px-4 py-2 text-sm hover:bg-gray-50">Next</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
