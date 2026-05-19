import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Jewellery Sets",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400",
    link: "/shop?category=sets"
  },
  {
    id: 2,
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400",
    link: "/shop?category=earrings"
  },
  {
    id: 3,
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=400",
    link: "/shop?category=necklaces"
  },
  {
    id: 4,
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400",
    link: "/shop?category=rings"
  },
  {
    id: 5,
    name: "Bangles",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400",
    link: "/shop?category=bangles"
  },
  {
    id: 6,
    name: "Anklets",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400",
    link: "/shop?category=anklets"
  }
];

const CategorySection = () => {
  return (
    <section className="bg-[#F8F4EF] py-20 lg:py-32 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-[12px] tracking-[0.4em] font-bold text-[#7A0E2E] uppercase block"
          >
            SHOP BY COLLECTION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#2A2623]"
          >
            Find Your <span className="text-[#7A0E2E] italic">Perfect Piece</span>
          </motion.h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center space-y-6"
            >
              <Link to={category.link} className="relative w-full aspect-square bg-[#F4EEE8] rounded-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 block">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#7A0E2E]/5 group-hover:bg-transparent transition-colors duration-500" />
              </Link>
              
              <div className="flex flex-col items-center space-y-2">
                <h3 className="text-sm md:text-base font-serif text-[#2A2623] group-hover:text-[#7A0E2E] transition-colors">
                  {category.name}
                </h3>
                <Link to={category.link} className="flex items-center gap-1 text-[9px] tracking-[0.2em] font-bold text-[#7B6D63] uppercase group-hover:text-[#7A0E2E] transition-all">
                  <span>Shop now</span>
                  <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <Link 
            to="/shop" 
            className="bg-[#7A0E2E] text-[#FFFDF9] px-12 py-4 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-[#5E0B24] transition-all duration-500 shadow-lg"
          >
            View All Collections
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;