import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6 font-sans">
      <div className="text-center space-y-12 max-w-2xl relative">
        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <span className="text-[20rem] font-serif font-bold text-white/[0.02] select-none">404</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter">
            Espace <span className="text-accent italic">Introuvable</span>
          </h1>
          <p className="text-white/40 text-[11px] tracking-[0.5em] uppercase max-w-md mx-auto leading-relaxed">
            The masterpiece you are looking for has been moved to our private archives or never existed in this dimension.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-accent hover:text-white transition-all duration-500 rounded-full group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Return to Atelier
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
