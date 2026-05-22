import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Gem,
    title: "Premium Materials",
    description: "Finest stones & metals"
  },
  {
    icon: Sparkles,
    title: "Exquisite Craftsmanship",
    description: "Attention to every detail"
  },
  {
    icon: ShieldCheck,
    title: "Anti-Tarnish Coating",
    description: "Long-lasting shine"
  },
  {
    icon: Heart,
    title: "Skin Friendly",
    description: "Nickel & lead free"
  },
  {
    icon: Award,
    title: "Trusted by Thousands",
    description: "4.9+ customer rating"
  }
];

const QualitySection = () => {
  return (
    <section
      className="min-h-screen w-full relative flex items-center bg-cover bg-center bg-no-repeat py-16 lg:py-24 overflow-hidden border-t border-[#D8CBBE]/30"
      style={{
        backgroundImage: `url('img/bg.jpeg')`
      }}
    >
      {/* Overlay for better text readability - reduced to 5% for 95% image visibility */}
      <div className="absolute inset-0 bg-black/5 lg:bg-gradient-to-r lg:from-[#F8F4EF]/40 lg:via-[#F8F4EF]/10 lg:to-transparent" />

      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center">

          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 space-y-12 pr-0 lg:pr-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-[1px] bg-[#7A0E2E]" />
                <span className="text-[14px] md:text-[12px] tracking-[0.4em] font-bold text-[#7B6D63] uppercase">
                  WHY VELOURAZ?
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A2623] leading-tight"
              >
                Quality You <span className="text-[#7A0E2E] italic">Can Trust</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#7B6D63] font-serif text-base leading-relaxed max-w-lg"
              >
                We take pride in our uncompromising standards of craftsmanship and the meticulous selection of materials.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-white rounded-xl text-[#7A0E2E] shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500 shrink-0">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#2A2623] uppercase tracking-wide group-hover:text-[#7A0E2E] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-[14px] text-[#7B6D63] font-serif">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Repositioned Decorative Floating Card inside the left column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="bg-white p-4 rounded-2xl shadow-xl max-w-[280px] border border-[#D8CBBE]/20"
            >
              <p className="text-4xl font-serif text-[#7A0E2E] mb-1">100%</p>
              <p className="text-[14px] tracking-[0.2em] font-bold text-[#2A2623] uppercase">Satisfaction Guaranteed</p>
              <p className="text-[15px] text-[#7B6D63] font-serif mt-2">We stand behind every piece we create with our lifetime promise.</p>
            </motion.div>
          </div>

          {/* Right Side: Empty to showcase the background image */}
          <div className="w-full lg:w-1/2 hidden lg:block" />

        </div>
      </div>
    </section>
  );
};

export default QualitySection;