import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  X,
  Briefcase,
  Globe2,
  Plane,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  type?: 'text' | 'options' | 'multi-options' | 'form';
  options?: string[];
  data?: any;
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: 'Welcome to EV Holidays AI Concierge. I am here to assist you in planning a premium travel experience. What type of journey are we looking to organize today?',
  type: 'options',
  options: [
    'Corporate Retreat',
    'Employee Incentive Tour',
    'Team Outing',
    'Solo Traveller',
    'Couple',
    'Family Traveller'
  ]
};

export default function AIPlanner() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(1);
  const [planData, setPlanData] = useState<any>({});
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    requirements: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    if (!content.trim() && step !== 4) return;

    const userContent = step === 4 ? selectedMultiOptions.join(', ') : content;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userContent
    };

    setMessages(prev => {
      // Remove options from the previous assistant message so they don't clutter the UI
      const newMessages = [...prev];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1].type = 'text';
      }
      return [...newMessages, userMessage];
    });
    
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Concierge Logic
    setTimeout(() => {
      let response: Message;
      
      const isLeisure = ['Solo Traveller', 'Couple', 'Family Traveller'].includes(step === 1 ? content : planData.service);
      
      if (step === 1) {
        setPlanData({ ...planData, service: content });
        if (isLeisure) {
          response = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Excellent choice. A ${content} trip sounds wonderful. Would you prefer a domestic mountain retreat, a beach destination, or an international escape?`,
            type: 'options',
            options: ['Domestic (Mountains)', 'Domestic (Beach)', 'International (SE Asia)', 'International (Europe)']
          };
          setStep(3);
        } else {
          response = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Excellent choice. A ${content} is a great way to align your team. Approximately how many participants are you planning for?`,
            type: 'options',
            options: ['10-50', '50-100', '100-500', '500+']
          };
          setStep(2);
        }
      } else if (step === 2) {
        setPlanData({ ...planData, participants: content });
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Noted. For ${content} participants, would you prefer a domestic mountain retreat or an international beach destination?`,
          type: 'options',
          options: ['Domestic (Mountains)', 'Domestic (Beach)', 'International (SE Asia)', 'International (Europe)']
        };
        setStep(3);
      } else if (step === 3) {
        setPlanData({ ...planData, destination: content });
        if (isLeisure) {
          response = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Perfect. Based on your preferences, our EV Holidays Concierge Team will craft a personalized itinerary for you. What would you like us to include in your proposal?',
            type: 'multi-options',
            options: [
              'Luxury Resort Stay', 
              'Private Transfers', 
              'Guided Tours', 
              'Adventure Activities', 
              'Fine Dining', 
              'Spa & Wellness'
            ]
          };
        } else {
          response = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Perfect. Based on your requirements, our EV Holidays Corporate Concierge Team will craft a personalized proposal tailored specifically for your team experience. What would you like us to include in your proposal?',
            type: 'multi-options',
            options: [
              'Luxury Resort Stay', 
              'Team Building Activities', 
              'Conference Setup', 
              'Adventure Experience', 
              'Gala Dinner', 
              'Airport Transfers', 
              'Branding & Event Setup'
            ]
          };
        }
        setStep(4);
      } else if (step === 4) {
        setPlanData({ ...planData, inclusions: selectedMultiOptions });
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Excellent selections. Please share your contact details and our concierge team will prepare your customized proposal.',
          type: 'form'
        };
        setStep(5);
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I did not understand that. Could you please clarify?'
        };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleMultiSelect = (opt: string) => {
    setSelectedMultiOptions(prev => 
      prev.includes(opt) ? prev.filter(item => item !== opt) : [...prev, opt]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1].type = 'text'; // Hide form after submit
      }
      return [...newMessages, {
        id: Date.now().toString(),
        role: 'user',
        content: `Contact Details Submitted:\n${formData.name} (${formData.company})\n${formData.email} | ${formData.whatsapp}`
      }];
    });

    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Thank you. Your request has been securely forwarded to our elite concierge team. You will receive a bespoke proposal shortly. Welcome to the future of corporate travel.'
      }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-dark-sky relative overflow-hidden flex flex-col md:flex-row pt-24 pb-12 px-4 md:px-8 lg:px-16 gap-8 lg:gap-16">
      
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-gold-end/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
      </div>

      {/* Left Area: Cinematic Intro */}
      <div className="w-full md:w-5/12 lg:w-1/2 relative z-10 flex flex-col justify-center py-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-gold-end/30 bg-brand-gold-end/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-brand-gold-end" />
            <span className="text-brand-gold-end text-[10px] uppercase font-black tracking-[0.2em]">EV Holidays AI Concierge</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight text-glow">
            Design Your <br />
            <span className="italic text-brand-gold-end font-light">Masterpiece.</span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed mb-12">
            Experience the future of corporate travel. Our AI concierge learns your team's unique dynamic to orchestrate flawlessly executed, ultra-luxury journeys worldwide.
          </p>

          {/* Decorative Globe / Flight Paths */}
          <div className="relative w-full h-64 opacity-60">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-48 h-48 border border-white/5 rounded-full flex items-center justify-center"
            >
              <div className="w-32 h-32 border border-brand-gold-end/20 rounded-full flex items-center justify-center" />
            </motion.div>
            
            {/* Animated Flight Path */}
            <svg className="absolute top-10 left-10 w-full h-full overflow-visible" viewBox="0 0 200 100">
              <motion.path
                d="M 10 90 Q 80 10 180 50"
                fill="none"
                stroke="rgba(212,175,55,0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="180" cy="50" r="3"
                fill="#D4AF37"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
            
            <Plane className="absolute top-20 left-16 w-6 h-6 text-brand-gold-end/40 transform rotate-45 animate-pulse" />
            <MapPin className="absolute top-32 left-48 w-5 h-5 text-white/20" />
            <Globe2 className="absolute top-8 left-64 w-8 h-8 text-white/10" />
          </div>
        </motion.div>
      </div>

      {/* Right Area: Chat Window */}
      <div className="w-full md:w-7/12 lg:w-1/2 relative z-10 flex flex-col h-[80vh] min-h-[600px] max-h-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-brand-navy/60 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex-1 flex flex-col overflow-hidden relative"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Chat Header */}
          <div className="px-6 md:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-brand-navy/40 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-gold-end/20 group-hover:bg-brand-gold-end/40 transition-colors" />
                <Bot className="w-6 h-6 text-brand-gold-end relative z-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">EV Concierge AI</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-[10px] font-bold text-[#22c55e] uppercase tracking-[0.2em] leading-none">Online</span>
                </div>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-8 relative z-10 custom-scrollbar">
            {messages.map((msg, index) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "flex gap-4 w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-brand-gold-end/10 border border-brand-gold-end/20 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold-end" />
                  </div>
                )}

                <div className={cn("flex flex-col gap-3", msg.role === 'user' ? "items-end" : "items-start", "max-w-[85%]")}>
                  <div className={cn(
                    "p-4 md:p-5 rounded-[24px] text-sm md:text-[15px] leading-relaxed shadow-lg backdrop-blur-md border",
                    msg.role === 'assistant' 
                      ? "bg-white/5 border-white/10 text-white/90 rounded-tl-sm" 
                      : "bg-gradient-to-r from-[#0d4f05] to-[#146b0a] border-[#22c55e]/20 text-white rounded-tr-sm"
                  )}>
                    {msg.content}
                  </div>

                  {msg.type === 'options' && msg.options && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mt-1"
                    >
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSend(opt)}
                          className="px-5 py-2.5 rounded-full border border-white/10 text-[11px] md:text-xs font-bold tracking-wide text-white/80 bg-white/5 hover:border-brand-gold-end hover:bg-brand-gold-end/10 hover:text-brand-gold-end transition-all shadow-sm active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {msg.type === 'multi-options' && msg.options && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                      className="flex flex-col gap-4 mt-1 w-full"
                    >
                      <div className="flex flex-wrap gap-2">
                        {msg.options.map((opt) => {
                          const isSelected = selectedMultiOptions.includes(opt);
                          return (
                            <button
                              key={opt}
                              onClick={() => handleMultiSelect(opt)}
                              className={cn(
                                "px-4 py-2 rounded-full border text-[11px] font-bold tracking-wide transition-all shadow-sm active:scale-95 flex items-center gap-2",
                                isSelected 
                                  ? "bg-brand-gold-end border-brand-gold-end text-brand-navy"
                                  : "bg-white/5 border-white/10 text-white/80 hover:border-brand-gold-end/50 hover:bg-white/10"
                              )}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {selectedMultiOptions.length > 0 && (
                        <button 
                          onClick={() => handleSend('')}
                          className="self-end bg-brand-gold-end text-brand-navy px-6 py-2.5 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center gap-2"
                        >
                          Continue <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </motion.div>
                  )}

                  {msg.type === 'form' && !isFormSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 mt-2 backdrop-blur-md"
                    >
                      <h4 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-brand-gold-end" />
                        Request Personalized Proposal
                      </h4>
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold-end/50 focus:ring-1 focus:ring-brand-gold-end/50 transition-all" />
                          <input required type="text" placeholder="Company Name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold-end/50 focus:ring-1 focus:ring-brand-gold-end/50 transition-all" />
                          <input required type="email" placeholder="Work Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold-end/50 focus:ring-1 focus:ring-brand-gold-end/50 transition-all" />
                          <input required type="tel" placeholder="WhatsApp Number" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold-end/50 focus:ring-1 focus:ring-brand-gold-end/50 transition-all" />
                        </div>
                        <textarea placeholder="Any additional requirements or specific dates?" value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className="w-full bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold-end/50 focus:ring-1 focus:ring-brand-gold-end/50 transition-all min-h-[80px] resize-none" />
                        <button type="submit" className="w-full bg-brand-gold-end text-brand-navy py-3.5 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                          <Navigation className="w-4 h-4" />
                          Submit Request
                        </button>
                      </form>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 w-full justify-start">
                <div className="w-8 h-8 rounded-full bg-brand-gold-end/10 border border-brand-gold-end/20 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-end" />
                </div>
                <div className="bg-white/5 border border-white/10 p-4 px-5 rounded-[24px] rounded-tl-sm flex items-center gap-1.5 h-[50px]">
                  <div className="w-1.5 h-1.5 bg-brand-gold-end/60 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-brand-gold-end/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-brand-gold-end/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
            <div className="h-4" />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-brand-navy/80 border-t border-white/5 backdrop-blur-3xl relative z-10">
            <div className="relative flex items-center group">
              <input
                type="text"
                placeholder={step < 5 ? "Type your message..." : "Please submit the form above."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                disabled={step >= 4}
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 pr-14 focus:outline-none focus:border-brand-gold-end/50 focus:bg-white/10 transition-all text-sm font-medium text-white placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || step >= 4}
                className="absolute right-2 w-10 h-10 rounded-full bg-brand-gold-end flex items-center justify-center text-brand-navy hover:scale-105 active:scale-95 transition-all disabled:opacity-0 disabled:pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-[9px] font-bold text-white/30 uppercase tracking-widest">
              <span>Secure Connection</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>EV AI Engine v2.0</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
