import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy = () => {
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
            Privacy <br />
            <span className="text-[#7A0E2E] italic font-light text-6xl md:text-9xl block mt-2">Policy</span>
          </h1>
          
          <div className="space-y-20 sm:space-y-24 text-[#7B6D63] leading-relaxed tracking-wide text-base sm:text-lg font-light">
            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <ShieldCheck size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">01. Commitment to Privacy</h2>
              </div>
              <p>
                At Velouraz, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <Database size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">02. Data We Collect</h2>
              </div>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="space-y-4">
                {[
                  { label: "Identity Data", desc: "Name, username or similar identifier" },
                  { label: "Contact Data", desc: "Billing address, delivery address, email and phone" },
                  { label: "Financial Data", desc: "Bank account and payment card details" },
                  { label: "Transaction Data", desc: "Payment history and purchased product details" },
                  { label: "Technical Data", desc: "IP address, login data, browser type and version" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-[#7A0E2E] font-bold mt-1.5">•</span>
                    <span><strong className="text-[#2A2623] font-bold">{item.label}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <Eye size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">03. How We Use Your Data</h2>
              </div>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="space-y-4">
                {[
                  "To perform the contract we are about to enter into or have entered into with you.",
                  "Where it is necessary for our legitimate interests and your rights do not override them.",
                  "Where we need to comply with a legal obligation."
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-[#7A0E2E] font-bold">•</span>
                    {step}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-8 group">
              <div className="flex items-center gap-5 text-[#7A0E2E]">
                <div className="w-12 h-12 rounded-2xl bg-[#7A0E2E]/5 flex items-center justify-center shadow-sm group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                  <Lock size={22} />
                </div>
                <h2 className="text-[#2A2623] text-2xl font-serif font-bold tracking-tight">04. Data Security</h2>
              </div>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
                In addition, we limit access to your personal data to those employees and agents who have a business need to know.
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


export default PrivacyPolicy;
