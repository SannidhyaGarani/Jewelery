import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-40 pb-20 px-6 lg:px-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-12">
            Terms <span className="text-accent italic">& Conditions</span>
          </h1>
          
          <div className="space-y-12 text-white/60 leading-relaxed tracking-wide text-sm md:text-base">
            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">01. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">02. Intellectual Property</h2>
              <p>
                The Site and its original content, features, and functionality are owned by Velouraz and are protected by international copyright, 
                trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">03. Termination</h2>
              <p>
                We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information 
                associated with you. All provisions of this Agreement that by their nature should survive termination shall survive termination, 
                including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">04. Governing Law</h2>
              <p>
                This Agreement (and any further rules, polices, or guidelines incorporated by reference) shall be governed and construed in accordance with 
                the laws of India, without giving effect to any principles of conflicts of law.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">05. Changes to This Agreement</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions by posting the updated terms on the Site. 
                Your continued use of the Site after any such changes constitutes your acceptance of the new Terms and Conditions.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
