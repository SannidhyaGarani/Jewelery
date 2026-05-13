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
    <div className="min-h-screen bg-[#FDFAF5] text-[#2C1A0E] font-sans selection:bg-[#640D14] selection:text-white pt-32 lg:pt-48 pb-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#640D14]/5 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#640D14] mb-12 hover:text-[#2C1A0E] transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to House
        </Link>

        <motion.div {...fader} className="space-y-24 sm:space-y-32">
          <div className="space-y-8 sm:space-y-10">
            <span className="text-[11px] tracking-[0.8em] uppercase text-[#640D14] font-black">Client Care</span>
            <h1 className="text-5xl lg:text-8xl font-serif tracking-tighter leading-none uppercase font-bold">
              Return and <br />
              <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-[#640D14]/80 lowercase text-6xl lg:text-9xl block mt-2">Cancellation Policy</span>
            </h1>
            <p className="max-w-3xl text-base sm:text-lg text-[#5C3D1E]/60 leading-relaxed font-medium">
              At Velouraz, your satisfaction is our top priority. If you are not fully satisfied with your purchase, you can return the item.
            </p>
          </div>

          <div className="grid gap-20 lg:gap-32">
            {/* Return Process */}
            <div className="grid md:grid-cols-12 gap-10 items-start group">
              <div className="md:col-span-4 flex items-center gap-5 text-[#640D14]">
                <div className="w-14 h-14 rounded-2xl bg-[#640D14]/5 flex items-center justify-center shadow-sm group-hover:bg-[#640D14] group-hover:text-white transition-all duration-500">
                  <RefreshCcw size={24} />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em]">Return Process</h2>
              </div>
              <div className="md:col-span-8 space-y-8">
                <p className="text-base sm:text-lg text-[#5C3D1E]/70 leading-relaxed font-medium">
                  Returns are only accepted for defective products and must be made within 7 days of purchase. A clear video of the product unboxing is required as proof to process any return request. The product must be unused, in its original packaging, with the tag intact, and should include the invoice. To start the return process for defective products, please contact us at <a href="mailto:info@velouraz.in" className="text-[#640D14] border-b-2 border-[#640D14]/20 hover:border-[#640D14] transition-all font-black">info@velouraz.in</a>.
                </p>
                <div className="p-6 bg-[#640D14]/5 rounded-3xl border border-[#640D14]/10">
                  <p className="text-base text-[#5C3D1E]/80 leading-relaxed font-bold italic">
                    Our courier partner will collect the returned items from your specified address at no extra cost.
                  </p>
                </div>
              </div>
            </div>

            {/* Return Charges */}
            <div className="grid md:grid-cols-12 gap-10 items-start group">
              <div className="md:col-span-4 flex items-center gap-5 text-[#640D14]">
                <div className="w-14 h-14 rounded-2xl bg-[#640D14]/5 flex items-center justify-center shadow-sm group-hover:bg-[#640D14] group-hover:text-white transition-all duration-500">
                  <Globe size={24} />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em]">Return Charges</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base sm:text-lg text-[#5C3D1E]/70 leading-relaxed font-medium">
                  Returns are free, and our courier partner will handle the collection within India.
                </p>
              </div>
            </div>

            {/* How to Initiate */}
            <div className="grid md:grid-cols-12 gap-10 items-start group">
              <div className="md:col-span-4 flex items-center gap-5 text-[#640D14]">
                <div className="w-14 h-14 rounded-2xl bg-[#640D14]/5 flex items-center justify-center shadow-sm group-hover:bg-[#640D14] group-hover:text-white transition-all duration-500">
                  <Sparkles size={24} />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em]">Refunding Steps</h2>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-6">
                  {[
                    "Contact us during the specified period for your product type.",
                    "Wait for confirmation before returning the product.",
                    "Ensure all returns are in their original condition with the invoice included."
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4 text-base sm:text-lg text-[#5C3D1E]/70 font-medium leading-relaxed">
                      <span className="text-[#640D14] font-black">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Refunds */}
            <div className="grid md:grid-cols-12 gap-10 items-start group">
              <div className="md:col-span-4 flex items-center gap-5 text-[#640D14]">
                <div className="w-14 h-14 rounded-2xl bg-[#640D14]/5 flex items-center justify-center shadow-sm group-hover:bg-[#640D14] group-hover:text-white transition-all duration-500">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em]">Refunds</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base sm:text-lg text-[#5C3D1E]/70 leading-relaxed font-medium">
                  Refunds are processed after we receive the product in its original, unused condition with packaging and tags intact. Refunds will be issued within 5 working days via the original payment method or by cheque.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-24 border-t border-[#640D14]/10 text-center">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#5C3D1E]/30 font-black">© 2026 VELOURAZ. Artisans of Luxury.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default ReturnPolicy;
