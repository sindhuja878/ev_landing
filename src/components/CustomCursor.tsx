import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-brand-gold-end pointer-events-none z-[99999] mix-blend-difference"
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
    />
  );
};
