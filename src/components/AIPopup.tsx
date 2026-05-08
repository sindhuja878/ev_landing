import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Plane, ArrowRight, MessageCircle, Navigation, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const questions = [
  {
    id: 1,
    title: "What scenery attracts you the most?",
    options: [
      { label: "Beaches", emoji: "🌊", tags: ["beach", "water"] },
      { label: "Mountains", emoji: "🏔️", tags: ["mountain", "nature"] },
      { label: "Forests", emoji: "🌿", tags: ["nature", "wildlife"] },
      { label: "Cities", emoji: "🌆", tags: ["city", "culture"] },
    ]
  },
  {
    id: 2,
    title: "What type of trip do you prefer?",
    options: [
      { label: "Relaxation", emoji: "😌", tags: ["relax"] },
      { label: "Adventure", emoji: "🧗", tags: ["adventure"] },
      { label: "Luxury", emoji: "💎", tags: ["luxury"] },
      { label: "Cultural Exploration", emoji: "🎭", tags: ["culture"] },
    ]
  },
  {
    id: 3,
    title: "What's your ideal travel vibe?",
    options: [
      { label: "Peaceful Escape", emoji: "🌴", tags: ["relax", "nature"] },
      { label: "Vibrant & Fun", emoji: "🎉", tags: ["city"] },
      { label: "Romantic", emoji: "❤️", tags: ["romance", "luxury"] },
      { label: "Explorative", emoji: "🧭", tags: ["adventure", "culture"] },
    ]
  },
  {
    id: 4,
    title: "How long would your dream vacation be?",
    options: [
      { label: "Weekend Trip", emoji: "⏳", tags: ["short"] },
      { label: "5–7 Days", emoji: "📅", tags: ["medium"] },
      { label: "10+ Days", emoji: "🗓️", tags: ["long"] },
      { label: "Long Escape", emoji: "∞", tags: ["long"] },
    ]
  },
  {
    id: 5,
    title: "Who are you traveling with?",
    options: [
      { label: "Solo Explorer", emoji: "🚶", tags: ["solo"] },
      { label: "Couple", emoji: "💑", tags: ["couple", "romance"] },
      { label: "Family", emoji: "👨‍👩‍👧‍👦", tags: ["family"] },
      { label: "Friends Group", emoji: "👯‍♂️", tags: ["friends", "fun"] },
    ]
  }
];

const getRecommendation = (tags: string[]) => {
  const has = (tag: string) => tags.includes(tag);

  if (has("beach") && has("luxury") && has("romance")) {
    return {
      title: "Maldives",
      desc: "Overwater villas, infinite turquoise, world's finest coral reefs and pure serenity.",
      image: "https://loremflickr.com/1200/800/maldives,luxury",
      bestTime: "November – April",
      tags: ["Luxury", "Relaxation", "Romance"]
    };
  }
  if (has("mountain") && has("adventure")) {
    return {
      title: "Bhutan",
      desc: "The world's last Shangri-La — Tiger's Nest, mountain peaks and pure Himalayan serenity.",
      image: "https://loremflickr.com/1200/800/bhutan,mountain",
      bestTime: "March – May & September – November",
      tags: ["Mountains", "Adventure", "Culture"]
    };
  }
  if (has("culture") && has("city")) {
    return {
      title: "Singapore",
      desc: "Marina Bay Sands, Gardens by the Bay, Sentosa — Asia's food and culture capital.",
      image: "https://loremflickr.com/1200/800/singapore,city",
      bestTime: "February – April",
      tags: ["City", "Culture", "Luxury"]
    };
  }
  if (has("relax") && has("nature")) {
    return {
      title: "Lakshadweep Islands",
      desc: "India's most exclusive island destination — untouched lagoons and pristine reefs.",
      image: "https://loremflickr.com/1200/800/lakshadweep,island",
      bestTime: "October – Mid May",
      tags: ["Nature", "Relaxation", "Exclusive"]
    };
  }
  
  // Default fallback
  return {
    title: "Bali, Indonesia",
    desc: "Tropical sunsets, spiritual beauty, luxury resorts, and unforgettable experiences await you.",
    image: "https://loremflickr.com/1200/800/bali,resort",
    bestTime: "April – October",
    tags: ["Nature", "Culture", "Relaxation"]
  };
};

const rewards = [
  "₹1000 OFF Your Booking",
  "Free Airport Pickup",
  "Complimentary Consultation",
  "Honeymoon Surprise Package",
  "Early Booking Deal"
];

