import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#2C1A0E] flex items-center justify-center px-6 font-sans overflow-hidden selection:bg-[#640D14] selection:text-white">
      <div className="text-center space-y-16 max-w-2xl relative">
        {/* Abstract Background Element */}
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-60 -left-60 w-[500px] h-[500px] bg-[#640D14]/5 rounded-full blur-[120px] -z-10"
        />
        
        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.02, scale: 1 }}
            transition={{ duration: 2 }}
            className="text-[25rem] md:text-[35rem] font-serif font-black text-[#640D14] select-none pointer-events-none tracking-tighter"
          >
            404
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="space-y-10"
        >
          <div className="flex justify-center mb-12">
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-[#640D14]/5 rounded-[32px] flex items-center justify-center text-[#640D14] border border-[#640D14]/10 shadow-sm"
            >
              <Compass size={40} strokeWidth={1} />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-none uppercase font-bold">
            Lost in <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-[#640D14]/80 lowercase text-6xl md:text-9xl block mt-2">Elegance</span>
          </h1>
          
          <p className="text-[#5C3D1E]/40 text-[11px] md:text-[13px] tracking-[0.5em] uppercase max-w-md mx-auto leading-relaxed font-black">
            The page you seek has vanished into our private collection. 
            Perhaps it was never meant to be seen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="pt-12"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-5 px-12 py-5 bg-[#640D14] text-white text-[11px] tracking-[0.3em] font-black uppercase hover:bg-[#2C1A0E] transition-all duration-500 rounded-[28px] group shadow-2xl shadow-[#640D14]/20 active:scale-95"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-500" />
            Back to House
          </Link>
        </motion.div>
      </div>
    </div>
  );
};


export default NotFound;
