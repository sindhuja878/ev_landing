import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Presentation, Globe, Users, Megaphone, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MiceEvents() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="pt-24 pb-12">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-start overflow-hidden rounded-[3rem] mx-6 mb-24 border border-white/10">
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent z-10" />
        <div className="relative z-20 max-w-4xl px-12 md:px-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
          >
            <Presentation className="w-5 h-5 text-brand-gold-end" />
            <span className="text-white text-xs font-extrabold tracking-widest uppercase">MICE Events</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Seamless Corporate Events, <br/>
            <span className="gold-text italic serif font-normal">Anywhere in the World</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl text-white/80 font-medium"
          >
            Meetings, Incentives, Conferences, and Exhibitions executed flawlessly at scale. We handle the logistics, so you can focus on the business.
          </motion.p>
        </div>
      </section>

      {/* SERVICES SUMMARY */}
      <section className="container mx-auto px-6 mb-32">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 text-center">Comprehensive Event Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, title: "Meetings", desc: "Board meetings and intimate corporate gatherings at luxury business hotels." },
            { icon: Globe, title: "Incentives", desc: "Large-scale reward trips complete with gala dinners and entertainment." },
            { icon: Megaphone, title: "Conferences", desc: "End-to-end management of major industry summits, including venue sourcing." },
            { icon: Presentation, title: "Exhibitions", desc: "Trade show travel logistics for massive corporate contingents and displays." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 p-8 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-10 h-10 text-brand-gold-end mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-sm text-text-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="bg-brand-navy py-32 border-y border-white/10 relative overflow-hidden mb-24">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10"
          >
            <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000" alt="Conference Setup" className="w-full h-full object-cover" />
          </motion.div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Logistical Mastery at <span className="text-brand-gold-end">Scale</span></h2>
            <p className="text-text-muted text-lg">Managing hundreds of delegates requires precision. Our MICE division operates like a well-oiled machine to ensure zero friction from arrival to departure.</p>
            
            <ul className="space-y-6">
              {[
                "Global venue sourcing and contract negotiation",
                "Flight ticketing, visa assistance, and bulk chartering",
                "On-ground transportation and VIP transfers",
                "Gala dinner, staging, AV setup, and entertainment booking"
              ].map((text, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-white text-base font-bold bg-white/5 p-4 rounded-xl border border-white/5"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-gold-end flex-shrink-0" />
                  {text}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 mb-12 text-center">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="inline-block bg-gradient-to-r from-brand-navy to-brand-deep-blue border border-brand-gold-end/30 p-12 md:p-20 rounded-[3rem] shadow-[0_0_60px_rgba(34,197,94,0.1)]"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Hosting a Major Event Soon?</h2>
          <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto">Drop your RFP (Request for Proposal) to our dedicated MICE division and let us outline a flawless logistical execution plan.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gold-gradient text-black px-12 py-5 rounded-xl font-extrabold text-lg shadow-xl"
          >
            Submit Event Details
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
