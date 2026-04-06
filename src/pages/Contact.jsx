import React from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 font-sans relative overflow-hidden">
      {/* Background Cinematic Grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] z-0" />
      
      {/* Decorative Blur Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A769]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left: Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 border border-[#C6A769]/30 text-[#C6A769] text-[10px] tracking-[0.5em] uppercase font-medium bg-[#C6A769]/5"
              >
                Get in Touch
              </motion.span>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2B2B2B] leading-[1.1]"
                >
                  Start a <br />
                  <span className="italic font-light text-[#C6A769]">Conversation</span>
                </motion.h1>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-sm md:text-base text-[#2B2B2B]/70 font-light tracking-wide leading-relaxed max-w-md"
              >
                Inquire about bespoke creations, private viewing appointments, or detailed information regarding our exclusive collections.
              </motion.p>
            </div>

            <div className="space-y-8">
              {[
                { icon: <Mail size={20} strokeWidth={1.5} />, label: "Email Us", val: "concierge@velouraz.com" },
                { icon: <Phone size={20} strokeWidth={1.5} />, label: "Call Us", val: "+91 800-VELOURAZ" },
                { icon: <MapPin size={20} strokeWidth={1.5} />, label: "Visit Atelier", val: "A-172 Kanak Avenue Colony, lasudiya Mori Indore" }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1), duration: 0.8 }}
                  key={i} 
                  className="flex gap-6 group items-center"
                >
                  <div className="w-14 h-14 rounded-full border border-[#C6A769]/30 flex items-center justify-center text-[#C6A769] group-hover:bg-[#C6A769] group-hover:text-white transition-all duration-500 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#C6A769] transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                    <span className="relative z-10">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#2B2B2B]/50 mb-1">{item.label}</p>
                    <p className="text-lg font-serif text-[#2B2B2B]">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-12 border-t border-[#2B2B2B]/10"
            >
              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#2B2B2B]/50 mb-6">Follow Our Journey</p>
              <div className="flex gap-4">
                {[<Instagram size={18} strokeWidth={1.5} />, <Twitter size={18} strokeWidth={1.5} />, <Facebook size={18} strokeWidth={1.5} />].map((icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-[#2B2B2B]/10 flex items-center justify-center text-[#2B2B2B] hover:bg-[#C6A769] hover:text-white hover:border-[#C6A769] transition-all duration-300">
                    {icon}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative"
          >
            <div className="bg-white/40 backdrop-blur-md rounded-sm p-8 md:p-12 border border-white/60 shadow-[0_30px_60px_rgba(198,167,105,0.05)] relative z-10">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#2B2B2B]/60">Your Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-[#2B2B2B]/20 py-3 text-sm text-[#2B2B2B] placeholder:text-[#2B2B2B]/30 outline-none focus:border-[#C6A769] transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#2B2B2B]/60">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-[#2B2B2B]/20 py-3 text-sm text-[#2B2B2B] placeholder:text-[#2B2B2B]/30 outline-none focus:border-[#C6A769] transition-colors" placeholder="jane@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#2B2B2B]/60">Inquiry Type</label>
                  <div className="relative">
                    <select className="w-full bg-transparent border-b border-[#2B2B2B]/20 py-3 text-sm text-[#2B2B2B] outline-none focus:border-[#C6A769] transition-colors appearance-none cursor-pointer">
                      <option>Bespoke Consultation</option>
                      <option>Product Information</option>
                      <option>Private Viewing</option>
                      <option>Other Services</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#2B2B2B]/60">Your Message</label>
                  <textarea rows="5" className="w-full bg-transparent border-b border-[#2B2B2B]/20 py-3 text-sm text-[#2B2B2B] placeholder:text-[#2B2B2B]/30 outline-none focus:border-[#C6A769] transition-colors resize-none" placeholder="How may we assist you?"></textarea>
                </div>
                <button className="w-full bg-[#2B2B2B] text-white py-5 text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-[#C6A769] transition-colors duration-500 flex items-center justify-center gap-3">
                  Send Inquiry <Send size={14} />
                </button>
              </form>
            </div>
            {/* Background Glow behind form */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-[#E6B7A9]/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;