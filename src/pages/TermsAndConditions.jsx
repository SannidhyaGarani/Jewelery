import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gavel, Scale, FileText, Globe, RefreshCcw } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#F8F4EF] text-[#2A2623] pt-20 pb-32 px-6 lg:px-20 font-sans selection:bg-[#7A0E2E] selection:text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7A0E2E]/5 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#7B6D63] mb-12 hover:text-[#7A0E2E] transition-all group">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
            Back to House
          </Link>

          <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-none mb-20 font-bold">
            Terms <br />
            <span className="text-[#7A0E2E] italic font-light text-6xl md:text-9xl block mt-2">& Conditions</span>
          </h1>
          
          <div className="space-y-20 sm:space-y-24 text-[#7B6D63] leading-relaxed tracking-wide text-base sm:text-lg font-light">
            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <Scale size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">01. Acceptance of Terms</h2>
              </div>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <FileText size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">02. Intellectual Property</h2>
              </div>
              <p>
                The Site and its original content, features, and functionality are owned by Velouraz and are protected by international copyright, 
                trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>

            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <Gavel size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">03. Termination</h2>
              </div>
              <p>
                We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information 
                associated with you. All provisions of this Agreement that by their nature should survive termination shall survive termination.
              </p>
            </section>

            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <Globe size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">04. Governing Law</h2>
              </div>
              <p>
                This Agreement (and any further rules, polices, or guidelines incorporated by reference) shall be governed and construed in accordance with 
                the laws of India, without giving effect to any principles of conflicts of law.
              </p>
            </section>

            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <RefreshCcw size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">05. Changes to This Agreement</h2>
              </div>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions by posting the updated terms on the Site. 
                Your continued use of the Site after any such changes constitutes your acceptance of the new Terms and Conditions.
              </p>
            </section>
          </div>

          <div className="mt-32 pt-16 border-t border-[#D8CBBE]/20 text-center">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#7B6D63]/30 font-bold">© 2026 VELOURAZ. Artisans of Luxury.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
