import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const sliderData = [
  {
    id: 1,
    tags: ['GEMSTONES', 'PEARLS'],
    title: "Pearl Biography: A Bahraini Diver's Journey",
    description: "In 2013, a newspaper published an article about Ahmed Mattar. No one could have predicted that diver would one day own a brand that captures the essence of the Arabian Gulf.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    tags: ['HIGH JEWELLERY', 'EVENTS'],
    title: "Geneva Show: Masterpieces of Tomorrow",
    description: "The annual high jewellery showcase returns to Geneva, bringing together the world's most prestigious maisons. Discover the highlights of this year's most anticipated luxury event.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    tags: ['ARTISANSHIP', 'HERITAGE'],
    title: "The Atelier: Where Time Stands Still",
    description: "Step inside our private workshop where master goldsmiths breathe life into cold metal. Every Velouraz piece is a symphony of patience and centuries-old technical mastery.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    tags: ['COLLECTIONS', 'NOUVEAU'],
    title: "Celestial Echoes: The 2026 Collection",
    description: "Inspired by the architectural geometry of the night sky, our latest series explores the delicate balance between structural strength and ethereal weightlessness.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1600",
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '20%' : '-20%',
      opacity: 0,
      scale: 1.1
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-10%' : '10%',
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const currentSlide = sliderData[currentIndex];

  return (
    <section className="relative w-full bg-[#FCFCFC] pt-24 pb-8 lg:pt-32 lg:pb-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-12">
        
        {/* Header Pills - Refined Styling */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center bg-white border border-neutral-100 shadow-sm rounded-full p-1.5">
            <button className="bg-neutral-900 text-white text-[10px] tracking-[0.2em] uppercase rounded-full px-8 py-2.5 font-semibold transition-all">
              New Stories
            </button>
            <button className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase rounded-full px-8 py-2.5 font-semibold hover:text-neutral-900 transition-colors">
              Archives
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="flex flex-col lg:flex-row items-center bg-white rounded-[32px] overflow-hidden border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            
            {/* Left: Content Area (45%) */}
            <div className="w-full lg:w-[45%] p-10 lg:p-20 flex flex-col justify-between min-h-[500px] lg:min-h-[700px] z-20 bg-white">
              
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col space-y-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-[1px] w-8 bg-neutral-300"></span>
                    <div className="flex gap-4">
                      {currentSlide.tags.map(tag => (
                        <span key={tag} className="text-[9px] tracking-[0.3em] font-bold uppercase text-neutral-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="font-serif text-5xl lg:text-7xl leading-[1.05] text-neutral-900 tracking-tight">
                    <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-6xl lg:text-8xl">
                      {currentSlide.title.split(' ')[0]}
                    </span>{" "}
                    {currentSlide.title.split(' ').slice(1).join(' ')}
                  </h2>

                  <p className="text-base lg:text-lg font-sans text-neutral-500 leading-relaxed max-w-md">
                    {currentSlide.description}
                  </p>

                  <motion.button 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase font-bold text-neutral-900 pt-4"
                  >
                    Explore Story <ArrowRight size={16} strokeWidth={1.5} />
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              {/* Fractional Pagination & Controls */}
              <div className="flex items-center gap-12 mt-12">
                <div className="flex items-center gap-4">
                  <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all duration-500">
                    <ChevronLeft size={20} strokeWidth={1} />
                  </button>
                  <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all duration-500">
                    <ChevronRight size={20} strokeWidth={1} />
                  </button>
                </div>
                <div className="flex items-baseline gap-2 font-serif">
                  <span className="text-2xl text-neutral-900">0{currentIndex + 1}</span>
                  <span className="text-neutral-300">/</span>
                  <span className="text-sm text-neutral-400">0{sliderData.length}</span>
                </div>
              </div>
            </div>

            {/* Right: Image Area (55%) */}
            <div className="w-full lg:w-[55%] relative h-[500px] lg:h-[700px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-neutral-900/5 z-10" /> {/* Subtle Overlay */}
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Decorative Element */}
              <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white max-w-[200px]">
                  <p className="text-[8px] tracking-[0.2em] uppercase opacity-60 mb-2 font-bold">Featured Collection</p>
                  <p className="text-xs font-serif leading-tight">The 2026 High Jewelry Series</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left hidden xl:block">
        <span className="text-[120px] font-serif text-neutral-950/[0.02] whitespace-nowrap pointer-events-none">
          EXCELLENCE • ARTISTRY
        </span>
      </div>
    </section>
  );
};

export default Hero;