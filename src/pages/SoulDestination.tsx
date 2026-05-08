import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, ArrowRight, MessageCircle, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

// --- DATA & ENGINE ---

const QUESTIONS = [
  {
    id: 1,
    question: "What type of scenery inspires you most?",
    options: [
      { text: "🌊 Beaches & Islands", tags: ["beach", "tropical", "island"] },
      { text: "🏔️ Mountains & Valleys", tags: ["mountains", "snow", "valley"] },
      { text: "🌿 Nature & Forests", tags: ["nature", "forest", "green"] },
      { text: "🌆 Modern Cities", tags: ["city", "modern", "culture"] }
    ]
  },
  {
    id: 2,
    question: "What type of travel experience are you looking for?",
    options: [
      { text: "😌 Relaxation", tags: ["relax", "peace", "beach"] },
      { text: "🧗 Adventure", tags: ["adventure", "explore", "mountains"] },
      { text: "💎 Luxury Escape", tags: ["luxury", "premium"] },
      { text: "🎭 Cultural Exploration", tags: ["culture", "history", "city"] }
    ]
  },
  {
    id: 3,
    question: "What kind of atmosphere do you enjoy?",
    options: [
      { text: "🌴 Peaceful & Calm", tags: ["peace", "relax", "nature", "retreat"] },
      { text: "🎉 Energetic & Vibrant", tags: ["energy", "city", "explore"] },
      { text: "❤️ Romantic & Scenic", tags: ["romance", "scenic", "luxury"] },
      { text: "🧭 Explorative & Unique", tags: ["explore", "unique", "adventure", "hidden"] }
    ]
  },
  {
    id: 4,
    question: "How long would your ideal journey be?",
    options: [
      { text: "Weekend Escape", tags: ["short", "weekend", "domestic"] },
      { text: "5–7 Days", tags: ["medium", "week"] },
      { text: "10+ Days", tags: ["long", "extended", "international"] },
      { text: "Extended Journey", tags: ["extended", "epic", "international"] }
    ]
  },
  {
    id: 5,
    question: "What kind of destination interests you more?",
    options: [
      { text: "🇮🇳 India Experiences", tags: ["india", "domestic"] },
      { text: "🌏 International Destinations", tags: ["international", "global"] },
      { text: "🌍 Hidden Gems", tags: ["hidden", "unique", "explore"] },
      { text: "✨ Luxury Retreats", tags: ["luxury", "retreat", "peace"] }
    ]
  },
  {
    id: 6,
    question: "What travel style best matches your personality?",
    options: [
      { text: "Boutique Experiences", tags: ["boutique", "culture", "unique"] },
      { text: "Nature Retreats", tags: ["nature", "retreat", "peace", "forest"] },
      { text: "Luxury Resorts", tags: ["luxury", "resort", "relax"] },
      { text: "Adventure Trails", tags: ["adventure", "trail", "explore", "mountains"] }
    ]
  }
];

