import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Plus } from 'lucide-react';

const galleryItems = [
  { id: 1, image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop', handle: '@celia_v', size: 'large' },
  { id: 2, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop', handle: '@isabelle.m', size: 'small' },
  { id: 3, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop', handle: '@sophia_rossi', size: 'medium' },
  { id: 4, image: 'https://plus.unsplash.com/premium_photo-1681276170281-cf50a487a1b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D', handle: '@elenor_v', size: 'small' },
  { id: 5, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop', handle: '@maria.d', size: 'large' },
  { id: 6, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop', handle: '@clara.j', size: 'medium' },
  { id: 7, image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop', handle: '@nora_vince', size: 'small' },
  { id: 8, image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D', handle: '@grace_f', size: 'medium' },
  { id: 8, image: 'https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D', handle: '@grace_f', size: 'large' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const SocialGallery = () => {
  return (
    <section className="bg-[#FAF9F6] py-16 md:py-24 px-6 lg:px-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#C6A769] text-[10px] md:text-xs tracking-[0.6em] uppercase font-medium mb-4 block"
          >
            Community Spotlight
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] font-normal"
            >
              Styled <span className="italic">by You</span>
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

        {/* Masonry-Style Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`relative group overflow-hidden break-inside-avoid shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(198,167,105,0.08)] ${
                item.size === 'large' ? 'aspect-[4/5]' : item.size === 'medium' ? 'aspect-square' : 'aspect-[5/4]'
              }`}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={`Styled by ${item.handle}`}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Ultra-Minimal Overlay (Revealed on Hover) */}
              <div className="absolute inset-0 bg-white/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-between p-6 pointer-events-none">
                
                {/* Top: Corner Accent */}
                <div className="flex justify-end">
                   <Plus strokeWidth={1} className="w-5 h-5 text-[#C6A769]/50" />
                </div>
                
                {/* Center: Brand Social Icon */}
                <div className="flex-grow flex items-center justify-center">
                   <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileHover={{ opacity: 1, scale: 1 }}
                     className="bg-white p-4 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-[#2B2B2B]/5"
                   >
                     <Instagram strokeWidth={1} className="w-6 h-6 text-[#2B2B2B]" />
                   </motion.div>
                </div>

                {/* Bottom: Creator Handle */}
                <div className="flex justify-start">
                  <span className="text-[#2B2B2B] text-xs md:text-sm tracking-[0.2em] uppercase font-light">
                    {item.handle}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <button className="group relative px-9 py-3.5 border border-[#2B2B2B]/30 text-[#2B2B2B] text-xs tracking-[0.3em] uppercase font-normal overflow-hidden transition-all duration-500 hover:border-[#C6A769] hover:text-[#C6A769] backdrop-blur-sm bg-[#FAF9F6]/50">
            Showcase Your Style
          </button>
        </div>

      </div>
    </section>
  );
};

export default SocialGallery;