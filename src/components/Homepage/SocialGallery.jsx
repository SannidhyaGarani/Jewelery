import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowRight } from 'lucide-react';

const galleryItems = [
  { id: 1, image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop', handle: '@velouraz_official' },
  { id: 2, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop', handle: '@isabelle.m' },
  { id: 3, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop', handle: '@sophia_rossi' },
  { id: 4, image: 'https://plus.unsplash.com/premium_photo-1681276170281-cf50a487a1b7?w=600&auto=format&fit=crop', handle: '@elenor_v' },
  { id: 5, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop', handle: '@maria.d' },
  { id: 6, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop', handle: '@clara.j' },
];

const SocialGallery = () => {
  return (
    <section className="bg-bg-cream py-12 lg:py-24 px-4 sm:px-8 lg:px-16 font-sans relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 md:mb-24 border-b border-text-dark/5 pb-12 md:pb-16 lg:text-center text-left">
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-text-dark/40 text-[9px] md:text-[10px] tracking-[0.6em] uppercase block"
            >
              Velouraz Moments
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-text-dark tracking-tight leading-tight"
            >
              <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-5xl md:text-6xl lg:text-7xl block md:inline mb-2 md:mb-0">The</span> Gallery
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 lg:mt-0 max-w-sm mx-auto lg:mx-0"
          >
             <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-text-dark/40 leading-relaxed font-bold">
                Witness the timeless elegance and sophisticated style of the Velouraz community.
             </p>
          </motion.div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative overflow-hidden luxury-card aspect-square bg-neutral-50"
            >
              <img
                src={item.image}
                alt={`Styled by ${item.handle}`}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-text-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                 <div className="flex items-center gap-3 text-white text-[10px] tracking-[0.2em] uppercase">
                    <Instagram size={14} strokeWidth={1.5} />
                    {item.handle}
                 </div>
              </div>
            </motion.div>
          ))}
          
          {/* Join Us Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex flex-col justify-center items-center text-center p-12 border border-text-dark/5 bg-white/30 backdrop-blur-sm aspect-square"
          >
             <Instagram size={32} strokeWidth={1} className="text-accent mb-6" />
             <h3 className="font-serif text-2xl text-text-dark mb-4">Share Your Sparkle</h3>
             <p className="text-[10px] tracking-[0.2em] uppercase text-text-dark/40 mb-8 leading-relaxed">
                Join our community by sharing your Velouraz moments using #VelourazStyle
             </p>
             <button className="text-[10px] tracking-[0.4em] uppercase text-text-dark border-b border-text-dark/20 pb-2 hover:text-accent hover:border-accent transition-colors">
                Follow Us
             </button>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <button className="group relative pr-12 text-text-dark hover:text-accent transition-colors duration-500">
            <span className="font-sans text-[11px] tracking-[0.4em] uppercase border-b border-text-dark/20 pb-2 group-hover:border-accent">
              Explore Our Instagram
            </span>
            <ArrowRight size={18} className="absolute right-0 bottom-3 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;