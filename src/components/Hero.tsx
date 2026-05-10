import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Calendar, Users, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const HeroTabs = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/soul-destination');
    }, 1500);
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
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(46,204,113,0.3)] border border-[#2ECC71]/30">
                  <Sparkles className="w-8 h-8 text-[#2ECC71]" />
                </div>
                <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight drop-shadow-2xl font-light">
                  Aligning with your soul...
                </h2>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-4xl mx-auto mt-16 px-4">
        <div className="bg-white/10 backdrop-blur-2xl border border-[#2ECC71]/30 rounded-[3rem] p-3 flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 w-full">
          {/* Ambient Inner Glow Pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,204,113,0.1)_0%,transparent_70%)] pointer-events-none rounded-[3rem]" />
          
          {/* Interactive Search Input (Expanded to full width) */}
          <div 
            onClick={handleSearchClick}
            className="flex-1 bg-black/40 border border-[#2ECC71]/20 hover:border-[#2ECC71]/60 rounded-full px-8 py-5 flex items-center justify-between w-full group transition-all duration-700 cursor-pointer relative overflow-hidden hover:bg-[#2ECC71]/5"
          >
            <div className="flex items-center gap-4 relative z-10 w-full">
              <Search className="w-6 h-6 text-[#2ECC71] transition-transform duration-500 drop-shadow-[0_0_8px_rgba(46,204,113,0.5)]" />
              <span className="text-white font-medium tracking-wide transition-colors text-lg flex-1">
                Where should your next unforgettable story begin?
              </span>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-[#2ECC71] flex items-center justify-center shadow-[0_0_20px_rgba(46,204,113,0.5)] transition-all duration-700 relative z-10">
              <Sparkles className="w-5 h-5 text-[#010801]" />
            </div>
          </div>
        </div>

        {/* Elegant Static Microcopy */}
        <div className="mt-4 h-6 relative flex justify-center items-center overflow-hidden">
          <p className="absolute text-sm font-medium tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Know Your Soul's Destination
          </p>
        </div>
      </div>
    </>
  );
};

export const Hero = () => {
  const navigate = useNavigate();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);
  const fadeInterval = React.useRef<NodeJS.Timeout | null>(null);

  const fadeVolume = (targetVolume: number) => {
    if (!videoRef.current) return;
    
    if (fadeInterval.current) {
      clearInterval(fadeInterval.current);
    }

    const video = videoRef.current;
    const step = 0.05;
    const interval = 50;

    fadeInterval.current = setInterval(() => {
      if (Math.abs(video.volume - targetVolume) < step) {
        video.volume = targetVolume;
        if (targetVolume === 0) video.muted = true;
        clearInterval(fadeInterval.current!);
      } else {
        video.muted = false;
        video.volume += video.volume < targetVolume ? step : -step;
      }
    }, interval);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fadeVolume(1);
        } else {
          fadeVolume(0);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[110vh] w-full flex flex-col items-center justify-center pt-32 pb-40 px-6 overflow-hidden bg-brand-dark-sky text-center hero-gradient"
    >
      
      {/* Image Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
          style={{ opacity: 1 }}
        >
          <source src="/mainvideo.mp4" type="video/mp4" />
        </video>
        
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2ECC71]/30 bg-black/40 backdrop-blur-md mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">
              Trusted Travel Partner • Since Day One
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[92px] lg:text-[110px] font-normal leading-[0.85] tracking-[-0.04em] text-white">
            <span className="font-sans font-black block">See The</span>
            <span className="font-serif italic -mt-2 block">World,</span>
            <span className="font-sans font-extralight opacity-80 block tracking-tight">Your Way.</span>
          </h1>
        </div>
        
        <p 
          className="text-lg sm:text-xl max-w-3xl mt-10 leading-relaxed text-white font-sans font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          From the misty hills of Northeast India to the turquoise lagoons of the Maldives — EV Holidays crafts journeys that stay with you forever. Every detail. Every destination. Every dream.
        </p>

        <div 
          className="flex justify-center mt-12"
        >
          <button 
            onClick={() => navigate('/ai-planner')}
            className="bg-emerald-800 text-white rounded-full px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-emerald-700 hover:scale-[1.05] active:scale-95 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] border border-brand-gold-end flex items-center gap-3 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              PLAN WITH AI
              <Sparkles className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Integrated Hero Tabs */}
        <HeroTabs />
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-white">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};
