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
      <div className="min-h-screen bg-[#FDFAF5] flex flex-col items-center justify-center gap-6">
        <div className="w-10 h-10 border-[2px] border-[#640D14] border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#640D14] font-bold">Revealing Masterpiece</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex flex-col items-center justify-center gap-8 text-center p-6">
        <h2 className="font-serif text-4xl text-[#2C1A0E]/80 italic">Inventory unavailable.</h2>
        <button onClick={() => navigate('/shop')} className="text-[11px] tracking-[0.4em] uppercase text-[#640D14] border-b-2 border-[#640D14]/20 hover:border-[#640D14] pb-2 transition-all font-black">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5] pt-32 lg:pt-48 pb-32 lg:pb-20 font-sans relative text-[#2C1A0E] selection:bg-[#640D14]/10 selection:text-[#640D14]">
      
      {/* Cinematic lines - Subdued */}
      <div className="fixed left-[5%] top-0 w-[1px] h-full bg-[#640D14]/5 hidden 2xl:block pointer-events-none" />
      <div className="fixed right-[5%] top-0 w-[1px] h-full bg-[#640D14]/5 hidden 2xl:block pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Navigation - Ultra Minimal */}
        <div className="mb-10 lg:mb-16 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-[#5C3D1E]/40 hover:text-[#640D14] transition-all"
          >
            <ArrowLeft size={16} strokeWidth={2} className="group-hover:-translate-x-2 transition-transform" />
            Collection
          </button>
          
          <div className="flex gap-8 items-center hidden sm:flex">
             <button className="text-[10px] uppercase tracking-[0.4em] text-[#5C3D1E]/40 hover:text-[#640D14] transition-colors font-black">Prev</button>
             <span className="w-10 h-[1px] bg-[#640D14]/10"></span>
             <button className="text-[10px] uppercase tracking-[0.4em] text-[#5C3D1E]/40 hover:text-[#640D14] transition-colors font-black">Next</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left: Sticky Gallery (55%) */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-32 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] bg-white rounded-[40px] overflow-hidden border border-[#640D14]/10 group shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute top-8 left-8">
                <div className="bg-[#640D14]/90 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full text-[10px] tracking-[0.3em] font-black text-white uppercase shadow-xl">
                  REF {product.id.slice(0, 6)}
                </div>
              </div>
            </motion.div>
            
            {/* Thumbnails - Horizontally scrollable on mobile */}
            <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="flex-shrink-0 w-24 lg:w-full aspect-square bg-white rounded-[24px] border border-[#640D14]/10 overflow-hidden cursor-pointer hover:border-[#640D14] transition-all duration-300 relative shadow-sm">
                    <img src={product.image} alt="Gallery view" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-all duration-500 scale-110" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Bespoke Details (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col pt-2 lg:pt-8">
            
            <div className="space-y-12">
              {/* Header Info */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="h-[2px] w-12 bg-[#640D14]/30"></span>
                  <span className="text-[10px] tracking-[0.5em] font-black uppercase text-[#640D14]">
                    {product.category || 'Atelier Exclusive'}
                  </span>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2C1A0E] leading-[1.05] tracking-tight"
                >
                  <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-6xl md:text-7xl lg:text-8xl block mb-2 text-[#640D14]/80 -ml-2 lg:-ml-6">
                    {product.name.split(' ')[0]}
                  </span>
                  <span className="relative z-10">{product.name.split(' ').slice(1).join(' ')}</span>
                </motion.h1>
                
                <div className="flex items-center gap-6">
                  <p className="text-3xl md:text-4xl font-serif text-[#2C1A0E]">
                    ₹{product.price.toLocaleString()}.00
                  </p>
                  {product.original_price > product.price && (
                    <p className="text-2xl font-serif text-[#5C3D1E]/30 line-through">
                      ₹{product.original_price.toLocaleString()}.00
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {product.stock <= 0 ? (
                    <span className="bg-[#640D14] text-white px-6 py-2 rounded-full text-[10px] tracking-[0.3em] font-black uppercase shadow-lg">
                      Sold Out
                    </span>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-6 py-2 rounded-full text-[10px] tracking-[0.3em] font-black uppercase">
                        In Stock
                      </span>
                      {product.stock <= 5 && (
                        <span className="text-[10px] text-amber-600 font-black uppercase tracking-widest animate-pulse">
                          Only {product.stock} Left
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="pb-10 border-b border-[#640D14]/10">
                <p className="text-[15px] md:text-base text-[#5C3D1E]/70 font-sans leading-relaxed">
                  {product.description || "An exceptional masterwork of artisanal ingenuity, meticulously handcrafted to embody the pinnacle of Velouraz's design philosophy and timeless elegance."}
                </p>
              </div>

              {/* Editorial Tabs Selection */}
              <div className="space-y-10">
                <div className="flex gap-10 border-b border-[#640D14]/10 pb-px overflow-x-auto scrollbar-hide">
                  {[
                    { id: 'details', label: 'Bespoke Details' },
                    { id: 'craft', label: 'Atelier Craft' },
                    { id: 'styling', label: 'Heritage & Style' },
                    { id: 'care', label: 'Longevity' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-[10px] uppercase tracking-[0.4em] font-black transition-all relative pb-4 whitespace-nowrap ${activeTab === tab.id ? 'text-[#640D14]' : 'text-[#5C3D1E]/30 hover:text-[#640D14]/60'}`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#640D14] shadow-[0_4px_12px_rgba(100,13,20,0.2)]" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="space-y-8"
                    >
                      {activeTab === 'details' && (
                        <div className="space-y-10">
                          <div className="space-y-6">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#640D14]/80">Key Features</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                              {[
                                "Premium quality material for long-lasting shine",
                                "Lightweight & comfortable for all-day wear",
                                "Skin-friendly & hypoallergenic",
                                "Waterproof, Anti Tarnish",
                                "Handcrafted with precision and care"
                              ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-4 text-[12px] text-[#5C3D1E]/60 tracking-wider font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#640D14]/40" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-6 pt-6 border-t border-[#640D14]/10">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#640D14]/80">Detail & Dimensions</h4>
                            <div className="grid grid-cols-2 gap-8">
                              <div className="space-y-2">
                                <p className="text-[9px] uppercase tracking-[0.3em] font-black text-[#5C3D1E]/20">Length / Size</p>
                                <p className="text-[12px] text-[#5C3D1E]/60 tracking-wider font-bold">{product.size_weight || "Standard Adjustable"}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-[9px] uppercase tracking-[0.3em] font-black text-[#5C3D1E]/20">Weight</p>
                                <p className="text-[12px] text-[#5C3D1E]/60 tracking-wider font-bold">Lightweight / Comfort Fit</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-[9px] uppercase tracking-[0.3em] font-black text-[#5C3D1E]/20">Closure Type</p>
                                <p className="text-[12px] text-[#5C3D1E]/60 tracking-wider font-bold">{product.material?.includes('hook') ? 'Signature Hook' : 'Secure Clasp'}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-[9px] uppercase tracking-[0.3em] font-black text-[#5C3D1E]/20">Jewellery Type</p>
                                <p className="text-[12px] text-[#5C3D1E]/60 tracking-wider font-bold">Demi Fine Masterpiece</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'craft' && (
                        <div className="space-y-10">
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <Gem size={16} className="text-[#640D14]/60" />
                              <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#640D14]/80">Advanced Metal Finishing</h4>
                            </div>
                            <p className="text-[12px] text-[#5C3D1E]/60 leading-relaxed tracking-wider uppercase font-bold">
                              Each Velouraz piece undergoes a meticulous polishing process to achieve a smooth, high-lustre surface. We use advanced plating techniques — including gold, rose gold, and rhodium finishes — to enhance both appearance and longevity. This multi-layered finishing not only gives the jewellery its rich, radiant look but also adds a protective barrier to the metal beneath.
                            </p>
                          </div>
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <Shield size={16} className="text-[#640D14]/60" />
                              <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#640D14]/80">Signature Anti-Tarnish Technology</h4>
                            </div>
                            <p className="text-[12px] text-[#5C3D1E]/60 leading-relaxed tracking-wider uppercase font-bold">
                              Our jewellery is treated with specialized anti-tarnish coatings designed to reduce oxidation and surface degradation. These protective layers help preserve the original finish, minimizing dullness and discoloration over time — even when exposed to humidity, air, and routine environmental factors.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-[#640D14]/10">
                            <div className="space-y-4">
                              <h5 className="text-[10px] uppercase tracking-[0.3em] text-[#5C3D1E]/30 font-black">Skin-Safe & Wearable</h5>
                              <p className="text-[11px] text-[#5C3D1E]/50 leading-relaxed italic font-medium">Designed to be skin-friendly and suitable for prolonged wear through lightweight construction and balanced design.</p>
                            </div>
                            <div className="space-y-4">
                              <h5 className="text-[10px] uppercase tracking-[0.3em] text-[#5C3D1E]/30 font-black">Material Focus</h5>
                              <p className="text-[11px] text-[#5C3D1E]/50 leading-relaxed italic font-medium">Crafted using high-quality metals such as sterling silver with premium plating, aligning with international demi-fine standards.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'styling' && (
                        <div className="space-y-10">
                          <div className="space-y-6">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#640D14]/80">The Style Tip</h4>
                            <div className="bg-[#640D14]/5 border-l-4 border-[#640D14] p-8 rounded-r-[32px] italic shadow-sm">
                              <p className="text-[14px] text-[#2C1A0E] leading-relaxed tracking-wide font-medium">
                                "Pair it with a minimal outfit, layered necklaces, or traditional wear for a chic look and statement style. Designed to elevate your style with timeless charm."
                              </p>
                            </div>
                          </div>
                          <div className="space-y-6 pt-6">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#640D14]/80">Perfect For</h4>
                            <p className="text-[12px] text-[#5C3D1E]/60 leading-relaxed tracking-wider uppercase font-bold">
                              Every occasion—from thoughtful gifting to grand weddings, festive celebrations to effortless everyday elegance. Each piece makes every moment feel a little more special.
                            </p>
                          </div>
                          <div className="space-y-6 pt-6 border-t border-[#640D14]/10">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#5C3D1E]/30">Seasonal & Limited Editions</h4>
                            <p className="text-[12px] text-[#5C3D1E]/40 leading-relaxed tracking-wider italic font-medium">
                              Small-batch collections inspired by evolving global trends, ensuring exclusivity and freshness within the portfolio.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'care' && (
                        <div className="space-y-10">
                          <div className="space-y-8">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#640D14]/80">Care Instructions</h4>
                            <div className="space-y-6">
                              <p className="text-[12px] text-[#5C3D1E]/60 leading-relaxed tracking-wider uppercase font-black">
                                To preserve the beauty of your piece, avoid contact with water, perfumes, and harsh chemicals. Store it in a cool, dry place when not in use to maintain its shine and finish.
                              </p>
                              <p className="text-[12px] text-[#5C3D1E]/40 leading-relaxed tracking-wider uppercase font-bold">
                                With proper care, Velouraz jewellery is crafted to retain its brilliance and elegance over time. Thoughtfully made using high-quality base metals, refined polishing techniques, and advanced anti-tarnish technology.
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-[#640D14]/10">
                            <div className="flex items-center gap-4 text-[#5C3D1E]/30">
                              <RotateCcw size={18} strokeWidth={2} />
                              <span className="text-[9px] uppercase tracking-[0.3em] font-black">Wipe with soft cloth</span>
                            </div>
                            <div className="flex items-center gap-4 text-[#5C3D1E]/30">
                              <Shield size={18} strokeWidth={2} />
                              <span className="text-[9px] uppercase tracking-[0.3em] font-black">Avoid Chemicals</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Desktop Acquisition Actions (Hidden on Mobile) */}
              <div className="hidden lg:flex flex-col gap-8 pt-6">
                <div className="flex items-center gap-8">
                  <span className="text-[11px] uppercase tracking-[0.4em] font-black text-[#5C3D1E]/40">Quantity</span>
                  <div className="flex items-center border border-[#640D14]/10 rounded-full overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-6 py-3 text-[#2C1A0E] hover:bg-[#640D14]/5 transition-colors font-black text-xl"
                    >
                      −
                    </button>
                    <span className="px-8 py-3 font-black text-[#2C1A0E] border-l border-r border-[#640D14]/10 min-w-[70px] text-center text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(Math.min(10, Number(product.stock)), quantity + 1))}
                      disabled={quantity >= Math.min(10, Number(product.stock))}
                      className={`px-6 py-3 text-[#2C1A0E] hover:bg-[#640D14]/5 transition-colors font-black text-xl ${quantity >= Math.min(10, Number(product.stock)) ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] text-[#5C3D1E]/20 uppercase tracking-[0.3em] font-black">(Max 10)</span>
                </div>

                <div className="flex gap-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0 || cartLoading}
                    className={`flex-1 h-16 text-[11px] uppercase tracking-[0.4em] font-black rounded-full transition-all duration-500 flex items-center justify-center gap-4 shadow-xl ${
                      product.stock <= 0
                      ? 'bg-[#2C1A0E]/10 text-[#2C1A0E]/40 cursor-not-allowed border border-[#2C1A0E]/10'
                      : isInCart(product.id)
                      ? 'bg-[#640D14] text-white'
                      : 'bg-[#2C1A0E] text-white hover:bg-[#640D14]'
                    }`}
                  >
                    {cartLoading ? (
                      <Loader2 size={20} className="animate-spin text-white" />
                    ) : (
                      <ShoppingBag size={20} strokeWidth={2} />
                    )}
                    {product.stock <= 0 ? 'Out of Stock' : isInCart(product.id) ? 'In Collection' : 'Acquire Selection'}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    disabled={wishlistLoading}
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-lg ${
                      isInWishlist(product.id)
                      ? 'bg-[#640D14] border-[#640D14] text-white'
                      : 'border-[#640D14]/10 bg-white text-[#2C1A0E] hover:text-[#640D14] hover:border-[#640D14]'
                    }`}
                  >
                    {wishlistLoading ? (
                      <Loader2 size={22} className="animate-spin text-[#640D14]" />
                    ) : (
                      <Heart size={22} strokeWidth={2} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    )}
                  </button>
                </div>
              </div>

              {/* Atelier Contact Card */}
              <div className="mt-10 p-8 lg:p-10 bg-white rounded-[40px] border border-[#640D14]/10 flex flex-col sm:flex-row items-start sm:items-center gap-8 group hover:border-[#640D14]/30 transition-all duration-700 shadow-sm">
                 <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#640D14]/5">
                    <img src="https://i.pravatar.cc/100?u=artisan" alt="Artisan" className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <h4 className="text-[11px] tracking-[0.3em] uppercase font-black text-[#2C1A0E]">Privé Concierge</h4>
                      <span className="w-2 h-2 rounded-full bg-[#640D14] animate-pulse"></span>
                    </div>
                    <p className="text-[11px] text-[#5C3D1E]/50 tracking-[0.15em] leading-normal italic font-medium">
                      Master artisans available for bespoke modifications.
                    </p>
                 </div>
                 <button className="text-[10px] tracking-[0.3em] uppercase text-[#640D14] border-b-2 border-[#640D14]/20 pb-2 hover:border-[#640D14] transition-all flex-shrink-0 mt-4 sm:mt-0 font-black">
                    Consult
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-2xl border-t border-[#640D14]/10 z-50 lg:hidden flex gap-4 pb-safe-area shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || cartLoading}
            className={`flex-1 h-14 text-[11px] uppercase tracking-[0.3em] font-black rounded-full active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg ${
              product.stock <= 0
              ? 'bg-[#2C1A0E]/10 text-[#2C1A0E]/40'
              : isInCart(product.id)
              ? 'bg-[#640D14] text-white'
              : 'bg-[#2C1A0E] text-white'
            }`}
          >
            {cartLoading ? (
              <Loader2 size={16} className="animate-spin text-white" />
            ) : (
              <ShoppingBag size={16} strokeWidth={2} />
            )}
            {product.stock <= 0 ? 'Sold Out' : isInCart(product.id) ? 'In Collection' : 'Acquire'}
          </button>
          <button
            onClick={handleAddToWishlist}
            disabled={wishlistLoading}
            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center active:scale-95 transition-all shadow-md ${
              isInWishlist(product.id)
              ? 'bg-[#640D14] border-[#640D14] text-white'
              : 'border-[#640D14]/10 bg-white text-[#2C1A0E]'
            }`}
          >
            {wishlistLoading ? (
              <Loader2 size={18} className="animate-spin text-[#640D14]" />
            ) : (
              <Heart size={18} strokeWidth={2} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
            )}
          </button>
      </div>

      {/* Safe area padding style for iOS bottom bar support */}
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe-area { padding-bottom: max(1.25rem, env(safe-area-inset-bottom)); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default ProductDetail;