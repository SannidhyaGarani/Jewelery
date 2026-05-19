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
    <section className="bg-[#F8F4EF] py-20 lg:py-32 overflow-hidden relative border-t border-[#D8CBBE]/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Content */}
        <div className="w-full lg:w-1/2 space-y-12">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-[#7B6D63] uppercase block"
            >
              WHY VELOURAZ?
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-[#2A2623]"
            >
              Quality You <span className="text-[#7A0E2E] italic">Can Trust</span>
            </motion.h2>
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
                <div className="p-3 bg-white rounded-xl text-[#7A0E2E] shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#2A2623] uppercase tracking-wide group-hover:text-[#7A0E2E] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[#7B6D63] font-serif">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-[600px] shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200" 
              alt="Quality Craftsmanship" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#7A0E2E]/20 to-transparent" />
          </motion.div>
          
          {/* Decorative Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-xl hidden md:block max-w-[240px]"
          >
            <p className="text-4xl font-serif text-[#7A0E2E] mb-2">100%</p>
            <p className="text-[10px] tracking-[0.2em] font-bold text-[#2A2623] uppercase">Satisfaction Guaranteed</p>
            <p className="text-[11px] text-[#7B6D63] font-serif mt-2">We stand behind every piece we create with our lifetime promise.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default QualitySection;
