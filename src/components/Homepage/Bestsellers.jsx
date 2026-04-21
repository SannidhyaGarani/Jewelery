import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';
import { ArrowUpRight } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const products = [
  { id: "bs-1", brand: "Vhernier", name: "Ardis Earclips", price: "€12,000", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", category: "High Jewellery" },
  { id: "bs-2", brand: "Karina Choudhury", name: "Icon Magic Bracelet", price: "$16,510", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "Everyday" },
  { id: "bs-3", brand: "Gyan Jaipur", name: "Reversible Earring", price: "$12,200", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", category: "Bridal" },
  { id: "bs-4", brand: "Le Vian", name: "Chocolate Diamond Ring", price: "£POA", image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?w=600&auto=format&fit=crop&q=60", category: "New Arrivals" },
  { id: "bs-5", brand: "Boucheron", name: "Serpent Bohème", price: "€8,500", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", category: "Fine Jewellery" },
];

const BestSellers = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  
  // Custom Cursor Logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  return (
    <section 
      className="bg-[#0A0A0A] py-16 lg:py-24 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Custom Floating Cursor */}
      

      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Header - Editorial Style */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[9px] md:text-[10px] tracking-[0.4em] text-accent uppercase font-bold mb-4 block"
            >
              Curated Selection
            </motion.span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-accent leading-tight tracking-tight">
              <span style={{fontFamily: "var(--font-script)", fontWeight: 100 }} className="text-5xl md:text-6xl lg:text-7xl block md:inline mb-2 md:mb-0 text-accent/80">Jewels</span> Velouraz Loves
            </h2>
          </div>
          <div className="flex items-center gap-8">
            <p className="text-[10px] md:text-xs text-white max-w-[200px] leading-relaxed uppercase font-bold tracking-widest">
              Discover masterpieces hand-picked by our lead artisans.
            </p>
          </div>
        </div>

        {/* Product Swiper */}
        <div className="relative">
          <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={40}
            slidesPerView={1.2}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1440: { slidesPerView: 4.2 },
            }}
            className="!overflow-visible"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] bg-[#121212] overflow-hidden rounded-sm transition-all duration-700 ease-out group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Quick View Button */}
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="w-full bg-accent/90 backdrop-blur-md py-4 text-[10px] tracking-[0.2em] font-bold uppercase text-white flex items-center justify-center gap-2">
                        View Detail <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-8 lg:text-center text-left px-4">
                    <h3 className="text-[11px] tracking-[0.3em] font-bold uppercase text-accent/60 mb-2">
                      {product.brand}
                    </h3>
                    <p className="font-serif text-xl text-white mb-1">
                      {product.name}
                    </p>
                    <p className="text-sm font-sans text-white/70">
                      {product.price}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Minimal Progress Bar */}
          <div className="mt-20 h-[1px] w-full bg-white/10 relative">
             <motion.div 
               className="absolute top-0 left-0 h-full bg-accent w-1/4"
               // You can link this to swiper.progress for a functional bar
             />
          </div>
        </div>
      </div>

      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-[0.05] pointer-events-none">
        <span className="text-[300px] font-serif italic text-white/10">V</span>
      </div>
    </section>
  );
};

export default BestSellers;