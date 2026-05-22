
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Gem, Package, RotateCcw, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
  const heroImages = [
    "/img/b (1).jpeg",
    "/img/b (2).jpeg",
    "/img/b (1).png"
  ];

  const usps = [
    {
      icon: <Globe size={24} strokeWidth={1.5} />,
      title: "INSPIRED BY CULTURES",
      desc: "Curated from across the world"
    },
    {
      icon: <Gem size={24} strokeWidth={1.5} />,
      title: "PREMIUM QUALITY",
      desc: "Crafted to last, made to shine"
    },
    {
      icon: <Package size={24} strokeWidth={1.5} />,
      title: "SECURE PACKAGING",
      desc: "Perfectly packed with care"
    },
    {
      icon: <RotateCcw size={24} strokeWidth={1.5} />,
      title: "EASY RETURNS",
      desc: "Hassle-free 30 day returns"
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1.5} />,
      title: "100% SECURE PAYMENTS",
      desc: "Shop with confidence"
    }
  ];

  return (
    <section className="relative w-full bg-[#F8F4EF] overflow-hidden min-h-[600px] lg:min-h-[850px] flex flex-col justify-end">
      
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {heroImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <img 
                  src={img} 
                  alt={`Luxury Jewellery Model ${idx + 1}`} 
                  className="w-full h-full object-cover object-[center_20%] lg:object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4EF] via-[#F8F4EF]/60 to-transparent lg:w-[60%] w-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Architectural Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')`,
            mixBlendMode: 'multiply'
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 z-20 w-full mb-12 lg:mb-32">
        <div className="lg:max-w-2xl pt-20 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-[#7A0E2E] uppercase block">
                CURATED. INSPIRED. TIMELESS.
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-serif text-[#2A2623] leading-[1.1] max-w-2xl">
                Jewellery that <br />
                <span className="text-[#2A2623]">Travels the World</span>
              </h1>
              <p className="text-sm md:text-lg text-[#7B6D63] font-serif max-w-md leading-relaxed">
                Handpicked designs from iconic cultures, crafted for the modern you.
              </p>
            </div>
            
            <Link 
              to="/shop" 
              className="bg-[#7A0E2E] text-white px-10 py-5 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-[#5E0B24] transition-all duration-300 inline-block shadow-xl"
            >
              EXPLORE COLLECTIONS
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating USP Bar */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 z-30 w-full pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl p-2 lg:p-8"
        >
          {/* Desktop View: Grid */}
          <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4 lg:divide-x lg:divide-[#D8CBBE]/30">
            {usps.map((usp, idx) => (
              <div key={idx} className={`flex items-center gap-4 px-4 ${idx === 0 ? 'pl-0' : ''}`}>
                <div className="text-[#8B7E74] shrink-0">
                  {usp.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[14px] tracking-[0.1em] font-bold text-[#2A2623] uppercase">{usp.title}</h4>
                  <p className="text-[14px] text-[#7B6D63] font-serif leading-tight">{usp.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: Slider */}
          <div className="lg:hidden">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              modules={[Autoplay]}
              className="w-full"
            >
              {usps.map((usp, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex items-center gap-4 bg-[#F8F4EF]/50 p-4 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7A0E2E] shadow-sm shrink-0">
                      {React.cloneElement(usp.icon, { size: 18 })}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-[12px] tracking-[0.1em] font-bold text-[#2A2623] uppercase">{usp.title}</h4>
                      <p className="text-[11px] text-[#7B6D63] font-serif leading-tight">{usp.desc}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

