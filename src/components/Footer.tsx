
import { Link } from 'react-router-dom';
import { PlaneTakeoff, ChevronRight, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-white to-sky-50 pt-16 pb-6">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-5">
              <PlaneTakeoff className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-semibold">SkyDelivery</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              We connect you with the latest products, delivering them straight from the sky to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white text-gray-600 hover:text-primary rounded-full border border-gray-100 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white text-gray-600 hover:text-primary rounded-full border border-gray-100 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white text-gray-600 hover:text-primary rounded-full border border-gray-100 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white text-gray-600 hover:text-primary rounded-full border border-gray-100 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Products', 'Tracking', 'Favorites', 'About Us', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-muted-foreground hover:text-primary flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5">Product Categories</h3>
            <ul className="space-y-3">
              {['Electronics', 'Home & Kitchen', 'Fashion', 'Beauty', 'Sports', 'Toys'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/products/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-muted-foreground hover:text-primary flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Skyway Avenue, San Francisco, CA 94111
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">support@skydelivery.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-l-lg px-4 py-2 border border-r-0 border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary flex-1"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-lg text-sm hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {currentYear} SkyDelivery. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
              <Link to="/faqs" className="hover:text-primary">FAQs</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
