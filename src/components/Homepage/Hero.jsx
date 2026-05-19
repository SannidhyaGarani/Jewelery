
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full bg-[#F8F4EF] overflow-hidden">
      {/* Main Hero Content */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 flex flex-col lg:flex-row items-center min-h-[600px] lg:min-h-[800px] pt-10 lg:pt-0">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start z-10 space-y-6 lg:space-y-8 py-10 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-[#7B6D63] uppercase block">
              CURATED. INSPIRED. TIMELESS.
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#2A2623] leading-[1.1] md:leading-[1.05]">
              Jewellery that <br />
              <span className="text-[#7A0E2E] italic">Travels the World</span>
            </h1>
            <p className="text-[14px] md:text-[16px] text-[#7B6D63] font-serif max-w-md leading-relaxed">
              Handpicked designs from iconic cultures, crafted for the modern you. 
              Discover pieces that tell a story of heritage and elegance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              to="/shop" 
              className="bg-[#7A0E2E] text-[#FFFDF9] px-10 py-4 text-[11px] tracking-[0.2em] font-bold uppercase hover:bg-[#5E0B24] transition-all duration-500 shadow-xl flex items-center gap-3 group"
            >
              Explore Collections
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>

        {/* Right: Image Content */}
        <div className="w-full lg:w-1/2 relative h-[400px] md:h-[600px] lg:h-[800px]">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Jewellery Model" 
              className="w-full h-full object-cover object-[center_20%] lg:object-center"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4EF] via-transparent to-transparent lg:block hidden" />
          </motion.div>

          {/* Floating Element for Premium Feel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-10 right-4 lg:right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 lg:p-6 rounded-2xl hidden md:block"
          >
            <p className="text-[9px] tracking-[0.3em] font-bold text-[#7A0E2E] uppercase mb-1">Featured Piece</p>
            <p className="text-sm font-serif text-[#2A2623] italic">The Heritage Choker</p>
          </motion.div>
        </div>
      </div>

      {/* USP Bar */}
      <div className="w-full bg-[#F4EEE8] border-t border-[#D8CBBE]/30">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-10 lg:py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            
            {/* Free Shipping */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="p-3 bg-white rounded-full text-[#7A0E2E] shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                <Truck size={22} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-[0.1em] font-bold text-[#2A2623] uppercase">Free Shipping</h4>
                <p className="text-[10px] text-[#7B6D63] font-serif">Across India</p>
              </div>
            </div>

            {/* Premium Quality */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="p-3 bg-white rounded-full text-[#7A0E2E] shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                <Star size={22} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-[0.1em] font-bold text-[#2A2623] uppercase">Premium Quality</h4>
                <p className="text-[10px] text-[#7B6D63] font-serif">Crafted to last</p>
              </div>
            </div>

            {/* Secure Packaging */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="p-3 bg-white rounded-full text-[#7A0E2E] shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                <ShieldCheck size={22} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-[0.1em] font-bold text-[#2A2623] uppercase">Secure Packaging</h4>
                <p className="text-[10px] text-[#7B6D63] font-serif">Perfectly packed</p>
              </div>
            </div>

            {/* Easy Returns */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="p-3 bg-white rounded-full text-[#7A0E2E] shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                <RefreshCw size={22} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-[0.1em] font-bold text-[#2A2623] uppercase">Easy Returns</h4>
                <p className="text-[10px] text-[#7B6D63] font-serif">Hassle-free</p>
              </div>
            </div>

            {/* 100% Secure Payments */}
            <div className="flex flex-col items-center text-center space-y-3 lg:col-span-1 md:col-span-3 group">
              <div className="p-3 bg-white rounded-full text-[#7A0E2E] shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                <Lock size={22} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] tracking-[0.1em] font-bold text-[#2A2623] uppercase">100% Secure Payments</h4>
                <p className="text-[10px] text-[#7B6D63] font-serif">Shop with confidence</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
