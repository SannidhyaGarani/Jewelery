import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-bg-cream pt-48 pb-32 font-sans relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 relative z-10">
        <div className="editorial-grid gap-24">
          {/* Left: Info & Story */}
          <div className="col-span-12 lg:col-span-5 space-y-16">
            <div className="space-y-10">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="block text-[10px] tracking-[0.6em] uppercase text-text-dark/40"
              >
                At Your Service
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-dark leading-tight tracking-tight"
              >
                <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-5xl md:text-6xl lg:text-7xl">Inquire</span> <br />
                Privately
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-sm text-text-dark/60 font-light tracking-wide leading-relaxed max-w-md"
              >
                Whether you wish to discuss a bespoke creation or reserve a private viewing at our London atelier, our concierge team is at your disposal.
              </motion.p>
            </div>

            <div className="space-y-12 border-t border-text-dark/5 pt-12">
              {[
                { icon: <MessageCircle size={20} strokeWidth={0.5} />, label: "Concierge", val: "concierge@velouraz.com" },
                { icon: <Phone size={20} strokeWidth={0.5} />, label: "Enquiries", val: "+44 (0) 20 7123 4567" },
                { icon: <MapPin size={20} strokeWidth={0.5} />, label: "The Atelier", val: "Mayfair, London, UK" }
              ].map((item, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.6 + i * 0.1 }}
                   className="flex items-start gap-8 group"
                >
                  <div className="text-accent mt-1">{item.icon}</div>
                  <div>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-text-dark/40 mb-2">{item.label}</p>
                    <p className="text-xl font-serif text-text-dark/90 transition-colors group-hover:text-accent cursor-default">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-10 pt-8">
               {['Instagram', 'LinkedIn', 'Pinterest'].map((social, i) => (
                 <a key={i} href="#" className="text-[10px] tracking-[0.3em] uppercase text-text-dark/40 hover:text-accent transition-colors">
                   {social}
                 </a>
               ))}
            </div>
          </div>

          {/* Right: Modern Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="bg-white/30 backdrop-blur-sm p-10 md:p-20 border border-text-dark/5 luxury-card">
              <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[9px] tracking-[0.4em] uppercase text-text-dark/40">Full Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-text-dark/10 py-4 text-serif text-lg outline-none focus:border-accent transition-colors" placeholder="your name" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] tracking-[0.4em] uppercase text-text-dark/40">Email</label>
                    <input type="email" className="w-full bg-transparent border-b border-text-dark/10 py-4 text-serif text-lg outline-none focus:border-accent transition-colors" placeholder="email address" />
                  </div>
                </div>
                
                <div className="space-y-4 text-serif">
                   <label className="text-[9px] tracking-[0.4em] uppercase text-text-dark/40">Inquiry Nature</label>
                   <select className="w-full bg-transparent border-b border-text-dark/10 py-4 text-lg outline-none focus:border-accent transition-colors appearance-none cursor-pointer font-serif">
                      <option>Bespoke Commission</option>
                      <option>Private Showroom Appointment</option>
                      <option>Collection Enquiries</option>
                      <option>Press & Media</option>
                   </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[9px] tracking-[0.4em] uppercase text-text-dark/40">Your Vision</label>
                  <textarea rows="4" className="w-full bg-transparent border-b border-text-dark/10 py-4 text-serif text-lg outline-none focus:border-accent transition-colors resize-none" placeholder="how may we assist you?"></textarea>
                </div>
                
                <button className="group relative pr-12 text-text-dark hover:text-accent transition-colors duration-500">
                  <span className="font-sans text-[11px] tracking-[0.4em] uppercase border-b border-text-dark/20 pb-2 group-hover:border-accent">
                    Submit Inquiry
                  </span>
                  <ArrowRight size={18} className="absolute right-0 bottom-3 group-hover:translate-x-2 transition-transform duration-500" />
                </button>
              </form>
            </div>
            
            <div className="mt-16 flex items-center gap-12 px-2">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-cream bg-neutral-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Specialist" className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
               <p className="text-[10px] tracking-[0.2em] uppercase text-text-dark/40">
                  Our specialists are currently online <br /> to assist you in real-time.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;