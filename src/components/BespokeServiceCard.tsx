import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface BespokeServiceCardProps {
  id: string;
  title: string;
  desc: string;
  path: string;
  icon: LucideIcon;
  index: number;
}

export const BespokeServiceCard: React.FC<BespokeServiceCardProps> = ({ id, title, desc, path, icon: Icon, index }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  
  // Magnetic cursor interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for magnetic icon effect
  const iconX = useSpring(0, { stiffness: 100, damping: 20, mass: 0.5 });
  const iconY = useSpring(0, { stiffness: 100, damping: 20, mass: 0.5 });

  const [isHovered, setIsHovered] = useState(false);

  // Floating animation state using custom time
  const time = useMotionValue(0);
  
  // Randomize initial phase per card so they float independently
  const phaseX = useRef(Math.random() * Math.PI * 2).current;
  const phaseY = useRef(Math.random() * Math.PI * 2).current;
  const floatSpeed = useRef(0.3 + Math.random() * 0.4).current;

  useAnimationFrame((t, delta) => {
    time.set(t);
    // If not hovered, apply floating anti-gravity effect
    if (!isHovered) {
      // Sine wave for Y (up/down) and Cosine for X (drift)
      const currentY = Math.sin((t * 0.001 * floatSpeed) + phaseY) * 5;
      const currentX = Math.cos((t * 0.0008 * floatSpeed) + phaseX) * 3;
      iconX.set(currentX);
      iconY.set(currentY);
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);

    if (isHovered && iconRef.current) {
      // Magnetic pull towards cursor
      const iconRect = iconRef.current.getBoundingClientRect();
      const iconCenterX = iconRect.left + iconRect.width / 2 - left;
      const iconCenterY = iconRect.top + iconRect.height / 2 - top;

      const deltaX = x - iconCenterX;
      const deltaY = y - iconCenterY;

      // Subtle pull, rising slightly upward
      iconX.set(deltaX * 0.1);
      iconY.set(deltaY * 0.1 - 10); 
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // mouseX.set(0); // Optional: reset glow position if desired
    // mouseY.set(0);
  };

  // Orbital rings rotation
  const ringRotation1 = useTransform(time, [0, 10000], [0, 360], { clamp: false });
  const ringRotation2 = useTransform(time, [0, 10000], [360, 0], { clamp: false });

  return (
    <Link 
      to={path} 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="block group relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="p-8 md:p-10 rounded-[2.5rem] shadow-2xl hover:shadow-[0_20px_60px_rgba(20,107,10,0.4)] transition-all duration-700 relative overflow-hidden h-full flex flex-col bg-[#051c05]/85 backdrop-blur-2xl border border-white/10 group-hover:border-white/30 group-hover:bg-[#072407]/95"
      >
        {/* Glow follower on hover */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] transition duration-500 opacity-0 group-hover:opacity-100 mix-blend-screen"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(20, 107, 10, 0.15),
                transparent 70%
              )
            `,
          }}
        />

        <div className="flex justify-between items-start mb-10 relative z-10">
          {/* Icon Container */}
          <div className="relative w-16 h-16 flex items-center justify-center" ref={iconRef}>
            
            {/* Soft pulsing aura behind icon */}
            <motion.div 
              className="absolute inset-0 bg-[#146b0a]/30 rounded-full blur-xl transition-all duration-700"
              animate={{ 
                scale: isHovered ? 1.6 : [1, 1.2, 1],
                opacity: isHovered ? 0.9 : [0.3, 0.6, 0.3] 
              }}
              transition={!isHovered ? { repeat: Infinity, duration: 3 + floatSpeed, ease: "easeInOut" } : { duration: 0.5 }}
            />

            {/* Expanding energy ripple on hover */}
            <motion.div 
              className="absolute inset-0 border border-[#146b0a]/50 rounded-[1.2rem]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHovered ? { scale: 1.8, opacity: 0 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Orbital Rings */}
            <motion.div 
              className="absolute -inset-3 border border-white/10 rounded-full border-t-[#146b0a]/60 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ rotate: ringRotation1 }}
            />
            <motion.div 
              className="absolute -inset-5 border border-white/5 rounded-full border-b-[#146b0a]/40 border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ rotate: ringRotation2 }}
            />

            <motion.div 
              style={{ x: iconX, y: iconY }}
              className="w-14 h-14 bg-black/50 rounded-[1.2rem] flex items-center justify-center border border-white/10 group-hover:bg-[#146b0a]/20 group-hover:border-[#146b0a]/50 transition-colors duration-500 backdrop-blur-md shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative z-10"
            >
              <Icon className="text-white/70 group-hover:text-white w-6 h-6 transition-colors duration-500 drop-shadow-[0_0_10px_rgba(20,107,10,0.8)]" />
              
              {/* Particles */}
              {isHovered && Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#146b0a] rounded-full blur-[1px] shadow-[0_0_8px_#146b0a]"
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                  animate={{ 
                    opacity: 0, 
                    x: (Math.random() - 0.5) * 60, 
                    y: (Math.random() - 0.5) * 60 - 20,
                    scale: Math.random() * 2 + 0.5
                  }}
                  transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() * 0.5 }}
                />
              ))}
            </motion.div>
          </div>

          <span className="text-4xl font-black text-white/5 group-hover:text-[#146b0a]/30 transition-colors duration-500 drop-shadow-md">
            {id}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#4ade80] transition-colors duration-500 drop-shadow-md relative z-10">
          {title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed group-hover:text-white transition-colors duration-500 font-medium relative z-10 flex-1">
          {desc}
        </p>
      </motion.div>
    </Link>
  );
};