const DESTINATIONS = [
  // --- INTERNATIONAL ---
  {
    id: "bali",
    name: "Bali",
    desc: "Tropical sunsets, luxury villas, spiritual beauty, and unforgettable island experiences await you.",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000",
    tags: ["beach", "tropical", "luxury", "romance", "relax", "international", "resort", "island"],
    bestTime: "April – October",
    perfectFor: "Luxury + Relaxation + Romance",
    experiences: ["Luxury Island Retreat", "Private Villas", "Spiritual Healing"]
  },
  {
    id: "mauritius",
    name: "Mauritius",
    desc: "Pristine white sands, crystal-clear waters, and unmatched premium hospitality in the Indian Ocean.",
    img: "https://images.unsplash.com/photo-1572402230267-f3e267c1e5a2?auto=format&fit=crop&q=80&w=2000",
    tags: ["beach", "tropical", "luxury", "romance", "relax", "international", "resort", "island"],
    bestTime: "May – December",
    perfectFor: "Luxury + Romance + Beaches",
    experiences: ["Private Beach Dining", "Luxury Catamaran Tours", "Premium Spa"]
  },
  {
    id: "nepal",
    name: "Nepal",
    desc: "Majestic Himalayan peaks, ancient culture, and thrilling adventures at the top of the world.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=2000",
    tags: ["mountains", "adventure", "explore", "international", "nature", "trail"],
    bestTime: "October – December",
    perfectFor: "Adventure + Mountains + Culture",
    experiences: ["Himalayan Treks", "Cultural Heritage", "Nature Retreats"]
  },
  {
    id: "bhutan",
    name: "Bhutan",
    desc: "The Land of the Thunder Dragon offers profound peace, untouched nature, and spiritual awakenings.",
    img: "https://images.unsplash.com/photo-1563200780-8798bf1c3ab3?auto=format&fit=crop&q=80&w=2000",
    tags: ["mountains", "peace", "culture", "hidden", "international", "explore", "retreat"],
    bestTime: "March – May & Sept – Nov",
    perfectFor: "Peace + Culture + Hidden Gems",
    experiences: ["Tiger's Nest Trek", "Monastery Visits", "Luxury Boutique Stays"]
  },
  {
    id: "singapore",
    name: "Singapore",
    desc: "A futuristic metropolis blending world-class luxury, vibrant culture, and stunning modern architecture.",
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=2000",
    tags: ["city", "modern", "luxury", "culture", "energy", "international", "boutique"],
    bestTime: "February – April",
    perfectFor: "Cities + Culture + Luxury",
    experiences: ["Marina Bay Sands", "Gardens by the Bay", "Michelin Dining"]
  },
  {
    id: "thailand",
    name: "Thailand",
    desc: "Vibrant street life, ornate temples, and world-renowned island escapes in the Land of Smiles.",
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=2000",
    tags: ["culture", "beach", "energy", "city", "international", "explore"],
    bestTime: "November – Early April",
    perfectFor: "Culture + Energy + Beaches",
    experiences: ["Island Hopping", "Temple Tours", "Vibrant City Life"]
  },
  {
    id: "vietnam",
    name: "Vietnam",
    desc: "A tapestry of rich history, breathtaking landscapes, and incredible culinary discoveries.",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=2000",
    tags: ["culture", "hidden", "explore", "nature", "international", "boutique"],
    bestTime: "Spring (Feb-Apr) & Autumn (Aug-Oct)",
    perfectFor: "Exploration + Culture + Hidden Gems",
    experiences: ["Ha Long Bay Cruise", "Cultural Walking Tours", "Culinary Exploration"]
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    desc: "Lush tea plantations, ancient ruins, and serene beaches make this teardrop island a diverse paradise.",
    img: "https://images.unsplash.com/photo-1546708973-2e68ee6919db?auto=format&fit=crop&q=80&w=2000",
    tags: ["nature", "peace", "beach", "culture", "international", "relax"],
    bestTime: "December – March (West/South)",
    perfectFor: "Nature + Peaceful + Exploration",
    experiences: ["Tea Estate Stays", "Wildlife Safaris", "Serene Beaches"]
  },
  {
    id: "uzbekistan",
    name: "Uzbekistan",
    desc: "Journey along the Silk Road through mesmerising architecture, azure domes, and deep history.",
    img: "https://images.unsplash.com/photo-1621217734498-8cd4e5285709?auto=format&fit=crop&q=80&w=2000",
    tags: ["culture", "hidden", "explore", "unique", "international", "history"],
    bestTime: "Spring & Autumn",
    perfectFor: "Exploration + Hidden Gems + Culture",
    experiences: ["Silk Road History", "Architectural Tours", "Boutique Stays"]
  },
  {
    id: "gulf-countries",
    name: "Gulf Countries (UAE, Oman, Qatar)",
    desc: "Ultra-luxury cities, boundless deserts, and a fusion of ancient heritage and modern opulence.",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000",
    tags: ["city", "luxury", "modern", "energy", "international", "resort"],
    bestTime: "November – March",
    perfectFor: "Luxury + Modern Cities",
    experiences: ["Desert Safaris", "Ultra-Luxury Resorts", "High-End Shopping"]
  },
  // --- INDIA ---
  {
    id: "lakshadweep",
    name: "Lakshadweep Islands",
    desc: "Untouched coral reefs, turquoise lagoons, and absolute seclusion in India's hidden archipelago.",
    img: "https://images.unsplash.com/photo-1596813362035-3edcff0c2487?auto=format&fit=crop&q=80&w=2000",
    tags: ["beach", "tropical", "luxury", "romance", "peace", "india", "domestic", "island"],
    bestTime: "October – Mid May",
    perfectFor: "Luxury + Romance + Beaches",
    experiences: ["Private Lagoon Retreats", "Scuba Diving", "Island Hopping"]
  },
  {
    id: "andaman",
    name: "Andaman & Nicobar",
    desc: "Pristine white beaches, lush rainforests, and thrilling water adventures in the Bay of Bengal.",
    img: "https://images.unsplash.com/photo-1589136777351-fdc9c9cb15c4?auto=format&fit=crop&q=80&w=2000",
    tags: ["beach", "adventure", "nature", "india", "domestic", "island", "explore"],
    bestTime: "October – May",
    perfectFor: "Adventure + Beaches + Nature",
    experiences: ["Snorkeling & Diving", "Rainforest Treks", "Luxury Beach Resorts"]
  },
  {
    id: "northeast-india",
    name: "North East India",
    desc: "Misty mountains, living root bridges, and vibrant tribal cultures in India's unexplored frontier.",
    img: "https://images.unsplash.com/photo-1622308644420-b2fc41bc8e37?auto=format&fit=crop&q=80&w=2000",
    tags: ["mountains", "adventure", "hidden", "nature", "explore", "india", "domestic", "trail"],
    bestTime: "October – April",
    perfectFor: "Adventure + Mountains + Hidden Gems",
    experiences: ["Living Root Bridges", "Tea Garden Stays", "Himalayan Treks"]
  },
  {
    id: "northern-india",
    name: "Northern India",
    desc: "From the majestic Himalayas to royal palaces, a land of epic adventures and regal luxury.",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000",
    tags: ["mountains", "culture", "luxury", "adventure", "india", "domestic", "history"],
    bestTime: "October – March (Plains) / April – June (Hills)",
    perfectFor: "Culture + Mountains + Luxury",
    experiences: ["Palace Stays", "Himalayan Expeditions", "Heritage Tours"]
  },
  {
    id: "southern-india",
    name: "Southern India",
    desc: "Serene backwaters, ancient temples, and lush hill stations offering profound peace and healing.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=2000",
    tags: ["nature", "peace", "culture", "relax", "india", "domestic", "retreat"],
    bestTime: "October – March",
    perfectFor: "Nature + Peaceful + Healing",
    experiences: ["Houseboat Cruises", "Ayurvedic Retreats", "Temple Architecture"]
  },
  {
    id: "western-india",
    name: "Western India",
    desc: "Vibrant deserts, vibrant festivals, and historic forts blending adventure with royal hospitality.",
    img: "https://images.unsplash.com/photo-1599394022918-6c2776530abb?auto=format&fit=crop&q=80&w=2000",
    tags: ["culture", "desert", "luxury", "energy", "india", "domestic", "boutique"],
    bestTime: "October – March",
    perfectFor: "Culture + Luxury + Energy",
    experiences: ["Desert Camping", "Royal Palace Hotels", "Cultural Festivals"]
  },
  {
    id: "central-india",
    name: "Central India",
    desc: "The heart of India, famous for thrilling wildlife safaris and ancient, untold stories in stone.",
    img: "https://images.unsplash.com/photo-1534142498263-d34ddb4da27a?auto=format&fit=crop&q=80&w=2000",
    tags: ["nature", "adventure", "explore", "hidden", "india", "domestic", "trail"],
    bestTime: "October – April",
    perfectFor: "Wildlife + Exploration + Hidden Gems",
    experiences: ["Tiger Safaris", "Luxury Jungle Lodges", "Ancient Ruins"]
  }
];

