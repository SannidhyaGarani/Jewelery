import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    description: "Symbolizing eternal beauty and timeless commitment.",
    link: "/category/rings"
  },
  {
    id: 2,
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    description: "Elegant pieces that grace your neck with sophistication.",
    link: "/category/necklaces"
  },
  {
    id: 3,
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    description: "Dazzling accents that illuminate your every expression.",
    link: "/category/earrings"
  },
  {
    id: 4,
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    description: "Graceful adornments for the modern woman's wrist.",
    link: "/category/bracelets"
  }
];

const CategorySection = () => {
  return (
    <section className="bg-[#0A0A0A] py-20 lg:py-28 overflow-hidden relative selection:bg-accent/30 selection:text-white">
      {/* Subtle cinematic edge lines for premium feel */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-white/[0.02] hidden 2xl:block pointer-events-none" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-white/[0.02] hidden 2xl:block pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header - UNCHANGED */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mb-4 block"
            >
              Essential Collections
            </motion.span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tighter">
              <span style={{ fontFamily: "var(--font-script)", fontWeight: 100 }} className="text-accent/80 block md:inline">Browse</span> by Category
            </h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[11px] md:text-sm text-white/50 max-w-xs leading-relaxed uppercase font-medium tracking-widest"
          >
            Explore our curated ranges of fine jewellery, crafted with precision and passion.
          </motion.p>
        </div>

        {/* Categories Carousel (Mobile) / Grid (Desktop) */}
        <div 
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory pb-8 sm:pb-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex-shrink-0 w-[80vw] sm:w-auto snap-center aspect-[3/4] sm:aspect-auto sm:h-[420px] lg:h-[480px] overflow-hidden rounded-[20px] border border-white/5 bg-[#0f0f0f] cursor-pointer hover:border-accent/30 transition-colors duration-700 block"
            >
              <Link to={category.link} className="absolute inset-0 z-20" aria-label={`Explore ${category.name}`} />
              
              {/* Image with slower cinematic zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-90 transition-all duration-[2s] ease-out"
                />
                {/* Refined Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
              </div>

              {/* Number indicator - Sleeker & integrated */}
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 text-5xl font-serif italic transition-colors duration-700 z-10 pointer-events-none">
                0{category.id}
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex flex-col justify-end z-10 pointer-events-none">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <h3 className="font-serif text-3xl md:text-4xl text-white/90 group-hover:text-white mb-3 transition-colors">
                    {category.name}
                  </h3>
                  
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-700">
                    <p className="text-[12px] text-white/60 leading-relaxed max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 mb-6">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-accent text-[9px] font-bold tracking-[0.3em] uppercase group/link">
                    Explore
                    <motion.div
                      className="w-6 h-[1px] bg-accent/60 group-hover:w-10 group-hover:bg-accent transition-all duration-500"
                    />
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Required to hide scrollbar on webkit browsers for the horizontal scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
};

export default CategorySection;