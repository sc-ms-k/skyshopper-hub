
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your SkyDelivery assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponses = [
        "I can help you track your package. Do you have a tracking number?",
        "Your package is on its way! It should arrive by tomorrow.",
        "Would you like to see our latest products?",
        "Feel free to ask me about delivery times or shipping options.",
        "I can help you find products that match your preferences.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg z-50 h-14 w-14 flex items-center justify-center"
        aria-label="Chat with AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <Card className={`fixed bottom-24 right-6 w-80 sm:w-96 shadow-xl z-50 glass-card overflow-hidden transition-all duration-300 ease-in-out ${
          isMinimized ? 'h-14' : 'max-h-[500px] h-[70vh]'
        }`}>
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b">
            <CardTitle className="text-base font-medium flex items-center">
              <Bot className="h-5 w-5 mr-2 text-primary" />
              AI Assistant
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground"
                onClick={toggleChatbot}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <ScrollArea className="h-[calc(70vh-120px)] max-h-[380px] w-full">
                <CardContent className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground max-w-[80%] px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse"></div>
                          <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse delay-100"></div>
                          <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messageEndRef} />
                </CardContent>
              </ScrollArea>
              <CardFooter className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
