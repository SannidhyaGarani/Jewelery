import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="relative bg-[#FAF9F6] py-16 md:py-24 px-6 overflow-hidden">
      {/* 1. Sophisticated Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-50 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C6A769_0%,transparent_70%)] blur-[120px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E6B7A9]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* 2. Header Content */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#C6A769] text-[10px] md:text-xs tracking-[0.6em] uppercase font-medium mb-6 block"
        >
          The Inner Circle
        </motion.span>

        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2B2B2B] font-normal"
          >
            Join Our <span className="italic">Exclusive</span> Circle
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[#2B2B2B]/60 text-sm md:text-base font-light tracking-wide leading-[1.8] mb-12 max-w-xl mx-auto"
        >
          Be the first to discover new collections, private exhibitions, and receive 
          bespoke styling invitations directly to your inbox.
        </motion.p>

        {/* 3. Subscription Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-lg mx-auto"
        >
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 group">
              <div className="relative flex-grow">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/40 backdrop-blur-md border border-[#2B2B2B]/10 px-6 py-4 text-[#2B2B2B] placeholder:text-[#2B2B2B]/30 focus:outline-none focus:border-[#C6A769] transition-all duration-500 font-light text-sm"
                />
                <div className="absolute bottom-0 left-0 h-[1px] bg-[#C6A769] w-0 group-focus-within:w-full transition-all duration-700" />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#C6A769] text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-normal hover:bg-[#b0935b] transition-all duration-500 flex items-center justify-center gap-3 disabled:bg-[#C6A769]/50"
              >
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe <Send size={14} strokeWidth={1.5} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-4 flex flex-col items-center gap-3"
            >
              <CheckCircle2 className="text-[#C6A769] w-10 h-10" strokeWidth={1} />
              <p className="font-serif text-xl text-[#2B2B2B]">Welcome to the Circle</p>
              <p className="text-xs text-[#2B2B2B]/50 tracking-widest uppercase">Check your inbox for a private invitation</p>
            </motion.div>
          )}
        </motion.div>

        {/* 4. Privacy Assurance */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-[10px] text-[#2B2B2B]/30 tracking-[0.15em] uppercase font-light"
        >
          By subscribing, you agree to our <a href="#" className="underline hover:text-[#C6A769] transition-colors">Privacy Policy</a>.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;