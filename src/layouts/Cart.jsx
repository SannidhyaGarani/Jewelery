import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (user) {
        try {
          const snap = await getDocs(collection(db, "users", user.uid, "cart"));
          const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setItems(list);
        } catch (error) {
          console.error("Error loading cart:", error);
        } finally {
          setLoading(false);
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setItems(localCart);
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const removeItem = async (id) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "users", user.uid, "cart", id));
        setItems((prev) => prev.filter((i) => i.id !== id));
      } catch (error) {
        console.error("Error removing item:", error);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const filtered = localCart.filter(i => i.id !== id);
      localStorage.setItem('cart', JSON.stringify(filtered));
      setItems(filtered);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C6A664]"></div>
      </div>
    );
  }


  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Cart Area */}
          <div className="flex-1">
            <div className="mb-12">
              <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-[#C6A664] transition-colors mb-8">
                <ArrowLeft size={14} />
                Return to Gallery
              </Link>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none mb-6"
              >
                Votre <span className="text-[#C6A664]">Panier</span>
              </motion.h1>
              <p className="text-white/40 font-sans text-sm tracking-widest uppercase italic">Your exquisite selection — {items.length} pieces</p>
            </div>

            <div className="space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="group relative bg-white/[0.02] backdrop-blur-xl rounded-[40px] p-8 flex flex-col sm:flex-row items-center gap-10 transition-all duration-500 hover:bg-white/[0.04] border border-white/5"
                  >
                    <div className="w-40 h-40 rounded-[32px] overflow-hidden bg-black/50 border border-white/5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#C6A664] uppercase tracking-[0.3em]">Atelier Edition</span>
                        <h3 className="text-2xl font-serif text-white">{item.name}</h3>
                        <p className="text-xs text-white/40 font-sans tracking-wide mt-2 leading-relaxed">Artisan-crafted masterpiece featuring premium stones and timeless detailing.</p>
                      </div>
                      <div className="mt-6 flex items-center justify-center sm:justify-start gap-4">
                        <span className="text-2xl font-sans font-bold text-white tracking-tight">₹{Number(item.price).toLocaleString()}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-5 rounded-2xl bg-white/5 text-white/20 hover:bg-red-500/10 hover:text-red-500 transition-all transform active:scale-95 border border-white/5"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length === 0 && (
                <div className="bg-white/[0.01] rounded-[60px] border border-dashed border-white/10 p-24 text-center">
                  <ShoppingBag size={64} className="mx-auto text-white/5 mb-8" />
                  <p className="text-white/20 font-serif text-2xl italic">The sanctuary is currently unoccupied.</p>
                  <Link to="/shop" className="inline-block mt-10 px-12 py-5 bg-[#C6A664] text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-2xl shadow-[#C6A664]/10">
                    Explore The Collection
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[450px] shrink-0">
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-[48px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.4)] p-10 sticky top-32 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A664]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-3xl font-serif text-white mb-10 relative z-10">Acquisition Summary</h2>
              
              <div className="space-y-6 mb-10 relative z-10">
                <div className="flex justify-between text-white/40 font-sans text-sm tracking-wide">
                  <span>Subtotal Value</span>
                  <span className="font-bold text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/40 font-sans text-sm tracking-wide">
                  <span>Elite Concierge Delivery</span>
                  <span className="text-[#C6A664] font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between text-white/40 font-sans text-sm tracking-wide">
                  <span>Duty & Taxes</span>
                  <span className="font-bold text-white">₹0.00</span>
                </div>
                <div className="pt-8 border-t border-dashed border-white/10 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">Total Acquisition</span>
                    <span className="text-5xl font-sans font-bold text-[#C6A664] tracking-tighter">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                disabled={items.length === 0}
                className="w-full py-6 rounded-2xl bg-[#C6A664] text-black font-bold text-sm tracking-[0.3em] uppercase hover:bg-white transition-all transform active:scale-[0.98] disabled:opacity-10 disabled:grayscale shadow-2xl shadow-[#C6A664]/10 mb-10 relative z-10"
              >
                Proceed to Checkout
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-6 pt-10 border-t border-white/5 relative z-10">
                {[
                  { icon: ShieldCheck, text: "Vault-Secure Checkout", sub: "End-to-End Encryption" },
                  { icon: Truck, text: "Concierge Shipping", sub: "Global Express Network" },
                  { icon: RotateCcw, text: "House Return Policy", sub: "30-Day Evaluation" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#C6A664]">
                      <badge.icon size={22} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">{badge.text}</p>
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mt-2">{badge.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Cart;
