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
      <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center gap-8">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.6em] text-text-dark/40">Revealing Masterpiece</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center gap-12 text-center p-6">
        <h2 className="font-serif text-4xl text-text-dark italic">Inventory unavailable.</h2>
        <button onClick={() => navigate('/shop')} className="text-[11px] tracking-[0.4em] uppercase text-accent border-b border-accent pb-2">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 font-sans relative overflow-hidden text-white">
      {/* Cinematic vertical lines */}
      <div className="absolute left-[8%] top-0 w-[1px] h-full bg-white/5 hidden xl:block" />
      <div className="absolute right-[8%] top-0 w-[1px] h-full bg-white/5 hidden xl:block" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Navigation - Minimal Pill Style */}
        <div className="mb-12 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-all"
          >
            <ArrowLeft size={16} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
            Back to Selection
          </button>
          
          <div className="flex gap-8 items-center">
             <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-all">Previous</button>
             <span className="w-4 h-[1px] bg-white/10"></span>
             <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-all">Next Piece</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-stretch">
          
          {/* Left: Gallery (60%) */}
          <div className="w-full lg:w-[60%] space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] bg-[#111] rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-105 opacity-90 hover:opacity-100"
              />
              <div className="absolute top-8 left-8">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full text-[10px] tracking-[0.2em] font-bold text-white uppercase">
                  REF {product.id.slice(0, 6)}
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-3 gap-6">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="aspect-square bg-[#111] rounded-2xl border border-white/5 overflow-hidden cursor-pointer hover:border-accent transition-colors duration-500 shadow-sm relative">
                    <img src={product.image} alt="Gallery view" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/20" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Bespoke Details (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col justify-between py-4">
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="h-[1px] w-10 bg-accent/40"></span>
                  <span className="text-[10px] tracking-[0.5em] font-bold uppercase text-accent/80">
                    {product.category || 'Atelier Exclusive'}
                  </span>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-5xl md:text-6xl xl:text-7xl font-serif text-white leading-[1.1] tracking-tight"
                >
                  <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-6xl md:text-8xl xl:text-9xl block mb-2 text-accent/80 -ml-4">
                    {product.name.split(' ')[0]}
                  </span>
                  <span className="relative z-10">{product.name.split(' ').slice(1).join(' ')}</span>
                </motion.h1>
                
                <p className="text-3xl md:text-4xl font-serif text-accent">
                  ₹{product.price.toLocaleString()}.00
                </p>
              </div>

              <div className="space-y-8 pb-12 border-b border-white/10">
                <p className="text-sm md:text-base text-white/70 font-sans leading-loose max-w-sm">
                  {product.description || "An exceptional masterwork of artisanal ingenuity, meticulously handcrafted to embody the pinnacle of Velouraz's design philosophy and timeless elegance."}
                </p>

                {/* Acquisition Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => addToCollection("cart")}
                    className="flex-1 h-16 bg-accent text-white text-[11px] uppercase tracking-[0.4em] font-bold rounded-full hover:bg-accent/90 transition-all duration-500 flex items-center justify-center gap-4 group shadow-[0_10px_40px_rgba(199,160,73,0.2)]"
                  >
                    <ShoppingBag size={18} strokeWidth={2} />
                    Acquire Selection
                  </button>
                  <button
                    onClick={() => addToCollection("wishlist")}
                    className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-all duration-500"
                  >
                    <Heart size={20} strokeWidth={1} />
                  </button>
                </div>
              </div>

              {/* Editorial Tabs Selection */}
              <div className="space-y-8">
                <div className="flex gap-12">
                  {['heritage', 'details', 'care'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-2 ${activeTab === tab ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="min-h-[100px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="text-[11px] text-white/50 tracking-[0.2em] uppercase leading-7 max-w-md"
                    >
                      {activeTab === 'heritage' && (
                        "The Velouraz heritage is defined by a relentless pursuit of perfection. This piece is a continuation of our house legacy, where timeless elegance meets contemporary vision."
                      )}
                      {activeTab === 'details' && (
                        "Meticulously finished with conflict-free hand-selected materials and high-purity sustainable alloys. Every facet is designed to capture and reflect light with exceptional brilliance."
                      )}
                      {activeTab === 'care' && (
                        "Preserve your treasure by avoiding direct contact with liquids. Store within the provided velvet atelier pouch in a temperate environment. Professional inspection is recommended annually."
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Atelier Contact Card */}
            <div className="mt-12 p-8 bg-white/[0.03] backdrop-blur-md rounded-[32px] border border-white/10 flex items-start gap-6 group hover:border-accent/30 transition-all duration-500">
               <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20 shadow-xl">
                  <img src="https://i.pravatar.cc/100?u=artisan" alt="Artisan" className="grayscale group-hover:grayscale-0 transition-all duration-500" />
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h4 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white">Privé Concierge</h4>
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  </div>
                  <p className="text-[10px] text-white/40 tracking-[0.18em] uppercase leading-relaxed italic pr-4">
                    Our master artisans are currently available for bespoke modifications and private consultations.
                  </p>
                  <button className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-bold text-accent border-b border-accent/20 pb-2 hover:border-accent transition-all group-hover:gap-5">
                    Start Consultation <ArrowRight size={14} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
