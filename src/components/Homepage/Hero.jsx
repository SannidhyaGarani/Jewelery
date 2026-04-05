import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, ChevronDown, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const { scrollY } = useScroll();

  // Subtle parallax effect for the content
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#FAF9F6] font-sans">
      {/* 1. Video Background with slow scale-in effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Replace this source with your actual cinematic jewelry video */}
          <source
            src="img/video1.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* 2. Premium Overlays */}
      {/* Cinematic Grain / Noise Effect */}
     {/* Cinematic Grain / Noise Effect */}
<div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>

{/* NEW: Top-down soft ivory gradient specifically to make the header pop */}
<div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#FAF9F6]/95 via-[#FAF9F6]/60 to-transparent pointer-events-none z-20" />

{/* Soft Ivory & Contrast Gradient Overlay (Adjusted for better balance) */}
<div className="absolute inset-0 bg-gradient-to-tr from-[#2B2B2B]/20 via-transparent to-[#FAF9F6]/20 pointer-events-none" />
<div className="absolute inset-0 bg-[#FAF9F6]/5 mix-blend-soft-light pointer-events-none" />
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF9F6]/90 pointer-events-none" />
      {/* 3. Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6"
      >
        {/* Sub-tagline */}
        

        {/* Main Heading with Word-by-Word Reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#2B2B2B] font-normal leading-tight max-w-4xl"
          >
            Timeless Elegance, <span className="italic font-light">Redefined</span>
          </motion.h1>
        </div>

        {/* Subtext with subtle fade-up */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[#2B2B2B]/70 text-sm md:text-base font-light tracking-[0.1em] mb-8 max-w-xl leading-relaxed"
        >
          Crafted for those who wear confidence. <br className="hidden md:block" /> 
          Discover our curated collections available in 120+ countries.
        </motion.p>

        {/* CTA Buttons with refined hover states */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center font-sans"
        >
          {/* Gold Button */}
          <button className="group relative px-10 py-4 bg-[#C6A769] text-white text-[10px] tracking-[0.3em] uppercase font-medium overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(198,167,105,0.2)]">
            <span className="relative z-10 flex items-center gap-3">
              Explore Collection
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          {/* Outline Button */}
          <button className="group px-10 py-4 border border-[#2B2B2B]/20 text-[#2B2B2B] text-[10px] tracking-[0.3em] uppercase font-medium hover:border-[#C6A769] hover:text-[#C6A769] transition-all duration-700 backdrop-blur-[2px]">
            Watch Story
          </button>
        </motion.div>
      </motion.div>

      {/* 4. Extra Premium Controls & Indicators */}
      
      {/* Video Control (Bottom Left) */}
      <div className="absolute bottom-10 left-6 md:left-12 z-20">
        <button
          onClick={togglePlay}
          className="w-10 h-10 border border-[#2B2B2B]/20 rounded-full flex items-center justify-center text-[#2B2B2B] hover:text-[#C6A769] hover:border-[#C6A769] transition-all duration-300 backdrop-blur-sm bg-[#FAF9F6]/10"
          aria-label="Toggle video playback"
        >
          {isPlaying ? <Pause strokeWidth={1.5} className="w-4 h-4" /> : <Play strokeWidth={1.5} className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Animated Scroll Indicator (Bottom Center) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-[#2B2B2B]/60 text-[10px] tracking-[0.2em] uppercase font-light">Scroll</span>
        <div className="w-[1px] h-10 bg-[#2B2B2B]/10 relative overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, 40, 0],
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-full h-1/3 bg-[#C6A769] absolute top-0"
          />
        </div>
      </div>

      {/* Socials/Affiliations (Bottom Right - Optional touch of class) */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20 hidden md:block">
        <span className="text-[#2B2B2B]/40 text-xs tracking-wider font-light">EST. 2026</span>
      </div>
    </section>
  );
};

export default Hero;