import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../components/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/useAuth";
import { useStore } from '../hooks/useStore';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Shield, Truck, RotateCcw, Heart, ShoppingBag, 
  ArrowLeft, Share2, Info, Gem, Sparkles, Ruler, ArrowRight, Loader2
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const curatedProducts = [];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const curated = curatedProducts.find(p => String(p.id) === String(id));
      if (curated) {
        setProduct(curated);
        setLoading(false);
        return;
      }
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        }
      } catch (e) {
        console.error("Firebase error:", e);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const { addToCart, addToWishlist, isInCart, isInWishlist } = useStore();

  const handleAddToCart = async () => {
    if (!product) return;
    setCartLoading(true);
    try {
      await addToCart(product, quantity);
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    setWishlistLoading(true);
    try {
      await addToWishlist(product);
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4EF] flex flex-col items-center justify-center gap-6">
        <div className="w-10 h-10 border-[2px] border-[#7A0E2E] border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#7A0E2E] font-bold">Revealing Masterpiece</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F4EF] flex flex-col items-center justify-center gap-8 text-center p-6">
        <h2 className="font-serif text-4xl text-[#2A2623]/80 italic">Inventory unavailable.</h2>
        <button onClick={() => navigate('/shop')} className="text-[11px] tracking-[0.4em] uppercase text-[#7A0E2E] border-b-2 border-[#7A0E2E]/20 hover:border-[#7A0E2E] pb-2 transition-all font-bold">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] pt-20 pb-32 font-sans relative text-[#2A2623] selection:bg-[#7A0E2E]/10 selection:text-[#7A0E2E]">
      
      {/* Cinematic lines - Subdued */}
      <div className="fixed left-[5%] top-0 w-[1px] h-full bg-[#D8CBBE]/20 hidden 2xl:block pointer-events-none" />
      <div className="fixed right-[5%] top-0 w-[1px] h-full bg-[#D8CBBE]/20 hidden 2xl:block pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Navigation - Ultra Minimal */}
        <div className="mb-12 flex justify-between items-center border-b border-[#D8CBBE]/30 pb-8">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-[#7B6D63] hover:text-[#7A0E2E] transition-all"
          >
            <ArrowLeft size={16} strokeWidth={2} className="group-hover:-translate-x-2 transition-transform duration-500" />
            Return to Collection
          </button>
          
          <div className="flex gap-10 items-center hidden sm:flex">
             <button className="text-[10px] uppercase tracking-[0.4em] text-[#7B6D63] hover:text-[#7A0E2E] transition-colors font-bold">Previous Piece</button>
             <span className="w-12 h-[1px] bg-[#D8CBBE]/50"></span>
             <button className="text-[10px] uppercase tracking-[0.4em] text-[#7B6D63] hover:text-[#7A0E2E] transition-colors font-bold">Next Piece</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left: Sticky Gallery (55%) */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-32 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] bg-white rounded-[40px] overflow-hidden border border-[#D8CBBE]/30 group shadow-[0_30px_60px_rgba(0,0,0,0.03)]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute top-8 left-8">
                <div className="bg-[#7A0E2E] backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-[9px] tracking-[0.4em] font-bold text-white uppercase shadow-2xl">
                  ITEM REF: {product.id.slice(0, 8).toUpperCase()}
                </div>
              </div>
            </motion.div>
            
            {/* Thumbnails */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="flex-shrink-0 w-24 aspect-square bg-white rounded-[24px] border border-[#D8CBBE]/30 overflow-hidden cursor-pointer hover:border-[#7A0E2E] transition-all duration-500 relative shadow-sm group">
                    <img src={product.image} alt="Gallery view" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Bespoke Details (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col pt-4">
            
            <div className="space-y-16">
              {/* Header Info */}
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <span className="h-[1px] w-16 bg-[#7A0E2E]"></span>
                  <span className="text-[10px] tracking-[0.6em] font-bold uppercase text-[#7A0E2E]">
                    {product.category || 'Atelier Exclusive'}
                  </span>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-serif text-[#2A2623] leading-[1] tracking-tighter"
                >
                  <span className="text-[#7A0E2E] italic font-light block mb-2">
                    {product.name.split(' ')[0]}
                  </span>
                  {product.name.split(' ').slice(1).join(' ')}
                </motion.h1>
                
                <div className="flex items-center gap-8">
                  <p className="text-4xl font-serif text-[#2A2623]">
                    ₹{Number(product.price).toLocaleString()}
                  </p>
                  {product.original_price > product.price && (
                    <p className="text-2xl font-serif text-[#7B6D63]/30 line-through">
                      ₹{Number(product.original_price).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  {product.stock <= 0 ? (
                    <span className="bg-[#7A0E2E] text-white px-8 py-3 rounded-full text-[10px] tracking-[0.4em] font-bold uppercase shadow-xl">
                      Sold Out
                    </span>
                  ) : (
                    <div className="flex items-center gap-6">
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-8 py-3 rounded-full text-[10px] tracking-[0.4em] font-bold uppercase">
                        Available Piece
                      </span>
                      {product.stock <= 5 && (
                        <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest animate-pulse">
                          Only {product.stock} Remaining
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="pb-12 border-b border-[#D8CBBE]/30">
                <p className="text-lg text-[#7B6D63] font-serif italic leading-relaxed">
                  {product.description || "An exceptional masterwork of artisanal ingenuity, meticulously handcrafted to embody the pinnacle of Velouraz's design philosophy and timeless elegance."}
                </p>
              </div>

              {/* Acquisition Actions */}
              <div className="space-y-12">
                <div className="flex items-center gap-10">
                  <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#7B6D63]">Quantity</span>
                  <div className="flex items-center border border-[#D8CBBE]/50 rounded-full bg-white/50 backdrop-blur-sm p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-[#2A2623] hover:text-[#7A0E2E] transition-colors text-xl font-light"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-[#2A2623] text-sm tracking-widest">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(Math.min(10, Number(product.stock)), quantity + 1))}
                      disabled={quantity >= Math.min(10, Number(product.stock))}
                      className="w-12 h-12 flex items-center justify-center text-[#2A2623] hover:text-[#7A0E2E] transition-colors disabled:opacity-20 text-xl font-light"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0 || cartLoading}
                    className={`flex-1 h-20 text-[11px] uppercase tracking-[0.5em] font-bold rounded-2xl transition-all duration-700 flex items-center justify-center gap-4 shadow-2xl ${
                      product.stock <= 0
                      ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-100'
                      : isInCart(product.id)
                      ? 'bg-[#7A0E2E] text-white'
                      : 'bg-[#2A2623] text-white hover:bg-[#7A0E2E] shadow-[#2A2623]/20'
                    }`}
                  >
                    {cartLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <ShoppingBag size={20} />
                    )}
                    {product.stock <= 0 ? 'Out of Stock' : isInCart(product.id) ? 'Added to Cart' : 'Acquire Piece'}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    disabled={wishlistLoading}
                    className={`w-20 h-20 rounded-2xl border border-[#D8CBBE]/50 flex items-center justify-center transition-all duration-700 bg-white shadow-lg group ${
                      isInWishlist(product.id)
                      ? 'bg-[#7A0E2E] border-[#7A0E2E] text-white'
                      : 'text-[#2A2623] hover:text-[#7A0E2E] hover:border-[#7A0E2E]'
                    }`}
                  >
                    {wishlistLoading ? (
                      <Loader2 size={22} className="animate-spin" />
                    ) : (
                      <Heart size={24} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    )}
                  </button>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="space-y-12">
                <div className="flex gap-10 border-b border-[#D8CBBE]/30 overflow-x-auto scrollbar-hide">
                  {[
                    { id: 'details', label: 'Details' },
                    { id: 'craft', label: 'Craftsmanship' },
                    { id: 'styling', label: 'Style' },
                    { id: 'care', label: 'Care' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-all relative pb-6 whitespace-nowrap ${activeTab === tab.id ? 'text-[#7A0E2E]' : 'text-[#7B6D63]/40 hover:text-[#7A0E2E]'}`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7A0E2E]" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="min-h-[250px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-10"
                    >
                      {activeTab === 'details' && (
                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                          <div className="space-y-3">
                            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#7B6D63]/30">Reference</p>
                            <p className="text-sm text-[#2A2623] font-medium tracking-wide uppercase">{product.id.slice(0, 12)}</p>
                          </div>
                          <div className="space-y-3">
                            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#7B6D63]/30">Material</p>
                            <p className="text-sm text-[#2A2623] font-medium tracking-wide uppercase">Demi-Fine / Gold Plated</p>
                          </div>
                          <div className="space-y-3">
                            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#7B6D63]/30">Size & Fit</p>
                            <p className="text-sm text-[#2A2623] font-medium tracking-wide uppercase">{product.size_weight || "Adjustable Standard"}</p>
                          </div>
                          <div className="space-y-3">
                            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#7B6D63]/30">Atelier</p>
                            <p className="text-sm text-[#2A2623] font-medium tracking-wide uppercase">Velouraz Studio</p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'craft' && (
                        <div className="space-y-8">
                          <p className="text-sm text-[#7B6D63] leading-relaxed font-serif italic">
                            Each Velouraz piece undergoes a meticulous polishing process to achieve a smooth, high-lustre surface. We use advanced plating techniques including gold, rose gold, and rhodium finishes to enhance both appearance and longevity.
                          </p>
                          <div className="flex items-center gap-4 text-[#7A0E2E]">
                            <Sparkles size={16} />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Signature Anti-Tarnish Finish</span>
                          </div>
                        </div>
                      )}

                      {activeTab === 'styling' && (
                        <div className="space-y-8">
                          <div className="p-8 bg-white rounded-[32px] border border-[#D8CBBE]/30 shadow-sm">
                            <p className="text-base text-[#2A2623] font-serif italic leading-relaxed">
                              "Pair it with a minimal outfit, layered necklaces, or traditional wear for a chic look and statement style. Designed to elevate your style with timeless charm."
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'care' && (
                        <div className="space-y-8">
                          <ul className="space-y-4">
                            {[
                              "Avoid contact with water and perfumes",
                              "Store in the provided luxury box",
                              "Wipe with a soft, dry cloth after use",
                              "Keep away from direct sunlight"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-4 text-xs text-[#7B6D63] tracking-widest uppercase font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7A0E2E]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#D8CBBE]/30">
                {[
                  { icon: Shield, label: "Vault Secure" },
                  { icon: Truck, label: "Express Shipping" },
                  { icon: RotateCcw, label: "Hassle Free" },
                  { icon: Gem, label: "Premium Quality" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 text-center">
                    <item.icon size={20} className="text-[#7A0E2E]/40" strokeWidth={1} />
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#7B6D63]">{item.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Mobile Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-2xl border-t border-[#D8CBBE]/30 z-50 lg:hidden flex gap-4 pb-safe-area shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || cartLoading}
            className={`flex-1 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg ${
              product.stock <= 0
              ? 'bg-red-50 text-red-400'
              : isInCart(product.id)
              ? 'bg-[#7A0E2E] text-white'
              : 'bg-[#2A2623] text-white'
            }`}
          >
            {cartLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ShoppingBag size={16} />
            )}
            {product.stock <= 0 ? 'Out of Stock' : isInCart(product.id) ? 'In Cart' : 'Acquire'}
          </button>
          <button
            onClick={handleAddToWishlist}
            disabled={wishlistLoading}
            className={`w-14 h-14 rounded-xl border border-[#D8CBBE]/50 flex items-center justify-center active:scale-95 transition-all bg-white shadow-md ${
              isInWishlist(product.id)
              ? 'bg-[#7A0E2E] border-[#7A0E2E] text-white'
              : 'text-[#2A2623]'
            }`}
          >
            {wishlistLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
            )}
          </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe-area { padding-bottom: max(1.25rem, env(safe-area-inset-bottom)); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default ProductDetail;