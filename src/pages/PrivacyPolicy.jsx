import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-40 pb-20 px-6 lg:px-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-12">
            Privacy <span className="text-accent italic">Policy</span>
          </h1>
          
          <div className="space-y-12 text-white/60 leading-relaxed tracking-wide text-sm md:text-base">
            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">01. Commitment to Privacy</h2>
              <p>
                At Velouraz, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">02. Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>Identity Data (name, username or similar identifier)</li>
                <li>Contact Data (billing address, delivery address, email address and telephone numbers)</li>
                <li>Financial Data (bank account and payment card details)</li>
                <li>Transaction Data (details about payments to and from you and other details of products you have purchased)</li>
                <li>Technical Data (IP address, login data, browser type and version)</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">03. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>To perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl font-serif tracking-tight">04. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
                In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
