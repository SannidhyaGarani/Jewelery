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
    <section className="relative bg-[#0A0A0A] py-24 lg:py-32 px-4 sm:px-8 overflow-hidden border-t border-white/5">
      {/* Background Graphic Element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <span className="absolute -top-20 -left-20 text-[500px] font-serif italic text-white leading-none">V</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center px-4">
        <div className="overflow-hidden mb-8 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight px-2"
          >
            <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-6xl md:text-7xl lg:text-8xl block md:inline mb-2 md:mb-0 text-accent/80">The Editorial</span> 
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/60 text-[11px] md:text-sm tracking-[0.1em] uppercase font-light leading-relaxed mb-16 max-w-2xl mx-auto"
        >
          Subscribe to receive <span className="text-accent font-medium">exclusive access</span> to new collections, <span className="text-accent font-medium">private events</span>, and editorial jewellery insights curated for the <span className="italic font-serif text-white/90 low-case">discerning eye</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-1 rounded-full px-8 md:pl-10"
        >
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 group">
              <div className="relative flex-grow w-full">
                <input
                  type="email"
                  required
                  placeholder="YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-4 text-white placeholder:text-white/20 focus:outline-none transition-all font-light text-[11px] tracking-[0.3em] uppercase"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent text-white px-10 py-4 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-accent/80 transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-30 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" strokeWidth={1.5} />
                <p className="font-serif text-2xl text-white italic">Welcome to the inner circle.</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-[9px] text-white/20 tracking-[0.2em] uppercase font-light"
        >
          By joining, you agree to our <a href="#" className="underline hover:text-accent transition-colors">Privacy Policy</a> & <a href="#" className="underline hover:text-accent transition-colors">Terms</a>.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;