import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Feather, Globe, Award } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    icon: Gem,
    title: "Premium Quality",
    description: "Exquisite craftsmanship using premium base metals and high-grade gold plating to ensure lasting brilliance."
  },
  {
    icon: Feather,
    title: "Hypoallergenic",
    description: "Zero nickel or lead. Skin-friendly materials meticulously tested for the most sensitive skin types."
  },
  {
    icon: Globe,
    title: "Worldwide Shipping",
    description: "Fast, fully insured, and tracked global delivery encased in our signature luxury packaging."
  },
  {
    icon: Award,
    title: "Lifetime Guarantee",
    description: "We stand by our artistry. Enjoy a lifetime design guarantee on the integrity of our original pieces."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#FAF9F6] py-16 md:py-24 px-6 lg:px-12 font-sans relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A769]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E6B7A9]/5 rounded-full blur-[120px] translate-y-1/2 -translateX-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#C6A769] text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium mb-4 block"
          >
            The Velouraz Standard
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] font-normal"
            >
              Why Discerning <span className="italic">Clients</span> Choose Us
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 h-[1px] bg-[#C6A769]/50 mx-auto"
          ></motion.div>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination-why',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="pb-16"
          >
            {features.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <SwiperSlide key={index} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative h-full"
                  >
                    {/* Refined Glassmorphism Card */}
                    <div className="h-full bg-white/40 backdrop-blur-md border border-white/60 p-8 lg:p-10 flex flex-col items-center text-center transition-all duration-700 hover:bg-white hover:shadow-[0_30px_60px_rgba(198,167,105,0.08)] hover:-translate-y-2">
                      
                      {/* Icon Container with multi-layered glow */}
                      <div className="mb-8 relative w-16 h-16 flex items-center justify-center border border-[#C6A769]/20 rounded-full transition-all duration-700 group-hover:bg-[#C6A769]/5 group-hover:border-[#C6A769]/40">
                        <div className="absolute inset-0 bg-[#C6A769]/0 rounded-full transition-all duration-700 group-hover:bg-[#C6A769]/5 blur-xl" />
                        <IconComponent 
                          strokeWidth={1} 
                          className="w-6 h-6 text-[#C6A769] transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg lg:text-xl text-[#2B2B2B] mb-4 transition-colors duration-500 group-hover:text-[#C6A769]">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#2B2B2B]/60 text-xs md:text-sm font-light leading-relaxed tracking-wide">
                        {item.description}
                      </p>

                      {/* Corner Accent */}
                      <span className="absolute top-0 right-0 w-0 h-[1px] bg-[#C6A769]/40 transition-all duration-700 group-hover:w-1/3"></span>
                      <span className="absolute top-0 right-0 w-[1px] h-0 bg-[#C6A769]/40 transition-all duration-700 group-hover:h-1/3"></span>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          
          {/* Custom Luxury Pagination */}
          <div className="custom-pagination-why flex justify-center mt-4 gap-2"></div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;