export const AIPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0); // 0 = welcome, 1-5 = questions, 6 = result
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [reward, setReward] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const isCompleted = sessionStorage.getItem('ev_ai_popup_completed');
    const isDismissed = sessionStorage.getItem('ev_ai_popup_dismissed');

    if (!isCompleted && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('ev_ai_popup_dismissed', 'true');
  };

  const handleComplete = () => {
    setIsVisible(false);
    sessionStorage.setItem('ev_ai_popup_completed', 'true');
  };

  const handleOptionSelect = (tags: string[]) => {
    setSelectedTags(prev => [...prev, ...tags]);
    
    if (step < questions.length) {
      setStep(prev => prev + 1);
    } else {
      // Process result
      setIsProcessing(true);
      setStep(6);
      setTimeout(() => {
        setRecommendation(getRecommendation([...selectedTags, ...tags]));
        setReward(rewards[Math.floor(Math.random() * rewards.length)]);
        setIsProcessing(false);
      }, 2000); // Simulate AI thinking
    }
  };

  const handleStart = () => {
    setStep(1);
  };

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-brand-dark-sky/60 backdrop-blur-xl"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-brand-navy/90 border border-white/10 rounded-[28px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Internal Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.15),_transparent_70%)] pointer-events-none" />

          {/* Content Area */}
          <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
            
            {/* Step 0: Welcome */}
            {step === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-brand-gold-end/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-gold-end/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <Sparkles className="w-8 h-8 text-brand-gold-end" />
                </div>
                <h2 className="text-3xl font-serif text-white mb-4">Discover Your Perfect Escape</h2>
                <p className="text-white/60 text-sm mb-10 leading-relaxed font-medium">
                  Answer a few questions and let EV Holidays recommend your dream destination. Experience the luxury of a personalized concierge.
                </p>
                <button
                  onClick={handleStart}
                  className="bg-brand-gold-end text-brand-navy px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3 w-full sm:w-auto mx-auto group"
                >
                  Start Discovery
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* Steps 1-5: Questions */}
            {step > 0 && step <= questions.length && (
              <div className="w-full h-full flex flex-col">
                <div className="mb-8">
                  {/* Progress Bar */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-end">
                      Question {step} of {questions.length}
                    </span>
                    <span className="text-white/40 text-[10px] font-bold">EV AI Concierge</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(step / questions.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-brand-gold-end shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex-1 flex flex-col justify-center"
                  >
                    <h3 className="text-2xl font-serif text-white mb-8 text-center">
                      {questions[step - 1].title}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {questions[step - 1].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(opt.tags)}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold-end/50 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] active:scale-[0.98]"
                        >
                          <span className="text-3xl bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">{opt.emoji}</span>
                          <span className="text-white/80 font-medium text-sm group-hover:text-white">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Step 6: Processing / Result */}
            {step === 6 && (
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="relative w-20 h-20 mb-8">
                      <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-brand-gold-end border-t-transparent rounded-full"
                      />
                      <Plane className="absolute inset-0 m-auto w-6 h-6 text-brand-gold-end" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-2 animate-pulse">Crafting your perfect escape...</h3>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase font-bold">EV AI Engine Analyzing</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full flex flex-col"
                  >
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold-end mb-2 block drop-shadow-md">🌍 Your Perfect Escape</span>
                      <h2 className="text-4xl font-serif text-white flex items-center justify-center gap-3 drop-shadow-lg">
                        <Sparkles className="w-6 h-6 text-brand-gold-end" />
                        {recommendation.title}
                      </h2>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden mb-6 group border border-white/10 shadow-2xl">
                      <img 
                        src={recommendation.image} 
                        alt={recommendation.title} 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-[3s]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white/90 text-sm font-medium leading-relaxed drop-shadow-md">
                          "{recommendation.desc}"
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Best Time</span>
                        <span className="text-white text-xs font-medium">{recommendation.bestTime}</span>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Perfect For</span>
                        <div className="flex gap-1 flex-wrap">
                          {recommendation.tags.map((t: string) => (
                            <span key={t} className="text-[#22c55e] text-[9px] font-bold uppercase tracking-wide">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bonus Reward */}
                    <div className="bg-gradient-to-r from-brand-gold-end/10 to-transparent border border-brand-gold-end/20 rounded-xl p-4 mb-8 flex items-center gap-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-end/10 blur-2xl rounded-full pointer-events-none" />
                      <Award className="w-8 h-8 text-brand-gold-end flex-shrink-0" />
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold-end block mb-1">Unlocked Bonus</span>
                        <span className="text-white text-sm font-bold">{reward}</span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => { window.location.href = '/#contact'; handleComplete(); }}
                        className="flex-1 bg-brand-gold-end text-brand-navy py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Request Proposal
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
