import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Tent, Map, Flame, Play, Mountain, Anchor } from 'lucide-react';

export default function TeamOutings() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="pt-24 pb-12">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-[3rem] mx-6 mb-24 border border-white/10 group">
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px] z-10" />
        <div className="relative z-20 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold-end/20 backdrop-blur-md border border-brand-gold-end/30 mb-6 text-brand-gold-end"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-extrabold tracking-widest uppercase">Team Outings & Group Tours</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Stronger Teams Through <span className="gold-text italic serif font-normal">Shared</span> Experiences
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-medium"
          >
            Break down departmental barriers with engaging, activity-based group travel experiences designed purely for team cohesion and fun.
          </motion.p>
        </div>
      </section>

      {/* ACTIVITIES GRID */}
      <section className="container mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Choose Your Vibe</h2>
          <p className="text-text-muted text-lg">From serene nature trails to high-octane adventures, customize the pace of your team's outing.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Adventure Bound", subtitle: "Trekking & Rafting", icon: Mountain, img: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&q=80&w=800" },
            { title: "Beach Escapes", subtitle: "Water Sports & Relaxation", icon: Anchor, img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800" },
            { title: "Wilderness Camp", subtitle: "Bonfires & Safaris", icon: Tent, img: "https://images.unsplash.com/photo-1504280390267-331047c66d25?auto=format&fit=crop&q=80&w=800" },
          ].map((activity, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/10"
            >
              <img src={activity.img} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-4">
                <activity.icon className="w-10 h-10 text-brand-gold-end mb-4 opacity-80 transition-opacity group-hover:opacity-100" />
                <h3 className="text-2xl font-black text-white mb-1">{activity.title}</h3>
                <p className="text-brand-gold-end font-bold text-sm tracking-wide uppercase mb-6">{activity.subtitle}</p>
                <div className="w-10 overflow-hidden">
                  <div className="flex gap-2 items-center text-white text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Explore <Play className="w-4 h-4 fill-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHT */}
      <section className="bg-brand-navy border-y border-white/10 py-32 mb-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-deep-blue blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Why It Matters</h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Teams that travel together perform better. Stepping entirely out of the office environment drops corporate guards, revealing authentic personalities and building deep-seated trust that translates directly back to the workplace.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
             {["Increased Morale", "Silo Busting", "Stress Reduction", "Cultural Alignment"].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 aspect-square hover:bg-brand-gold-end/10 hover:border-brand-gold-end/30 transition-all"
                >
                  <Flame className="w-8 h-8 text-brand-gold-end opacity-80" />
                  <span className="font-bold text-white text-lg">{stat}</span>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-brand-navy border border-white/10 p-12 md:p-20 rounded-[3rem] text-center shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Let's Get the Team Together</h2>
            <p className="text-lg text-text-muted mb-10">Share your team size, budget, and adventure appetite, and we'll craft the perfect weekend getaway or offsite.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-12 py-5 rounded-xl font-extrabold text-lg shadow-xl hover:bg-gray-100 transition-colors"
            >
              Get Custom Itinerary
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
