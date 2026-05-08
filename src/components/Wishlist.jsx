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
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#C6A664]"></div>
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C6A664]/50 animate-pulse" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 sm:pt-40 pb-20 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10 mb-12 sm:mb-20">
          <div className="space-y-4 sm:space-y-6">
            <Link to="/shop" className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30 hover:text-[#C6A664] transition-colors">
              <ArrowLeft size={14} />
              Return to Gallery
            </Link>
            <div className="relative">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none"
              >
                The <span className="text-[#C6A664]">Wishlist</span>
              </motion.h1>
              <Sparkles className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 text-[#C6A664]/20 animate-pulse hidden sm:block" size={48} />
            </div>
            <p className="text-white/40 font-sans text-xs sm:text-sm tracking-widest uppercase italic max-w-md">
              A curated selection of exquisite jewelry, awaiting your next celebration.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 sm:gap-6 bg-white/[0.03] backdrop-blur-md px-6 sm:px-8 py-4 sm:py-5 rounded-[24px] sm:rounded-[32px] border border-white/10 shadow-2xl shadow-black/50 w-fit"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C6A664]/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#C6A664]">
              <Heart size={20} sm:size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-sans font-bold text-white leading-none tracking-tight">{items.length}</p>
              <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/20 mt-1 sm:mt-2">Saved Treasures</p>
            </div>
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10">
              {items.map((item, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id}
                  className="group relative bg-white/[0.02] backdrop-blur-xl rounded-[32px] sm:rounded-[48px] p-5 sm:p-7 transition-all duration-700 hover:bg-white/[0.05] border border-white/5"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] rounded-[24px] sm:rounded-[40px] overflow-hidden bg-black/50 mb-6 sm:mb-10 border border-white/5">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Quick Actions */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-white/30 hover:text-red-500 transition-all transform translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 shadow-2xl"
                    >
                      <Trash2 size={18} sm:size={20} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 sm:space-y-6 px-2">
                    <div className="flex items-center gap-1 text-[#C6A664]/40">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={8} sm:size={10} fill="currentColor" />
                      ))}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-serif text-white leading-tight group-hover:text-[#C6A664] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
                        ₹{Number(item.price || 0).toLocaleString()}
                      </p>
                      <button 
                        onClick={() => moveToCart(item)}
                        disabled={item.stock <= 0 || movingItems[item.id]}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all transform active:scale-95 shadow-2xl ${
                          item.stock <= 0
                          ? 'bg-red-900/30 text-red-500 cursor-not-allowed border border-red-500/20'
                          : 'bg-[#C6A664] text-black hover:bg-white shadow-[#C6A664]/10'
                        }`}
                      >
                        {movingItems[item.id] ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <ShoppingCart size={18} sm:size={20} />
                        )}
                      </button>
                    </div>
                    {item.stock <= 0 && (
                      <div className="pt-2">
                        <span className="text-[8px] sm:text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
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
              className="bg-white/[0.01] rounded-[40px] sm:rounded-[60px] border border-dashed border-white/10 p-12 sm:p-24 text-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/[0.03] rounded-[24px] sm:rounded-[32px] flex items-center justify-center mx-auto mb-8 sm:mb-10 text-[#C6A664]">
                <Heart size={40} sm:size={48} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4 sm:mb-6 italic text-white/60">Your collection is empty</h3>
              <p className="text-white/20 font-sans text-[10px] sm:text-sm tracking-widest uppercase mb-8 sm:mb-12">
                Explore our boutique and save your favorites here for later.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-3 sm:gap-4 bg-[#C6A664] text-black px-8 sm:px-12 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[10px] sm:text-xs hover:bg-white transition-all shadow-2xl shadow-[#C6A664]/10 active:scale-95"
              >
                Start Exploring
                <ArrowLeft size={16} sm:size={20} className="rotate-180" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
