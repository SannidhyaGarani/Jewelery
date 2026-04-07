import React from 'react';
import { motion } from 'framer-motion';

const EditorialBanner = () => {
  return (
    <section className="px-4 lg:px-10 py-12">
      <div className="relative w-full h-[550px] md:h-[600px] lg:h-[700px] rounded-[24px] md:rounded-[32px] overflow-hidden group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1588444839799-eb6cd27e3e20?q=80&w=2070&auto=format&fit=crop" 
            alt="Diamonds Macro"
            className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-900/50 md:bg-neutral-900/40" /> {/* Darker overlay for readability */}
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-4xl space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {['JEWELLERY', 'PROFILE'].map(tag => (
              <span key={tag} className="bg-white/10 backdrop-blur-md border border-white/20 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[9px] tracking-[0.2em] font-bold text-white uppercase">
                {tag}
              </span>
            ))}
          </motion.div>

          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-white leading-[1.2] md:leading-[1.1] tracking-tight"
            >
              <span 
                style={{ fontFamily: 'var(--font-script)', fontWeight: 100 }} 
                className="text-5xl md:text-7xl lg:text-8xl block mb-2 md:mb-4"
              >
                From Mine, to Klein,
              </span>
              <span className="text-2xl md:text-4xl lg:text-6xl block italic font-light">
                to You: Mark Klein and the Modern Evolution of a Diamond Dynasty
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-xs md:text-base font-sans leading-relaxed max-w-xl line-clamp-4 md:line-clamp-none"
            >
              Mark, known to his followers as @therealdiamantaire, greets me with the easy confidence of someone who has grown up surrounded by diamonds. His desk tells a deeper story, however—part archive, part playground for a third-generation diamantaire who still finds wonder in every facet.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-white/40 text-[10px] tracking-[0.3em] font-bold uppercase pt-4"
          >
            BY KATERINA PEREZ
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBanner;
