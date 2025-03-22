
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Package, Heart, PlaneTakeoff, Search } from 'lucide-react';
import NotificationBell from './NotificationBell';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Tracking', path: '/tracking' },
    { name: 'Favorites', path: '/favorites' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary"
          >
            <PlaneTakeoff className="h-6 w-6" />
            <span className="text-xl font-semibold">SkyDelivery</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-sky-100 transition-colors">
              <Search className="h-5 w-5 text-foreground/70" />
            </button>
            
            <NotificationBell />
            
            <Link to="/favorites" className="p-2 rounded-full hover:bg-sky-100 transition-colors">
              <Heart className="h-5 w-5 text-foreground/70" />
            </Link>
            
            <button className="hidden md:flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
              <Package className="h-4 w-4" />
              <span className="text-sm font-medium">Track Order</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
