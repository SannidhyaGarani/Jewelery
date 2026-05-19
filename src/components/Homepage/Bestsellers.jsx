import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';
import { ArrowUpRight, Loader2, ShoppingBag, Heart } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import { useStore } from '../../hooks/useStore';

import 'swiper/css';
import 'swiper/css/free-mode';

const BestSellers = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoadings, setCartLoadings] = useState({});
  const [wishlistLoadings, setWishlistLoadings] = useState({});

  React.useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(8));
        const snap = await getDocs(q);
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(list);
      } catch (e) {
        console.error("Error fetching bestsellers:", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBestsellers();
  }, []);

  const { addToCart, addToWishlist, isInCart, isInWishlist } = useStore();

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    setCartLoadings(prev => ({ ...prev, [product.id]: true }));
    try {
      await addToCart(product);
    } finally {
      setCartLoadings(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleAddToWishlist = async (e, product) => {
    e.stopPropagation();
    setWishlistLoadings(prev => ({ ...prev, [product.id]: true }));
    try {
      await addToWishlist(product);
    } finally {
      setWishlistLoadings(prev => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <section className="bg-[#F8F4EF] py-16 lg:py-24 relative overflow-hidden border-t border-[#D8CBBE]/20">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[9px] md:text-[10px] tracking-[0.4em] text-[#7A0E2E] uppercase font-bold mb-4 block"
            >
              Curated Selection
            </motion.span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2A2623] leading-tight tracking-tight">
              <span className="text-[#7A0E2E] italic font-light block md:inline mb-2 md:mb-0">Jewels</span> Velouraz Loves
            </h2>
          </div>
          <div className="flex items-center gap-8">
            <p className="text-[10px] md:text-xs text-[#7B6D63] max-w-[200px] leading-relaxed uppercase font-bold tracking-widest">
              Discover masterpieces hand-picked by our lead artisans.
            </p>
          </div>
        </div>

        {/* Product Swiper */}
        <div className="relative">
          <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={28}
            slidesPerView={1.2}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1440: { slidesPerView: 4.2 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              <div className="flex gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="min-w-[300px] aspect-[4/5] bg-[#7A0E2E]/5 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : products.map((product) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] bg-[#F4EEE8] overflow-hidden rounded-2xl transition-all duration-700 ease-out group-hover:shadow-[0_30px_60px_rgba(122,14,46,0.1)] border border-[#D8CBBE]/30">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-700"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#2A2623]/0 group-hover:bg-[#2A2623]/5 transition-colors duration-500" />

                    {/* Quick Actions */}
                    <div className="absolute top-6 right-6 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                      <button
                        onClick={(e) => handleAddToWishlist(e, product)}
                        disabled={wishlistLoadings[product.id]}
                        className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all border ${
                          isInWishlist(product.id)
                            ? 'bg-[#7A0E2E] text-white border-[#7A0E2E]'
                            : 'bg-white/90 text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white border-white/20 shadow-lg'
                        }`}
                      >
                        {wishlistLoadings[product.id] ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        )}
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button
                        onClick={(e) => product.stock > 0 && handleAddToCart(e, product)}
                        disabled={product.stock <= 0 || cartLoadings[product.id]}
                        className={`w-full py-4 text-[10px] tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-3 transition-all rounded-xl shadow-xl ${
                          product.stock <= 0
                            ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-100'
                            : isInCart(product.id)
                            ? 'bg-[#7A0E2E] text-white'
                            : 'bg-[#2A2623] text-white hover:bg-[#7A0E2E] border-none'
                        }`}
                      >
                        {cartLoadings[product.id] ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <ShoppingBag size={14} />
                        )}
                        {product.stock <= 0 ? 'Sold Out' : isInCart(product.id) ? 'Added to Cart' : 'Acquire Piece'}
                      </button>
                    </div>

                    {product.stock <= 0 && (
                      <div className="absolute top-6 left-6 z-10">
                        <span className="bg-[#7A0E2E] text-white text-[8px] tracking-[0.3em] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="mt-8 text-center px-4">
                    <h3 className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#7B6D63] mb-2.5">
                      {product.brand || "Velouraz Atelier"}
                    </h3>
                    <p className="font-serif text-xl md:text-2xl text-[#2A2623] mb-2 group-hover:text-[#7A0E2E] transition-colors duration-300">
                      {product.name}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <p className="text-base font-medium text-[#7A0E2E]">
                        ₹{Number(product.price || 0).toLocaleString()}
                      </p>
                      {product.original_price > product.price && (
                        <p className="text-sm text-[#7B6D63]/50 line-through">
                          ₹{Number(product.original_price).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Progress Bar */}
          <div className="mt-16 h-[2px] w-full bg-[#D8CBBE]/30 relative rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#7A0E2E] w-1/4 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "circOut" }}
            />
          </div>
        </div>
      </div>

      {/* Background Decorative */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[400px] font-serif italic text-[#7A0E2E]">V</span>
      </div>
    </section>
  );
};

export default BestSellers;