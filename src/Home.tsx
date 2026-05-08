/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate } from 'motion/react';
import { 
  Plane, 
  Users, 
  MapPin, 
  Calendar, 
  ChevronRight,
  ChevronDown,
  Phone, 
  Mail, 
  Globe, 
  Award, 
  ShieldCheck, 
  Clock, 
  Briefcase, 
  Gift, 
  Presentation, 
  Palmtree, 
  Menu, 
  X,
  Star,
  Quote,
  Building2,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Target,
  FileCheck,
  Send,
  Handshake,
  Moon,
  Gem,
  Repeat,
  Sparkles,
  Map,
  Compass,
  Headphones,
  CreditCard,
  Heart
} from 'lucide-react';
import { cn } from './lib/utils';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { BespokeServiceCard } from './components/BespokeServiceCard';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// --- Components ---

// --- Proposal Modal Component ---
const ProposalModal = ({ isOpen, onClose, initialData }: { isOpen: boolean; onClose: () => void; initialData?: any }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const subject = `Custom Proposal Request: ${data.company || 'Company'}`;
    const body = `New Proposal Request from EV Holidays

Company Name: ${data.company || 'Not provided'}
Group Size: ${data.groupSize || 'Not provided'}
Preferred Destination: ${data.destination || 'Not provided'}
Work Email: ${data.email || 'Not provided'}
Contact Number: ${data.phone || 'Not provided'}

Additional Requirements:
${data.requirements || 'None provided'}`;

    window.location.href = `mailto:planner@evholidays.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-navy/90 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full bg-gray-50 text-brand-navy hover:bg-gray-100 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div className="p-10 md:p-16">
              <div className="mb-10 text-center">
                <span className="text-brand-navy/40 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block text-brand-navy">Request a Custom Proposal</span>
                <h2 className="text-3xl md:text-4xl font-serif text-brand-navy">Elevate Your Team's Journey</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60 flex items-center gap-2">
                      <Building2 className="w-3 h-3 text-brand-gold-end" />
                      Company Name
                    </label>
                    <input 
                      required
                      name="company"
                      type="text" 
                      placeholder="e.g. Global Tech Solutions"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold-end/30 transition-all text-sm font-medium text-brand-navy"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60 flex items-center gap-2">
                      <Users className="w-3 h-3 text-brand-gold-end" />
                      Group Size
                    </label>
                    <select name="groupSize" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold-end/30 transition-all text-sm font-medium appearance-none text-brand-navy">
                      <option>10 - 25 Participants</option>
                      <option>25 - 50 Participants</option>
                      <option>50 - 100 Participants</option>
                      <option>100+ Participants</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-brand-gold-end" />
                    Preferred Destination
                  </label>
                  <input 
                    name="destination"
                    type="text" 
                    defaultValue={initialData?.destination || ''}
                    placeholder="e.g. Vietnam, Bali, or Europe"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold-end/30 transition-all text-sm font-medium text-brand-navy"
                  />
                </div>
                {/* Additional requirements field if initialData is provided */}
                {initialData?.requirements && (
                   <input type="hidden" name="requirements" value={initialData.requirements} />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60 flex items-center gap-2">
                      <Mail className="w-3 h-3 text-brand-gold-end" />
                      Work Email
                    </label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold-end/30 transition-all text-sm font-medium text-brand-navy"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60 flex items-center gap-2">
                      <Phone className="w-3 h-3 text-brand-gold-end" />
                      Contact Number
                    </label>
                    <input 
                      required
                      name="phone"
                      type="tel" 
                      placeholder="+91 999 999 9999"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-gold-end/30 transition-all text-sm font-medium text-brand-navy"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-brand-navy text-brand-gold-end py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-navy/20 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-brand-gold-end/30 border-t-brand-gold-end rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Request
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          ) : (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-brand-gold-end/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-brand-gold-end" />
              </div>
              <h2 className="text-3xl font-serif text-brand-navy mb-4">Request Received</h2>
              <p className="text-gray-500 font-medium mb-10">
                Thank you for choosing EV Holidays. One of our corporate travel specialists will review your requirements and reach out within 24 hours.
              </p>
              <button 
                onClick={onClose}
                className="bg-brand-navy text-white px-12 py-4 rounded-2xl font-bold text-sm shadow-xl"
              >
                Return to Site
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Testimonials Carousel Component ---
const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const testimonials = [
    {
      name: "Vikram Sharma",
      role: "Digital Nomad",
      destination: "Bali, Indonesia",
      category: "Solo",
      categoryColor: "bg-[#146b0a]",
      comment: "As a solo traveler, I appreciate the safety and curated local experiences EV Holidays provided. It felt truly personalized and authentic.",
      avatar: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Rahul Mehta",
      role: "Corporate Strategy Head",
      destination: "Global Tech Solutions",
      category: "Corporate",
      categoryColor: "bg-[#146b0a]",
      comment: "EV Holidays transformed our annual retreat into a seamless experience. Every detail from logistics to luxury stays was handled with precision and care.",
      avatar: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Priya Patel",
      role: "HR Director",
      destination: "Global Tech",
      category: "Retreat",
      categoryColor: "bg-[#146b0a]",
      comment: "The team retreat in Vietnam was flawlessly organized. Every detail from the luxury stay to the team-building activities was perfect.",
      avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const item = testimonials[index];

  return (
    <div className="max-w-6xl mx-auto relative px-4 md:px-12 lg:px-20">
      <div className="relative py-12 min-h-[450px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-10"
          >
            <div className="bg-[#021a02]/40 backdrop-blur-3xl border border-[#146b0a]/30 p-10 md:p-16 lg:p-20 rounded-[3rem] md:rounded-[4rem] relative shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center md:items-start gap-12 group hover:shadow-[0_40px_80px_rgba(20,107,10,0.2)] transition-shadow duration-700">
              
              {/* Subtle animated border highlight */}
              <div className="absolute inset-0 rounded-[3rem] md:rounded-[4rem] border border-white/5 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#146b0a]/10 to-transparent rounded-[3rem] md:rounded-[4rem] pointer-events-none opacity-50" />

              {/* Avatar with Badge */}
              <div className="relative shrink-0 z-20">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#146b0a]/50 shadow-[0_0_30px_rgba(20,107,10,0.3)]"
                >
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover transition-all duration-700" referrerPolicy="no-referrer" />
                </motion.div>
                <div className={cn(
                  "absolute -bottom-4 right-4 px-6 py-2 rounded-full shadow-2xl border border-white/20",
                  item.categoryColor
                )}>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white drop-shadow-md">{item.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left relative z-20 pt-4">
                <div className="flex justify-center md:justify-start gap-1.5 mb-8">
                  {[...Array(5)].map((_, star) => (
                    <Star key={star} className="w-5 h-5 md:w-6 md:h-6 fill-[#146b0a] text-[#146b0a] drop-shadow-[0_0_8px_rgba(20,107,10,0.6)]" />
                  ))}
                </div>
                
                <h3 className="text-2xl md:text-4xl text-white/95 leading-relaxed font-serif italic mb-12 relative tracking-wide">
                  &ldquo;{item.comment}&rdquo;
                  <Quote className="absolute -top-12 -left-6 md:-left-12 w-32 h-32 text-[#146b0a]/10 pointer-events-none" />
                </h3>

                <div className="space-y-3 pt-8 border-t border-white/10">
                  <h4 className="text-white font-sans font-bold text-xl md:text-2xl tracking-tight uppercase">{item.name}</h4>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                    <span className="text-[#146b0a] text-[11px] font-black uppercase tracking-[0.2em]">{item.role}</span>
                    <span className="text-white/20 text-xs font-light">|</span>
                    <span className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em]">{item.destination}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button 
          onClick={prev}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 hover:bg-[#146b0a] text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#146b0a] z-30 backdrop-blur-md shadow-xl"
        >
          <ChevronRight className="w-6 h-6 rotate-180 transition-transform" />
        </button>
        <button 
          onClick={next}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 hover:bg-[#146b0a] text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#146b0a] z-30 backdrop-blur-md shadow-xl"
        >
          <ChevronRight className="w-6 h-6 transition-transform" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "transition-all duration-500 rounded-full",
              i === index ? "w-12 h-1.5 bg-[#146b0a] shadow-[0_0_10px_rgba(20,107,10,0.5)]" : "w-2 h-1.5 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// --- Search Bar Tab Component ---
const HeroTabs = () => {
  const [activeTab, setActiveTab] = useState("Retreats");
  const tabs = ["Retreats", "Incentives", "Events"];

  return (
    <div className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-40 flex justify-center">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        className="w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-4 shadow-xl"
      >
        {/* Left Side: Mock Search Input */}
        <div className="flex-1 bg-white/80 border border-black/5 rounded-full px-6 py-4 flex items-center justify-between w-full shadow-inner">
           <span className="text-brand-dark-sky/60 font-medium tracking-wide">Where to next?</span>
           <div className="w-8 h-8 rounded-full bg-brand-gold-end flex items-center justify-center shadow">
             <MapPin className="w-4 h-4 text-brand-navy" />
           </div>
        </div>

        {/* Right Side: Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-3 rounded-full font-bold transition-all duration-300 text-sm tracking-wide",
                activeTab === tab 
                  ? "bg-brand-dark-sky text-white shadow-md" 
                  : "text-brand-dark-sky/70 hover:bg-black/5"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const WhoWeAreSection = () => {
  const tags = [
    { label: "Domestic India", icon: <Globe className="w-3.5 h-3.5" /> },
    { label: "Southeast Asia", icon: <Plane className="w-3.5 h-3.5" /> },
    { label: "Island Escapes", icon: <Palmtree className="w-3.5 h-3.5" /> },
    { label: "Corporate Travel", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { label: "Women's Tours", icon: <Users className="w-3.5 h-3.5" /> },
    { label: "Family Packages", icon: <Users className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-[#0a1a0a]">
      {/* Background with dense foliage */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-20 scale-110" 
          alt="Jungle Background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a0a] via-[#0a1a0a]/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Cinematic Visuals */}
          <div className="relative group">
            {/* Main Visual Frame */}
            <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=1200" 
                alt="Longtail Boat Travel" 
                className="w-full h-full object-cover brightness-[0.7] contrast-110 group-hover:scale-105 transition-transform duration-[6s] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0a]/90 via-[#0a1a0a]/30 to-transparent" />
              <div className="absolute inset-0 bg-brand-navy/20 mix-blend-overlay" />
              
              {/* Pin point and line removed as per request */}
            </div>

            {/* Floating Stats Cards */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ delay: 0.2, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -top-10 left-4 lg:-left-8 bg-[#2a3224]/85 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl min-w-[180px] text-center z-20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="text-4xl font-black text-[#4ade80] mb-2 tracking-tighter drop-shadow-sm">1500+</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Trips Completed</div>
            </motion.div>

            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ delay: 0.4, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute top-1/2 -right-6 lg:-right-12 -translate-y-1/2 bg-[#2a3224]/85 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl min-w-[180px] text-center z-20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="text-4xl font-black text-[#4ade80] mb-2 tracking-tighter drop-shadow-sm">100%</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Personalised</div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ delay: 0.6, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -bottom-10 -left-6 bg-[#2a3224]/85 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl min-w-[180px] text-center z-20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="text-4xl font-black text-[#4ade80] mb-2 tracking-tighter drop-shadow-sm">500+</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Happy Customers</div>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="relative">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#22c55e]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#22c55e]">Who We Are</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10 text-white">
              We Don't Sell Tours.<br />
              We Create <span className="font-script text-[#22c55e] italic font-normal normal-case">Memories.</span>
            </h2>
            
            <div className="space-y-6 text-white/70 text-lg leading-relaxed max-w-xl mb-12">
              <p>
                EV Holidays Private Limited is a professionally registered travel agency born from a deep love for exploration and a heartfelt commitment to every traveller we serve. We are not just an agency — <strong className="text-white font-bold">we are your journey partners.</strong>
              </p>
              <p>
                With over <strong className="text-white font-bold">1,500 trips</strong> arranged for more than <strong className="text-white font-bold">500+ happy customers</strong>, we bring meticulous planning, strong hospitality networks, and genuine personal care to every single adventure — domestic or international.
              </p>
            </div>

            {/* Tags Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tags.map((tag, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                  className="px-5 py-4 rounded-full bg-white/5 border border-white/10 flex items-center gap-3 transition-colors cursor-default"
                >
                  <span className="text-[#22c55e]">{tag.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{tag.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const BenefitSection = () => {
  const benefits = [
    {
      id: "01",
      title: "End-to-End Planning",
      desc: "Flights, hotels, transport, sightseeing — every single detail handled so you travel completely worry-free.",
      icon: <Target className="w-10 h-10 text-rose-400" />,
      tag: "🎯"
    },
    {
      id: "02",
      title: "Personalised Itineraries",
      desc: "No two trips are the same. Every journey is crafted around your preferences, budget, pace, and dreams.",
      icon: <Sparkles className="w-10 h-10 text-brand-gold-end" />,
      tag: "👏"
    },
    {
      id: "03",
      title: "24/7 On-Trip Support",
      desc: "With you every step of the way — day and night — ensuring your journey is smooth, safe, and memorable.",
      icon: <Moon className="w-10 h-10 text-amber-200" />,
      tag: "🌙"
    },
    {
      id: "04",
      title: "Trusted Partnerships",
      desc: "Strong tie-ups with premium hotels, airlines, and local operators across every destination we serve.",
      icon: <Handshake className="w-10 h-10 text-yellow-400" />,
      tag: "🤝"
    },
    {
      id: "05",
      title: "Transparent Pricing",
      desc: "No hidden charges, no surprises. Crystal-clear quotes and honest communication — always.",
      icon: <Gem className="w-10 h-10 text-sky-400" />,
      tag: "💎"
    },
    {
      id: "06",
      title: "High Repeat Rate",
      desc: "Our proudest metric — travellers who trust us again and again with their most precious holidays.",
      icon: <Repeat className="w-10 h-10 text-blue-400" />,
      tag: "🔄"
    }
  ];

  return (
    <section className="bg-[#021a02] py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 relative group hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-4xl">{item.tag}</span>
                <span className="text-5xl font-black text-white/5 group-hover:text-brand-gold-end/10 transition-colors duration-500">{item.id}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-white/60 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DestinationAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const destinations = [
    {
      name: "Taj Mahal",
      location: "Agra, India",
      img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200",
      desc: "Experience the eternal symbol of love and architectural perfection."
    },
    {
      name: "Tiger's Nest",
      location: "Paro, Bhutan",
      img: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1200",
      desc: "A sacred monastery perched dramatically on a cliffside."
    },
    {
      name: "Vietnam",
      location: "Southeast Asia",
      img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200",
      desc: "Sail through the limestone karsts of Ha Long Bay and explore the ancient charm of Hoi An."
    },
    {
      name: "Ubud",
      location: "Bali, Indonesia",
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
      desc: "Rejuvenate amidst lush terraced rice fields and Balinese spirit."
    },
    {
       name: "Everest Base Camp",
       location: "Solukhumbu, Nepal",
       img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200",
       desc: "The ultimate trek to the foot of the world's highest peak."
    }
  ];

  return (
    <section id="destinations-accordion" className="py-24 md:py-32 overflow-hidden relative w-full">
      {/* Premium Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          <source src="/video123.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay with emerald glow & vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010801] via-transparent to-[#010801]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010801] via-transparent to-[#010801] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,107,10,0.15)_0%,rgba(1,8,1,0.9)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        <div className="noise opacity-20 pointer-events-none mix-blend-overlay absolute inset-0" />
      </div>
      
      <div className="w-full px-6 md:px-12 lg:px-20 mb-16 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-0">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-[#146b0a]" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#146b0a] drop-shadow-[0_0_10px_rgba(20,107,10,0.3)]">Curated Escapes</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[0.9] drop-shadow-xl">
                Define the Destination.<br />
                <span className="font-serif italic serif gold-text font-normal text-3xl md:text-5xl lg:text-6xl block mt-4 drop-shadow-2xl">EV Holidays Will Craft the Experience.</span>
              </h2>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/destinations" 
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-500 backdrop-blur-md group shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(20,107,10,0.3)]"
              >
                View All Destinations
                <ArrowRight className="w-4 h-4 text-[#146b0a] group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row h-[700px] lg:h-[650px] gap-2 md:gap-3 w-full px-2 md:px-4 relative z-10">
        {destinations.map((dest, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{ 
              flex: expandedIndex === idx ? 4 : 1,
              transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
            }}
            onMouseEnter={() => setExpandedIndex(idx)}
            className="relative h-full rounded-[2rem] overflow-hidden cursor-pointer group border border-white/5 hover:border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(20,107,10,0.25)] transition-all duration-500"
          >
            <img 
              src={dest.img} 
              alt={dest.name} 
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.1,0.25,1)] brightness-[0.65] contrast-110 saturate-[0.85]",
                expandedIndex === idx ? "scale-105" : "scale-125 group-hover:scale-115"
              )}
              referrerPolicy="no-referrer"
            />
            <div className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              expandedIndex === idx ? "bg-gradient-to-t from-black/95 via-black/40 to-black/10" : "bg-black/70 group-hover:bg-black/50"
            )} />

            {/* Vertical Title (when collapsed) */}
            <AnimatePresence>
              {expandedIndex !== idx && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                   <span className="text-white/70 font-black uppercase tracking-[0.6em] text-[10px] [writing-mode:vertical-lr] rotate-180 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                     {dest.name}
                   </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded Content */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 flex flex-col items-start overflow-hidden pointer-events-none">
               <motion.div
                 animate={{ 
                   y: expandedIndex === idx ? 0 : 40,
                   opacity: expandedIndex === idx ? 1 : 0
                 }}
                 transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                 className="space-y-6"
               >
                 <div className="bg-[#146b0a]/90 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-block shadow-[0_8px_16px_rgba(20,107,10,0.4)] border border-white/10">
                    {dest.location}
                 </div>
                 <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">{dest.name}</h3>
                 <p className="text-white/90 max-w-sm text-base leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">{dest.desc}</p>
               </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [proposalInitialData, setProposalInitialData] = useState<any>(null);

  useEffect(() => {
    // Check if we navigated here with the openProposal flag
    const params = new URLSearchParams(location.search);
    if (params.get('openProposal') === 'true') {
      setIsProposalModalOpen(true);
      if (location.state) {
        setProposalInitialData(location.state);
      }
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Also scroll to the CTA section if hash is present
      if (location.hash === '#request-proposal') {
        const el = document.getElementById('request-proposal');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-brand-gold-end selection:text-white relative bg-brand-dark-sky">
      <div className="noise" />
      <Navbar />
      <Hero />
      
      <ProposalModal isOpen={isProposalModalOpen} onClose={() => setIsProposalModalOpen(false)} />

      <WhoWeAreSection />
      <DestinationAccordion />

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 relative overflow-hidden border-y border-white/5 bg-[#010801]">
        {/* Cinematic Corporate Travel Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-80 blur-[6px] scale-105" 
            alt="Bright Waterscape Background" 
            referrerPolicy="no-referrer" 
          />
          {/* Lighter gradient overlay to keep it bright while maintaining text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#010801]/90 via-[#010801]/30 to-[#010801]/95" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#146b0a] font-bold uppercase tracking-[0.2em] text-[11px] mb-4 block drop-shadow-lg"
            >
              OUR EXPERTISE
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-[44px] leading-tight font-extrabold mb-6 tracking-tight text-white drop-shadow-2xl"
            >
              Bespoke Solutions for Every<br/>Corporate Need
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "01", icon: Map, title: "End-to-End Planning", path: "#", desc: "Flights, hotels, transport, sightseeing — every single detail handled so you travel completely worry-free." },
              { id: "02", icon: Compass, title: "Personalised Itineraries", path: "#", desc: "No two trips are the same. Every journey is crafted around your preferences, budget, pace, and dreams." },
              { id: "03", icon: Headphones, title: "24/7 On-Trip Support", path: "#", desc: "With you every step of the way — day and night — ensuring your journey is smooth, safe, and memorable." },
              { id: "04", icon: Building2, title: "Trusted Partnerships", path: "#", desc: "Strong tie-ups with premium hotels, airlines, and local operators across every destination we serve." },
              { id: "05", icon: CreditCard, title: "Transparent Pricing", path: "#", desc: "No hidden charges, no surprises. Crystal-clear quotes and honest communication — always." },
              { id: "06", icon: Heart, title: "High Repeat Rate", path: "#", desc: "Our proudest metric — travellers who trust us again and again with their most precious holidays." }
            ].map((service, idx) => (
              <BespokeServiceCard 
                key={idx}
                id={service.id}
                title={service.title}
                desc={service.desc}
                path={service.path}
                icon={service.icon}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>




      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-40 relative overflow-hidden bg-[#010801]">
        {/* Cinematic Layered Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic forest lake night ambience" 
            className="w-full h-full object-cover opacity-50 scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Depth Fog and Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#010801] via-[#021a02]/60 to-[#010801] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010801] via-transparent to-transparent opacity-90" />
          {/* Elegant emerald glow diffusion */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,107,10,0.2)_0%,transparent_60%)] pointer-events-none" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#146b0a] font-black uppercase tracking-[0.4em] text-[11px] mb-6 block drop-shadow-lg"
            >
              CLIENT EXPERIENCES
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl"
            >
              Stories of <span className="font-serif italic text-[#146b0a] font-normal px-2 relative inline-block">
                Meaningful
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#146b0a] origin-left rounded-full shadow-[0_0_15px_rgba(20,107,10,0.8)]"
                />
              </span> Journeys
            </motion.h2>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section id="request-proposal" className="py-40 relative overflow-hidden bg-[#010801]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=2000" 
            alt="Seashore aerial view" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#010801]/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010801] via-transparent to-[#010801]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(20,107,10,0.15)_0%,transparent_70%)] pointer-events-none" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="container mx-auto max-w-7xl px-6 relative z-10"
        >
          <div className="bg-gradient-to-b from-[#021a02]/80 to-[#010801]/90 backdrop-blur-3xl rounded-[4rem] md:rounded-[5rem] p-16 md:p-24 relative overflow-hidden text-center border border-[#146b0a]/30 shadow-[0_0_80px_rgba(20,107,10,0.15)]">
            {/* Elegant lighting glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,107,10,0.2)_0%,transparent_60%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-10 leading-[1.1] tracking-tight">
                Ready to <span className="text-[#146b0a] font-serif italic font-normal">Elevate</span> Your<br/>Team's Journey?
              </h2>
              <p className="text-white/70 text-xl md:text-2xl mb-14 font-medium leading-relaxed max-w-3xl mx-auto">
                From executive retreats to global incentive experiences, EV Holidays curates journeys designed to inspire teams, strengthen connections, and create lasting memories.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProposalModalOpen(true)}
                  className="bg-[#146b0a] hover:bg-[#115a08] text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm flex items-center gap-4 shadow-[0_0_30px_rgba(20,107,10,0.4)] transition-all duration-300 group overflow-hidden relative"
                >
                  <span className="relative z-10">Request Proposal</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <ProposalModal 
        isOpen={isProposalModalOpen} 
        onClose={() => setIsProposalModalOpen(false)} 
        initialData={proposalInitialData}
      />
      <Footer />
    </div>
  );
}
