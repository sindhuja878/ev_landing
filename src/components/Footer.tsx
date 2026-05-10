import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Globe, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-dark-sky pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo11.png" 
                alt="EV Holidays Logo" 
                className="h-16 md:h-24 lg:h-28 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Transforming corporate travel into meaningful experiences through meticulously planned journeys across 12+ global destinations.
            </p>
            <div className="flex gap-4">
              {[Globe, Plane, MapPin].map((Icon, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted transition-all cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Solutions</h4>
            <ul className="space-y-4">
              {[
                { name: 'Employee Incentive Tours' },
                { name: 'Corporate Retreats' },
                { name: 'Annual Planner Trips' },
                { name: 'Corporate Gifting' },
                { name: 'MICE Events' },
                { name: 'Team Outings' },
                { name: 'Family Trip Planner' },
                { name: 'Couple Trips' }
              ].map(link => (
                <li key={link.name}>
                  <span className="text-sm text-text-muted">{link.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Countries We Operate In</h4>
            <ul className="space-y-4">
              {[
                'Gulf Countries', 'Singapore', 'Malaysia', 'Thailand', 
                'Vietnam', 'Sri Lanka', 'Indonesia', 'Bali', 
                'Nepal', 'Mauritius', 'Bhutan', 'Uzbekistan'
              ].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-text-muted hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold-end flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-muted leading-relaxed">4/205, 1st Floor Kalai plaza,<br/>R Goundam Palayam, Rasipuram,<br/>Namakkal - 637408</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold-end flex-shrink-0" />
                <span className="text-sm text-text-muted">planner@evholidays.in</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold-end flex-shrink-0" />
                <span className="text-sm text-text-muted">+91-81488 20028</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
          <div className="flex flex-col text-xs text-text-muted font-medium gap-1.5">
            <p>© 2026 EV Holidays Private Limited. All rights reserved.</p>
            <p className="text-[10px] opacity-80">( இவி ஹாலிடேஸ் (பி) லிமிட்டெட் )</p>
            <p className="text-[10px] opacity-80 uppercase tracking-wider">CIN : U79110TZ2025PTC035152</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-white transition-colors">GST Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
