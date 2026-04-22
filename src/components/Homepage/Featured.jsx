import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

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
  {
    id: 4,
    tags: ['TRENDS', 'FASHION'],
    title: "The Renaissance of Yellow Gold in High Jewellery",
    author: "BY VELOURAZ",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
    isClub: false,
  },
  {
    id: 5,
    tags: ['ARTISANS', 'MASTERY'],
    title: "The Art of Invisible Setting: A Masterclass",
    author: "BY KATERINA PEREZ",
    image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=600&auto=format&fit=crop&q=60",
    isClub: true,
  }
];

const FeaturedArticles = () => {
  return (
    <section className="bg-[#0A0A0A] py-16 lg:py-24 font-sans border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="lg:text-center text-left mb-16 px-4">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-accent tracking-tighter leading-tight mb-4">
            <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-6xl md:text-7xl lg:text-8xl block md:inline mb-2 md:mb-0 text-accent/80">
              Latest
            </span> Stories
          </h2>
          <p className="text-[10px] md:text-xs font-sans text-white/50 tracking-[0.4em] uppercase font-bold max-w-xl mx-auto">
             Select and read: from public articles to club exclusives.
          </p>
        </div>

        {/* Article Slider */}
        <div className="relative group/slider">
          <Swiper
            modules={[Pagination, FreeMode, Navigation]}
            spaceBetween={32}
            slidesPerView={1.2}
            freeMode={true}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/10',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-accent',
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-20"
          >
            {articles.map((article, index) => (
              <SwiperSlide key={article.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-8 border border-white/5 bg-[#111] shadow-2xl">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-80 transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:opacity-100"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {article.isClub && (
                       <div className="absolute top-6 left-6 bg-accent/20 backdrop-blur-md border border-accent/40 text-accent text-[9px] font-bold tracking-widest uppercase px-4 py-2 rounded-full">
                          CLUB EXCLUSIVE
                       </div>
                    )}

                    <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="w-full bg-white/10 backdrop-blur-xl border border-white/20 py-4 text-[10px] tracking-[0.3em] font-bold uppercase text-white flex items-center justify-center gap-2 rounded-xl">
                        Read Story <ArrowUpRight size={14} />
                      </button>
                    </div>

                    <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-colors duration-500">
                       <Heart size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="space-y-4 px-4 flex-grow flex flex-col">
                    <div className="flex gap-4">
                      {article.tags.map(tag => (
                         <span key={tag} className="text-[9px] tracking-[0.3em] font-bold uppercase text-accent/60">
                           {tag}
                         </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-2xl lg:text-3xl text-white group-hover:text-accent transition-colors duration-500 leading-tight">
                      {article.title}
                    </h3>
                    
                    <div className="mt-auto pt-6 flex items-center gap-4">
                       <div className="h-[1px] w-8 bg-white/10"></div>
                       <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-white/40">
                         {article.author}
                       </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default FeaturedArticles;
