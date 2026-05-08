import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, ArrowRight, Activity, TrendingUp, BarChart } from 'lucide-react';

export default function AnnualPlanner() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="pt-24 pb-12">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-[3rem] mx-6 mb-24 border border-white/10">
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-brand-navy/70 backdrop-blur-sm z-10" />
        <div className="relative z-20 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <Calendar className="w-5 h-5 text-brand-gold-end" />
            <span className="text-white text-xs font-extrabold tracking-widest uppercase">Annual Planner Trips</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Plan Your Corporate Travel Calendar with <span className="gold-text italic serif font-normal">Precision</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-medium"
          >
            Move away from ad-hoc planning. Strategize your company's entire year of travel, from kick-offs to year-end celebrations, optimizing budget and maximizing impact.
          </motion.p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Quarterly alignment trips", desc: "Keep momentum high with strategic offsites mapped to your financial quarters.", icon: Activity },
            { title: "Budget Optimization", desc: "Unlock massive bulk-booking discounts by forecasting and reserving travel blocks fully in advance.", icon: TrendingUp },
            { title: "HR-Aligned Planning", desc: "Sync travel with employee review cycles, promotion schedules, and milestone celebrations.", icon: BarChart }
          ].map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-colors group"
            >
              <div className="w-16 h-16 rounded-xl bg-brand-navy border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold-end group-hover:border-transparent transition-colors">
                <pillar.icon className="w-8 h-8 text-white group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
              <p className="text-text-muted leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ANNUAL TIMELINE EXAMPLE */}
      <section className="bg-brand-navy py-32 border-y border-white/10 relative overflow-hidden mb-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">A Year in Motion</h2>
            <p className="text-text-muted text-lg">Example of a perfectly optimized corporate planning calendar.</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { quarter: "Q1", event: "Annual Sales Kickoff", location: "Goa, India", focus: "Target setting & high-energy alignment" },
              { quarter: "Q2", event: "Leadership Offsite", location: "Coorg, India", focus: "Course correction & strategic focus" },
              { quarter: "Q3", event: "Mid-Year Team Outing", location: "Rishikesh, India", focus: "Stress relief & pure team bonding" },
              { quarter: "Q4", event: "Year-End Celebration", location: "Dubai, UAE", focus: "Rewarding success & gala dinner" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col md:flex-row items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/10"
              >
                <div className="w-24 h-24 rounded-full bg-brand-gold-end/10 border border-brand-gold-end/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-black text-brand-gold-end">{item.quarter}</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-white mb-2">{item.event} <span className="text-text-muted font-normal text-lg">| {item.location}</span></h4>
                  <p className="text-text-muted">{item.focus}</p>
                </div>
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
          <div className="absolute inset-0 gold-gradient opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Build Your Yearly Calendar</h2>
            <p className="text-lg text-text-muted mb-10">Stop scrambling at the last minute. Let our planners map out a year of seamless business travel that saves money and reduces HR stress.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gold-gradient text-black px-10 py-5 rounded-xl font-extrabold text-lg shadow-xl"
            >
              Consult an Annual Planner
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
