import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Calendar, Users, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const HeroTabs = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [microcopyIndex, setMicrocopyIndex] = useState(0);
  const navigate = useNavigate();
  
  const microcopies = [
    "Know Your Soul's Destination",
    "Reveal My Destination",
    "Discover My Escape",
    "Find My Matching Destination"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMicrocopyIndex((prev) => (prev + 1) % microcopies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/soul-destination');
    }, 1500); // Time to finish full-screen blur transition
  };

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#010801]/95 pointer-events-none flex flex-col items-center justify-center"
          >
             <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
               className="flex flex-col items-center"
             >
                <div className="w-16 h-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center mb-8 mx-auto animate-pulse shadow-[0_0_30px_rgba(46,204,113,0.3)] border border-[#2ECC71]/30">
                  <Sparkles className="w-8 h-8 text-[#2ECC71]" />
                </div>
                <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight drop-shadow-2xl font-light">
                  Aligning with your soul...
                </h2>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto mt-16 px-4"
      >
        <motion.div 
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/10 backdrop-blur-2xl border border-[#2ECC71]/30 rounded-[3rem] p-3 flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 w-full"
        >
          {/* Ambient Inner Glow Pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,204,113,0.1)_0%,transparent_70%)] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none rounded-[3rem]" />
          
          {/* Interactive Search Input (Expanded to full width) */}
          <motion.div 
            onClick={handleSearchClick}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="flex-1 bg-black/40 border border-[#2ECC71]/20 hover:border-[#2ECC71]/60 rounded-full px-8 py-5 flex items-center justify-between w-full group transition-all duration-700 cursor-pointer relative overflow-hidden shadow-[0_0_0_rgba(46,204,113,0)] hover:shadow-[0_0_40px_rgba(46,204,113,0.3)] hover:bg-[#2ECC71]/5"
          >
            {/* Elegant organic motion loop / Energy reflection */}
            <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-[#2ECC71]/10 to-transparent group-hover:animate-[spin_8s_linear_infinite] transition-transform duration-1000 ease-in-out pointer-events-none opacity-0 group-hover:opacity-100" />
            
            {/* Glass sweep reflection effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[sweep_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Faint drifting particles */}
            <div className="absolute inset-0 group-hover:opacity-100 opacity-0 transition-opacity duration-700 pointer-events-none overflow-hidden z-0">
              <motion.div className="absolute top-[20%] left-[10%] w-1 h-1 bg-[#2ECC71] rounded-full blur-[1px]" animate={{ y: [-5, 5, -5], opacity: [0, 0.8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="absolute bottom-[20%] right-[30%] w-1.5 h-1.5 bg-[#2ECC71]/70 rounded-full blur-[1px]" animate={{ y: [5, -5, 5], opacity: [0, 0.6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
              <motion.div className="absolute top-[50%] left-[60%] w-1 h-1 bg-white/50 rounded-full" animate={{ y: [-3, 3, -3], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
            </div>

            <div className="flex items-center gap-4 relative z-10 w-full">
              <Search className="w-6 h-6 text-[#2ECC71] group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(46,204,113,0.5)]" />
              <span className="text-white/60 font-medium tracking-wide group-hover:text-white/90 transition-colors text-lg flex-1">
                Where should your next unforgettable story begin?
              </span>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-[#2ECC71] flex items-center justify-center shadow-[0_0_20px_rgba(46,204,113,0.5)] group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700 relative z-10 animate-[pulse_3s_ease-in-out_infinite]">
              <Sparkles className="w-5 h-5 text-[#010801]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Elegant Rotating Microcopy */}
        <div className="mt-4 h-6 relative flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={microcopyIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute text-sm font-medium tracking-widest text-[#2ECC71]/90 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              {microcopies[microcopyIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[110vh] w-full flex flex-col items-center justify-center pt-32 pb-40 px-6 overflow-hidden bg-brand-dark-sky text-center hero-gradient">
      
      {/* Image Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
          alt="Snow Capped Mountains"
          className="w-full h-full object-cover"
        />
        
        {/* Subtle Gradient Overlays for Readability without darkening the video too much */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2ECC71]/30 bg-black/40 backdrop-blur-md mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
            <span className="text-[#2ECC71] font-bold uppercase tracking-[0.2em] text-[10px]">
              Trusted Travel Partner • Since Day One
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[92px] lg:text-[110px] font-normal leading-[0.85] tracking-[-0.04em] text-white">
            <span className="font-sans font-black block">See The</span>
            <span className="font-serif italic -mt-2 block">World,</span>
            <span className="font-sans font-extralight opacity-80 block tracking-tight">Your Way.</span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl max-w-3xl mt-10 leading-relaxed text-[#2ECC71] font-sans font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          From the misty hills of Northeast India to the turquoise lagoons of the Maldives — EV Holidays crafts journeys that stay with you forever. Every detail. Every destination. Every dream.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-12"
        >
          <button 
            onClick={() => navigate('/ai-planner')}
            className="bg-[#2ECC71] text-[#010801] rounded-full px-12 py-5 text-sm font-black uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-[0_0_30px_rgba(46,204,113,0.3)] flex items-center gap-3 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              PLAN WITH AI
              <Sparkles className="w-4 h-4" />
            </span>
          </button>
        </motion.div>

        {/* Integrated Hero Tabs */}
        <HeroTabs />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-white">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};
