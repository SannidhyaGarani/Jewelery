import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
  {
    name: "Priya S.",
    quote: "The quality is exceptional and designs are so unique. Velouraz is my go-to for every occasion!",
    rating: 5
  },
  {
    name: "Ananya R.",
    quote: "Stunning pieces and super fast delivery. I felt the luxury in the packaging too!",
    rating: 5
  },
  {
    name: "Neha K.",
    quote: "Finally found a brand that brings global styles with so much elegance and quality.",
    rating: 5
  },
  {
    name: "Meera J.",
    quote: "Exquisite craftsmanship! The pieces are even more beautiful in person than in pictures.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="bg-[#7A0E2E] py-20 lg:py-32 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-white/70 uppercase block"
          >
            LOVED BY 1000+ CUSTOMERS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white"
          >
            Real Stories. <span className="text-white/70 italic">Real Love.</span>
          </motion.h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.testi-prev',
              nextEl: '.testi-next',
            }}
            pagination={{
              clickable: true,
              el: '.testi-pagination',
            }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F8F4EF] p-10 lg:p-12 rounded-3xl h-full flex flex-col justify-between shadow-2xl min-h-[300px]"
                >
                  <p className="text-[#7B6D63] font-serif text-lg lg:text-xl leading-relaxed italic">
                    "{review.quote}"
                  </p>
                  
                  <div className="mt-8 space-y-3">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#7A0E2E] text-[#7A0E2E]" />
                      ))}
                    </div>
                    <h4 className="text-sm font-bold text-[#2A2623] uppercase tracking-widest">— {review.name}</h4>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="testi-prev absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#7A0E2E] transition-all z-10 hidden md:flex">
            <ChevronLeft size={24} />
          </button>
          <button className="testi-next absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#7A0E2E] transition-all z-10 hidden md:flex">
            <ChevronRight size={24} />
          </button>

          {/* Pagination dots */}
          <div className="testi-pagination mt-12 flex justify-center" />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
    </section>
  );
};

export default Testimonials;