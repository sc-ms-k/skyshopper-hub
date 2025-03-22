
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Box, ShoppingBag } from 'lucide-react';

type DataPoint = {
  name: string;
  value: number;
  color: string;
};

const ProductStatusGraph = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState<DataPoint[]>([
    { name: 'New', value: 24, color: '#0ea5e9' },
    { name: 'Processing', value: 13, color: '#f59e0b' },
    { name: 'Shipping', value: 18, color: '#8b5cf6' },
    { name: 'Delivered', value: 32, color: '#10b981' },
  ]);
  
  // Rotate through active items for animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [data.length]);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-sky-100 rounded-lg">
          <p className="font-medium text-sm">{payload[0].payload.name}</p>
          <p className="text-sm text-primary">{payload[0].value} products</p>
        </div>
      );
    }
    return null;
  };
  
  const stats = [
    { 
      label: 'Total Products', 
      value: '87',
      icon: Box,
      color: 'text-sky-500 bg-sky-100'
    },
    { 
      label: 'New Today', 
      value: '12',
      icon: Calendar,
      color: 'text-purple-500 bg-purple-100'
    },
    { 
      label: 'Sold', 
      value: '43',
      icon: ShoppingBag,
      color: 'text-emerald-500 bg-emerald-100'
    },
  ];
  
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Product Status</h2>
        <p className="text-sm text-muted-foreground">Real-time overview of product statuses</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis 
              hide={true}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  fillOpacity={index === activeIndex ? 1 : 0.6}
                  style={{
                    transition: 'fill-opacity 300ms',
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductStatusGraph;
