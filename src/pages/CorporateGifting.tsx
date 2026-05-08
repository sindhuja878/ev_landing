import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gift, Wallet, Award, Users, ArrowRight } from 'lucide-react';

export default function CorporateGifting() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="pt-24 pb-12">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-[3rem] mx-6 mb-24 border border-white/10">
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm z-10" />
        <div className="relative z-20 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <Gift className="w-5 h-5 text-brand-gold-end" />
            <span className="text-white text-xs font-extrabold tracking-widest uppercase">Corporate Gifting & Vouchers</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Gift Experiences, Not Just <span className="gold-text italic serif font-normal">Rewards</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-medium"
          >
            Move beyond generic gift hampers. Empower your employees and clients with the ultimate luxury—the freedom to travel.
          </motion.p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { icon: Award, title: "Employee Rewards", desc: "Recognize work anniversaries, 'Employee of the Month' awards, or major project completions with flexible travel credit." },
            { icon: Users, title: "Client Appreciation", desc: "Premium travel vouchers make the perfect high-end gift for retaining key clients or sealing new partnerships." },
            { icon: Wallet, title: "Festival Gifting", desc: "Upgrade your Diwali, Eid, or Christmas corporate gifting from mundane boxes to unforgettable short-haul holidays." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-center hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-16 h-16 text-brand-gold-end mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-brand-navy py-32 border-y border-white/10 relative overflow-hidden mb-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 text-center">How EV Holidays Vouchers Work</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1614680376573-e343b44b82d0?auto=format&fit=crop&q=80&w=1000" alt="Premium gift box" className="rounded-[3rem] shadow-2xl border border-white/10" />
            </motion.div>
            <div className="space-y-8">
              {[
                { step: "01", title: "Select Denomination", desc: "Choose voucher values fitting your budget, from weekend stays to luxury international flights." },
                { step: "02", title: "Customize Packaging", desc: "Digital delivery or premium physical gift boxes branded with your company logo." },
                { step: "03", title: "Flexible Redemption", desc: "Recipients work with our concierge team to book their desired flights, hotels, or complete packages." },
              ].map((s, i) => (
               <div key={i} className="flex gap-6">
                 <div className="text-brand-gold-end font-black text-4xl opacity-50">{s.step}</div>
                 <div>
                   <h4 className="text-2xl font-bold text-white mb-2">{s.title}</h4>
                   <p className="text-text-muted">{s.desc}</p>
                 </div>
               </div> 
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-brand-navy border border-white/10 p-12 md:p-20 rounded-[3rem] text-center shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Bulk Gifting Programs</h2>
            <p className="text-lg text-text-muted">Inquire about our tiered pricing for bulk corporate voucher orders. Perfect for end-of-year HR distributions.</p>
          </div>
          <div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gold-gradient text-black px-10 py-5 rounded-xl font-extrabold text-lg shadow-xl whitespace-nowrap"
            >
              Request Voucher Details
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
