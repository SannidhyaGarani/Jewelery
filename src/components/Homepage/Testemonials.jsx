import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
  {
    name: "Eleanor Vance",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    quote: "The craftsmanship on the Solitaire Necklace is breathtaking. It holds a brilliant sparkle that rivals my fine jewelry pieces. Truly timeless elegance.",
  },
  {
    name: "Isabelle Moreau",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    quote: "I was hesitant about artificial jewelry, but Velouraz redefined my expectations. The plating is exquisite and doesn't irritate my sensitive skin. Magnifique!",
  },
  {
    name: "Sofia Rossi",
    location: "Milan, Italy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote: "Purchased the Champagne Gold Hoops. The weight and finish feel so premium. Customer service was flawless—global shipping was incredibly fast and secure.",
  },
  {
    name: "Ava Chen",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=400&auto=format&fit=crop",
    quote: "Absolutely stunning pieces! I bought the Emerald Cut Ring and it's my new everyday staple. The attention to detail is remarkable.",
  }
];

const Testimonials = () => {
  return (
    <section className="bg-bg-cream py-16 lg:py-24 px-6 lg:px-16 font-sans relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />
      
      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-text-dark/5 pb-16">
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-text-dark/40 text-[10px] tracking-[0.6em] uppercase block"
            >
              Client Chronicles
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-dark tracking-tight leading-tight"
            >
              <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-5xl md:text-6xl lg:text-7xl">Client</span> Testimonials
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 lg:mt-0 max-w-sm"
          >
             <p className="text-[11px] tracking-[0.2em] uppercase text-text-dark/40 leading-relaxed">
                Discover the experiences of our global clientele who have embraced the Velouraz vision of luxury.
             </p>
          </motion.div>
        </div>

        {/* Testimonials Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={60}
            slidesPerView={1.1}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination-testimonials',
            }}
            breakpoints={{
              768: {
                slidesPerView: 2.2,
              },
              1280: {
                slidesPerView: 3.2,
              },
            }}
            className="pb-24"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <div className="h-full bg-white/40 backdrop-blur-sm p-12 border border-text-dark/5 transition-all duration-500 hover:bg-white hover:shadow-xl relative overflow-hidden">
                    <Quote size={40} strokeWidth={0.5} className="text-accent/20 mb-8" />
                    
                    <p className="text-text-dark/70 font-serif text-xl md:text-2xl leading-relaxed mb-12 italic">
                      "{review.quote}"
                    </p>
                    
                    <div className="flex items-center gap-6 pt-10 border-t border-text-dark/5">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-text-dark/10">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-text-dark">{review.name}</h4>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-text-dark/40 mt-1">{review.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="custom-pagination-testimonials flex justify-center mt-8 gap-4"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;