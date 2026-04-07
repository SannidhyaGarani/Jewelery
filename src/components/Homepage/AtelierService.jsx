import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Compass, Heart } from 'lucide-react';

const AtelierService = () => {
  const services = [
    {
      id: "01",
      title: "Bespoke Creation",
      description: "Collaborate with our master diamantaire to bring your unique vision to life. From the initial hand-drawn sketch to the final polish.",
      icon: <Compass strokeWidth={1} size={28} />
    },
    {
      id: "02",
      title: "Artisanal Restoration",
      description: "Preserve the legacy of your most cherished heirlooms. Our atelier specializes in reviving the brilliance of antique and vintage pieces.",
      icon: <Award strokeWidth={1} size={28} />
    },
    {
      id: "03",
      title: "Private Curation",
      description: "Gain private access to our vault of rare, unmounted gemstones and exclusive prototypes before they reach the main collection.",
      icon: <Heart strokeWidth={1} size={28} />
    }
  ];

  return (
    <section className="bg-white py-12 lg:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-2">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-32 items-center">
          
          {/* Left: Cinematic Visual Spread */}
          <div className="w-full lg:w-[50%] relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] md:aspect-[4/3] lg:aspect-auto lg:h-[800px] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1573408302315-9c487365bfc6?q=80&w=2070&auto=format&fit=crop" 
                alt="Master Artisan at Work"
                className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110"
              />
              {/* Floating Mini-Card Design */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-[20px] md:rounded-3xl text-white">
                <p className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-bold opacity-60 mb-2">Heritage Promise</p>
                <h4 className="font-serif text-lg md:text-2xl lg:text-3xl leading-tight italic">
                  "We don't just set stones; we preserve the echoes of your most profound moments."
                </h4>
              </div>
            </motion.div>
          </div>

          {/* Right: Service Offerings */}
          <div className="w-full lg:w-[50%] space-y-12 md:space-y-16">
            <div className="space-y-6 text-left">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold text-neutral-400"
              >
                Atelier Privé
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-3xl md:text-6xl lg:text-7xl font-serif text-neutral-900 leading-tight tracking-tight max-w-xl mx-0"
              >
                <span style={{ fontFamily: 'var(--font-script)', fontWeight: 100 }} className="text-5xl md:text-7xl lg:text-8xl block md:mb-0 -mb-2">
                  Crafting
                </span>
                The Extraordinary
              </motion.h2>
            </div>

            <div className="space-y-12 pr-4 lg:pr-24">
              {services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group flex items-start gap-8 cursor-pointer border-b border-neutral-50 pb-8 hover:border-neutral-900 transition-colors duration-700"
                >
                  <span className="font-serif text-xl md:text-2xl text-neutral-300 group-hover:text-neutral-900 transition-colors">
                    {service.id}
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-serif text-neutral-900 group-hover:text-accent transition-colors flex items-center gap-3">
                      {service.title}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-[11px] tracking-[0.2em] uppercase font-bold text-neutral-400 leading-relaxed group-hover:text-neutral-600">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ x: 10 }}
              className="group flex items-center gap-6 text-[12px] tracking-[0.5em] uppercase font-bold text-neutral-900 pt-8"
            >
              Book Private Consultation
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                <ArrowUpRight strokeWidth={1.5} size={20} />
              </div>
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AtelierService;
