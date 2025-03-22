
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Package, PlaneLanding, Sparkle, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  estimatedDelivery?: string;
  inTransit?: boolean;
  rating?: number;
};

type ProductCardProps = {
  product: Product;
  variant?: 'default' | 'compact';
};

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [shimmerPositions, setShimmerPositions] = useState<{x: number, y: number}[]>([]);
  const [leaves, setLeaves] = useState<{x: number, y: number, rotation: number, delay: number}[]>([]);
  const { theme } = useTheme();
  
  // Initialize shimmer and leaf effects
  useEffect(() => {
    // Create random shimmer positions
    const newShimmerPositions = Array.from({length: 3}).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setShimmerPositions(newShimmerPositions);
    
    // Create random leaf positions
    const newLeaves = Array.from({length: 4}).map(() => ({
      x: Math.random() * 100,
      y: -20 - (Math.random() * 10),
      rotation: Math.random() * 360,
      delay: Math.random() * 5
    }));
    setLeaves(newLeaves);
  }, [product.id]);
  
  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  return (
    <Link 
      to={`/products/${product.id}`} 
      className={cn(
        "group relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover-scale hover:shadow-md",
        theme === "dark" ? "bg-slate-900/60 border-slate-700/40" : "",
        variant === 'compact' ? 'h-full' : ''
      )}
    >
      {/* Product Image */}
      <div className={cn(
        "relative overflow-hidden",
        variant === 'compact' ? 'h-40' : 'h-56'
      )}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Shimmer effect */}
        {shimmerPositions.map((pos, index) => (
          <div 
            key={`shimmer-${index}`}
            className="absolute w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              top: `${pos.y}%`,
              left: `${pos.x}%`,
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
              transform: 'translate(-50%, -50%)',
              animation: `shimmer 4s infinite ease-in-out ${index * 0.7}s`
            }}
          />
        ))}
        
        {/* Falling leaves effect (only shows on hover) */}
        {leaves.map((leaf, index) => (
          <div
            key={`leaf-${index}`}
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              top: `${leaf.y}%`,
              left: `${leaf.x}%`,
              animation: `falling-leaf 10s linear infinite ${leaf.delay}s`,
              transformOrigin: 'center'
            }}
          >
            <Leaf
              className={cn(
                "w-4 h-4",
                theme === "dark" ? "text-emerald-400/60" : "text-emerald-500/70"
              )}
              style={{
                transform: `rotate(${leaf.rotation}deg)`,
                animation: `spin-slow 10s linear infinite ${leaf.delay}s`
              }}
            />
          </div>
        ))}
        
        {/* Sparkle icon in corner */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkle className="w-4 h-4 text-amber-400 animate-pulse-light" />
        </div>
        
        {/* Like button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-colors z-10"
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"
            )} 
          />
        </button>
        
        {/* New Label */}
        {product.isNew && (
          <div className="absolute top-3 left-3 pill bg-primary text-white">
            New
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.category}</p>
          </div>
          <div className="text-primary font-semibold">${product.price}</div>
        </div>
        
        {variant === 'default' && product.estimatedDelivery && (
          <div className="mt-3 flex items-center text-sm">
            {product.inTransit ? (
              <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
                <PlaneLanding className="h-3.5 w-3.5" />
                <span>In transit • {product.estimatedDelivery}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                <Package className="h-3.5 w-3.5" />
                <span>Ships in {product.estimatedDelivery}</span>
              </div>
            )}
          </div>
        )}
        
        {variant === 'default' && product.rating && (
          <div className="mt-3 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!) ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"
                  }`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
