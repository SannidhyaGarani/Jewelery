import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const sliderItems = [
  {
    id: 1,
    region: "India",
    subtext: "Royal Heritage",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    link: "/world-edit/india"
  },
  {
    id: 2,
    region: "Korea",
    subtext: "Minimal Elegance",
    location: "Seoul",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    link: "/world-edit/korea"
  },
  {
    id: 3,
    region: "Turkey",
    subtext: "Timeless Beauty",
    location: "Istanbul",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800",
    link: "/world-edit/turkey"
  },
  {
    id: 4,
    region: "Arabia",
    subtext: "Golden Opulence",
    location: "Dubai",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800",
    link: "/world-edit/arabia"
  },
  {
    id: 5,
    region: "Europe",
    subtext: "Classic Glamour",
    location: "Paris",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    link: "/world-edit/europe"
  }
];

const PromoSlider = () => {
  return (
    <section className="bg-[#F8F4EF] py-12 lg:py-20 overflow-hidden relative border-t border-[#D8CBBE]/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side Content */}
          <div className="w-full lg:w-[28%] shrink-0">
            <div className="space-y-6 max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-[1px] bg-[#7A0E2E]" />
                <span className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-[#7B6D63] uppercase">
                  WORLD EDIT
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2A2623] leading-tight"
              >
                Beauty <span className="text-[#7A0E2E] italic">Beyond Borders</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#7B6D63] font-serif text-sm leading-relaxed max-w-[200px]"
              >
                A curation of masterpieces inspired by global artistry.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/collection" 
                  className="bg-[#7A0E2E] text-white px-8 py-4 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-[#5E0B24] transition-all flex items-center gap-2 w-fit shadow-xl mt-4"
                >
                  View Collection
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Side Slider */}
          <div className="w-full lg:w-[72%] min-w-0 overflow-hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={15}
              slidesPerView={1.2}
              pagination={{
                clickable: true,
                el: '.promo-pagination',
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="w-full"
            >
              {sliderItems.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer relative"
                  >
                    <div className="relative h-[300px] lg:h-[380px] overflow-hidden rounded-xl shadow-sm group-hover:shadow-2xl transition-all duration-700">
                      <img 
                        src={item.image} 
                        alt={item.region} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      
                      {/* Text Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                          <p className="text-[10px] tracking-[0.2em] font-bold text-white/80 uppercase">{item.subtext}</p>
                          <h3 className="text-2xl lg:text-3xl font-serif text-white leading-tight">
                            {item.region}
                          </h3>
                          <p className="text-[15px] text-white/60 font-serif italic">{item.location}</p>
                          <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-bold text-[#F8F4EF] uppercase border-b border-[#F8F4EF]/30 pb-1">
                              Explore Collection
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Pagination matching the screenshot */}
            <div className="promo-pagination mt-16 flex justify-center w-full gap-2 [&_.swiper-pagination-bullet]:!bg-transparent [&_.swiper-pagination-bullet]:!border [&_.swiper-pagination-bullet]:!border-[#7A0E2E] [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:!bg-[#7A0E2E] [&_.swiper-pagination-bullet]:!w-3 [&_.swiper-pagination-bullet]:!h-3 [&_.swiper-pagination-bullet]:!m-0" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoSlider;
