import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../components/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/useAuth";
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
    { id: "bs-1", name: "Solitaire Droplet Necklace", price: 12400, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", category: "High Jewellery", description: "A breathtaking solitaire diamond-cut crystal suspended on a delicate 18k gold-toned chain, designed to capture and reflect every fragment of light." },
    { id: "bs-2", name: "Champagne Gold Ring", price: 8900, image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?w=600&auto=format&fit=crop&q=60", category: "Everyday", description: "The Champagne Gold Ring features a subtle, warm-toned finish that elegantly complements any outfit, making it a timeless staple for daily wear." },
    { id: "bs-3", name: "Rose Quartz Eternity Ring", price: 15200, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", category: "Bridal", description: "Embodying eternal love, this ring features delicately set rose quartz crystals that radiate a soft, romantic glow." },
    { id: "bs-4", name: "Pearl Infused Bracelet", price: 9500, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "New Arrivals", description: "A sophisticated blend of baroque pearls and polished gold links, this bracelet is a testament to classical beauty reimagined." },
    { id: 'shop-5', name: "Diamond Halo Studs", price: 21000, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", category: "High Jewellery" },
    { id: 'shop-6', name: "Vintage Gold Locket", price: 17500, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&auto=format&fit=crop&q=60", category: "New Arrivals" },
    { id: 'shop-7', name: "Sapphire Night Pendant", price: 32000, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", category: "High Jewellery" },
    { id: 'shop-8', name: "Minimalist Silver Band", price: 6500, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800", category: "Everyday" },
    { id: 'shop-9', name: "Art Deco Emerald Ring", price: 28000, image: "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?w=600&auto=format&fit=crop&q=60", category: "Bridal" },
    { id: 'shop-10', name: "Celestial Moon Necklace", price: 14000, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800", category: "New Arrivals" },
    { id: 'shop-11', name: "Ornate Bridal Choker", price: 45000, image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=600&auto=format&fit=crop&q=60", category: "Bridal" },
    { id: 'shop-12', name: "Infinity Knot Bangle", price: 11000, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "Everyday" }
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

  const addToCollection = async (collectionName) => {
    if (!user) { navigate("/login"); return; }
    if (!product) return;
    try {
      const itemRef = doc(db, "users", user.uid, collectionName, id);
      await setDoc(itemRef, {
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || "",
        addedAt: new Date().toISOString(),
        quantity: quantity
      });
      alert(`Added to ${collectionName}!`);
    } catch (error) { console.error(`Error adding to ${collectionName}:`, error); }
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
                      {activeTab === 'heritage' && "The Velouraz heritage is defined by a relentless pursuit of perfection. This piece is a continuation of our house legacy, where timeless elegance meets contemporary vision."}
                      {activeTab === 'details' && "Meticulously finished with conflict-free hand-selected materials and high-purity sustainable alloys. Designed to reflect light with exceptional brilliance."}
                      {activeTab === 'care' && "Preserve your treasure by avoiding direct contact with liquids. Store within the provided velvet atelier pouch. Professional inspection is recommended annually."}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Desktop Acquisition Actions (Hidden on Mobile) */}
              <div className="hidden lg:flex gap-4 pt-4">
                <button
                  onClick={() => addToCollection("cart")}
                  className="flex-1 h-14 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  Acquire Selection
                </button>
                <button
                  onClick={() => addToCollection("wishlist")}
                  className="w-14 h-14 rounded-full border border-white/10 bg-[#111] flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-all duration-300"
                >
                  <Heart size={18} strokeWidth={1.5} />
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
            onClick={() => addToCollection("cart")}
            className="flex-1 h-12 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} strokeWidth={2} />
            Acquire
         </button>
         <button
            onClick={() => addToCollection("wishlist")}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <Heart size={16} strokeWidth={1.5} />
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