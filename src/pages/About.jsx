import React from 'react';
import { Shield, Gem, Heart, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 font-sans relative overflow-hidden">
      {/* Background Cinematic Grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] z-0" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 border border-[#C6A769]/30 text-[#C6A769] text-[10px] tracking-[0.5em] uppercase font-medium bg-[#C6A769]/5"
            >
              The Velouraz Atelier
            </motion.span>
            
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2B2B2B] leading-[1.1]"
              >
                Timeless <span className="italic font-light">Elegance</span> <br />
                Redefined
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm md:text-base text-[#2B2B2B]/70 font-light tracking-wide leading-relaxed max-w-xl"
            >
              Founded with a passion for exquisite craftsmanship, Velouraz represents the pinnacle of fine jewelry. We believe that true luxury lies in the flawless integration of ethically sourced gems and masterful artistry.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#F3F2EE] border border-[#2B2B2B]/5 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800" 
                alt="Jewelry Atelier" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2B2B2B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/80 backdrop-blur-md p-8 shadow-[0_30px_60px_rgba(198,167,105,0.1)] border border-[#C6A769]/20 hidden md:flex flex-col justify-center">
              <p className="text-4xl font-serif text-[#C6A769] mb-2">100%</p>
              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#2B2B2B]">Ethically Sourced</p>
              <div className="mt-6 h-[1px] w-full bg-[#2B2B2B]/10 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full w-full bg-[#C6A769] absolute top-0" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Gem size={28} strokeWidth={1} />,
              title: "Master Craftsmanship",
              desc: "Every piece is meticulously handcrafted by seasoned artisans, ensuring spectacular brilliance and flawless execution."
            },
            {
              icon: <Heart size={28} strokeWidth={1} />,
              title: "Ethical Integrity",
              desc: "We exclusively source conflict-free diamonds and conflict-free precious metals, respecting both nature and humanity."
            },
            {
              icon: <Shield size={28} strokeWidth={1} />,
              title: "Lifetime Guarantee",
              desc: "Our unwavering confidence in our artistry means we stand by the integrity of our original pieces for a lifetime."
            }
          ].map((value, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="p-10 lg:p-12 bg-white/40 backdrop-blur-sm border border-white/60 flex flex-col items-center text-center hover:bg-white hover:shadow-[0_20px_50px_rgba(198,167,105,0.05)] transition-all duration-700 group cursor-default"
            >
              <div className="w-16 h-16 rounded-full border border-[#C6A769]/20 flex items-center justify-center text-[#C6A769] mb-6 group-hover:bg-[#C6A769]/5 transition-colors duration-500">
                {value.icon}
              </div>
              <h3 className="text-xl font-serif text-[#2B2B2B] mb-4 group-hover:text-[#C6A769] transition-colors">{value.title}</h3>
              <p className="text-[11px] text-[#2B2B2B]/60 font-light leading-[1.8] tracking-widest">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-[#2B2B2B] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A769] rounded-full blur-[150px] opacity-[0.15] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#C6A769] mb-8 block">The Philosophy</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-16 leading-tight font-light">
              "We prioritize <span className="italic text-[#C6A769]">artistry</span> over mass production, bringing to life pieces that capture fragments of eternity."
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <Award className="text-[#C6A769]" strokeWidth={1} />
              </div>
              <div className="text-center md:text-left">
                <p className="font-serif text-lg text-white mb-1">Velouraz Heritage</p>
                <p className="text-[9px] text-white/50 uppercase tracking-[0.3em]">Excellence Defined</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;