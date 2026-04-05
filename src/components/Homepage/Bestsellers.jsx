import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
  {
    id: 1,
    name: "Solitaire Droplet Necklace",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Champagne Gold Ring",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
    tag: "Limited Edition"
  },
  {
    id: 3,
    name: "Rose Quartz Eternity Ring",
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    tag: "Trending"
  },
  {
    id: 4,
    name: "Pearl Infused Bracelet",
    price: "$95.00",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    tag: "Best Seller"
  }
];

const BestSellers = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF9F6] py-16 px-6 lg:px-12 font-sans relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#C6A769]/5 rounded-full blur-[120px] pointer-events-none" />

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
            Exquisite Craftsmanship
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-[#2B2B2B] font-normal"
            >
              The Best <span className="italic">Sellers</span>
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

        {/* Product Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination-bestsellers',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="pb-16"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Image Container with Refined Reveal */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F3F2EE] shadow-sm transition-shadow duration-700 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
                    {/* Wishlist Icon */}
                    <button className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/0 hover:bg-white transition-all duration-500 group-hover:bg-white/80 backdrop-blur-sm shadow-none">
                      <Heart size={16} strokeWidth={1} className="text-[#2B2B2B] transition-colors group-hover:text-[#C6A769]" />
                    </button>

                    {/* Product Image with Slow Scale */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />

                    {/* Quick Add Button (Premium Slide) */}
                    <div className="absolute inset-0 bg-[#2B2B2B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]">
                      <button className="w-full bg-[#2B2B2B] text-white py-4 text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-[#C6A769] transition-all duration-500 shadow-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <ShoppingBag size={14} strokeWidth={1.5} />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Product Info (Minimalist) */}
                  <div className="mt-8 flex flex-col items-center text-center">
                    <h3 className="text-[#2B2B2B] font-serif text-lg tracking-wide group-hover:text-[#C6A769] transition-colors duration-500">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-[#C6A769] font-medium tracking-wider">{product.price}</span>
                      <div className="w-1 h-1 rounded-full bg-[#E6B7A9]/40"></div>
                      <div className="flex items-center gap-1 text-[10px] text-[#2B2B2B]/40">
                        <Star size={10} fill="currentColor" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Luxury Pagination */}
          <div className="custom-pagination-bestsellers flex justify-center mt-4 gap-2"></div>
        </div>

        {/* Bottom CTA to view all */}
        <div className="text-center mt-12 md:mt-16">
          <button 
            onClick={() => navigate('/shop')}
            className="group text-[#2B2B2B] text-xs md:text-sm tracking-[0.3em] uppercase font-normal relative pb-2 overflow-hidden"
          >
            View All Pieces
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2B2B]/20"></span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A769] transition-all duration-500 group-hover:w-full"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;