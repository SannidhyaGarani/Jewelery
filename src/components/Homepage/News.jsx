import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const journalPosts = [
  {
    id: 1,
    date: "MAY 20, 2024",
    title: "How To Style Kundan Jewellery for Every Occasion",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    link: "/journal/styling-kundan"
  },
  {
    id: 2,
    date: "MAY 15, 2024",
    title: "A Guide to Korean Minimal Jewellery (And Why We Love It)",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
    link: "/journal/korean-minimal"
  },
  {
    id: 3,
    date: "MAY 10, 2024",
    title: "5 Timeless Jewellery Pieces Every Woman Should Own",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600",
    link: "/journal/timeless-pieces"
  }
];

const TheJournal = () => {
  return (
    <section className="bg-[#F8F4EF] py-20 lg:py-32 overflow-hidden relative border-t border-[#D8CBBE]/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-[#7B6D63] uppercase block"
            >
              THE JOURNAL
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-[#2A2623] leading-tight"
            >
              Stories, <span className="text-[#7A0E2E] italic">Style & Inspiration</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#7B6D63] font-serif text-sm md:text-base leading-relaxed"
            >
              Dive into the world of jewellery, fashion trends, and timeless elegance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/journal" 
                className="bg-[#7A0E2E] text-white px-8 py-3.5 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-[#5E0B24] transition-all flex items-center gap-2 w-fit shadow-lg"
              >
                Explore Journal
              </Link>
            </motion.div>
          </div>

          {/* Custom Navigation */}
          <div className="flex items-center gap-4 hidden lg:flex">
            <button className="journal-prev w-12 h-12 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="journal-next w-12 h-12 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.journal-prev',
              nextEl: '.journal-next',
            }}
            pagination={{
              clickable: true,
              el: '.journal-pagination',
            }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {journalPosts.map((post, index) => (
              <SwiperSlide key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer space-y-6"
                >
                  <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-2xl">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] tracking-[0.2em] font-bold text-[#7B6D63] uppercase">{post.date}</p>
                    <h3 className="text-xl lg:text-2xl font-serif text-[#2A2623] group-hover:text-[#7A0E2E] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <Link to={post.link} className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold text-[#7A0E2E] uppercase pt-2">
                      Read more <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Mobile Pagination */}
          <div className="journal-pagination mt-12 flex justify-center lg:hidden" />
        </div>
      </div>
    </section>
  );
};

export default TheJournal;