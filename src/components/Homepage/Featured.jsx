import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    title: "Bridal Collection",
    description: "Timeless diamond and gold sets designed for your unforgettable day.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Everyday Elegance",
    description: "Effortless, delicate pieces crafted to elevate your daily style.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Royal Heritage",
    description: "Grand statement jewelry inspired by classic regal masterpieces.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Modern Minimalist",
    description: "Clean lines and abstract forms for the contemporary aesthetic.",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
  },
];

const FeaturedCollections = () => {
  return (
    <section className="bg-[#FAF9F6] py-16 md:py-24 px-6 lg:px-12 font-sans relative overflow-hidden">
      {/* Subtle Cinematic Grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#C6A769] text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium mb-4 block"
          >
            Curated For You
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-[#2B2B2B] font-normal"
            >
              Our Signature <span className="italic">Collections</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 h-[1px] bg-[#C6A769]/50 mx-auto"
          ></motion.div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {collections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              {/* Image Container with Zoom and Gold Overlay */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE8E3] shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(198,167,105,0.1)]">
                
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Gold Shimmer Overlay */}
                <div className="absolute inset-0 bg-[#C6A769] opacity-0 mix-blend-color transition-opacity duration-500 group-hover:opacity-20" />
                
                {/* Dark Contrast Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Subtle outer border on hover */}
                <div className="absolute inset-4 border border-white/0 transition-all duration-500 group-hover:border-white/20" />
              </div>

              {/* Text Content (Placed below for heavy white-space editorial feel) */}
              <div className="mt-6 text-center px-2">
                <h3 className="font-serif text-lg text-[#2B2B2B] group-hover:text-[#C6A769] transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-[#2B2B2B]/60 text-xs md:text-sm font-light mt-2 tracking-wide leading-relaxed">
                  {item.description}
                </p>
                
                {/* Animated Call to Action */}
                <div className="mt-4 flex justify-center items-center gap-2 text-[#C6A769] text-xs tracking-wider uppercase font-normal opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA to view all */}
        <div className="text-center mt-12 md:mt-16">
          <button className="group text-[#2B2B2B] text-xs md:text-sm tracking-[0.3em] uppercase font-normal relative pb-2 overflow-hidden">
            View All Collections
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2B2B]/20"></span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A769] transition-all duration-500 group-hover:w-full"></span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollections;