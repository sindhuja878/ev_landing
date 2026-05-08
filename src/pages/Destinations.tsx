import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Globe, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const domesticDestinations = [
  {
    title: "Southern India",
    emoji: "🌴",
    highlights: "BEACHES • HERITAGE • BACKWATERS",
    description: "Kerala backwaters, Tamil Nadu temples, Coorg hills — the soul of Incredible India.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Northern India",
    emoji: "🏔️",
    highlights: "HIMALAYAS • FORTS • SPIRITUALITY",
    description: "Rajasthan forts, Ladakh valleys, Taj Mahal, sacred Varanasi and beyond.",
    image: "https://loremflickr.com/1200/800/india,himalayas,fort"
  },
  {
    title: "North East India",
    emoji: "🌿",
    highlights: "MYSTICAL • WILD • CULTURAL",
    description: "Meghalaya's living root bridges, Assam tea gardens, Nagaland cultural festivals.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Andaman & Nicobar",
    emoji: "🐚",
    highlights: "ISLANDS • REEFS • HISTORY",
    description: "Pristine beaches, crystal waters, Cellular Jail, and unforgettable island sunsets.",
    image: "https://loremflickr.com/1200/800/andaman,beach,island"
  },
  {
    title: "Lakshadweep Islands",
    emoji: "🌊",
    highlights: "HIDDEN GEM • CORAL REEFS",
    description: "India's most exclusive island destination — untouched lagoons and pristine reefs.",
    image: "https://loremflickr.com/1200/800/lakshadweep,coral,reef"
  },
  {
    title: "West & Central India",
    emoji: "🏜️",
    highlights: "CULTURE • WILDLIFE • DESERT",
    description: "Goa beaches, Madhya Pradesh wildlife, Gujarat's Rann of Kutch and folk heritage.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800"
  }
];

const internationalDestinations = [
  {
    title: "Maldives",
    emoji: "🏝️",
    highlights: "LUXURY • OVERWATER • REEFS",
    description: "Overwater villas, infinite turquoise, world's finest coral reefs and pure serenity.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Sri Lanka",
    emoji: "🐘",
    highlights: "HISTORY • WILDLIFE • TEA",
    description: "Sigiriya rock fortress, ancient Anuradhapura, whale watching and Ceylon tea.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Thailand",
    emoji: "🏮",
    highlights: "CULTURE • BEACHES • FOOD",
    description: "Bangkok temples, Phuket beaches, Chiang Mai night markets and legendary street food.",
    image: "https://loremflickr.com/1200/800/thailand,bangkok,temple"
  },
  {
    title: "Singapore",
    emoji: "🏙️",
    highlights: "CITY • GARDENS • CUISINE",
    description: "Marina Bay Sands, Gardens by the Bay, Sentosa — Asia's food and culture capital.",
    image: "https://loremflickr.com/1200/800/singapore,marina,bay"
  },
  {
    title: "Malaysia",
    emoji: "🌺",
    highlights: "NATURE • HERITAGE • ISLANDS",
    description: "Petronas Towers, Penang heritage streets, Langkawi islands and Bornean rainforests.",
    image: "https://loremflickr.com/1200/800/malaysia,kualalumpur,nature"
  },
  {
    title: "Vietnam",
    emoji: "🛶",
    highlights: "SCENIC • HISTORIC • FLAVOURS",
    description: "Halong Bay, Hoi An lanterns, Hanoi's Old Quarter and pho on every corner.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Bhutan",
    emoji: "🦋",
    highlights: "KINGDOM • PEAKS • ZEN",
    description: "The world's last Shangri-La — Tiger's Nest, mountain peaks and pure Himalayan serenity.",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Nepal",
    emoji: "🏔️",
    highlights: "EVEREST • TEMPLES • VALLEYS",
    description: "Everest Base Camp, Pokhara valleys, Kathmandu temples and Himalayan sunrise glory.",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "UAE",
    emoji: "🏰",
    highlights: "LUXURY • DESERT • SKYLINE",
    description: "Dubai's iconic skyline, Abu Dhabi grandeur, desert safaris and glittering gold souks.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Uzbekistan",
    emoji: "🎡",
    highlights: "SILK ROAD • MOSAICS • HISTORY",
    description: "Samarkand's breathtaking mosaics, Bukhara mosques and the magic of Central Asia.",
    image: "https://loremflickr.com/1200/800/uzbekistan,samarkand,mosque"
  },
  {
    title: "Mauritius",
    emoji: "🌴",
    highlights: "BEACHES • CREOLE • LAGOONS",
    description: "Lagoon beaches, volcanic peaks, colourful markets and warm Creole hospitality.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Indonesia • Bali",
    emoji: "🌋",
    highlights: "SPIRITUAL • SURF • RICE FIELDS",
    description: "Ubud rice terraces, Uluwatu sea temple, world-class surf and Balinese spirituality.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800"
  }
];

