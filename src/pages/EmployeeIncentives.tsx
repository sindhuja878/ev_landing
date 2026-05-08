import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Award, Star, Compass, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function EmployeeIncentives() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const packages = [
    { title: "Bali Escape", duration: "4 Nights", desc: "Private villa, spa sessions, and sunset cruises.", img: "https://picsum.photos/seed/bali-incentive/800/600" },
    { title: "Maldives Luxury", duration: "3 Nights", desc: "Overwater bungalows and marine reserve snorkeling.", img: "https://picsum.photos/seed/maldives-incentive/800/600" },
    { title: "Andaman Rewards", duration: "5 Nights", desc: "Scuba experiences and pristine private beach dinners.", img: "https://picsum.photos/seed/andaman-incentive/800/600" },
  ];

  return (
    <div className="pt-24 pb-12">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-[3rem] mx-6 mb-24 border border-white/10">
        <motion.div 
          style={{ y: yHero, scale: scaleHero }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1540541338287-41700607ee3e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px] z-10" />
        <div className="relative z-20 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <Award className="w-5 h-5 text-brand-gold-end" />
            <span className="text-white text-xs font-extrabold tracking-widest uppercase">Employee Incentive Tours</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Reward Excellence with <span className="gold-text italic serif font-normal">Unforgettable</span> Travel
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-medium"
          >
            Motivate your top performers and build enduring loyalty with meticulously curated domestic and international luxury experiences.
          </motion.p>
        </div>
      </section>

      {/* OVERVIEW / WHY */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Why Incentive Travel <span className="text-brand-gold-end">Outperforms</span> Cash Rewards
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              While bonuses are quickly forgotten, experiences last a lifetime. Transform your reward program from a simple transaction into a deeply emotional journey that employees strive year-round to achieve.
            </p>
            <ul className="space-y-4">
              {['Increases productivity by up to 22%', 'Creates strong peer-to-peer competition & bonding', 'Builds long-term retention and company loyalty', 'Fully customizable domestic and international options'].map((feat, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-white text-base font-bold"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-gold-end/20 flex items-center justify-center border border-brand-gold-end/30">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold-end" />
                  </div>
                  {feat}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10 group"
          >
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000" alt="Happy employees on trip" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-80" />
          </motion.div>
        </div>
      </section>

      {/* PACKAGE EXAMPLES */}
      <section className="bg-brand-navy py-32 border-y border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-end/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Popular Incentive Escapes</h2>
            <p className="text-text-muted text-lg">Curated itineraries designed as the ultimate reward for your highest achievers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden hover:bg-white/10 transition-colors"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-brand-navy/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-extrabold text-white mb-3">{pkg.title}</h3>
                  <p className="text-text-muted mb-6 line-clamp-2">{pkg.desc}</p>
                  <button className="flex items-center gap-2 text-brand-gold-end font-extrabold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                    View Sample Itinerary <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 text-center">How We Craft the Reward</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-white/10 z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-brand-gold-end origin-left"
            />
          </div>
          {['Consultation & Budgeting', 'Theme & Destination Selection', 'Logistics & Booking', 'On-ground execution & celebration'].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center mt-8 md:mt-0"
            >
              <div className="w-24 h-24 rounded-full bg-brand-navy border-2 border-brand-gold-end flex items-center justify-center text-3xl font-black text-brand-gold-end shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-6">
                0{i + 1}
              </div>
              <h4 className="text-lg font-bold text-white max-w-[200px]">{step}</h4>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-brand-navy to-brand-deep-blue border border-brand-gold-end/30 p-12 md:p-20 rounded-[3rem] text-center shadow-[0_0_60px_rgba(34,197,94,0.1)] relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Design Your Next Incentive Program</h2>
            <p className="text-lg text-text-muted mb-10">Connect with our corporate travel designers to structure a performance-boosting reward trip tailored to your team's size and budget.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gold-gradient text-black px-10 py-5 rounded-xl font-extrabold text-lg shadow-xl"
            >
              Request a Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
