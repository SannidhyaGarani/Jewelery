import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    tags: ['JEWELLERY', 'EVENTS'],
    title: "Jewellery Geneva 2026: Inside Geneva's Boutique Jewellery Show",
    author: "BY KATERINA PEREZ",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    isClub: false,
  },
  {
    id: 2,
    tags: ['KP BLOG', 'PERSONAL BLOG'],
    title: "Heart or Head: The Ultimate Test for Gem Lovers",
    author: "BY VELOURAZ",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    isClub: true,
  },
  {
    id: 3,
    tags: ['GEMSTONES', 'COLOURED GEMS'],
    title: "Paraiba Tourmaline: The Making of a Modern Blue-Chip Gemstone",
    author: "BY KATERINA PEREZ",
    image: "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?w=600&auto=format&fit=crop&q=60",
    isClub: true,
  },
];

const FeaturedArticles = () => {
  return (
    <section className="bg-[#0A0A0A] py-12 lg:py-20 font-sans border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="lg:text-center text-left mb-16">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-accent tracking-tight leading-tight mb-4 lg:px-2">
            <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-5xl md:text-6xl lg:text-7xl block md:inline mb-2 md:mb-0 text-accent/80">
              Latest
            </span> Stories
          </h2>
          <p className="text-[9px] md:text-[11px] font-sans text-white tracking-[0.2em] uppercase font-bold px-4">
             Select and read: from public articles to club exclusives.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/5 bg-[#111]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                />
                
                {article.isClub && (
                   <div className="absolute top-4 left-4 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-[8px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                      CLUB
                   </div>
                )}

                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent transition-colors">
                   <Heart size={14} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex gap-4">
                  {article.tags.map(tag => (
                     <span key={tag} className="text-[8px] tracking-[0.2em] font-bold uppercase text-accent/60">
                       {tag}
                     </span>
                  ))}
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl text-white group-hover:text-accent transition-colors duration-300">
                  {article.title}
                </h3>
                
                <p className="text-[8px] tracking-[0.2em] uppercase font-bold text-white/70 pt-2">
                  {article.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedArticles;
