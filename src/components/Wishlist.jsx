import React, { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "./Firebase";
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../hooks/useStore";

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movingItems, setMovingItems] = useState({});

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDocs(collection(db, "users", user.uid, "wishlist"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(list);
      } catch (error) {
        console.error("Error loading wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const removeItem = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "wishlist", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const moveToCart = async (item) => {
    if (!user) return;
    if (item.stock <= 0) {
      alert("This item is currently out of stock.");
      return;
    }
    setMovingItems(prev => ({ ...prev, [item.id]: true }));
    try {
      const success = await addToCart(item);
      if (success) {
        await removeItem(item.id);
        alert("Moved to your collection!");
      }
    } catch (error) {
      console.error("Error moving to cart:", error);
    } finally {
      setMovingItems(prev => ({ ...prev, [item.id]: false }));
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#640D14]"></div>
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#640D14]/50 animate-pulse" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5] pt-32 sm:pt-48 pb-20 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12 mb-16 sm:mb-24">
          <div className="space-y-6 sm:space-y-8">
            <Link to="/shop" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#5C3D1E]/40 hover:text-[#640D14] transition-all group">
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
              Return to Gallery
            </Link>
            <div className="relative">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl sm:text-7xl md:text-8xl font-serif text-[#2C1A0E] tracking-tighter leading-none"
              >
                The <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-[#640D14]/80 text-6xl sm:text-8xl md:text-9xl">Wishlist</span>
              </motion.h1>
              <Sparkles className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 text-[#640D14]/20 animate-pulse hidden sm:block" size={56} />
            </div>
            <p className="text-[#5C3D1E]/40 font-sans text-sm sm:text-base tracking-[0.1em] uppercase italic font-medium max-w-md">
              A curated selection of exquisite jewelry, awaiting your next celebration.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 sm:gap-8 bg-white px-8 sm:px-10 py-5 sm:py-6 rounded-[32px] sm:rounded-[40px] border border-[#640D14]/10 shadow-xl w-fit"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#640D14]/5 rounded-2xl sm:rounded-3xl flex items-center justify-center text-[#640D14] shadow-sm">
              <Heart size={24} sm:size={28} fill="currentColor" />
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-sans font-black text-[#2C1A0E] leading-none tracking-tight">{items.length}</p>
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#5C3D1E]/30 mt-2 sm:mt-3">Saved Treasures</p>
            </div>
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12">
              {items.map((item, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id}
                  className="group relative bg-white rounded-[40px] sm:rounded-[56px] p-6 sm:p-8 transition-all duration-700 hover:shadow-2xl border border-[#640D14]/5"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#FDFAF5] mb-8 sm:mb-12 border border-[#640D14]/10">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#640D14]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    
                    {/* Quick Actions */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-5 right-5 sm:top-7 sm:right-7 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 backdrop-blur-xl border border-[#640D14]/10 rounded-2xl sm:rounded-[24px] flex items-center justify-center text-[#640D14]/30 hover:text-red-600 transition-all transform translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 shadow-xl"
                    >
                      <Trash2 size={20} sm:size={22} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-6 sm:space-y-8 px-2">
                    <div className="flex items-center gap-1.5 text-[#640D14]/30">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} sm:size={12} fill="currentColor" />
                      ))}
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#2C1A0E] leading-tight group-hover:text-[#640D14] transition-colors line-clamp-1 font-bold">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-4">
                      <p className="text-2xl sm:text-3xl font-sans font-black text-[#2C1A0E] tracking-tight">
                        ₹{Number(item.price || 0).toLocaleString()}
                      </p>
                      <button 
                        onClick={() => moveToCart(item)}
                        disabled={item.stock <= 0 || movingItems[item.id]}
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-[20px] sm:rounded-[28px] flex items-center justify-center transition-all transform active:scale-95 shadow-xl ${
                          item.stock <= 0
                          ? 'bg-red-50 text-red-500 cursor-not-allowed border border-red-100'
                          : 'bg-[#640D14] text-white hover:bg-[#2C1A0E]'
                        }`}
                      >
                        {movingItems[item.id] ? (
                          <Loader2 size={18} className="animate-spin text-white" />
                        ) : (
                          <ShoppingCart size={20} sm:size={24} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                    {item.stock <= 0 && (
                      <div className="pt-3">
                        <span className="text-[10px] sm:text-[11px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-4 py-1.5 rounded-full border border-red-100 shadow-sm">
                          Unavailable
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-[48px] sm:rounded-[64px] border-2 border-dashed border-[#640D14]/10 p-16 sm:p-32 text-center shadow-sm"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#640D14]/5 rounded-[40px] flex items-center justify-center mx-auto mb-10 text-[#640D14]/20 shadow-sm">
                <Heart size={48} sm:size={64} />
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#2C1A0E] mb-6 italic font-bold">Your collection is empty</h3>
              <p className="text-[#5C3D1E]/30 font-sans text-[11px] sm:text-[13px] tracking-[0.3em] uppercase mb-12 sm:mb-16 font-black">
                Explore our boutique and save your favorites here for later.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-4 sm:gap-6 bg-[#640D14] text-white px-12 sm:px-16 py-5 sm:py-7 rounded-[28px] sm:rounded-[36px] font-black uppercase tracking-[0.3em] text-[11px] sm:text-xs hover:bg-[#2C1A0E] transition-all shadow-2xl shadow-[#640D14]/20 active:scale-95"
              >
                Start Exploring
                <ArrowLeft size={20} sm:size={24} strokeWidth={3} className="rotate-180" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


export default Wishlist;
