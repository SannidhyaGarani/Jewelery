import React from 'react';
import { Gem, Heart, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-bg-cream pt-48 pb-32 font-sans relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 relative z-10">
        {/* Editorial Hero */}
        <div className="editorial-grid items-center mb-48">
          <div className="col-span-12 lg:col-span-5 space-y-12">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="block text-[10px] tracking-[0.6em] uppercase text-text-dark/40"
            >
              The Legacy of Velouraz
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-dark leading-tight tracking-tight"
            >
              <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-5xl md:text-6xl lg:text-7xl">Crafting</span> <br />
              <span className="pl-12 lg:pl-24">Eternity</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-sm md:text-base text-text-dark/60 font-light tracking-wide leading-loose max-w-lg lg:ml-24"
            >
              Velouraz was born from a singular vision: to create jewellery that transcends time. Our atelier combines traditional craftsmanship with contemporary brilliance, result in pieces that are as unique as the souls that wear them.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="col-span-12 lg:col-span-7 mt-16 lg:mt-0"
          >
            <div className="aspect-[16/9] lg:aspect-[4/5] overflow-hidden bg-neutral-100 relative luxury-card">
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200" 
                alt="Jewelry Atelier" 
                className="w-full h-full object-cover grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-text-dark/5" />
            </div>
          </motion.div>
        </div>

        {/* The Essence - Magazine Style Grid */}
        <div className="grid lg:grid-cols-3 gap-24 mb-48 border-t border-text-dark/5 pt-24">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl tracking-wide">01. Bespoke Masterpieces</h2>
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-dark/50 leading-relaxed">
              Every detail is meticulously refined by our master artisans, ensuring a perfect equilibrium of form and function.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-3xl tracking-wide">02. Ethical Brilliance</h2>
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-dark/50 leading-relaxed">
              We exclusively source conflict-free gems and sustainable metals, adhering to the highest standards of integrity.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-3xl tracking-wide">03. Eternal Heritage</h2>
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-dark/50 leading-relaxed">
              Each Velouraz creation is accompanied by our lifetime guarantee—a testament to our commitment to excellence.
            </p>
          </div>
        </div>

        {/* Large Cinematic Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative py-48 bg-text-dark text-bg-cream overflow-hidden px-12"
        >
          <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
            <Sparkles className="mx-auto text-accent mb-8" size={32} strokeWidth={1} />
            <h2 className="text-4xl md:text-7xl font-serif leading-tight tracking-tight">
              "We don't just craft jewellery; we <br />
              <span className="italic text-accent">sculpt light</span> into memories."
            </h2>
            <p className="font-sans text-[10px] tracking-[0.6em] uppercase text-bg-cream/40">The Velouraz Philosophy</p>
          </div>
        </motion.div>

        {/* Closing Image & Quote */}
        <div className="grid lg:grid-cols-2 gap-32 items-center mt-48">
           <div className="order-2 lg:order-1">
              <h3 className="font-serif text-5xl mb-12 tracking-wide leading-tight text-text-dark/90">Curating the Rare and Extraordinary</h3>
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-text-dark/60 leading-loose mb-12">
                Our journey takes us across the globe to discover the most exceptional gemstones, bringing their inherent beauty to life in our London atelier.
              </p>
              <div className="flex items-center gap-6">
                 <Award size={40} strokeWidth={0.5} className="text-accent" />
                 <div>
                    <p className="font-serif text-xl">Awarded Excellence</p>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-text-dark/40 font-medium">Fine Jewellery Design 2026</p>
                 </div>
              </div>
           </div>
           <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] bg-neutral-100 overflow-hidden luxury-card">
                 <img src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1920" className="w-full h-full object-cover" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;