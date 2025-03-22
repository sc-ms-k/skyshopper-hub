
import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

type Notification = {
  id: number;
  title: string;
  message: string;
  isNew: boolean;
  time: string;
};

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Product',
      message: 'Sky-Blue Headphones just arrived!',
      isNew: true,
      time: '2 min ago',
    },
    {
      id: 2,
      title: 'Package Update',
      message: 'Your order #38291 is out for delivery',
      isNew: true,
      time: '1 hour ago',
    },
    {
      id: 3,
      title: 'Flash Sale',
      message: '24-hour sale on premium electronics',
      isNew: false,
      time: 'Yesterday',
    },
  ]);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if any notification is new
    setHasNewNotifications(notifications.some(notification => notification.isNew));
    
    // Handle click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notifications]);
  
  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
    
    // Mark all as read when opening
    if (!isOpen && hasNewNotifications) {
      setNotifications(
        notifications.map(notification => ({
          ...notification,
          isNew: false,
        }))
      );
      setHasNewNotifications(false);
    }
  };
  
  return (
    <div ref={notificationRef} className="relative">
      <button 
        onClick={handleNotificationClick}
        className="p-2 rounded-full hover:bg-sky-100 transition-colors relative"
      >
        <Bell className="h-5 w-5 text-foreground/70" />
        {hasNewNotifications && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse-light" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 glass-card rounded-lg overflow-hidden animate-fade-in z-50">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-medium">Notifications</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div>
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 hover:bg-sky-50/50 transition-colors cursor-pointer border-b border-gray-50 flex items-start",
                      notification.isNew && "bg-sky-50/70"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
          
          <button className="w-full p-3 text-sm text-primary hover:bg-sky-50 transition-colors">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