const calculateMatch = (answers: string[][]) => {
  const tagCounts: Record<string, number> = {};
  answers.forEach(answerTags => {
    answerTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  let bestMatch = DESTINATIONS[0];
  let maxScore = -1;

  DESTINATIONS.forEach(dest => {
    let score = 0;
    dest.tags.forEach(tag => {
      if (tagCounts[tag]) score += tagCounts[tag];
    });
    if (score > maxScore) {
      maxScore = score;
      bestMatch = dest;
    }
  });

  return bestMatch;
};

// --- COMPONENTS ---

export default function SoulDestination() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "calculating" | "result">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [result, setResult] = useState<typeof DESTINATIONS[0] | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    travelers: '',
    month: '',
    preferences: ''
  });

  const handleRequestProposal = () => {
    if (!result) return;
    const subject = `Proposal Request: ${result.name} - ${formData.name || 'Traveler'}`;
    const body = `New Proposal Request from EV Holidays

Traveler Details:
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
WhatsApp: ${formData.whatsapp || 'Not provided'}
Travelers: ${formData.travelers || 'Not provided'}
Preferred Month: ${formData.month || 'Not provided'}

Auto-Filled Preferences:
Suggested Destination: ${result.name}
Travel Style: ${answers[1]?.[0] || 'Luxury'}
Preferred Duration: ${answers[3]?.[0] || '5-7 Days'}
Journey Category: ${answers[4]?.[0] || 'International'}

Additional Preferences:
${formData.preferences || 'None provided'}`;

    window.location.href = `mailto:planner@evholidays.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleStart = () => setPhase("quiz");

  const handleOptionSelect = (tags: string[], index: number) => {
    if (selectedOptionIndex !== null) return; // Prevent multiple clicks
    setSelectedOptionIndex(index);
    const newAnswers = [...answers, tags];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOptionIndex(null);
      }, 600); // Small delay to show selected state
    } else {
      setTimeout(() => {
        setPhase("calculating");
        setSelectedOptionIndex(null);
        const matched = calculateMatch(newAnswers);
        setResult(matched);
        
        setTimeout(() => {
          setPhase("result");
        }, 3000); // 3 seconds of "calculation" cinematic
      }, 600);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#010801] text-white selection:bg-[#2ECC71] selection:text-black overflow-hidden relative">
      
      {/* GLOBAL BACKGROUND - Adapts based on phase */}
      <AnimatePresence mode="wait">
        {phase !== "result" && (
          <motion.div 
            key="default-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
             <img 
               src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=2000" 
               alt="Cinematic Night Sky" 
               className="w-full h-full object-cover opacity-30 scale-105 animate-[pulse_20s_ease-in-out_infinite]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#010801] via-[#010801]/60 to-transparent" />
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(46,204,113,0.08)_0%,rgba(1,8,1,0)_80%)]" />
             <div className="noise opacity-30 mix-blend-overlay absolute inset-0" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER CONTROLS */}
      <div className="absolute top-8 left-8 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>
      </div>

      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          
          {/* PHASE: INTRO */}
          {phase === "intro" && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="max-w-3xl text-center flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2ECC71]/30 bg-black/40 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(46,204,113,0.15)]">
                <Sparkles className="w-4 h-4 text-[#2ECC71]" />
                <span className="text-[#2ECC71] font-bold uppercase tracking-[0.2em] text-[10px]">
                  AI Powered Travel Discovery
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-2xl text-white">
                Do You Know Which Destination Matches Your <span className="font-serif italic text-[#2ECC71] font-normal">Soul?</span>
              </h1>
              
              <h3 className="text-xl md:text-2xl text-white/90 font-medium mb-6">
                Your perfect getaway isn’t something you search... <br className="hidden md:block" />
                It’s something you discover.
              </h3>
              
              <p className="text-white/60 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
                Answer a few immersive questions and let EV Holidays reveal the destination that truly matches your personality, energy, and travel style.
              </p>
              
              <button 
                onClick={handleStart}
                className="bg-[#2ECC71] text-[#010801] rounded-full px-12 py-5 text-sm font-black uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-[0_0_30px_rgba(46,204,113,0.3)] flex items-center gap-3"
              >
                Start My Journey
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <p className="text-white/40 text-xs uppercase tracking-widest mt-8">
                Take a moment. Let your answers guide you.
              </p>
            </motion.div>
          )}

          {/* PHASE: QUIZ */}
          {phase === "quiz" && (
            <motion.div 
              key="quiz"
              className="w-full max-w-4xl flex flex-col h-full py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* PROGRESS BAR */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-16 relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#2ECC71] shadow-[0_0_15px_rgba(46,204,113,0.8)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <div className="text-[#2ECC71] text-xs font-bold uppercase tracking-[0.3em] mb-4 text-center">
                      Question {currentQuestionIndex + 1} of {QUESTIONS.length}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center drop-shadow-xl text-white">
                      {QUESTIONS[currentQuestionIndex].question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                        const isSelected = selectedOptionIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(option.tags, idx)}
                            disabled={selectedOptionIndex !== null}
                            className={cn(
                              "relative p-6 md:p-8 rounded-2xl backdrop-blur-md text-left group overflow-hidden transition-all duration-500",
                              isSelected 
                                ? "bg-[#2ECC71]/20 border border-[#2ECC71] shadow-[0_0_40px_rgba(46,204,113,0.4)] scale-[1.02] -translate-y-1" 
                                : "bg-white/5 border border-white/10 hover:border-[#2ECC71]/50 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(46,204,113,0.2)]"
                            )}
                          >
                            <div className={cn(
                              "absolute inset-0 bg-gradient-to-br from-[#2ECC71]/0 to-[#2ECC71]/20 transition-opacity duration-500 pointer-events-none",
                              isSelected ? "opacity-100 animate-[pulse_2s_ease-in-out_infinite]" : "opacity-0 group-hover:opacity-100"
                            )} />
                            <span className={cn(
                              "relative z-10 text-xl font-medium transition-colors duration-300",
                              isSelected ? "text-white drop-shadow-[0_0_10px_rgba(46,204,113,0.8)]" : "text-white/90 group-hover:text-white"
                            )}>
                              {option.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* PHASE: CALCULATING */}
          {phase === "calculating" && (
             <motion.div 
               key="calculating"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex flex-col items-center justify-center text-center"
             >
                <div className="w-24 h-24 rounded-full border border-[#2ECC71]/30 flex items-center justify-center relative mb-8">
                  <div className="absolute inset-0 rounded-full border-t-2 border-[#2ECC71] animate-spin" />
                  <Sparkles className="w-8 h-8 text-[#2ECC71] animate-pulse" />
                </div>
                <h2 className="text-3xl font-serif italic text-white drop-shadow-lg">
                  Discovering your perfect destination...
                </h2>
             </motion.div>
          )}

          {/* PHASE: RESULT */}
          {phase === "result" && result && (
            <motion.div 
              key="result"
              className="absolute inset-0 w-full h-full z-20 flex flex-col overflow-y-auto overflow-x-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
               {/* Background Image for Result */}
               <div className="fixed inset-0 z-0">
                  <img 
                    src={result.img} 
                    alt={result.name}
                    className="w-full h-full object-cover scale-105 animate-[pulse_30s_ease-in-out_infinite]"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010801] via-[#010801]/80 to-transparent" />
               </div>

               <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center flex-1">
                 
                 <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5, duration: 1 }}
                   className="mb-8"
                 >
                    <div className="text-[#2ECC71] text-xs font-bold uppercase tracking-[0.4em] mb-4">
                      🌍 Your Soul Matches
                    </div>
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                      {result.name.toUpperCase()}
                    </h1>
                 </motion.div>

                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1, duration: 1 }}
                   className="max-w-2xl bg-black/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl mb-16"
                 >
                    <p className="text-2xl font-serif italic text-white/90 leading-relaxed mb-10">
                      "{result.desc}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                       <div>
                         <div className="text-[#2ECC71] text-[10px] uppercase tracking-widest font-bold mb-2">Best Time</div>
                         <div className="text-white font-medium">{result.bestTime}</div>
                       </div>
                       <div>
                         <div className="text-[#2ECC71] text-[10px] uppercase tracking-widest font-bold mb-2">Perfect For</div>
                         <div className="text-white font-medium">{result.perfectFor}</div>
                       </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 text-left">
                       <div className="text-[#2ECC71] text-[10px] uppercase tracking-widest font-bold mb-4">Recommended Experiences</div>
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {result.experiences.map((exp, i) => (
                           <li key={i} className="text-white/80 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#2ECC71]" />
                             {exp}
                           </li>
                         ))}
                       </ul>
                    </div>
                 </motion.div>

                 {/* Exclusive EV Holidays Experiences */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.5, duration: 1 }}
                   className="w-full max-w-4xl mb-16"
                 >
                    <div className="text-[#2ECC71] text-xs font-bold uppercase tracking-[0.4em] mb-8 text-center drop-shadow-[0_0_10px_rgba(46,204,113,0.5)]">
                      Exclusive EV Holidays Experiences
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { icon: <Sparkles className="w-5 h-5" />, title: "Personalized Travel Concierge" },
                        { icon: <MapPin className="w-5 h-5" />, title: "Curated Experience Design" },
                        { icon: <MessageCircle className="w-5 h-5" />, title: "Priority Travel Assistance" },
                        { icon: <Sparkles className="w-5 h-5" />, title: "Luxury Welcome Experience" },
                        { icon: <MapPin className="w-5 h-5" />, title: "Exclusive Destination Guidance" },
                        { icon: <MessageCircle className="w-5 h-5" />, title: "Premium Journey Planning" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center group hover:border-[#2ECC71]/40 hover:bg-[#2ECC71]/5 transition-all duration-500 hover:-translate-y-1 shadow-lg">
                          <div className="w-12 h-12 rounded-full bg-[#2ECC71]/10 flex items-center justify-center mb-4 text-[#2ECC71] group-hover:scale-110 group-hover:bg-[#2ECC71]/20 group-hover:shadow-[0_0_20px_rgba(46,204,113,0.4)] transition-all duration-500">
                            {item.icon}
                          </div>
                          <h4 className="text-white/90 font-medium text-sm group-hover:text-white transition-colors">{item.title}</h4>
                        </div>
                      ))}
                    </div>
                 </motion.div>

                 {/* Request Personalized Proposal Flow */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 2, duration: 1 }}
                   className="w-full max-w-4xl bg-black/40 backdrop-blur-2xl border border-[#2ECC71]/30 p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                 >
                    {/* Glowing background effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(46,204,113,0.15)_0%,transparent_60%)] pointer-events-none" />
                    
                    <div className="relative z-10 text-center mb-10">
                      <h3 className="text-4xl md:text-5xl font-serif italic text-white mb-4 drop-shadow-md">
                        Request Personalized Proposal
                      </h3>
                      <p className="text-white/70 max-w-xl mx-auto text-lg">
                        Our EV Holidays Concierge Team will craft a personalized journey proposal based on your travel style and preferences.
                      </p>
                    </div>

                    <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left" onSubmit={(e) => e.preventDefault()}>
                      {/* Read-only Auto-filled preferences */}
                      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-white/5 border border-[#2ECC71]/20 rounded-xl p-4 shadow-[inset_0_0_15px_rgba(46,204,113,0.05)]">
                          <div className="text-[#2ECC71] text-[10px] uppercase tracking-widest font-bold mb-1">Suggested Destination</div>
                          <div className="text-white font-medium text-sm">{result.name}</div>
                        </div>
                        <div className="bg-white/5 border border-[#2ECC71]/20 rounded-xl p-4 shadow-[inset_0_0_15px_rgba(46,204,113,0.05)]">
                          <div className="text-[#2ECC71] text-[10px] uppercase tracking-widest font-bold mb-1">Travel Style</div>
                          <div className="text-white font-medium text-sm capitalize">{answers[1]?.[0] || 'Luxury'}</div>
                        </div>
                        <div className="bg-white/5 border border-[#2ECC71]/20 rounded-xl p-4 shadow-[inset_0_0_15px_rgba(46,204,113,0.05)]">
                          <div className="text-[#2ECC71] text-[10px] uppercase tracking-widest font-bold mb-1">Preferred Duration</div>
                          <div className="text-white font-medium text-sm capitalize">{answers[3]?.[0] || '5-7 Days'}</div>
                        </div>
                        <div className="bg-white/5 border border-[#2ECC71]/20 rounded-xl p-4 shadow-[inset_0_0_15px_rgba(46,204,113,0.05)]">
                          <div className="text-[#2ECC71] text-[10px] uppercase tracking-widest font-bold mb-1">Journey Category</div>
                          <div className="text-white font-medium text-sm capitalize">{answers[4]?.[0] || 'International'}</div>
                        </div>
                      </div>

                      {/* User Input Fields */}
                      <div className="flex flex-col gap-2">
                        <label className="text-white/70 text-xs uppercase tracking-widest font-bold">Full Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-white/5 transition-all shadow-inner" placeholder="Your name" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/70 text-xs uppercase tracking-widest font-bold">Email Address</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-white/5 transition-all shadow-inner" placeholder="your@email.com" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/70 text-xs uppercase tracking-widest font-bold">WhatsApp Number</label>
                        <input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-white/5 transition-all shadow-inner" placeholder="+1 234 567 8900" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-white/70 text-xs uppercase tracking-widest font-bold">Travelers</label>
                          <input type="number" min="1" value={formData.travelers} onChange={(e) => setFormData({...formData, travelers: e.target.value})} className="bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-white/5 transition-all shadow-inner" placeholder="2" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-white/70 text-xs uppercase tracking-widest font-bold">Month</label>
                          <input type="text" value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})} className="bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-white/5 transition-all shadow-inner" placeholder="e.g. October" />
                        </div>
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-white/70 text-xs uppercase tracking-widest font-bold">Additional Preferences</label>
                        <textarea value={formData.preferences} onChange={(e) => setFormData({...formData, preferences: e.target.value})} className="bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-white/5 transition-all shadow-inner min-h-[100px]" placeholder="Any specific requirements or celebrations?"></textarea>
                      </div>

                      {/* Premium CTA Buttons */}
                      <div className="md:col-span-2 flex justify-center mt-6">
                        <button onClick={handleRequestProposal} className="w-full sm:w-auto bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-[#010801] font-black uppercase tracking-widest text-sm px-12 py-5 rounded-full hover:scale-105 transition-all shadow-[0_10px_30px_rgba(46,204,113,0.5)] flex items-center justify-center gap-3 group">
                          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          Request Proposal
                        </button>
                      </div>
                    </form>
                 </motion.div>

               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
