import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Feather, Globe, Award } from 'lucide-react';

const features = [
  {
    icon: Gem,
    title: "Artisanal Excellence",
    description: "Every masterpiece is meticulously handcrafted by our master artisans, merging centuries-old techniques with contemporary vision."
  },
  {
    icon: Feather,
    title: "Pure Integrity",
    description: "We use only the finest ethically sourced materials, ensuring a lifetime of brilliance and absolute comfort for the most sensitive skin."
  },
  {
    icon: Globe,
    title: "Global Stewardship",
    description: "Experience white-glove delivery worldwide, encased in our signature sustainable packaging that reflects our commitment to the planet."
  },
  {
    icon: Award,
    title: "Legacy Promise",
    description: "Our commitment transcends the purchase. We offer a lifetime guarantee of authenticity and design integrity for every Velouraz creation."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#0A0A0A] py-10 lg:py-14 px-6 lg:px-16 font-sans relative overflow-hidden border-t border-white/5">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-white/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-white/5 hidden lg:block" />

      <div className="max-w-[1800px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 border-b border-white/5 pb-12 md:pb-16 gap-8">
          <div className="space-y-4 md:space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white/20 text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.6em] uppercase block font-bold"
            >
              The Velouraz Ethos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-7xl text-accent tracking-tight leading-[1.1]"
            >
              <span style={{ fontFamily: "var(--font-script)", fontWeight: 100 }} className="text-5xl md:text-6xl lg:text-8xl text-accent/80">Our</span> Heritage
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:mt-0 max-w-sm"
          >
            <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white leading-relaxed font-bold">
              Discover the pillars of excellence that define our house and our unwavering commitment to the art of fine jewellery.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative p-0 py-10 lg:p-16 border-b border-white/10 lg:border-b-0 
                  ${index !== features.length - 1 ? 'lg:border-r lg:border-white/10' : ''} 
                  hover:bg-white/[0.02] transition-colors duration-1000`}
              >
                {/* Background "Ghost" Numbering */}
                <span className="absolute top-10 right-10 font-serif text-8xl text-white/[0.05] select-none pointer-events-none group-hover:text-white/[0.1] transition-colors duration-1000">
                  0{index + 1}
                </span>

                {/* Icon with Decorative Halo */}
                <div className="relative mb-12 inline-block">
                  <div className="text-accent relative z-10 group-hover:scale-110 transition-transform duration-1000 ease-out">
                    <IconComponent strokeWidth={0.75} size={48} />
                  </div>
                  {/* The Halo Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-accent/20 rounded-full scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000 ease-out" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-6 tracking-wide group-hover:text-accent group-hover:translate-x-2 transition-all duration-700">
                    {item.title}
                  </h3>

                  <p className="text-white text-[11px] tracking-[0.2em] uppercase font-medium leading-loose max-w-none md:max-w-[240px] group-hover:text-neutral-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[3px] bg-accent w-0 group-hover:w-full transition-all duration-1000 ease-in-out"
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
