import React, { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "./Firebase";
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    try {
      // Add to cart
      await addDoc(collection(db, "users", user.uid, "cart"), {
        ...item,
        addedAt: new Date().toISOString()
      });
      // Remove from wishlist
      await removeItem(item.id);
      alert("Moved to cart!");
    } catch (error) {
      console.error("Error moving to cart:", error);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C6A664]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-40 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-6">
            <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-[#C6A664] transition-colors">
              <ArrowLeft size={14} />
              Return to Gallery
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none"
            >
              The <span className="text-[#C6A664]">Wishlist</span>
            </motion.h1>
            <p className="text-white/40 font-sans text-sm tracking-widest uppercase italic max-w-md">
              A curated selection of exquisite jewelry, awaiting your next celebration.
            </p>
          </div>
          <div className="flex items-center gap-6 bg-white/[0.03] backdrop-blur-md px-8 py-5 rounded-[32px] border border-white/10 shadow-2xl shadow-black/50">
            <div className="w-12 h-12 bg-[#C6A664]/10 rounded-2xl flex items-center justify-center text-[#C6A664]">
              <Heart size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-3xl font-sans font-bold text-white leading-none tracking-tight">{items.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mt-2">Saved Treasures</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {items.map((item, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id}
                  className="group relative bg-white/[0.02] backdrop-blur-xl rounded-[48px] p-7 transition-all duration-700 hover:bg-white/[0.05] border border-white/5"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-black/50 mb-10 border border-white/5">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Quick Actions */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white/30 hover:text-red-500 transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-2xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-6 px-2">
                    <div className="flex items-center gap-1 text-[#C6A664]/40">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" />
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-serif text-white leading-tight group-hover:text-[#C6A664] transition-colors">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-2xl font-sans font-bold text-white tracking-tight">
                        ₹{Number(item.price || 0).toLocaleString()}
                      </p>
                      <button 
                        onClick={() => moveToCart(item)}
                        className="w-12 h-12 bg-[#C6A664] text-black rounded-2xl flex items-center justify-center hover:bg-white transition-all transform active:scale-95 shadow-2xl shadow-[#C6A664]/10"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/[0.01] rounded-[60px] border border-dashed border-white/10 p-24 text-center"
            >
              <div className="w-24 h-24 bg-white/[0.03] rounded-[32px] flex items-center justify-center mx-auto mb-10 text-[#C6A664]">
                <Heart size={48} />
              </div>
              <h3 className="text-3xl font-serif text-white mb-6 italic text-white/60">Your collection is empty</h3>
              <p className="text-white/20 font-sans text-sm tracking-widest uppercase mb-12">
                Explore our boutique and save your favorites here for later.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-4 bg-[#C6A664] text-black px-12 py-5 rounded-3xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-2xl shadow-[#C6A664]/10"
              >
                Start Exploring
                <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
