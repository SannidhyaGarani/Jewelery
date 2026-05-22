import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, Target, ShieldCheck, RefreshCcw, Globe, ArrowRight, Heart, Star, Award } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.19, 1, 0.22, 1] }
  };

  const breadcrumbLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about', active: true }
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#2A2623] font-sans overflow-hidden">

      {/* Premium Breadcrumb */}
      <Breadcrumb
        title="Our Story"
        subtitle="The philosophy, passion and people behind Velouraz — crafting contemporary luxury with global inspirations."
        bgImage="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1600"
        links={breadcrumbLinks}
      />

      {/* Brand Introduction - Editorial Style */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#7A0E2E]" />
              <p className="text-[11px] tracking-[0.4em] font-bold uppercase text-[#7A0E2E]">The House of Velouraz</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2A2623] leading-[1.1] mb-10 tracking-tight">
              Where soft luxury <br />
              meets <span className="text-[#7A0E2E] italic">global artistry</span>.
            </h2>
            <div className="space-y-6 text-[16px] md:text-[18px] text-[#2A2623]/80 leading-relaxed font-serif">
              <p>
                The name <span className="text-[#2A2623] font-bold">Velouraz</span> comes from a feeling. "Velour" describes softness, richness, and quiet luxury. It's beauty that doesn't demand attention but holds it effortlessly.
              </p>
              <p>
                Founded on the belief that jewelry is an emotion shaped by culture, Velouraz is a curation of world journeys. From minimal European elegance to the intricate handiwork of Asian artisans, every piece tells a story of heritage reimagined for the modern woman.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#FDFAF5] bg-[#F4EEE8] overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-[13px] font-medium text-[#7B6D63] tracking-wide uppercase">
                <span className="text-[#2A2623] font-bold">10k+</span> Happy Dreamers Worldwide
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative group"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-[#F4EEE8] border border-[#D8CBBE]/20 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200"
                alt="Velouraz Jewellery"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            {/* Decal */}
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[30px] shadow-xl border border-[#D8CBBE]/20 hidden md:block">
              <Award size={32} className="text-[#7A0E2E] mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7B6D63]">Est. 2024</p>
              <p className="text-[14px] font-serif text-[#2A2623] whitespace-nowrap">Excellence in Craftsmanship</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Heritage Split Section */}
      <section className="bg-[#2A2623] text-white py-24 md:py-40 relative">
        {/* Abstract Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 text-center relative z-10">
          <Star size={32} className="mx-auto text-[#7A0E2E] mb-8 animate-pulse" />
          <motion.blockquote
            {...fadeUp}
            className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-[1.2] max-w-5xl mx-auto text-white/95 tracking-tight px-4"
          >
            "We created Velouraz to combine global influences into something personal, wearable, and <span className="text-[#fff]">truly yours.</span>"
          </motion.blockquote>
          <motion.div
            {...fadeUp}
            className="mt-12 flex flex-col items-center"
          >
            <div className="w-12 h-[1px] bg-[#7A0E2E] mb-4" />
            <p className="text-[12px] tracking-[0.4em] uppercase text-white/50 font-bold">The Founders' Promise</p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission - Minimal Cards */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <motion.div {...fadeUp} className="group p-12 md:p-16 rounded-[40px] bg-white border border-[#D8CBBE]/30 hover:border-[#7A0E2E]/30 hover:shadow-2xl transition-all duration-700">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#FDFAF5] flex items-center justify-center border border-[#D8CBBE]/20 group-hover:bg-[#7A0E2E]/10 transition-colors">
                <Eye size={24} className="text-[#2A2623]" strokeWidth={1} />
              </div>
              <h3 className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#7A0E2E]">Our Vision</h3>
            </div>
            <p className="text-2xl font-serif text-[#2A2623] leading-relaxed mb-6">
              To be the global heartbeat of expressive jewelry — bridging the gap between high fashion and everyday luxury.
            </p>
            <p className="text-[15px] text-[#2A2623]/60 leading-relaxed font-light">
              We envision a world where every piece of jewelry is more than an accessory — it's a conversation starter, a cultural bridge, and a reflection of your evolving story.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="group p-12 md:p-16 rounded-[40px] bg-[#2A2623] text-white hover:shadow-2xl transition-all duration-700">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <Target size={24} className="text-white" strokeWidth={1} />
              </div>
              <h3 className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#fff]">Our Mission</h3>
            </div>
            <p className="text-2xl font-serif text-white leading-relaxed mb-6">
              To curate high-quality, ethically inspired jewels that blend cultural richness with modern silhouettes.
            </p>
            <p className="text-[15px] text-white/60 leading-relaxed font-light">
              We bring the world's most iconic jewelry styles to your doorstep — from Japanese Miyuki beads to Parisian thread-work — ensuring luxury is accessible without compromise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founders Section - Premium Storytelling */}
      <section className="bg-[#F8F4EF]/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 md:py-40">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <motion.div {...fadeUp} className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[3/4] rounded-[50px] overflow-hidden bg-white shadow-2xl relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                    alt="Founders"
                    className="w-full h-full object-cover transition-all duration-1000 grayscale hover:grayscale-0 hover:scale-105"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-[#7A0E2E]/20 rounded-full animate-spin-slow -z-0" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#7A0E2E] rounded-full blur-[60px] opacity-20" />
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="lg:col-span-7 space-y-10 order-1 lg:order-2">
              <div>
                <p className="text-[11px] tracking-[0.4em] font-bold uppercase text-[#7A0E2E] mb-4">Behind the Scenes</p>
                <h2 className="text-4xl md:text-6xl font-serif text-[#2A2623] tracking-tight leading-tight">
                  Meet the <span className="italic text-[#7A0E2E]">Creative Force</span>
                </h2>
              </div>

              <div className="space-y-8 text-[17px] md:text-[19px] text-[#2A2623]/80 leading-relaxed font-serif">
                <p>It began as a shared obsession with the stories told by small things. As best friends and travel companions, we found ourselves hunting for jewelry in the narrowest streets of Tokyo and the artisan squares of Paris.</p>
                <p>We realized that while India is the heart of high jewelry, there was a quiet void in the "everyday luxury" space — pieces that feel international yet deeply personal. Velouraz was born to fill that space.</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-8 pt-6">
                {[
                  { label: "Bespoke Styles", val: "500+" },
                  { label: "Design Hubs", val: "7" },
                  { label: "Global Reach", val: "15+" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-3xl font-serif text-[#7A0E2E]">{stat.val}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#7B6D63] font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Trust Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 md:py-32">
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.4em] font-bold uppercase text-[#7A0E2E] mb-4">Unmatched Assurance</p>
          <h2 className="text-4xl md:text-6xl font-serif text-[#2A2623] tracking-tight">
            The Velouraz <span className="italic text-[#7A0E2E]">Guarantee</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: RefreshCcw,
              title: "Transparent returns",
              text: "Hassle-free 7-day returns for defective products. We ensure your piece is perfect, always."
            },
            {
              icon: Globe,
              title: "Free Collection",
              text: "Our courier partners handle returns directly from your doorstep across India at zero cost."
            },
            {
              icon: Sparkles,
              title: "Iconic Styles",
              text: "Every piece is a curated masterpiece, inspired by the world's most vibrant jewelry cultures."
            },
            {
              icon: ShieldCheck,
              title: "Secure Refunds",
              text: "Instant processing within 5 working days. Your trust is our most valuable asset."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="group p-8 rounded-[30px] border border-[#D8CBBE]/30 hover:bg-white hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#F8F4EF] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7A0E2E] group-hover:text-white transition-all duration-500">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#2A2623] mb-4">{item.title}</h3>
              <p className="text-[14px] text-[#7B6D63] leading-relaxed font-light">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;