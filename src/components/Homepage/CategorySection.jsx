import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    description: "Exquisite hand-finished bands, from minimalist gold-plated to intricate kundan pieces.",
    link: "/category/rings"
  },
  {
    id: 2,
    name: "Necklace",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    description: "Statement chokers and delicate pendants crafted with American diamonds and semi-precious stones.",
    link: "/category/necklace"
  },
  {
    id: 3,
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    description: "Dazzling jhumkas and contemporary studs that illuminate every occasion.",
    link: "/category/earrings"
  },
  {
    id: 4,
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    description: "Graceful bangles and contemporary cuffs for the modern visionary's wrist.",
    link: "/category/bracelet"
  }
];

const CategorySection = () => {
  return (
    <section className="bg-[#FDFAF5] py-20 lg:py-28 overflow-hidden relative">
      {/* Subtle edge lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#640D14]/5 hidden 2xl:block pointer-events-none" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#640D14]/5 hidden 2xl:block pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] tracking-[0.5em] text-[#640D14] uppercase font-bold mb-4 block"
            >
              Essential Collections
            </motion.span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#2C1A0E] leading-tight tracking-tighter">
              <span style={{ fontFamily: "var(--font-script)", fontWeight: 100 }} className="text-[#640D14]/70 block md:inline">Browse</span> by Category
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[11px] md:text-sm text-[#5C3D1E]/60 max-w-xs leading-relaxed uppercase font-medium tracking-widest"
          >
            Explore our curated ranges of fine jewellery, crafted with precision and passion.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 sm:pb-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex-shrink-0 w-[85vw] sm:w-auto snap-center aspect-[4/5] sm:h-[500px] lg:h-[550px] overflow-hidden rounded-[24px] border border-[#640D14]/10 bg-white cursor-pointer transition-all duration-700 block"
            >
              <Link to={category.link} className="absolute inset-0 z-30" aria-label={`Explore ${category.name}`} />

              {/* Image with subtle zoom */}
              <div className="absolute inset-0 z-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                />
                
                {/* IMPROVED VISIBILITY OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/80 via-[#2C1A0E]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                
                <div className="absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-[2px] bg-gradient-to-t from-[#FDFAF5] via-[#FDFAF5]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-10" />
              </div>

              {/* Number */}
              <div className="absolute top-8 left-8 text-white/30 text-4xl font-serif italic z-20 pointer-events-none group-hover:text-[#640D14]/40 transition-colors">
                0{category.id}
              </div>

              {/* Content Container */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out group-hover:text-[#640D14]">
                  {category.name}
                </h3>

                <div className="overflow-hidden">
                  <p className="text-[13px] text-white/90 leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-[#5C3D1E] transition-all duration-500 delay-100 mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Call to Action */}
                <div className="flex items-center gap-3 text-white group-hover:text-[#640D14] text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500">
                  <span>Explore</span>
                  <div className="w-8 h-[1px] bg-white/40 group-hover:w-12 group-hover:bg-[#640D14] transition-all duration-500" />
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />
    </section>
  );
};


export default CategorySection;