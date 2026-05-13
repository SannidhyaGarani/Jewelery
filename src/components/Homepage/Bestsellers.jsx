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
    <section className="bg-[#FDFAF5] py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[9px] md:text-[10px] tracking-[0.4em] text-[#640D14] uppercase font-bold mb-4 block"
            >
              Curated Selection
            </motion.span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2C1A0E] leading-tight tracking-tight">
              <span style={{ fontFamily: "var(--font-script)", fontWeight: 100 }} className="text-4xl md:text-6xl lg:text-7xl block md:inline mb-2 md:mb-0 text-[#640D14]/80">Jewels</span> Velouraz Loves
            </h2>
          </div>
          <div className="flex items-center gap-8">
            <p className="text-[10px] md:text-xs text-[#5C3D1E]/70 max-w-[200px] leading-relaxed uppercase font-bold tracking-widest">
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
                  <div key={i} className="min-w-[300px] aspect-[4/5] bg-[#640D14]/5 animate-pulse rounded-xl" />
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
                  <div className="relative aspect-[4/5] bg-[#F5EDD8] overflow-hidden rounded-xl transition-all duration-700 ease-out group-hover:shadow-[0_24px_60px_rgba(44,26,14,0.12)] border border-[#640D14]/10">
                    <motion.img
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#2C1A0E]/0 group-hover:bg-[#2C1A0E]/10 transition-colors duration-500" />

                    {/* Wishlist */}
                    <div className="absolute top-6 right-6 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                      <button
                        onClick={(e) => handleAddToWishlist(e, product)}
                        disabled={wishlistLoadings[product.id]}
                        className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all border ${
                          isInWishlist(product.id)
                            ? 'bg-[#640D14] text-white border-[#640D14]'
                            : 'bg-white/90 text-[#2C1A0E] hover:bg-[#640D14] hover:text-white border-[#640D14]/20'
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
                    <div className="absolute bottom-5 left-5 right-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button
                        onClick={(e) => product.stock > 0 && handleAddToCart(e, product)}
                        disabled={product.stock <= 0 || cartLoadings[product.id]}
                        className={`w-full py-3.5 text-[10px] tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-2 transition-all rounded-lg ${
                          product.stock <= 0
                            ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-200'
                            : isInCart(product.id)
                            ? 'bg-[#640D14] text-white'
                            : 'bg-white/95 backdrop-blur-md text-[#2C1A0E] hover:bg-[#640D14] hover:text-white border border-[#640D14]/10'
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
                        <span className="bg-red-500 text-white text-[9px] tracking-[0.3em] font-black uppercase px-3 py-1 rounded-md shadow">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="mt-6 lg:text-center text-left px-2">
                    <h3 className="text-[11px] tracking-[0.3em] font-bold uppercase text-[#640D14]/70 mb-2">
                      {product.brand || "Velouraz Atelier"}
                    </h3>
                    <p className="font-serif text-xl text-[#2C1A0E] mb-1">
                      {product.name}
                    </p>
                    <div className="flex items-center lg:justify-center gap-3">
                      <p className="text-sm font-sans text-[#5C3D1E]">
                        ₹{Number(product.price || 0).toLocaleString()}
                      </p>
                      {product.original_price > product.price && (
                        <p className="text-xs font-sans text-[#8A6D4B]/50 line-through">
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
          <div className="mt-14 h-[1px] w-full bg-[#640D14]/10 relative">
            <motion.div className="absolute top-0 left-0 h-full bg-[#640D14] w-1/4" />
          </div>
        </div>
      </div>

      {/* Background Decorative */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-[0.03] pointer-events-none">
        <span className="text-[300px] font-serif italic text-[#640D14]">V</span>
      </div>
    </section>

  );
};

export default BestSellers;