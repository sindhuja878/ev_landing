import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, ArrowRight, Focus, ShieldCheck, MountainSnow, Sunrise } from 'lucide-react';

export default function CorporateRetreats() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const retreats = [
    { title: "Coorg Strategy Escape", desc: "Coffee plantation luxury resort setup perfect for deep-focus workshops and strategic planning.", icon: MountainSnow },
    { title: "Kerala Wellness Retreat", desc: "Ayurvedic wellness combined with light leadership sessions to recharge and realign executives.", icon: Sunrise },
    { title: "Shimla Leadership Summit", desc: "High-altitude luxury property offering a completely detached environment from daily operations.", icon: ShieldCheck },
  ];

  return (
    <div className="pt-24 pb-12">
      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-start overflow-hidden rounded-[3rem] mx-6 mb-24 border border-white/10">
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4220b2f56?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent z-10" />
        <div className="relative z-20 max-w-3xl px-12 md:px-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
          >
            <Briefcase className="w-5 h-5 text-brand-gold-end" />
            <span className="text-white text-xs font-extrabold tracking-widest uppercase">Corporate Retreats</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Recharge, Realign, and <span className="gold-text italic serif font-normal">Reimagine</span> Your Team
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl text-white/80 font-medium"
          >
            Curated strategy sessions and wellness escapes designed to break silos, foster creativity, and align leadership.
          </motion.p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="container mx-auto px-6 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 text-center max-w-5xl mx-auto backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold-end/5 blur-[100px] rounded-full pointer-events-none" />
          <Focus className="w-16 h-16 text-brand-gold-end mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">Escaping the Office is Just the Beginning</h2>
          <p className="text-xl text-text-muted leading-relaxed max-w-3xl mx-auto">
            A successful robust retreat balances deep work with profound relaxation. We specialize in sourcing properties that offer state-of-the-art conference facilities seamlessly blended with wellness centers, nature trails, and exclusive culinary experiences. 
          </p>
        </motion.div>
      </section>

      {/* RETREAT EXAMPLES */}
      <section className="container mx-auto px-6 mb-32">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 text-center">Featured Retreat Blueprints</h2>
        <div className="flex flex-col gap-8">
          {retreats.map((retreat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-navy rounded-[2rem] p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 hover:bg-white/5 transition-colors group"
            >
              <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold-end/10 transition-colors">
                <retreat.icon className="w-10 h-10 text-brand-gold-end" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-3">{retreat.title}</h3>
                <p className="text-text-muted text-lg">{retreat.desc}</p>
              </div>
              <div className="flex-shrink-0">
                <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-gold-end group-hover:border-brand-gold-end group-hover:text-black transition-all">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-brand-navy to-brand-deep-blue border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-[0_0_60px_rgba(34,197,94,0.05)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Plan Your Leadership Offsite</h2>
            <p className="text-lg text-text-muted">Tell us your objectives, and we will present you with three curated property options that perfectly match your strategic goals and aesthetic preferences.</p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gold-gradient text-black px-10 py-5 rounded-xl font-extrabold text-lg shadow-xl"
            >
              Start Planning
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
