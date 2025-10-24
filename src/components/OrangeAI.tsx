import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Minimize2, Sparkles, Bot, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface OrangeAIProps {
  onNavigate: (page: string) => void;
}

export function OrangeAI({ onNavigate }: OrangeAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm O.R.A.N.G.E, The Development Studio's advanced AI assistant. I can help you with:\n\n• Service inquiries & recommendations\n• Project quotes & consultations\n• Portfolio showcase\n• Technical support\n• General questions\n\nHow may I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickActions = [
    { label: 'View Services', action: () => onNavigate('home'), icon: Sparkles },
    { label: 'Get a Quote', action: () => onNavigate('contact'), icon: Send },
    { label: 'Our Portfolio', action: () => onNavigate('works'), icon: Bot },
    { label: 'Support Center', action: () => onNavigate('support'), icon: Zap }
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Service related queries
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('what do you do')) {
      return "We specialize in 6 core services:\n\n1. Web Design & Development\n2. Custom Software Solutions\n3. Mobile Applications (iOS & Android)\n4. E-Commerce Solutions\n5. Cyber Security\n6. Graphical Designing\n\nWhich service interests you? I can provide detailed information!";
    } 
    
    // Pricing queries
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote') || lowerMessage.includes('budget')) {
      return "Our pricing is customized based on your specific requirements. Factors include:\n\n• Project scope & complexity\n• Timeline & deadlines\n• Technology stack\n• Ongoing support needs\n\nI can connect you with our team for a detailed quote! Shall I take you to our contact form?";
    } 
    
    // Portfolio queries
    else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project') || lowerMessage.includes('example')) {
      return "We've delivered 100+ successful projects across various industries! Our portfolio showcases web apps, mobile applications, enterprise solutions, and more.\n\nWould you like to explore our Works page to see our best projects?";
    } 
    
    // Contact queries
    else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return "You can reach us at:\n\nEmail:\n• info@devstudioco.com\n• supports@devstudioco.com\n\nPhone:\n• +91 8438028227\n• +91 8489551887\n\nAddress:\nNagapattinam, Tamil Nadu, India 609504\n\nWould you like to visit our contact page?";
    } 
    
    // ISO certification queries
    else if (lowerMessage.includes('iso') || lowerMessage.includes('certified') || lowerMessage.includes('certification')) {
      return "Yes! We are ISO-certified, which demonstrates our commitment to:\n\n✓ International quality standards\n✓ Security best practices\n✓ Process excellence\n✓ Continuous improvement\n\nThis ensures you receive world-class service and secure solutions!";
    } 
    
    // Consultation queries
    else if (lowerMessage.includes('consultation') || lowerMessage.includes('meeting') || lowerMessage.includes('discuss')) {
      return "We offer FREE initial consultations! During the consultation, we'll:\n\n✓ Understand your requirements\n✓ Discuss technical solutions\n✓ Provide timeline estimates\n✓ Answer all your questions\n\nShall I direct you to our contact form to schedule a consultation?";
    } 
    
    // Support queries
    else if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
      return "Our comprehensive Support Center offers:\n\n• Knowledge Base\n• FAQs\n• Ticket Submission\n• Live Chat\n• Email Support\n\nWe provide 24/7 support to ensure your success. Want to visit our Support Center?";
    } 
    
    // Technology queries
    else if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('framework')) {
      return "We work with cutting-edge technologies:\n\nFrontend: React, Next.js, Vue.js, Angular\n🔧 Backend: Node.js, Python, PHP, Java\nMobile: React Native, Flutter, Swift, Kotlin\nDatabase: PostgreSQL, MongoDB, MySQL\nCloud: AWS, Azure, Google Cloud\n\nWhat technology interests you?";
    } 
    
    // Team queries
    else if (lowerMessage.includes('team') || lowerMessage.includes('who') || lowerMessage.includes('people')) {
      return "Our talented team includes:\n\n• Somaskandhan - Lead Developer\n• Rahul - Senior Engineer\n• Sinduja - UX/UI Designer\n• Keerthi - Project Manager\n• Janani - QA Specialist\n\nWe're a passionate team dedicated to bringing your vision to life!";
    } 
    
    // Timeline queries
    else if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
      return "Project timelines vary based on complexity:\n\n• Simple websites: 2-4 weeks\n• Complex web apps: 2-4 months\n• Mobile apps: 3-6 months\n• Enterprise solutions: 6-12 months\n\nWe provide detailed timelines after understanding your requirements!";
    } 
    
    // Greeting responses
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage.includes('hey')) {
      return "Hello! Great to connect with you! I'm here to help you explore our services, answer questions, or connect you with our team. What can I assist you with today?";
    } 
    
    // Thank you responses
    else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "😊 You're very welcome! If you have any other questions or need assistance, I'm always here to help. Have a great day!";
    } 
    
    // Default response
    else {
      return "🤔 I'm here to help you with:\n\n• 📋 Service information\n• 💰 Pricing & quotes\n• 🎨 Portfolio showcase\n• 📞 Contact details\n• 🛡️ Support assistance\n• 👥 Team information\n• ⚡ Technology stack\n\nFeel free to ask me anything specific!";
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToProcess = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate natural typing delay with variable response time
    const responseDelay = 800 + Math.random() * 400;
    
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageToProcess),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, responseDelay);
  };

  const handleQuickAction = (action: () => void, label: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: label,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Perfect! Navigating you to ${label.replace(/[🎯💬🎨🛡️]/g, '').trim()}...`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
      setTimeout(action, 500);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-gradient-to-br from-primary to-orange-600 rounded-full shadow-2xl flex items-center justify-center group"
          >
            <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
            <motion.div
              className="absolute inset-0 rounded-full bg-primary opacity-75"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - SMALLER SIZE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '480px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-50 w-80 bg-card rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden flex flex-col backdrop-blur-sm"
          >
            {/* Header - Enhanced */}
            <div className="bg-gradient-to-r from-primary to-orange-600 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md relative">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <div className="text-white flex items-center gap-1">
                    <span>O.R.A.N.G.E</span>
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="text-[10px] text-white/90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Advanced AI • Online
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages - Compact */}
                <div ref={scrollRef} className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-secondary/20 to-background">
                  <div className="space-y-2.5">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-sm ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-br from-primary to-orange-600 text-white'
                              : 'bg-card border border-border/50'
                          }`}
                        >
                          <p className="text-xs leading-relaxed whitespace-pre-line">{message.text}</p>
                          <p className={`text-[9px] mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-card border border-border/50 rounded-2xl px-4 py-2.5 shadow-sm">
                          <div className="flex gap-1">
                            <motion.span
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.span
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.span
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Quick Actions - Compact */}
                {messages.length <= 2 && (
                  <div className="px-3 py-2 border-t border-border/50 bg-secondary/30">
                    <p className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Quick Actions
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {quickActions.map((action, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuickAction(action.action, action.label)}
                          className="text-[10px] bg-gradient-to-br from-secondary to-secondary/50 hover:from-primary/20 hover:to-primary/10 p-2 rounded-lg transition-all border border-border/30"
                        >
                          {action.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input - Compact */}
                <div className="p-2.5 border-t border-border/50 bg-card/50">
                  <div className="flex gap-1.5">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything..."
                      className="flex-1 h-8 text-xs"
                    />
                    <Button
                      onClick={handleSend}
                      size="icon"
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-br from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 h-8 w-8"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1 text-center">
                    Powered by Advanced AI Technology
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
