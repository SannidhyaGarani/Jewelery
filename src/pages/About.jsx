import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Eye, Target, ShieldCheck, RefreshCcw, Globe, ArrowRight } from 'lucide-react';

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
  };

  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#2A2623] font-sans">
      
      {/* Hero Breadcrumb Banner */}
      <div className="bg-[#F4EEE8] border-b border-[#D8CBBE]/30">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 md:py-14">
          <div className="flex items-center gap-2 text-[11px] text-[#7B6D63] mb-4">
            <Link to="/" className="hover:text-[#7A0E2E] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#2A2623] font-medium">About Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-[#2A2623] tracking-tight">
            Our Story
          </h1>
          <p className="text-[14px] text-[#7B6D63] mt-2 max-w-lg">
            The philosophy, passion and people behind Velouraz.
          </p>
        </div>
      </div>

      {/* Brand Introduction */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#7A0E2E] mb-4">The House of Elegance</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2A2623] leading-snug mb-6">
              Where soft luxury meets <span className="text-[#7A0E2E] italic">global style</span>.
            </h2>
            <div className="space-y-4 text-[14px] text-[#2A2623]/70 leading-relaxed">
              <p>
                The name Velouraz comes from a feeling. "Velour" describes softness, richness, and quiet luxury. It's not loud or overwhelming — it's deeply comforting and elegant. It represents beauty that doesn't demand attention but holds it effortlessly.
              </p>
              <p>
                Velouraz is more than a brand; it is an emotion shaped by journeys around the world. Every place we explored introduced us to new textures, cultures, and design stories. From minimal European elegance to bold contemporary shapes, each inspiration influenced our vision.
              </p>
            </div>
          </motion.div>
          <motion.div 
            {...fadeUp}
            className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F4EEE8] border border-[#D8CBBE]/20"
          >
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800" 
              alt="Velouraz Jewellery" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Highlight Quote */}
      <section className="bg-[#2A2623] text-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 md:py-20 text-center">
          <Sparkles size={24} className="mx-auto text-[#D4A853] mb-5" />
          <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed max-w-3xl mx-auto text-white/90">
            "We created Velouraz to combine global influences into something personal, wearable, and truly yours."
          </blockquote>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mt-6 font-bold">— The Founders</p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div {...fadeUp} className="bg-white rounded-2xl border border-[#D8CBBE]/20 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#F4EEE8] flex items-center justify-center">
                <Eye size={18} className="text-[#7A0E2E]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[12px] tracking-[0.2em] uppercase font-bold text-[#7A0E2E]">Our Vision</h3>
            </div>
            <p className="text-[15px] font-serif text-[#2A2623] leading-relaxed mb-4">
              At Velouraz, we aim to be a jewelry brand loved worldwide — blending cultures, stories, and personal expression into every piece.
            </p>
            <p className="text-[13px] text-[#2A2623]/60 leading-relaxed">
              Our designs turn global inspirations into meaningful, wearable art that celebrates individuality. We believe jewelry should not just adorn but tell a story and create a connection. Our vision is to make international-style jewelry accessible, timeless, and truly personal.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white rounded-2xl border border-[#D8CBBE]/20 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#F4EEE8] flex items-center justify-center">
                <Target size={18} className="text-[#7A0E2E]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[12px] tracking-[0.2em] uppercase font-bold text-[#7A0E2E]">Our Mission</h3>
            </div>
            <p className="text-[15px] font-serif text-[#2A2623] leading-relaxed mb-4">
              To create high-quality, globally inspired jewelry that combines cultural richness with modern style.
            </p>
            <p className="text-[13px] text-[#2A2623]/60 leading-relaxed">
              We bring you iconic jewelry styles from around the world — delicate Miyuki beads from Japan, genuine gemstones from Thailand, evil eye zirconia from Turkey, jade jewelry from China, thread-work elegance from Paris, bold European statement pieces, and sleek silver from South Korea. Our goal is to make luxury affordable while helping you express your unique style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="bg-[#F4EEE8]/50 border-y border-[#D8CBBE]/20">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
            <motion.div {...fadeUp} className="md:col-span-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#F4EEE8] border border-[#D8CBBE]/20 mb-5">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
                  alt="Founders" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="md:col-span-8 space-y-6">
              <div>
                <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#7A0E2E] mb-3">The Creative Minds</p>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2A2623] tracking-tight">
                  Meet the <span className="italic text-[#7A0E2E]">Founders</span>
                </h2>
              </div>
              
              <div className="space-y-4 text-[14px] text-[#2A2623]/70 leading-relaxed">
                <p>It all began with a friendship — the kind that turns ordinary moments into unforgettable memories. As best friends, we didn't just share conversations; we shared journeys. From busy city streets to hidden local markets around the world, every place we visited inspired us.</p>
                <p>While traveling, we found ourselves drawn to something beautiful yet often overlooked — demi-fine jewelry. Each country had its own style and story, with pieces that felt both elegant and easy to wear. We noticed how these designs struck the perfect balance between luxury and everyday fashion.</p>
                <p>India has always been the heart of gold jewelry — rich, traditional, and deeply rooted in culture. But we saw a space for jewelry that was modern, versatile, and accessible. Jewelry that became part of everyday expression.</p>
              </div>
              
              <blockquote className="border-l-2 border-[#7A0E2E] pl-5 py-2">
                <p className="text-[16px] font-serif italic text-[#2A2623]/80 leading-relaxed">
                  "We believe jewelry should be easy, expressive, and always changing — just like you."
                </p>
              </blockquote>

              <p className="text-[14px] text-[#2A2623]/70 leading-relaxed">
                Each piece carries a story — a memory from somewhere far away, reimagined for you. This is more than a business for us. It's a dream built on friendship, passion, and the desire to change how jewelry fits into everyday life. Welcome to our world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Return & Cancellation Policy */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 md:py-20">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#7A0E2E] mb-3">Client Care</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2A2623] tracking-tight">
            Return & <span className="italic text-[#7A0E2E]">Cancellation Policy</span>
          </h2>
          <p className="text-[14px] text-[#7B6D63] mt-2 max-w-lg">
            Your satisfaction is our top priority. If you're not fully satisfied, here's how we can help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: RefreshCcw, 
              title: "Return Process", 
              text: "Returns accepted for defective products within 7 days. A clear unboxing video is required. Product must be unused, in original packaging with tags and invoice. Contact info@velouraz.in to initiate."
            },
            { 
              icon: Globe, 
              title: "Return Charges", 
              text: "Returns are completely free. Our courier partner will handle the collection from your specified address within India at no extra cost."
            },
            { 
              icon: Sparkles, 
              title: "How to Initiate", 
              text: "Contact us during the return window. Wait for confirmation before shipping. Ensure items are in original condition with invoice or guarantee card included."
            },
            { 
              icon: ShieldCheck, 
              title: "Refunds", 
              text: "Refunds are processed after receiving the product in original, unused condition. Issued within 5 working days via original payment method or cheque."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-[#D8CBBE]/20 p-6"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4EEE8] flex items-center justify-center mb-4">
                <item.icon size={18} className="text-[#7A0E2E]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#2A2623] mb-3">{item.title}</h3>
              <p className="text-[13px] text-[#2A2623]/60 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;