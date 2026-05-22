import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
  {
    id: 1,
    name: "Jewellery Sets",
    image: "img/jewellery/j (3).png",
    link: "/shop?category=sets"
  },
  {
    id: 2,
    name: "Earrings",
    image: "img/jewellery/j (4).png",
    link: "/shop?category=earrings"
  },
  {
    id: 3,
    name: "Necklaces",
    image: "img/jewellery/j (1).png",
    link: "/shop?category=necklaces"
  },
  {
    id: 4,
    name: "Rings",
    image: "img/jewellery/j (5).png",
    link: "/shop?category=rings"
  },
  {
    id: 5,
    name: "Bangles",
    image: "img/jewellery/j.png",
    link: "/shop?category=bangles"
  },
  {
    id: 6,
    name: "Bracelets",
    image: "img/jewellery/j (6).png",
    link: "/shop?category=bracelets"
  }
];

const CategorySection = () => {
  return (
    <section className="bg-[#F8F4EF] py-20 lg:py-32 overflow-hidden relative border-t border-[#D8CBBE]/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[1px] bg-[#7A0E2E]" />
              <span className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-[#7B6D63] uppercase">
                OUR COLLECTIONS
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#2A2623] leading-tight"
            >
              Find Your <span className="text-[#7A0E2E] italic">Perfect Piece</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#7B6D63] font-serif text-base leading-relaxed max-w-lg"
            >
              Explore our diverse range of handcrafted jewellery, each piece telling a unique story of elegance.
            </motion.p>
          </div>

          <div className="flex items-center gap-4 hidden lg:flex pb-2">
            <button className="cat-prev w-14 h-14 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all duration-500 group">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button className="cat-next w-14 h-14 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all duration-500 group">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Categories Slider */}
        <div className="relative px-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1.5}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
            }}
            className="!overflow-visible"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex flex-col items-center text-center space-y-6"
                >
                  <Link to={category.link} className="relative w-full aspect-square overflow-hidden block">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110 p-2"
                    />
                  </Link>
                  
                  <Link to={category.link} className="flex items-center gap-2 group/text">
                    <h3 className="text-lg md:text-xl font-serif text-[#2A2623] group-hover/text:text-[#7A0E2E] transition-colors tracking-wide">
                      {category.name}
                    </h3>
                    <ArrowRight size={16} className="text-[#7A0E2E] group-hover/text:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;