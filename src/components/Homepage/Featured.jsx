import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const worldEdits = [
  {
    id: 1,
    region: "India",
    subtext: "Royal Heritage",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    link: "/world-edit/india"
  },
  {
    id: 2,
    region: "Korea",
    subtext: "Minimal Elegance",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
    link: "/world-edit/korea"
  },
  {
    id: 3,
    region: "Turkey",
    subtext: "Timeless Beauty",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600",
    link: "/world-edit/turkey"
  },
  {
    id: 4,
    region: "Arabia",
    subtext: "Golden Opulence",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600",
    link: "/world-edit/arabia"
  },
  {
    id: 5,
    region: "Europe",
    subtext: "Classic Glamour",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    link: "/world-edit/europe"
  }
];

const WorldEdit = () => {
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
              WORLD EDIT
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-[#2A2623] leading-tight"
            >
              Beauty <span className="text-[#7A0E2E] italic">Beyond Borders</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#7B6D63] font-serif text-sm md:text-base leading-relaxed"
            >
              Explore jewellery inspired by the world's most celebrated cultures. 
              Handpicked. Curated. Authentic.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/world-edit" 
                className="bg-[#7A0E2E] text-white px-8 py-3.5 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-[#5E0B24] transition-all flex items-center gap-2 w-fit shadow-lg"
              >
                Explore World Edits
              </Link>
            </motion.div>
          </div>

          {/* Custom Navigation */}
          <div className="flex items-center gap-4 hidden lg:flex">
            <button className="world-prev w-12 h-12 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="world-next w-12 h-12 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.world-prev',
              nextEl: '.world-next',
            }}
            pagination={{
              clickable: true,
              el: '.world-pagination',
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 4.2 },
            }}
            className="!overflow-visible"
          >
            {worldEdits.map((item, index) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-[450px] overflow-hidden rounded-2xl cursor-pointer"
                >
                  <img 
                    src={item.image} 
                    alt={item.region} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 space-y-1">
                    <h3 className="text-2xl font-serif text-white">{item.region}</h3>
                    <p className="text-[10px] tracking-[0.2em] font-bold text-white/70 uppercase">{item.subtext}</p>
                    
                    <div className="pt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
                      <Link to={item.link} className="flex items-center gap-2 text-[9px] tracking-[0.2em] font-bold text-white uppercase">
                        View Collection <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Mobile Pagination */}
          <div className="world-pagination mt-10 flex justify-center lg:hidden" />
        </div>
      </div>
    </section>
  );
};

export default WorldEdit;