import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCcw, Globe, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReturnPolicy = () => {
  const fader = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.19, 1, 0.22, 1] }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white/90 font-sans selection:bg-[#C6A664] selection:text-black pt-32 lg:pt-48 pb-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#C6A664]/5 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C6A664] mb-12 hover:text-white transition-colors">
          <ArrowLeft size={14} />
          Back to House
        </Link>

        <motion.div {...fader} className="space-y-16">
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.8em] uppercase text-[#C6A664] font-bold">Client Care</span>
            <h1 className="text-5xl lg:text-7xl font-serif tracking-tighter leading-none uppercase">
              Return and <br />
              <span className="italic font-light text-[#C6A664]">Cancellation Policy</span>
            </h1>
            <p className="max-w-3xl text-sm sm:text-base text-white/60 leading-relaxed font-light">
              At Velouraz, your satisfaction is our top priority. If you are not fully satisfied with your purchase, you can return the item.
            </p>
          </div>

          <div className="grid gap-16 lg:gap-24">
            {/* Return Process */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 flex items-center gap-4 text-[#C6A664]">
                <div className="w-12 h-12 rounded-2xl bg-[#C6A664]/10 flex items-center justify-center">
                  <RefreshCcw size={20} />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em]">Return Process</h2>
              </div>
              <div className="md:col-span-8 space-y-6">
                <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light">
                  Returns are only accepted for defective products and must be made within 7 days of purchase. A clear video of the product unboxing is required as proof to process any return request. The product must be unused, in its original packaging, with the tag intact, and should include the invoice. To start the return process for defective products, please contact us at <a href="mailto:info@velouraz.in" className="text-white border-b border-white/20 hover:border-[#C6A664] transition-all">info@velouraz.in</a>.
                </p>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light italic">
                  Our courier partner will collect the returned items from your specified address at no extra cost.
                </p>
              </div>
            </div>

            {/* Return Charges */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 flex items-center gap-4 text-[#C6A664]">
                <div className="w-12 h-12 rounded-2xl bg-[#C6A664]/10 flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em]">Return Charges</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light">
                  Returns are free, and our courier partner will handle the collection within India.
                </p>
              </div>
            </div>

            {/* How to Initiate */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 flex items-center gap-4 text-[#C6A664]">
                <div className="w-12 h-12 rounded-2xl bg-[#C6A664]/10 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em]">How to Initiate the Refund Process</h2>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-4">
                  {[
                    "• Contact us during the specified period for your product type.",
                    "• Wait for confirmation before returning the product.",
                    "• Ensure all returns are in their original condition with the invoice or guarantee card included."
                  ].map((step, i) => (
                    <li key={i} className="text-sm sm:text-base text-white/50 font-light leading-snug">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Refunds */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 flex items-center gap-4 text-[#C6A664]">
                <div className="w-12 h-12 rounded-2xl bg-[#C6A664]/10 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em]">Refunds</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light">
                  Refunds are processed after we receive the product in its original, unused condition with packaging and tags intact. Refunds will be issued within 5 working days via the original payment method or by cheque.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-24 border-t border-white/5 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/20">© 2026 VELOURAZ. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
