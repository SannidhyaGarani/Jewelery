import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumPreloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // A non-linear, "sophisticated" counter that pauses at 99 for tension
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 99) {
          const jump = Math.random() * 3; 
          return Math.min(prev + jump, 99);
        }
        return prev;
      });
    }, 40);

    const timeout = setTimeout(() => {
      setCounter(100);
      setLoading(false);
      if (onComplete) setTimeout(onComplete, 1200);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Luxury Ease: ultra-slow out, fast center, ultra-slow in
  const luxuryEase = [0.19, 1, 0.22, 1];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden selection:bg-none"
        >
          {/* 1. Subtle Caustics (Light reflecting off jewelry) */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.08, 0.03],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C6A664_0%,transparent_50%)]"
          />

          {/* 2. Thin Editorial Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: luxuryEase }}
            className="absolute inset-8 border border-white/[0.03] pointer-events-none"
          />

          {/* 3. Central Brand Reveal */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Masking Effect */}
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: luxuryEase }}
                className="px-4"
              >
                <img 
                  src="/img/logo.png" 
                  alt="Velouraz" 
                  className="h-16 sm:h-20 w-auto object-contain brightness-110 contrast-125" 
                />
              </motion.div>
            </div>

            {/* Letter Spacing Animation - The hallmark of luxury */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 0.6, letterSpacing: "1.2em" }}
              transition={{ duration: 3, ease: luxuryEase }}
              className="flex flex-col items-center"
            >
              <span className="text-[9px] uppercase text-white font-light ml-[1.2em]">
                Excellence Personified
              </span>
            </motion.div>
          </div>

          {/* 4. The "Golden Ratio" Loader */}
          <div className="absolute bottom-20 flex flex-col items-center space-y-6">
            {/* The Hairline Loader (0.5px height) */}
            <div className="w-40 h-[1px] bg-white/[0.05] relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#C6A664]"
                initial={{ width: "0%" }}
                animate={{ width: `${counter}%` }}
                transition={{ ease: "linear" }}
              />
              
              {/* Floating Light Spark (Diamond Glint) */}
              <motion.div 
                animate={{ 
                  left: `${counter}%`,
                  opacity: [0, 1, 0] 
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-white rounded-full blur-[4px]"
              />
            </div>

            {/* Vertical Counter - Inspired by high-end watch complications */}
            <div className="h-4 overflow-hidden text-[#C6A664]">
              <motion.div
                animate={{ y: `-${counter}%` }}
                className="flex flex-col items-center font-serif italic text-xs tabular-nums"
              >
                {Array.from({ length: 101 }).map((_, i) => (
                  <span key={i} className="h-4">{i}</span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* 5. Minimalist Metadata */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-12">
            <span className="text-[7px] tracking-[0.5em] uppercase text-white/20">London</span>
            <span className="text-[7px] tracking-[0.5em] uppercase text-white/20">Paris</span>
            <span className="text-[7px] tracking-[0.5em] uppercase text-white/20">Uluberia</span>
          </div>

          {/* Background Noise for texture */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumPreloader;