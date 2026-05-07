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
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6">
        <div className="w-8 h-8 border-[1.5px] border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-[9px] uppercase tracking-[0.4em] text-white/40">Revealing Masterpiece</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-8 text-center p-6">
        <h2 className="font-serif text-3xl text-white/80 italic">Inventory unavailable.</h2>
        <button onClick={() => navigate('/shop')} className="text-[10px] tracking-[0.3em] uppercase text-accent border-b border-accent/40 hover:border-accent pb-1 transition-colors">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 lg:pt-32 pb-32 lg:pb-20 font-sans relative text-white selection:bg-accent/30 selection:text-white">
      
      {/* Cinematic lines - Subdued */}
      <div className="fixed left-[5%] top-0 w-[1px] h-full bg-white/[0.02] hidden 2xl:block pointer-events-none" />
      <div className="fixed right-[5%] top-0 w-[1px] h-full bg-white/[0.02] hidden 2xl:block pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Navigation - Ultra Minimal */}
        <div className="mb-8 lg:mb-12 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-medium text-white/40 hover:text-white transition-all"
          >
            <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
            Selection
          </button>
          
          <div className="flex gap-5 items-center hidden sm:flex">
             <button className="text-[9px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Prev</button>
             <span className="w-6 h-[1px] bg-white/10"></span>
             <button className="text-[9px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Next</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left: Sticky Gallery (55%) */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-28 space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] bg-[#0f0f0f] rounded-[24px] overflow-hidden border border-white/5 group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute top-5 left-5">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[9px] tracking-[0.2em] font-medium text-white/90 uppercase">
                  REF {product.id.slice(0, 6)}
                </div>
              </div>
            </motion.div>
            
            {/* Thumbnails - Horizontally scrollable on mobile */}
            <div className="flex lg:grid lg:grid-cols-4 gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="flex-shrink-0 w-20 lg:w-full aspect-square bg-[#0f0f0f] rounded-xl border border-white/5 overflow-hidden cursor-pointer hover:border-accent/50 transition-colors duration-300 relative">
                    <img src={product.image} alt="Gallery view" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Bespoke Details (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col pt-2 lg:pt-6">
            
            <div className="space-y-8">
              {/* Header Info */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-accent/40"></span>
                  <span className="text-[9px] tracking-[0.4em] font-medium uppercase text-accent">
                    {product.category || 'Atelier Exclusive'}
                  </span>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.05] tracking-tight"
                >
                  <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-5xl md:text-6xl lg:text-7xl block mb-1 text-accent/90 -ml-2 lg:-ml-4">
                    {product.name.split(' ')[0]}
                  </span>
                  <span className="relative z-10">{product.name.split(' ').slice(1).join(' ')}</span>
                </motion.h1>
                
                <div className="flex items-center gap-4">
                  <p className="text-2xl md:text-3xl font-serif text-white/90">
                    ₹{product.price.toLocaleString()}.00
                  </p>
                  {product.original_price > product.price && (
                    <p className="text-xl font-serif text-white/30 line-through">
                      ₹{product.original_price.toLocaleString()}.00
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {product.stock <= 0 ? (
                    <span className="bg-red-600/10 text-red-500 border border-red-500/20 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase">
                      Sold Out
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase">
                        In Stock
                      </span>
                      {product.stock <= 5 && (
                        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider animate-pulse">
                          Only {product.stock} Left
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="pb-8 border-b border-white/10">
                <p className="text-[13px] md:text-sm text-white/60 font-sans leading-relaxed">
                  {product.description || "An exceptional masterwork of artisanal ingenuity, meticulously handcrafted to embody the pinnacle of Velouraz's design philosophy and timeless elegance."}
                </p>
              </div>

              {/* Editorial Tabs Selection */}
              <div className="space-y-8">
                <div className="flex gap-8 border-b border-white/5 pb-px overflow-x-auto scrollbar-hide">
                  {[
                    { id: 'details', label: 'Bespoke Details' },
                    { id: 'craft', label: 'Atelier Craft' },
                    { id: 'styling', label: 'Heritage & Style' },
                    { id: 'care', label: 'Longevity' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-[9px] uppercase tracking-[0.3em] font-bold transition-all relative pb-3 whitespace-nowrap ${activeTab === tab.id ? 'text-accent' : 'text-white/30 hover:text-white/60'}`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent shadow-[0_0_10px_rgba(198,166,100,0.5)]" />
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
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      {activeTab === 'details' && (
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/80">Key Features</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                              {[
                                "Premium quality material for long-lasting shine",
                                "Lightweight & comfortable for all-day wear",
                                "Skin-friendly & hypoallergenic",
                                "Waterproof, Anti Tarnish",
                                "Handcrafted with precision and care"
                              ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-[11px] text-white/50 tracking-wider">
                                  <span className="w-1 h-1 rounded-full bg-accent/40" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-white/5">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/80">Detail & Dimensions</h4>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-widest text-white/20">Length / Size</p>
                                <p className="text-[11px] text-white/60 tracking-wider">{product.size_weight || "Standard Adjustable"}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-widest text-white/20">Weight</p>
                                <p className="text-[11px] text-white/60 tracking-wider">Lightweight / Comfort Fit</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-widest text-white/20">Closure Type</p>
                                <p className="text-[11px] text-white/60 tracking-wider">{product.material?.includes('hook') ? 'Signature Hook' : 'Secure Clasp'}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-widest text-white/20">Jewellery Type</p>
                                <p className="text-[11px] text-white/60 tracking-wider">Demi Fine Masterpiece</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'craft' && (
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Gem size={12} className="text-accent/60" />
                              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/80">Advanced Metal Finishing</h4>
                            </div>
                            <p className="text-[11px] text-white/50 leading-relaxed tracking-wider uppercase">
                              Each Velouraz piece undergoes a meticulous polishing process to achieve a smooth, high-lustre surface. We use advanced plating techniques — including gold, rose gold, and rhodium finishes — to enhance both appearance and longevity. This multi-layered finishing not only gives the jewellery its rich, radiant look but also adds a protective barrier to the metal beneath.
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Shield size={12} className="text-accent/60" />
                              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/80">Signature Anti-Tarnish Technology</h4>
                            </div>
                            <p className="text-[11px] text-white/50 leading-relaxed tracking-wider uppercase">
                              Our jewellery is treated with specialized anti-tarnish coatings designed to reduce oxidation and surface degradation. These protective layers help preserve the original finish, minimizing dullness and discoloration over time — even when exposed to humidity, air, and routine environmental factors.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                            <div className="space-y-3">
                              <h5 className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Skin-Safe & Wearable</h5>
                              <p className="text-[10px] text-white/40 leading-relaxed italic">Designed to be skin-friendly and suitable for prolonged wear through lightweight construction and balanced design.</p>
                            </div>
                            <div className="space-y-3">
                              <h5 className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Material Focus</h5>
                              <p className="text-[10px] text-white/40 leading-relaxed italic">Crafted using high-quality metals such as sterling silver with premium plating, aligning with international demi-fine standards.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'styling' && (
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/80">The Style Tip</h4>
                            <div className="bg-white/[0.02] border-l-2 border-accent p-6 rounded-r-2xl italic">
                              <p className="text-[12px] text-white/70 leading-relaxed tracking-wide">
                                "Pair it with a minimal outfit, layered necklaces, or traditional wear for a chic look and statement style. Designed to elevate your style with timeless charm."
                              </p>
                            </div>
                          </div>
                          <div className="space-y-4 pt-4">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/80">Perfect For</h4>
                            <p className="text-[11px] text-white/50 leading-relaxed tracking-wider uppercase">
                              Every occasion—from thoughtful gifting to grand weddings, festive celebrations to effortless everyday elegance. Each piece makes every moment feel a little more special.
                            </p>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-white/5">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Seasonal & Limited Editions</h4>
                            <p className="text-[11px] text-white/40 leading-relaxed tracking-wider italic">
                              Small-batch collections inspired by evolving global trends, ensuring exclusivity and freshness within the portfolio.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'care' && (
                        <div className="space-y-8">
                          <div className="space-y-6">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/80">Care Instructions</h4>
                            <div className="space-y-4">
                              <p className="text-[11px] text-white/50 leading-relaxed tracking-wider uppercase font-bold">
                                To preserve the beauty of your piece, avoid contact with water, perfumes, and harsh chemicals. Store it in a cool, dry place when not in use to maintain its shine and finish.
                              </p>
                              <p className="text-[11px] text-white/40 leading-relaxed tracking-wider uppercase">
                                With proper care, Velouraz jewellery is crafted to retain its brilliance and elegance over time. Thoughtfully made using high-quality base metals, refined polishing techniques, and advanced anti-tarnish technology.
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-3 text-white/20">
                              <RotateCcw size={14} />
                              <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Wipe with soft cloth</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/20">
                              <Shield size={14} />
                              <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Avoid Chemicals</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Desktop Acquisition Actions (Hidden on Mobile) */}
              <div className="hidden lg:flex flex-col gap-6 pt-4">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Quantity</span>
                  <div className="flex items-center border border-white/10 rounded-full overflow-hidden bg-white/5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-2 text-white hover:bg-white/10 transition-colors font-bold"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-bold text-white border-l border-r border-white/10 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(Math.min(10, Number(product.stock)), quantity + 1))}
                      disabled={quantity >= Math.min(10, Number(product.stock))}
                      className={`px-5 py-2 text-white hover:bg-white/10 transition-colors font-bold ${quantity >= Math.min(10, Number(product.stock)) ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[9px] text-white/20 uppercase tracking-widest">(Max 10)</span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0 || cartLoading}
                    className={`flex-1 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-3 ${
                      product.stock <= 0
                      ? 'bg-red-900/50 text-white cursor-not-allowed border border-red-500/30'
                      : isInCart(product.id)
                      ? 'bg-accent text-white'
                      : 'bg-white text-black hover:bg-accent hover:text-white'
                    }`}
                  >
                    {cartLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <ShoppingBag size={16} strokeWidth={1.5} />
                    )}
                    {product.stock <= 0 ? 'Out of Stock' : isInCart(product.id) ? 'In Collection' : 'Acquire Selection'}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    disabled={wishlistLoading}
                    className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isInWishlist(product.id)
                      ? 'bg-accent border-accent text-white'
                      : 'border-white/10 bg-[#111] text-white hover:text-accent hover:border-accent/40'
                    }`}
                  >
                    {wishlistLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Heart size={18} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    )}
                  </button>
                </div>
              </div>

              {/* Atelier Contact Card */}
              <div className="mt-8 p-5 lg:p-6 bg-[#111] rounded-[24px] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-5 group hover:border-accent/20 transition-all duration-500">
                 <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <img src="https://i.pravatar.cc/100?u=artisan" alt="Artisan" className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[10px] tracking-[0.2em] uppercase font-medium text-white/90">Privé Concierge</h4>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    </div>
                    <p className="text-[10px] text-white/40 tracking-[0.1em] leading-normal italic">
                      Master artisans available for bespoke modifications.
                    </p>
                 </div>
                 <button className="text-[9px] tracking-[0.2em] uppercase text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all flex-shrink-0 mt-2 sm:mt-0">
                    Consult
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-white/10 z-50 lg:hidden flex gap-3 pb-safe-area">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || cartLoading}
            className={`flex-1 h-12 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full active:scale-95 transition-all flex items-center justify-center gap-2 ${
              product.stock <= 0
              ? 'bg-red-900/50 text-white'
              : isInCart(product.id)
              ? 'bg-accent text-white'
              : 'bg-white text-black'
            }`}
          >
            {cartLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ShoppingBag size={14} strokeWidth={2} />
            )}
            {product.stock <= 0 ? 'Sold Out' : isInCart(product.id) ? 'In Collection' : 'Acquire'}
         </button>
         <button
            onClick={handleAddToWishlist}
            disabled={wishlistLoading}
            className={`w-12 h-12 rounded-full border flex items-center justify-center active:scale-95 transition-all ${
              isInWishlist(product.id)
              ? 'bg-accent border-accent text-white'
              : 'border-white/10 bg-white/5 text-white'
            }`}
          >
            {wishlistLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Heart size={16} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
            )}
         </button>
      </div>

      {/* Safe area padding style for iOS bottom bar support */}
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe-area { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default ProductDetail;