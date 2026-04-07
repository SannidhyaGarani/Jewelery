import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="relative bg-bg-cream py-16 lg:py-20 px-4 sm:px-8 overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />

      <div className="max-w-4xl mx-auto relative z-10 lg:text-center text-left px-4">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-text-dark/40 text-[9px] md:text-[10px] tracking-[0.6em] uppercase block mb-8 md:mb-10 font-bold"
        >
          Join The Inner Circle
        </motion.span>

        <div className="overflow-hidden mb-10 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-text-dark tracking-tight leading-tight px-2"
          >
            <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-5xl md:text-6xl lg:text-7xl block md:inline mb-2 md:mb-0">The</span> Newsletter
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-text-dark/50 text-[11px] tracking-[0.2em] uppercase font-light leading-relaxed mb-20 max-w-xl lg:mx-auto mx-0"
        >
          Subscribe to receive exclusive access to new collections, <br className="hidden md:block" /> private events, and editorial jewellery insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-8 border-b border-text-dark/10 pb-6 group">
              <div className="relative flex-grow">
                <input
                  type="email"
                  required
                  placeholder="YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-0 py-4 text-text-dark placeholder:text-text-dark/20 focus:outline-none transition-all font-light text-[11px] tracking-[0.3em] uppercase"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="text-text-dark hover:text-accent transition-all duration-500 flex items-center justify-center gap-4 py-4 disabled:text-text-dark/30 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-text-dark/30 border-t-text-dark rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-[11px] tracking-[0.5em] uppercase font-normal">Subscribe</span>
                    <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center gap-6"
            >
              <CheckCircle2 className="text-accent w-12 h-12" strokeWidth={1} />
              <div className="space-y-4">
                <p className="font-serif text-3xl text-text-dark italic">Welcome to Velouraz</p>
                <p className="text-[10px] text-text-dark/30 tracking-[0.4em] uppercase">Check your inbox for your private invitation</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-[9px] text-text-dark/20 tracking-[0.2em] uppercase font-light"
        >
          By joining, you agree to our <a href="#" className="underline hover:text-accent transition-colors">Privacy Policy</a> & <a href="#" className="underline hover:text-accent transition-colors">Terms</a>.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;