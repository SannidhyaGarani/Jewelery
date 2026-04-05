import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumPreloader = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  // Sophisticated Counter Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);
    
    // Simulate initial asset loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#FAF9F6] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 1. Cinematic Background Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {/* 2. Central Logo & Brand Reveal */}
          <div className="relative flex flex-col items-center">
            {/* The "A" Stroke Animation (Abstract Brand Element) */}
            <svg width="80" height="80" viewBox="0 0 100 100" className="mb-8">
              <motion.path
                d="M50 10 L85 90 L15 90 Z"
                fill="transparent"
                stroke="#C6A769"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Main Logo Text */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-serif text-3xl md:text-5xl text-[#2B2B2B] relative"
            >
              Jewelery
              {/* Subtle Gold Glint Sweep */}
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A769]/20 to-transparent skew-x-12"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 }}
              className="text-[9px] tracking-[0.6em] uppercase text-[#2B2B2B] mt-4 font-light"
            >
              Excellence Since 2026
            </motion.p>
          </div>

          {/* 3. The "Silent" Progress Indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Progress Counter */}
            <div className="overflow-hidden h-6">
               <motion.span 
                 className="text-[#C6A769] font-serif text-lg block"
                 animate={{ y: 0 }}
                 initial={{ y: 20 }}
               >
                 {counter}%
               </motion.span>
            </div>
            
            {/* Ultra-thin Progress Line */}
            <div className="w-48 h-[1px] bg-[#2B2B2B]/5 mt-4 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#C6A769]"
                initial={{ width: "0%" }}
                animate={{ width: `${counter}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>

          {/* 4. Decorative Luxury Accents */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-10 left-10 text-[8px] tracking-[0.3em] uppercase text-[#2B2B2B]/30 hidden md:block"
          >
            Atelier Collection • N° 01
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-10 right-10 text-[8px] tracking-[0.3em] uppercase text-[#2B2B2B]/30 hidden md:block"
          >
            Handcrafted for the Extraordinary
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumPreloader;