import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight, ChevronDown, Instagram, Send, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFAF5] font-sans text-[#2A2623]">
      
      {/* Hero Breadcrumb Banner */}
      <div className="bg-[#F4EEE8] border-b border-[#D8CBBE]/30">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 md:py-14">
          <div className="flex items-center gap-2 text-[11px] text-[#7B6D63] mb-4">
            <Link to="/" className="hover:text-[#7A0E2E] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#2A2623] font-medium">Contact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-[#2A2623] tracking-tight">
            Get in Touch
          </h1>
          <p className="text-[14px] text-[#7B6D63] mt-2 max-w-lg">
            We'd love to hear from you. Reach out for inquiries, collaborations, or just to say hello.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 md:py-16">
        
        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {[
            { 
              icon: Mail, 
              label: "Email Us", 
              value: "info@velouraz.in",
              sub: "We reply within 24 hours"
            },
            { 
              icon: Phone, 
              label: "Call Us", 
              value: "+91 98765 43210",
              sub: "Mon-Sat, 10am - 7pm IST"
            },
            { 
              icon: MapPin, 
              label: "Visit Us", 
              value: "Mumbai, India",
              sub: "By appointment only"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl border border-[#D8CBBE]/20 p-6 hover:border-[#7A0E2E]/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4EEE8] flex items-center justify-center mb-4 group-hover:bg-[#7A0E2E]/10 transition-colors">
                <item.icon size={18} className="text-[#7A0E2E]" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#7B6D63] mb-1">{item.label}</p>
              <p className="text-[16px] font-serif text-[#2A2623] mb-1">{item.value}</p>
              <p className="text-[12px] text-[#7B6D63]">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Form + Info Section */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl border border-[#D8CBBE]/20 p-6 md:p-10">
              <h2 className="text-xl font-serif text-[#2A2623] mb-1">Send us a message</h2>
              <p className="text-[13px] text-[#7B6D63] mb-8">Fill in the details below and we'll get back to you shortly.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#7B6D63] mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-[#D8CBBE]/50 rounded-lg px-4 py-3 text-[14px] text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all bg-[#FDFAF5] placeholder:text-[#7B6D63]/30" 
                      placeholder="Your name" 
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#7B6D63] mb-2 block">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border border-[#D8CBBE]/50 rounded-lg px-4 py-3 text-[14px] text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all bg-[#FDFAF5] placeholder:text-[#7B6D63]/30" 
                      placeholder="you@example.com" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#7B6D63] mb-2 block">Subject</label>
                  <div className="relative">
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full border border-[#D8CBBE]/50 rounded-lg px-4 py-3 text-[14px] text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all bg-[#FDFAF5] appearance-none cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Product Inquiry</option>
                      <option>Returns & Exchanges</option>
                      <option>Wholesale / Collaboration</option>
                      <option>Press & Media</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B6D63]/40 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#7B6D63] mb-2 block">Message</label>
                  <textarea 
                    rows="5" 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full border border-[#D8CBBE]/50 rounded-lg px-4 py-3 text-[14px] text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all resize-none bg-[#FDFAF5] placeholder:text-[#7B6D63]/30" 
                    placeholder="How can we help you?"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="bg-[#2A2623] text-white px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#7A0E2E] transition-all duration-500 flex items-center gap-3"
                >
                  <Send size={14} />
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Working Hours */}
            <div className="bg-white rounded-2xl border border-[#D8CBBE]/20 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F4EEE8] flex items-center justify-center">
                  <Clock size={18} className="text-[#7A0E2E]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2A2623]">Working Hours</h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', time: '10:00 AM - 7:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-[13px]">
                    <span className="text-[#7B6D63]">{item.day}</span>
                    <span className={`font-medium ${item.time === 'Closed' ? 'text-[#7A0E2E]' : 'text-[#2A2623]'}`}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="bg-white rounded-2xl border border-[#D8CBBE]/20 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F4EEE8] flex items-center justify-center">
                  <MessageCircle size={18} className="text-[#7A0E2E]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2A2623]">Common Questions</h3>
              </div>
              <div className="space-y-4">
                {[
                  { q: 'How long does shipping take?', a: 'Standard delivery takes 5-7 business days across India.' },
                  { q: 'Do you offer international shipping?', a: 'Currently we ship within India only. International shipping coming soon.' },
                  { q: 'Can I return or exchange?', a: 'Yes, within 7 days for defective products with unboxing video proof.' },
                ].map((item, i) => (
                  <div key={i} className="pb-4 border-b border-[#D8CBBE]/20 last:border-0 last:pb-0">
                    <p className="text-[13px] font-medium text-[#2A2623] mb-1">{item.q}</p>
                    <p className="text-[12px] text-[#7B6D63] leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#2A2623] rounded-2xl p-6 text-white">
              <h3 className="text-[13px] font-bold uppercase tracking-wider mb-4">Follow Us</h3>
              <p className="text-[13px] text-white/60 mb-5 leading-relaxed">Stay connected for new arrivals, styling tips, and exclusive offers.</p>
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', icon: Instagram },
                  { name: 'WhatsApp', icon: MessageCircle },
                  { name: 'Email', icon: Mail },
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#7A0E2E] flex items-center justify-center transition-all duration-300"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;