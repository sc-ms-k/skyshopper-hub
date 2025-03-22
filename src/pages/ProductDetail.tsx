
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share, Package, PlaneTakeoff, Truck, ShieldCheck, Clock, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CloudsBackground from '@/components/CloudsBackground';
import ProductCard, { Product } from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock product data
      setProduct({
        id: parseInt(id || '1'),
        name: "Wireless Noise-Cancelling Headphones",
        category: "Electronics",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        isNew: true,
        estimatedDelivery: "2-3 days",
        rating: 4.8
      });
      
      setRelatedProducts([
        {
          id: 2,
          name: "Smart Watch",
          category: "Electronics",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
          estimatedDelivery: "1-2 days",
          rating: 4.5
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
          id: 7,
          name: "Smart Home Hub",
          category: "Electronics",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          isNew: true,
          estimatedDelivery: "2-3 days",
          rating: 4.4
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [id]);
  
  // Additional product images
  const productImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e0e7269572?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
    "https://images.unsplash.com/photo-1563889958751-bfd7e0068402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  ];
  
  // Product specifications
  const specifications = [
    { label: "Brand", value: "SoundWave" },
    { label: "Model", value: "SW-NC100" },
    { label: "Color", value: "Matte Black" },
    { label: "Battery Life", value: "Up to 30 hours" },
    { label: "Connectivity", value: "Bluetooth 5.0, 3.5mm jack" },
    { label: "Features", value: "Active Noise Cancellation, Voice Assistant, Foldable Design" }
  ];
  
  // Product reviews
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      date: "3 weeks ago",
      rating: 5,
      comment: "These headphones have amazing sound quality and the noise cancellation is top-notch. Battery life is impressive too. Highly recommend!"
    },
    {
      id: 2,
      name: "Sarah Miller",
      date: "1 month ago",
      rating: 4,
      comment: "Great headphones, very comfortable for long periods of use. The only downside is the carrying case is a bit bulky."
    },
    {
      id: 3,
      name: "Michael Davis",
      date: "2 months ago",
      rating: 5,
      comment: "The sound quality exceeded my expectations. These are worth every penny!"
    }
  ];
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <div className="page-container py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                  <div className="h-96 bg-gray-200 rounded-lg"></div>
                  <div className="flex mt-4 space-x-2">
                    {[1, 2, 3, 4].map((_, index) => (
                      <div key={index} className="h-20 w-20 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <div className="page-container py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-sky-100 text-primary rounded-full mb-4">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Product not found</h3>
              <p className="text-muted-foreground mb-4">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/products" className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                Browse Products
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="page-container">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <Link to={`/products/category/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
                {product.category}
              </Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-foreground truncate">{product.name}</span>
            </div>
          </div>
        </div>
        
        <div className="page-container py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product images */}
            <div className="w-full lg:w-1/2">
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 h-96 flex items-center justify-center">
                <img 
                  src={productImages[currentImage]} 
                  alt={product.name}
                  className="object-contain max-h-full max-w-full animate-fade-in"
                />
                
                {product.isNew && (
                  <div className="absolute top-4 left-4 pill bg-primary text-white">
                    New
                  </div>
                )}
              </div>
              
              <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all",
                      currentImage === index 
                        ? "border-primary" 
                        : "border-transparent hover:border-gray-200"
                    )}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product info */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-5 h-5",
                            i < Math.floor(product.rating) 
                              ? "text-amber-400 fill-amber-400" 
                              : "text-gray-200 fill-gray-200"
                          )}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-muted-foreground">
                      {product.rating} ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  {product.price < 200 && (
                    <span className="ml-2 text-muted-foreground line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground">
                  Experience premium sound quality with these wireless noise-cancelling headphones. 
                  Perfect for music lovers and travelers alike, featuring up to 30 hours of battery life 
                  and exceptional sound clarity.
                </p>
                
                <div className="flex items-center text-emerald-600 bg-emerald-50 rounded-lg p-3">
                  <Truck className="h-5 w-5 mr-2" />
                  <span>Free shipping • Estimated delivery in {product.estimatedDelivery}</span>
                </div>
                
                <div className="pt-2">
                  <div className="flex space-x-4 items-center">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-3 py-2 text-gray-500 hover:text-primary transition-colors disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-12 text-center border-0 focus:ring-0"
                      />
                      <button 
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3 py-2 text-gray-500 hover:text-primary transition-colors disabled:opacity-50"
                        disabled={quantity >= 10}
                      >
                        +
                      </button>
                    </div>
                    
                    <span className="text-sm text-muted-foreground">
                      {product.isNew ? 'In stock' : 'Only 5 left in stock'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full py-3 font-medium flex items-center justify-center space-x-2 transition-colors">
                    <Package className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button 
                    onClick={toggleLike}
                    className={cn(
                      "flex items-center justify-center rounded-full py-3 px-4 font-medium border transition-colors",
                      isLiked 
                        ? "bg-red-50 text-red-500 border-red-200" 
                        : "bg-white text-foreground border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <Heart className={cn("h-5 w-5", isLiked && "fill-red-500")} />
                  </button>
                  
                  <button className="flex items-center justify-center rounded-full py-3 px-4 font-medium bg-white text-foreground border border-gray-200 hover:border-gray-300 transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-sky-100 text-sky-600 mt-0.5">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">2-Year Extended Warranty</p>
                      <p className="text-xs text-muted-foreground">
                        Extended protection for your purchase
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-sky-100 text-sky-600 mt-0.5">
                      <PlaneTakeoff className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">Express Shipping</p>
                      <p className="text-xs text-muted-foreground">
                        Fast and reliable delivery service
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-sky-100 text-sky-600 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">30-Day Return Policy</p>
                      <p className="text-xs text-muted-foreground">
                        Easy returns if you're not satisfied
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product details tabs */}
          <div className="mt-16 border-t border-gray-100 pt-10">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Product Description</h2>
                <div className="prose max-w-none">
                  <p>
                    Introducing our premium Wireless Noise-Cancelling Headphones, designed for the discerning audio enthusiast. 
                    These headphones deliver an immersive listening experience with crystal-clear highs, rich mids, and deep, 
                    powerful bass.
                  </p>
                  <p className="mt-4">
                    The active noise cancellation technology effectively blocks out ambient noise, allowing you to focus on your 
                    music or calls without distractions. With up to 30 hours of battery life, you can enjoy your favorite content 
                    all day long.
                  </p>
                  <p className="mt-4">
                    The ergonomic design and premium materials ensure maximum comfort, even during extended listening sessions. 
                    The padded headband and memory foam ear cushions provide a comfortable fit while creating a perfect seal for 
                    optimal sound isolation.
                  </p>
                  <p className="mt-4">
                    These headphones also feature intuitive touch controls, allowing you to easily manage your music, calls, 
                    and voice assistant. The built-in microphones ensure crystal-clear call quality, making these headphones 
                    perfect for both work and play.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Specifications</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {specifications.map((spec, index) => (
                    <div 
                      key={index}
                      className="flex justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="text-4xl font-bold">{product.rating.toFixed(1)}</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-4 h-4",
                            i < Math.floor(product.rating) 
                              ? "text-amber-400 fill-amber-400" 
                              : "text-gray-200 fill-gray-200"
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Based on {reviews.length} reviews
                    </div>
                  </div>
                  
                  <div className="flex-1 max-w-md">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center">
                        <div className="text-sm w-6">{star}</div>
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-2" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full"
                            style={{ 
                              width: `${
                                star === 5 ? 70 :
                                star === 4 ? 20 :
                                star === 3 ? 10 :
                                0
                              }%` 
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-muted-foreground ml-2 w-8">
                          {star === 5 ? '70%' :
                           star === 4 ? '20%' :
                           star === 3 ? '10%' : '0%'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "w-4 h-4",
                                    i < review.rating 
                                      ? "text-amber-400 fill-amber-400" 
                                      : "text-gray-200 fill-gray-200"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 w-full sm:w-auto bg-white border border-gray-200 hover:border-gray-300 text-primary rounded-lg px-6 py-2 text-sm font-medium transition-colors">
                  Show All Reviews
                </button>
              </div>
            </div>
          </div>
          
          {/* Related products */}
          <div className="mt-16 border-t border-gray-100 pt-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link 
                to="/products" 
                className="group flex items-center text-sm font-medium text-primary"
              >
                View all
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