const Destinations = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');

  return (
    <div className="min-h-screen bg-[#041a14] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background Cinematic Effects - Deep Emerald Aurora with Leather Texture & Nature Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 opacity-[0.3] bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] mix-blend-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180%] h-[1000px] bg-emerald-600/10 blur-[200px] -rotate-12 transform-gpu" />
        <div className="absolute top-[30%] left-[-30%] w-full h-[800px] bg-emerald-400/5 blur-[120px] rotate-45 transform-gpu" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[1000px] bg-emerald-500/15 blur-[180px] -rotate-12 transform-gpu" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-emerald-500/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#22c55e] drop-shadow-sm">Our Destinations</span>
            <div className="w-12 h-[1px] bg-emerald-500/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="text-6xl md:text-8xl font-serif mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center font-bold"
          >
            <span className="opacity-95">Explore Our</span> 
            <span className="font-script text-[#22c55e] font-normal normal-case md:-ml-3 mt-2 md:mt-0 text-7xl md:text-9xl drop-shadow-[0_10px_20px_rgba(34,197,94,0.25)]">World</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed"
          >
            Handpicked destinations, curated itineraries, and memories that last a lifetime.
          </motion.p>
        </div>

        {/* Tab Toggle - Pill-Style Premium Toggle */}
        <div className="flex justify-center mb-24">
          <div className="inline-flex bg-black/40 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] relative">
            <button
              onClick={() => setActiveTab('domestic')}
              className={cn(
                "relative z-10 flex items-center gap-3 px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-700",
                activeTab === 'domestic' 
                ? 'bg-[#f4f1ea] text-[#041a14] shadow-[0_10px_20px_rgba(0,0,0,0.3)] scale-[1.02]' 
                : 'text-white/40 hover:text-white/80'
              )}
            >
              <MapPin className={cn("w-3.5 h-3.5", activeTab === 'domestic' ? "text-[#22c55e]" : "opacity-40")} />
              <span>In Domestic India</span>
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={cn(
                "relative z-10 flex items-center gap-3 px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-700",
                activeTab === 'international' 
                ? 'bg-[#f4f1ea] text-[#041a14] shadow-[0_10px_20px_rgba(0,0,0,0.3)] scale-[1.02]' 
                : 'text-white/40 hover:text-white/80'
              )}
            >
              <Globe className={cn("w-3.5 h-3.5", activeTab === 'international' ? "text-[#22c55e]" : "opacity-40")} />
              <span>International</span>
            </button>
          </div>
        </div>

        {/* Grid Section */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {(activeTab === 'domestic' ? domesticDestinations : internationalDestinations).map((dest, idx) => (
              <motion.div
                key={dest.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: idx * 0.1, type: "spring", damping: 18 }}
                whileHover={{ y: -10 }}
                className="group relative bg-[#041a14] rounded-[2.5rem] p-7 transition-all duration-500 flex flex-col justify-between shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] hover:shadow-emerald-500/20 border border-white/5"
              >
                {/* Visual Depth Glow */}
                <div className="absolute inset-0 bg-[#22c55e]/5 blur-3xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

                <div className="flex flex-col h-full text-white">
                  {/* Top Illustration/Icon Section */}
                  <div className="flex items-center justify-start mb-6 border-b border-white/5 pb-4">
                    <div className="text-4xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-700">
                      {dest.emoji}
                    </div>
                  </div>
                  
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold font-serif mb-1 leading-tight tracking-tight text-white">{dest.title}</h3>
                    <div className="text-[7.5px] font-black tracking-[0.2em] text-white/40 uppercase flex items-center gap-1.5">
                       {dest.highlights.split(' • ').map((h, i, arr) => (
                         <div key={h} className="flex items-center gap-1.5 text-white/50">
                           {h}
                           {i < arr.length - 1 && <span className="text-[#22c55e] text-[10px]">•</span>}
                         </div>
                       ))}
                    </div>
                  </div>
                  
                  {/* Card Description */}
                  <p className="text-[12px] text-white/60 leading-relaxed font-medium mb-8">
                    {dest.description}
                  </p>

                  {/* Primary Visual Image Area */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-2 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)] border border-white/5">
                    <img 
                      src={(dest as any).image} 
                      alt={dest.title} 
                      className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2.5s] ease-out opacity-100 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Destinations;
