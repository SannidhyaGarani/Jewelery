import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../components/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/useAuth";
import { useStore } from '../hooks/useStore';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Shield, Truck, RotateCcw, Heart, ShoppingBag, 
  ArrowLeft, Share2, Info, Gem, Sparkles, Ruler, ArrowRight
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('heritage');
  const [quantity, setQuantity] = useState(1);

  const curatedProducts = [
    { id: "bs-1", name: "Emerald Blossom Choker", price: 3800, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", category: "Necklaces", description: "A breathtaking emerald choker with gold plating, designed for royalty." },
    { id: "bs-2", name: "Antique Gold Temple Jhumkas", price: 2400, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&auto=format&fit=crop&q=60", category: "Earrings", description: "Traditional temple jewelry with intricate carvings and ruby stones." },
    { id: "bs-3", name: "American Diamond Band", price: 1500, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", category: "Rings", description: "A minimalist ring set with high-grade American diamonds for everyday sparkle." },
    { id: "bs-4", name: "Oxidized Silver Kada", price: 950, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "Bracelets", description: "Artisan-crafted oxidized silver kada with floral engravings." },
  ];

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
    const success = await addToCart(product);
    if (success) {
      // Optional: show feedback
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    await addToWishlist(product);
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
                
                <p className="text-2xl md:text-3xl font-serif text-white/90">
                  ₹{product.price.toLocaleString()}.00
                </p>
              </div>

              {/* Description */}
              <div className="pb-8 border-b border-white/10">
                <p className="text-[13px] md:text-sm text-white/60 font-sans leading-relaxed">
                  {product.description || "An exceptional masterwork of artisanal ingenuity, meticulously handcrafted to embody the pinnacle of Velouraz's design philosophy and timeless elegance."}
                </p>
              </div>

              {/* Editorial Tabs Selection */}
              <div className="space-y-6">
                <div className="flex gap-8 border-b border-white/5 pb-px">
                  {['heritage', 'details', 'care'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[9px] uppercase tracking-[0.3em] font-medium transition-all relative pb-3 ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="min-h-[80px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="text-[11px] text-white/50 tracking-[0.15em] uppercase leading-relaxed"
                    >
                      {activeTab === 'heritage' && (product.heritage || "The Velouraz heritage is defined by a relentless pursuit of perfection. This piece is a continuation of our house legacy, where timeless elegance meets contemporary vision.")}
                      {activeTab === 'details' && (
                        <div className="space-y-2">
                          <p>Material: {product.material || "High-grade alloy with gold plating"}</p>
                          <p>Stones: {product.stones || "Semi-precious / AD stones"}</p>
                          <p>Weight/Size: {product.size_weight || "Adjustable"}</p>
                        </div>
                      )}
                      {activeTab === 'care' && (product.care_instructions || "Preserve your treasure by avoiding direct contact with liquids. Store within the provided velvet atelier pouch. Professional inspection is recommended annually.")}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Desktop Acquisition Actions (Hidden on Mobile) */}
              <div className="hidden lg:flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-3 ${
                    isInCart(product.id)
                    ? 'bg-accent text-white'
                    : 'bg-white text-black hover:bg-accent hover:text-white'
                  }`}
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  {isInCart(product.id) ? 'Added to Cart' : 'Acquire Selection'}
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isInWishlist(product.id)
                    ? 'bg-accent border-accent text-white'
                    : 'border-white/10 bg-[#111] text-white hover:text-accent hover:border-accent/40'
                  }`}
                >
                  <Heart size={18} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
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
            className={`flex-1 h-12 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full active:scale-95 transition-all flex items-center justify-center gap-2 ${
              isInCart(product.id)
              ? 'bg-accent text-white'
              : 'bg-white text-black'
            }`}
          >
            <ShoppingBag size={14} strokeWidth={2} />
            {isInCart(product.id) ? 'Added' : 'Acquire'}
         </button>
         <button
            onClick={handleAddToWishlist}
            className={`w-12 h-12 rounded-full border flex items-center justify-center active:scale-95 transition-all ${
              isInWishlist(product.id)
              ? 'bg-accent border-accent text-white'
              : 'border-white/10 bg-white/5 text-white'
            }`}
          >
            <Heart size={16} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
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