
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Package, PlaneLanding } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        
        {/* Like button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10"
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
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
            <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
          <div className="text-primary font-semibold">${product.price}</div>
        </div>
        
        {variant === 'default' && product.estimatedDelivery && (
          <div className="mt-3 flex items-center text-sm">
            {product.inTransit ? (
              <div className="flex items-center space-x-1 text-amber-600">
                <PlaneLanding className="h-3.5 w-3.5" />
                <span>In transit • {product.estimatedDelivery}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-emerald-600">
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
                    i < Math.floor(product.rating!) ? "text-amber-400 fill-amber-400" : "text-gray-300"
                  }`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-500">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
