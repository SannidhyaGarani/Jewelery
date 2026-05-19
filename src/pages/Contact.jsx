import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F8F4EF] pt-20 pb-32 font-sans relative overflow-hidden text-[#2A2623]">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#D8CBBE]/20 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#D8CBBE]/20 hidden lg:block" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 relative z-10">
        <div className="editorial-grid gap-24">
          {/* Left: Info & Story */}
          <div className="col-span-12 lg:col-span-5 space-y-16">
            <div className="space-y-10">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="block text-[10px] tracking-[0.6em] uppercase text-[#7B6D63] font-bold"
              >
                At Your Service
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#2A2623] leading-[1.1] tracking-tight"
              >
                <span className="text-[#7A0E2E] italic font-light text-5xl md:text-7xl lg:text-8xl block mb-2">Inquire</span>
                Privately
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-sm text-[#7B6D63] font-light tracking-wide leading-relaxed max-w-md"
              >
                Whether you wish to discuss a bespoke creation or reserve a private viewing at our London atelier, our concierge team is at your disposal.
              </motion.p>
            </div>

            <div className="space-y-12 border-t border-[#D8CBBE]/20 pt-12">
              {[
                { icon: <MessageCircle size={20} strokeWidth={1} />, label: "Concierge", val: "concierge@velouraz.com" },
                { icon: <Phone size={20} strokeWidth={1} />, label: "Enquiries", val: "+44 (0) 20 7123 4567" },
                { icon: <MapPin size={20} strokeWidth={1} />, label: "The Atelier", val: "Mayfair, London, UK" }
              ].map((item, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.6 + i * 0.1 }}
                   className="flex items-start gap-8 group"
                >
                  <div className="text-[#7A0E2E] mt-1">{item.icon}</div>
                  <div>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-[#7B6D63]/40 mb-2 font-bold">{item.label}</p>
                    <p className="text-xl font-serif text-[#2A2623] transition-colors group-hover:text-[#7A0E2E] cursor-default">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-10 pt-8">
               {['Instagram', 'LinkedIn', 'Pinterest'].map((social, i) => (
                 <a key={i} href="#" className="text-[10px] tracking-[0.3em] uppercase text-[#7B6D63]/40 hover:text-[#7A0E2E] transition-colors font-bold">
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
            <div className="bg-[#F4EEE8]/40 backdrop-blur-xl p-10 md:p-20 border border-[#D8CBBE]/30 luxury-card rounded-[32px] shadow-sm">
              <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[9px] tracking-[0.4em] uppercase text-[#7B6D63]/40 font-bold">Full Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-[#D8CBBE]/30 py-4 font-serif text-lg text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all placeholder:text-[#7B6D63]/20" placeholder="your name" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] tracking-[0.4em] uppercase text-[#7B6D63]/40 font-bold">Email</label>
                    <input type="email" className="w-full bg-transparent border-b border-[#D8CBBE]/30 py-4 font-serif text-lg text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all placeholder:text-[#7B6D63]/20" placeholder="email address" />
                  </div>
                </div>
                
                <div className="space-y-4">
                   <label className="text-[9px] tracking-[0.4em] uppercase text-[#7B6D63]/40 font-bold">Inquiry Nature</label>
                   <div className="relative">
                      <select className="w-full bg-transparent border-b border-[#D8CBBE]/30 py-4 text-lg text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all appearance-none cursor-pointer font-serif">
                         <option className="bg-[#F8F4EF]">Bespoke Commission</option>
                         <option className="bg-[#F8F4EF]">Private Showroom Appointment</option>
                         <option className="bg-[#F8F4EF]">Collection Enquiries</option>
                         <option className="bg-[#FDFAF5]">Press & Media</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#5C3D1E]/40 pointer-events-none" />
                   </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[9px] tracking-[0.4em] uppercase text-[#5C3D1E]/40 font-bold">Your Vision</label>
                  <textarea rows="4" className="w-full bg-transparent border-b border-[#640D14]/10 py-4 font-serif text-lg text-[#2C1A0E] outline-none focus:border-[#640D14] transition-all resize-none placeholder:text-[#5C3D1E]/20" placeholder="how may we assist you?"></textarea>
                </div>
                
                <button className="group relative pr-12 text-[#2C1A0E] hover:text-[#640D14] transition-all duration-500 w-fit">
                  <span className="font-sans text-[11px] tracking-[0.4em] uppercase border-b border-[#640D14]/20 pb-2 group-hover:border-[#640D14]">
                    Submit Inquiry
                  </span>
                  <ArrowRight size={18} className="absolute right-0 bottom-3 group-hover:translate-x-2 transition-transform duration-500 text-[#640D14]" />
                </button>
              </form>
            </div>
            
            <div className="mt-16 flex items-center gap-12 px-2">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#640D14]/10 bg-[#F5EDD8] overflow-hidden shadow-sm">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Specialist" className="w-full h-full object-cover grayscale opacity-70" />
                    </div>
                  ))}
               </div>
               <p className="text-[10px] tracking-[0.2em] uppercase text-[#5C3D1E]/40 leading-relaxed font-bold">
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