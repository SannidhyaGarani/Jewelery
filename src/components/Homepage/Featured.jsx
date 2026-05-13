import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Navigation } from 'swiper/modules';

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
    <section className="bg-[#F5EDD8] py-16 lg:py-24 font-sans border-t border-[#640D14]/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="lg:text-center text-left mb-16 px-4">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#2C1A0E] tracking-tighter leading-tight mb-4">
            <span style={{ fontFamily: "var(--font-script)", fontWeight: 100 }} className="text-6xl md:text-7xl lg:text-8xl block md:inline mb-2 md:mb-0 text-[#640D14]/70">
              Latest
            </span> Stories
          </h2>
          <p className="text-[10px] md:text-xs font-sans text-[#640D14]/50 tracking-[0.4em] uppercase font-bold max-w-xl mx-auto">
            Select and read: from public articles to club exclusives.
          </p>
        </div>

        {/* Article Slider */}
        <div className="relative group/slider">
          <Swiper
            modules={[Pagination, FreeMode, Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            freeMode={true}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-[#640D14]/20',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#640D14]',
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
                  <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-6 border border-[#640D14]/10 bg-[#F5EDD8] shadow-[0_8px_30px_rgba(44,26,14,0.06)]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-[1.5s] ease-out group-hover:scale-108 group-hover:opacity-100"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/30 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />

                    {article.isClub && (
                      <div className="absolute top-5 left-5 bg-[#640D14]/15 backdrop-blur-md border border-[#640D14]/30 text-[#640D14] text-[9px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                        CLUB EXCLUSIVE
                      </div>
                    )}

                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="w-full bg-white/90 backdrop-blur-xl border border-[#640D14]/10 py-3.5 text-[10px] tracking-[0.3em] font-bold uppercase text-[#2C1A0E] flex items-center justify-center gap-2 rounded-xl hover:bg-[#640D14] hover:text-white hover:border-[#640D14] transition-all duration-300">
                        Read Story <ArrowUpRight size={14} />
                      </button>
                    </div>

                    <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#640D14]/10 flex items-center justify-center text-[#2C1A0E] hover:bg-[#640D14] hover:text-white hover:border-[#640D14] transition-colors duration-300 group/heart">
                      <Heart size={15} strokeWidth={1.5} className="group-hover/heart:fill-white" />
                    </button>
                  </div>

                  <div className="space-y-3 px-2 flex-grow flex flex-col">
                    <div className="flex gap-4">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-[9px] tracking-[0.3em] font-bold uppercase text-[#640D14]/60 group-hover:text-[#640D14] transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-xl lg:text-2xl text-[#2C1A0E] group-hover:text-[#640D14] transition-colors duration-500 leading-tight">
                      {article.title}
                    </h3>

                    <div className="mt-auto pt-5 flex items-center gap-4">
                      <div className="h-[1px] w-8 bg-[#640D14]/20"></div>
                      <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#640D14]/40 group-hover:text-[#640D14]/60 transition-colors">
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