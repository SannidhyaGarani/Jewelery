import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const reviews = [
  {
    name: "Eleanor Vance",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    quote: "The craftsmanship on the Solitaire Necklace is breathtaking. It holds a brilliant sparkle that rivals my fine jewelry pieces. Truly timeless elegance.",
    delay: 0
  },
  {
    name: "Isabelle Moreau",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    quote: "I was hesitant about artificial jewelry, but Aurelia redefined my expectations. The plating is exquisite and doesn't irritate my sensitive skin. Magnifique!",
    delay: 0.2
  },
  {
    name: "Sofia Rossi",
    location: "Milan, Italy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote: "Purchased the Champagne Gold Hoops. The weight and finish feel so premium. Customer service was flawless—global shipping was incredibly fast and secure.",
    delay: 0.4
  }
];

const Testimonials = () => {
  return (
    <section className="bg-[#FAF9F6] py-16 md:py-24 px-6 lg:px-12 font-sans relative overflow-hidden">
      
      {/* Background Decorative Accent (Abstract L/R) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E6B7A9]/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#C6A769] text-xs md:text-sm tracking-[0.4em] uppercase font-normal mb-4 block"
          >
            Voices of Elegance
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] font-normal"
          >
            What Our Customers Say
          </motion.h2>
          
          <div className="mt-6 w-12 h-[1px] bg-[#C6A769]/50 mx-auto"></div>
        </div>

        {/* Editorial Grid (Asymmetrical focus) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: review.delay, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              {/* Testimonial Card */}
              <div className="h-full bg-white p-8 md:p-10 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#2B2B2B]/5 transition-all duration-500 hover:border-[#E6B7A9]/30 hover:shadow-[0_20px_50px_rgba(198,167,105,0.08)] relative overflow-hidden">
                
                {/* Subtle Glass Overlay on hover */}
                <div className="absolute inset-0 bg-[#FAF9F6]/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-[2px] pointer-events-none" />

                {/* Top Content: Quote & Text */}
                <div className="relative z-10 mb-10 flex flex-col items-center text-center">
                  
                  {/* Minimized Quote Icon (Top Left Corner Position) */}
                  <div className="w-full flex justify-start mb-6">
                    <Quote strokeWidth={1} className="w-5 h-5 text-[#C6A769]/40 group-hover:text-[#C6A769] transition-colors duration-300" />
                  </div>

                  {/* Review Text - Increased Leading for Luxury Feel */}
                  <p className="text-[#2B2B2B]/80 font-sans text-sm md:text-base font-light leading-[1.8] tracking-wide mb-8">
                    {review.quote}
                  </p>
                  
                  <div className="w-8 h-[1px] bg-[#C6A769]/20" />
                </div>

                {/* Bottom Content: Author Profile */}
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* Portrait Container - Circular */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] mb-4 transition-transform duration-500 group-hover:scale-105">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Author Name */}
                  <h4 className="font-serif text-lg text-[#2B2B2B] transition-colors duration-300 group-hover:text-[#C6A769]">
                    {review.name}
                  </h4>

                  {/* Author Location */}
                  <p className="text-[#2B2B2B]/50 text-xs md:text-sm tracking-[0.2em] uppercase font-light mt-1">
                    {review.location}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;