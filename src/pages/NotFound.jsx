import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6 font-sans overflow-hidden">
      <div className="text-center space-y-12 max-w-2xl relative">
        {/* Abstract Background Element */}
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10"
        />
        
        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-[20rem] md:text-[30rem] font-serif font-bold text-white select-none pointer-events-none"
          >
            404
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Compass size={48} className="text-accent/50 stroke-[1px]" />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter leading-tight">
            Lost in <span className="text-accent italic">Elegance</span>
          </h1>
          
          <p className="text-white/40 text-[11px] md:text-[13px] tracking-[0.4em] uppercase max-w-md mx-auto leading-relaxed font-medium">
            The page you seek has vanished into our private collection. 
            Perhaps it was never meant to be seen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="pt-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-4 px-10 py-4 bg-white text-black text-[11px] tracking-[0.2em] font-bold uppercase hover:bg-accent hover:text-white transition-all duration-500 rounded-full group shadow-2xl shadow-white/5"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
