import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Target, ShieldCheck, RefreshCcw, Globe, Users, ArrowRight } from 'lucide-react';

const About = () => {
  const fader = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.19, 1, 0.22, 1] }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EF] text-[#2A2623] font-sans selection:bg-[#7A0E2E] selection:text-white">
      
      {/* HERO SECTION - THE ESSENCE */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 border-b border-[#D8CBBE]/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-12 text-center"
          >
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.8em] uppercase text-[#7A0E2E] font-bold">The House of Elegance</span>
              <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-serif tracking-tighter leading-none text-[#2A2623]">
                About <span className="italic font-light text-[#7A0E2E]">VELOURAZ</span>
              </h1>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-xl sm:text-2xl font-serif italic text-[#7B6D63] leading-relaxed">
                Velouraz, where soft luxury meets global style.
              </p>
              <div className="grid md:grid-cols-2 gap-12 text-left pt-12 border-t border-[#D8CBBE]/20">
                <p className="text-sm sm:text-base text-[#7B6D63]/80 leading-[1.8] font-light">
                  The name Velouraz comes from a feeling. “Velour” describes softness, richness, and quiet luxury. It’s not loud or overwhelming. It’s deeply comforting and elegant. It represents beauty that doesn’t demand attention but holds it effortlessly. That is what our jewelry stands for.
                </p>
                <p className="text-sm sm:text-base text-[#7B6D63]/80 leading-[1.8] font-light">
                  Velouraz is more than a brand; it is an emotion shaped by journeys around the world. Every place we explored introduced us to new textures, cultures, and design stories. From minimal European elegance to bold contemporary shapes, each inspiration influenced our vision.
                </p>
              </div>
              <motion.p {...fader} className="text-[#7A0E2E] font-serif text-2xl sm:text-3xl italic pt-8">
                We created Velouraz to combine those global influences into something personal and wearable.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISION & MISSION - BENTO EDITORIAL */}
      <section className="py-24 lg:py-40 bg-[#F4EEE8]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-px bg-[#D8CBBE]/20 border border-[#D8CBBE]/20">
            
            {/* Our Vision */}
            <motion.div {...fader} className="bg-[#F8F4EF] p-10 lg:p-20 space-y-8">
              <div className="flex items-center gap-4 text-[#7A0E2E]">
                <Eye size={20} strokeWidth={1} />
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold">The Future</span>
              </div>
              <h2 className="text-5xl font-serif text-[#2A2623]">Our <span className="italic text-[#7A0E2E]">Vision</span></h2>
              <div className="space-y-6 text-[#7B6D63] leading-relaxed">
                <p className="text-lg italic font-serif text-[#2A2623]">At Velouraz, we aim to be a jewelry brand loved worldwide. We blend cultures, stories, and personal expression into every piece.</p>
                <p className="text-sm font-light text-[#7B6D63]/80">Our designs turn global inspirations into meaningful, wearable art that celebrates individuality. We believe jewelry should not just adorn but tell a story and create a connection. Our vision is to make international-style jewelry accessible, timeless, and truly personal for everyone.</p>
              </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div {...fader} className="bg-[#F8F4EF] p-10 lg:p-20 space-y-8">
              <div className="flex items-center gap-4 text-[#7A0E2E]">
                <Target size={20} strokeWidth={1} />
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold">The Purpose</span>
              </div>
              <h2 className="text-5xl font-serif text-[#2A2623]">Our <span className="italic text-[#7A0E2E]">Mission</span></h2>
              <div className="space-y-6 text-[#7B6D63] leading-relaxed">
                <p className="text-sm font-light uppercase tracking-widest text-[#7A0E2E]/80">At Velouraz, our mission is to create high-quality, globally inspired jewelry that combines cultural richness with modern style.</p>
                <p className="text-sm font-light text-[#7B6D63]/80">We bring you iconic jewelry styles from around the world. This includes delicate Miyuki bead jewelry from Japan, genuine gemstones from Thailand, evil eye zirconia pieces from Turkey, and timeless jade jewelry from China. Our inspiration includes thread-work elegance from Paris, bold European textile statement pieces, and popular charm jewelry from the United States, all thoughtfully curated for you. We also feature lustrous pearls and sleek silver jewelry influenced by the contemporary style of South Korea.</p>
                <p className="text-sm font-light italic text-[#7B6D63]">Our goal is to make luxury affordable while helping you express your unique style with confidence. Every piece transforms everyday jewelry into a simple and meaningful way to share your story.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MEET THE FOUNDERS - MAGAZINE SPREAD */}
      <section className="py-24 lg:py-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div {...fader} className="lg:col-span-5 relative group">
              <div className="aspect-[3/4] overflow-hidden border border-[#D8CBBE]/20 p-2 rounded-2xl bg-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                  alt="Founders" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#7A0E2E] flex items-center justify-center hidden xl:flex rounded-2xl shadow-xl">
                <Sparkles size={48} className="text-white" />
              </div>
            </motion.div>

            <motion.div {...fader} className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#640D14] font-bold">The Creative Minds</span>
                <h2 className="text-6xl sm:text-7xl font-serif leading-none text-[#2C1A0E]">Meet the <span className="italic text-[#640D14]">Founders</span></h2>
              </div>
              
              <div className="columns-1 md:columns-2 gap-10 space-y-6 text-sm text-[#5C3D1E]/70 font-light leading-loose">
                <p>It all began with a friendship, the kind that turns ordinary moments into unforgettable memories. As best friends, we didn’t just share conversations; we shared journeys. From busy city streets to hidden local markets around the world, every place we visited inspired us in its own unique way.</p>
                <p>While traveling, we found ourselves drawn to something beautiful yet often overlooked, demi-fine jewelry. Each country had its own style and story, with pieces that felt both elegant and easy to wear. We noticed how these designs struck the perfect balance between luxury and everyday fashion, something surprisingly hard to find back home in India.</p>
                <p>That’s when the idea sparked. India has always been the heart of gold jewelry, rich, traditional, and deeply rooted in culture. But we saw a gap, a space for jewelry that was modern, versatile, and accessible.</p>
                <p>Jewelry that didn’t just sit in lockers for special occasions but became part of everyday expression. Something you could wear, style, and restyle, just like your mood.</p>
                <p>And so, we decided to bring the world a little closer to home. Our brand reflects our journeys, a curated collection of demi-fine jewelry inspired by global trends and designed for the modern Indian woman.</p>
                <p className="text-[#2C1A0E] italic font-serif text-lg border-l-2 border-[#640D14] pl-6 py-2 block">We believe jewelry should be easy, expressive, and always changing, just like you.</p>
                <p>Each piece carries a story, a memory from somewhere far away, reimagined for you. This is more than a business for us. It’s a dream built on friendship, passion, and the desire to change how jewelry fits into everyday life. Welcome to our world, where global inspiration meets your personal style.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POLICY SECTION - TECHNICAL PRECISION */}
      <section className="py-24 border-t border-[#640D14]/10 bg-[#F5EDD8]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#640D14] font-bold">Client Care</span>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#2C1A0E]">Return and <span className="italic text-[#640D14]">Cancellation Policy</span></h2>
            </div>
            <p className="max-w-md text-[#5C3D1E]/60 text-sm italic border-l border-[#640D14]/20 pl-8">
              At Velouraz, your satisfaction is our top priority. If you are not fully satisfied with your purchase, you can return the item.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#640D14]">
                <RefreshCcw size={18} strokeWidth={1} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Return Process</h3>
              </div>
              <p className="text-xs text-[#5C3D1E]/70 leading-relaxed">Returns are only accepted for defective products and must be made within 7 days of purchase. A clear video of the product unboxing is required as proof to process any return request. The product must be unused, in its original packaging, with the tag intact, and should include the invoice. To start the return process for defective products, please contact us at <span className="text-[#640D14] font-bold">info@velouraz.in</span>.</p>
              <p className="text-xs text-[#5C3D1E]/50 italic">Our courier partner will collect the returned items from your specified address at no extra cost.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#640D14]">
                <Globe size={18} strokeWidth={1} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Return Charges</h3>
              </div>
              <p className="text-xs text-[#5C3D1E]/70 leading-relaxed">Returns are free, and our courier partner will handle the collection within India.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#640D14]">
                <Sparkles size={18} strokeWidth={1} />
                <h3 className="text-xs font-bold uppercase tracking-widest">How to Initiate</h3>
              </div>
              <ul className="text-xs text-[#5C3D1E]/70 space-y-4">
                <li className="flex gap-2 items-start"><ArrowRight size={10} className="mt-1 flex-shrink-0 text-[#640D14]" /> Contact us during the specified period for your product type.</li>
                <li className="flex gap-2 items-start"><ArrowRight size={10} className="mt-1 flex-shrink-0 text-[#640D14]" /> Wait for confirmation before returning the product.</li>
                <li className="flex gap-2 items-start"><ArrowRight size={10} className="mt-1 flex-shrink-0 text-[#640D14]" /> Ensure all returns are in their original condition with the invoice or guarantee card included.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#640D14]">
                <ShieldCheck size={18} strokeWidth={1} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Refunds</h3>
              </div>
              <p className="text-xs text-[#5C3D1E]/70 leading-relaxed">Refunds are processed after we receive the product in its original, unused condition with packaging and tags intact. Refunds will be issued within 5 working days via the original payment method or by cheque.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};


export default About;