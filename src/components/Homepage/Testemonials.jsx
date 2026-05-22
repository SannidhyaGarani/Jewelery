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
    <section className="bg-[#7A0E2E] py-12 lg:py-20 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        
        {/* Section Header */}
        <div className="mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-[1px] bg-white/40" />
            <span className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-white/70 uppercase">
              LOVED BY 1000+ CUSTOMERS
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight"
          >
            Real Stories. <span className="text-white/70 italic">Real Love.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-serif text-base leading-relaxed max-w-lg"
          >
            Hear from our community of jewellery enthusiasts who have found their perfect pieces with us.
          </motion.p>
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
                  className="bg-[#F8F4EF] p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between shadow-xl min-h-[240px]"
                >
                  <p className="text-[#7B6D63] font-serif text-base lg:text-lg leading-relaxed italic">
                    "{review.quote}"
                  </p>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-[#7A0E2E] text-[#7A0E2E]" />
                      ))}
                    </div>
                    <h4 className="text-[13px] font-bold text-[#2A2623] uppercase tracking-widest">— {review.name}</h4>
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