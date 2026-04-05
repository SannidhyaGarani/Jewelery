import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../components/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Shield, Truck, RotateCcw, Heart, ShoppingBag, 
  ArrowLeft, Share2, Info, Gem, Sparkles, Ruler
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('heritage');
  const [quantity, setQuantity] = useState(1);

  // Reference for curated products to ensure detail page works for them too
  const curatedProducts = [
    {
      id: "1",
      name: "Solitaire Droplet Necklace",
      price: 120,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
      category: "Luxury",
      description: "A breathtaking solitaire diamond-cut crystal suspended on a delicate 18k gold-toned chain, designed to capture and reflect every fragment of light."
    },
    {
      id: "2",
      name: "Champagne Gold Ring",
      price: 85,
      image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      category: "Everyday",
      description: "The Champagne Gold Ring features a subtle, warm-toned finish that elegantly complements any outfit, making it a timeless staple for daily wear."
    },
    { id: "3", name: "Rose Quartz Eternity Ring", price: 150, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", category: "Bridal", description: "Embodying eternal love, this ring features delicately set rose quartz crystals that radiate a soft, romantic glow." },
    { id: "4", name: "Pearl Infused Bracelet", price: 95, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "New Arrivals", description: "A sophisticated blend of baroque pearls and polished gold links, this bracelet is a testament to classical beauty reimagined." },
    { id: 'bs-1', name: "Solitaire Droplet Necklace", price: 120, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", category: "Luxury" },
    { id: 'bs-2', name: "Champagne Gold Ring", price: 85, image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D", category: "Everyday" },
    { id: 'bs-3', name: "Rose Quartz Eternity Ring", price: 150, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", category: "Bridal" },
    { id: 'bs-4', name: "Pearl Infused Bracelet", price: 95, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "New Arrivals" },
    { id: 'shop-5', name: "Diamond Halo Studs", price: 210, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", category: "Luxury" },
    { id: 'shop-6', name: "Vintage Gold Locket", price: 175, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D", category: "New Arrivals" },
    { id: 'shop-7', name: "Sapphire Night Pendant", price: 320, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", category: "Luxury" },
    { id: 'shop-8', name: "Minimalist Silver Band", price: 65, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800", category: "Everyday" },
    { id: 'shop-9', name: "Art Deco Emerald Ring", price: 280, image: "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D", category: "Bridal" },
    { id: 'shop-10', name: "Celestial Moon Necklace", price: 140, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800", category: "New Arrivals" },
    { id: 'shop-11', name: "Ornate Bridal Choker", price: 450, image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D", category: "Bridal" },
    { id: 'shop-12', name: "Infinity Knot Bangle", price: 110, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "Everyday" }
  ];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // Check curated list first
      const curated = curatedProducts.find(p => String(p.id) === String(id));
      if (curated) {
        setProduct(curated);
        setLoading(false);
        return;
      }

      // Check Firebase
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
    if (!user) {
      navigate("/login");
      return;
    }
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
    } catch (error) {
      console.error(`Error adding to ${collectionName}:`, error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-8">
        <div className="relative w-20 h-20">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[1px] border-[#C6A769]/20 border-t-[#C6A769] rounded-full" 
          />
          <Gem className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C6A769]" size={24} strokeWidth={1} />
        </div>
        <p className="text-[10px] uppercase tracking-[0.6em] text-[#2B2B2B]/40 animate-pulse">Refining the Detail...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-2xl text-[#2B2B2B]/40 italic">This masterpiece is hidden from view.</p>
        <button onClick={() => navigate('/shop')} className="text-[10px] uppercase tracking-[0.4em] text-[#C6A769] border-b border-[#C6A769]/30 pb-2">
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-20 md:pt-32 pb-12 md:pb-24 font-sans relative overflow-hidden">
      {/* Background Cinematic Grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 md:mb-16">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/40 hover:text-[#C6A769] transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-[#2B2B2B]/5 flex items-center justify-center group-hover:border-[#C6A769]/30 transition-all">
              <ArrowLeft size={16} strokeWidth={1} />
            </div>
            Back
          </motion.button>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-[#2B2B2B]/5 flex items-center justify-center text-[#2B2B2B]/40 hover:text-[#C6A769] transition-all">
              <Share2 size={16} strokeWidth={1} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-32 items-start">
          
          {/* Left: Cinematic Visuals */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[3/4] bg-[#F3F2EE] overflow-hidden group shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute top-8 left-8">
                <span className="px-4 py-1.5 border border-[#C6A769]/30 text-[#C6A769] text-[9px] tracking-[0.4em] uppercase font-medium bg-white/80 backdrop-blur-md">
                  {product.category || 'Atelier Piece'}
                </span>
              </div>
              
              {/* Subtle light sweep */}
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
              />
            </motion.div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: <Gem size={18} strokeWidth={1} />, text: 'Certified Authentic' },
                { icon: <Truck size={18} strokeWidth={1} />, text: 'Global Logistics' },
                { icon: <RotateCcw size={18} strokeWidth={1} />, text: 'Luxury Exchange' }
              ].map((item, i) => (
                <div key={i} className="flex flex-row sm:flex-col items-center sm:text-center p-4 sm:p-6 border border-[#2B2B2B]/5 space-x-4 sm:space-x-0 sm:space-y-4 hover:border-[#C6A769]/20 transition-all duration-700">
                  <div className="text-[#C6A769] flex-shrink-0">{item.icon}</div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-[#2B2B2B]/50 leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill={i < 4 ? "#C6A769" : "none"} className={i < 4 ? "text-[#C6A769]" : "text-[#2B2B2B]/10"} />
                  ))}
                </div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[#2B2B2B]/30">(82 Private Reviews)</span>
              </motion.div>
              
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#2B2B2B] leading-[1.2] lg:leading-[1.1] tracking-tight"
                >
                  {product.name}
                </motion.h1>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-8"
              >
                <span className="text-3xl font-serif text-[#C6A769]">
                  ₹{product.price}.00
                </span>
                <div className="h-[1px] w-12 bg-[#2B2B2B]/10" />
                <div className="text-[10px] tracking-[0.3em] uppercase text-emerald-600 font-medium flex items-center gap-2">
                  <Sparkles size={12} strokeWidth={1} /> Ready to Ship
                </div>
              </motion.div>
            </div>

            {/* Selection & Actions */}
            <div className="space-y-10 pt-10 border-t border-[#2B2B2B]/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
                <div className="space-y-4 w-full sm:w-auto">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#2B2B2B]/40">Quantity</p>
                  <div className="flex items-center border border-[#2B2B2B]/10 p-1 w-full sm:w-auto justify-between sm:justify-start">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-[#2B2B2B] hover:text-[#C6A769] transition-colors font-light"
                    >-</button>
                    <span className="w-12 text-center text-xs text-[#2B2B2B] font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-[#2B2B2B] hover:text-[#C6A769] transition-colors font-light"
                    >+</button>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#2B2B2B]/40 flex items-center gap-2">
                    Size Selection <Ruler size={10} className="opacity-50" />
                  </p>
                  <div className="flex gap-3 sm:gap-4">
                    {['Standard', 'Bespoke'].map((size) => (
                      <button key={size} className={`flex-1 sm:flex-none px-4 sm:px-8 py-4 border text-[9px] uppercase tracking-[0.3em] transition-all duration-500 font-medium ${size === 'Standard' ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]' : 'bg-transparent text-[#2B2B2B] border-[#2B2B2B]/10 hover:border-[#C6A769]/50'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4">
                <button
                  onClick={() => addToCollection("cart")}
                  className="flex-1 h-16 bg-[#2B2B2B] text-white text-[10px] uppercase tracking-[0.5em] font-medium hover:bg-[#C6A769] transition-colors duration-700 shadow-2xl flex items-center justify-center gap-4 group order-2 sm:order-1"
                >
                  <ShoppingBag size={16} strokeWidth={1} className="group-hover:-translate-y-1 transition-transform" />
                  Add to Shopping Bag
                </button>
                <button
                  onClick={() => addToCollection("wishlist")}
                  className="w-full sm:w-16 h-16 border border-[#2B2B2B]/10 flex items-center justify-center text-[#2B2B2B] hover:text-[#C6A769] hover:border-[#C6A769]/30 transition-all duration-500 group order-1 sm:order-2"
                >
                  <Heart size={20} strokeWidth={1} className="group-hover:scale-110 transition-transform sm:mr-0 mr-4" />
                  <span className="sm:hidden text-[10px] uppercase tracking-[0.4em]">Save Piece</span>
                </button>
              </div>
            </div>

            {/* Premium Info Tabs */}
            <div className="space-y-8 pt-12 border-t border-[#2B2B2B]/5">
              <div className="flex gap-6 sm:gap-10 border-b border-[#2B2B2B]/5 pb-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                {['heritage', 'materials', 'care'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[9px] uppercase tracking-[0.4em] font-medium transition-all relative ${activeTab === tab ? 'text-[#2B2B2B]' : 'text-[#2B2B2B]/30 hover:text-[#2B2B2B]/60'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tabLine" className="absolute -bottom-[17px] left-0 right-0 h-[1.5px] bg-[#C6A769]" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[140px] leading-relaxed text-[#2B2B2B]/60 font-light text-xs tracking-wide">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    {activeTab === 'heritage' && (
                      <p className="leading-8">
                        {product.description || "Forged in the heart of our artisan atelier, each piece tells a story of timeless elegance. Jewelery jewelry is more than an accessory; it is a fragment of eternity, designed for those who find beauty in the extraordinary."}
                      </p>
                    )}
                    {activeTab === 'materials' && (
                      <p className="leading-8 italic">
                        Hand-selected crystals, conflict-free 18k gold plating, and high-purity sustainable alloys. Every material reflects our commitment to ethical luxury and uncompromising brilliance.
                      </p>
                    )}
                    {activeTab === 'care' && (
                      <p className="leading-8">
                        Preserve brilliance by avoiding direct contact with perfumes and moisture. Store in the provided velvet atelier pouch. Professional polishing is recommended annually to maintain the original luster.
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Boutique Note */}
            <div className="p-6 md:p-8 bg-white/40 border border-white/60 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center shadow-sm backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full border border-[#C6A769]/20 flex items-center justify-center text-[#C6A769] flex-shrink-0">
                <Info size={18} strokeWidth={1} />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.4em] text-[#2B2B2B] font-medium">Bespoke Inquiries</p>
                <p className="text-[10px] text-[#2B2B2B]/50 leading-relaxed font-light italic">Need a customized fit? Our artisans can tailor this piece to your specific requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
