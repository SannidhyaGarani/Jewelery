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
    <section className="bg-[#FDFAF5] py-10 lg:py-16 px-6 lg:px-16 font-sans relative overflow-hidden border-t border-[#640D14]/10">
      {/* Decorative lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#640D14]/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#640D14]/5 hidden lg:block" />

      <div className="max-w-[1800px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 border-b border-[#640D14]/10 pb-12 md:pb-16 gap-8">
          <div className="space-y-4 md:space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#640D14]/60 text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.6em] uppercase block font-bold"
            >
              The Velouraz Ethos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#2C1A0E] tracking-tight leading-[1.1]"
            >
              <span style={{ fontFamily: "var(--font-script)", fontWeight: 100 }} className="text-5xl md:text-6xl lg:text-8xl text-[#640D14]/80">Our</span> Heritage
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:mt-0 max-w-sm"
          >
            <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#5C3D1E]/60 leading-relaxed font-bold">
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
                className={`group relative py-10 lg:p-12 border-b border-[#640D14]/10 lg:border-b-0
                  ${index !== features.length - 1 ? 'lg:border-r lg:border-[#640D14]/10' : ''}
                  hover:bg-[#F5EDD8]/60 transition-colors duration-1000`}
              >
                {/* Ghost Number */}
                <span className="absolute top-10 right-10 font-serif text-8xl text-[#640D14]/5 select-none pointer-events-none group-hover:text-[#640D14]/10 transition-colors duration-1000">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="relative mb-12 inline-block">
                  <div className="text-[#640D14] relative z-10 group-hover:scale-110 transition-transform duration-1000 ease-out">
                    <IconComponent strokeWidth={0.75} size={48} />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-[#640D14]/20 rounded-full scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000 ease-out" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#2C1A0E] mb-6 tracking-wide group-hover:text-[#640D14] group-hover:translate-x-2 transition-all duration-700">
                    {item.title}
                  </h3>
                  <p className="text-[#5C3D1E]/60 text-[11px] tracking-[0.15em] uppercase font-medium leading-loose max-w-none md:max-w-[240px] group-hover:text-[#5C3D1E] transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <motion.div className="absolute bottom-0 left-0 h-[2px] bg-[#640D14] w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


export default WhyChooseUs;
