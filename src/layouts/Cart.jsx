import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowLeft, ShieldCheck, Truck, RotateCcw, Minus, Plus, Ticket, CheckCircle2, AlertCircle } from "lucide-react";
import { useStore } from "../hooks/useStore";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, updateCartQuantity } = useStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveStocks, setLiveStocks] = useState({});
  
  // Coupon States
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  // Sync internal items state and Validate Stock
  useEffect(() => {
    setItems(cartItems);
    
    const validateStock = async () => {
      if (cartItems.length === 0) return;
      
      const newLiveStocks = {};
      let needsUpdate = false;
      for (const item of cartItems) {
        try {
          if (!item.id || item.id.startsWith('bs-')) continue;
          const pRef = doc(db, "products", item.id);
          const pSnap = await getDoc(pRef);
          
          if (pSnap.exists()) {
            const actualStock = Number(pSnap.data().stock || 0);
            newLiveStocks[item.id] = actualStock;
            if (item.quantity > actualStock) {
              await updateCartQuantity(item.id, actualStock);
              needsUpdate = true;
            }
          }
        } catch (e) {
          console.error("Stock validation error:", e);
        }
      }
      setLiveStocks(newLiveStocks);
      if (needsUpdate) {
        console.log("Cart quantities adjusted due to stock changes.");
      }
    };

    if (cartItems.length > 0) {
      validateStock();
    }
    
    setLoading(false);
  }, [cartItems, updateCartQuantity]);

  const removeItem = async (id) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "users", user.uid, "cart", id));
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

  const handleApplyCoupon = () => {
    setCouponError("");
    const code = couponCode.toUpperCase().trim();
    
    if (code === "VELOURAZ10") {
      setDiscount(subtotal * 0.1);
      setAppliedCoupon(code);
    } else if (code === "WELCOME20") {
      setDiscount(subtotal * 0.2);
      setAppliedCoupon(code);
    } else if (code === "GIFT500") {
      setDiscount(Math.min(500, subtotal));
      setAppliedCoupon(code);
    } else {
      setCouponError("Invalid or expired code");
      setDiscount(0);
      setAppliedCoupon("");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon("");
    setDiscount(0);
    setCouponCode("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C6A664]"></div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, i) => sum + (Number(i.price) * (i.quantity || 1)), 0);
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 sm:pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Main Cart Area */}
          <div className="flex-1">
            <div className="mb-8 sm:mb-12">
              <Link to="/shop" className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30 hover:text-[#C6A664] transition-colors mb-6 sm:mb-8">
                <ArrowLeft size={14} />
                Return to Gallery
              </Link>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl sm:text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none mb-4 sm:mb-6"
              >
                Votre <span className="text-[#C6A664]">Panier</span>
              </motion.h1>
              <p className="text-white/40 font-sans text-xs sm:text-sm tracking-widest uppercase italic">Your exquisite selection — {items.length} pieces</p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="group relative bg-white/[0.02] backdrop-blur-xl rounded-[24px] sm:rounded-[40px] p-5 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 transition-all duration-500 hover:bg-white/[0.04] border border-white/5"
                  >
                    <div className="w-full sm:w-40 aspect-square sm:aspect-auto sm:h-40 rounded-[20px] sm:rounded-[32px] overflow-hidden bg-black/50 border border-white/5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left w-full">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-[#C6A664] uppercase tracking-[0.2em] sm:tracking-[0.3em]">Atelier Edition</span>
                        <h3 className="text-xl sm:text-2xl font-serif text-white">{item.name}</h3>
                        <p className="text-[11px] sm:text-xs text-white/40 font-sans tracking-wide mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none">Artisan-crafted masterpiece featuring premium stones and timeless detailing.</p>
                      </div>

                      {/* Quantity & Price Controls */}
                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col gap-3 w-full sm:w-auto">
                          <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] text-center sm:text-left">Quantity</span>
                          <div className="flex items-center justify-center sm:justify-start">
                            <div className="flex items-center border border-white/10 rounded-2xl overflow-hidden bg-white/5 p-1">
                              <button
                                onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-all active:scale-90"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-10 sm:w-12 text-center font-bold text-white text-sm">
                                {item.quantity || 1}
                              </span>
                              <button 
                                onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                                disabled={(item.quantity || 1) >= Math.min(10, liveStocks[item.id] ?? item.stock ?? 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-all active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          {(item.quantity || 1) >= (liveStocks[item.id] ?? item.stock ?? 1) && (
                            <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest mt-1 text-center sm:text-left">
                              Max Stock Reached
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-3 w-full sm:w-auto items-center sm:items-end">
                          <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Item Price</span>
                          <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-sans font-bold text-white tracking-tight">₹{Number(item.price).toLocaleString()}</span>
                            {item.original_price > item.price && (
                              <span className="text-xs font-sans font-bold text-white/20 line-through decoration-red-500/50 decoration-2">₹{Number(item.original_price).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 sm:static p-4 sm:p-5 rounded-2xl bg-white/5 text-white/20 hover:bg-red-500/10 hover:text-red-500 transition-all transform active:scale-95 border border-white/5 group/remove"
                      title="Remove Item"
                    >
                      <Trash2 size={18} className="sm:w-5 sm:h-5 transition-transform group-hover/remove:rotate-12" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length === 0 && (
                <div className="bg-white/[0.01] rounded-[40px] sm:rounded-[60px] border border-dashed border-white/10 p-12 sm:p-24 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-white/10">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-white/20 font-serif text-xl sm:text-2xl italic">The sanctuary is currently unoccupied.</p>
                  <Link to="/shop" className="inline-block mt-10 px-10 sm:px-12 py-4 sm:py-5 bg-[#C6A664] text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-white transition-all shadow-2xl shadow-[#C6A664]/10 active:scale-95">
                    Explore The Collection
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[32px] sm:rounded-[48px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.4)] p-8 sm:p-10 sticky top-32 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A664]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-2xl sm:text-3xl font-serif text-white mb-8 sm:mb-10 relative z-10">Acquisition Summary</h2>
              
              <div className="space-y-5 sm:space-y-6 mb-8 relative z-10">
                <div className="flex justify-between text-white/40 font-sans text-xs sm:text-sm tracking-wide">
                  <span>Subtotal Value</span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/40 font-sans text-xs sm:text-sm tracking-wide">
                  <span>Elite Concierge Delivery</span>
                  <span className="text-[#C6A664] font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between text-white/40 font-sans text-xs sm:text-sm tracking-wide">
                  <span>Duty & Taxes</span>
                  <span className="font-bold text-white">₹0.00</span>
                </div>

                {/* Coupon Input Area */}
                <div className="pt-4 space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="ENTER COUPON CODE" 
                      className={`w-full bg-white/5 border ${couponError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-white outline-none focus:border-[#C6A664] transition-all uppercase placeholder:text-white/10 pr-24`}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    {!appliedCoupon ? (
                      <button 
                        onClick={handleApplyCoupon}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#C6A664] text-black px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg active:scale-95"
                      >
                        Apply
                      </button>
                    ) : (
                      <button 
                        onClick={removeCoupon}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {appliedCoupon && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10"
                      >
                        <CheckCircle2 size={14} />
                        Coupon '{appliedCoupon}' Applied Successfully
                      </motion.div>
                    )}
                    {couponError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-500/5 p-4 rounded-xl border border-red-500/10"
                      >
                        <AlertCircle size={14} />
                        {couponError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-sans text-xs sm:text-sm tracking-wide bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                    <span className="flex items-center gap-2"><Ticket size={14} /> Discount Value</span>
                    <span className="font-bold">− ₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-8 border-t border-dashed border-white/10 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">Total Acquisition</span>
                    <span className="text-4xl sm:text-5xl font-sans font-bold text-[#C6A664] tracking-tighter">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0}
                className="w-full py-5 sm:py-6 rounded-2xl bg-[#C6A664] text-black font-bold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase hover:bg-white transition-all transform active:scale-[0.98] disabled:opacity-10 disabled:grayscale shadow-2xl shadow-[#C6A664]/10 mb-8 sm:mb-10 relative z-10"
              >
                Proceed to Checkout
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-5 sm:gap-6 pt-8 sm:pt-10 border-t border-white/5 relative z-10">
                {[
                  { icon: ShieldCheck, text: "Vault-Secure Checkout", sub: "End-to-End Encryption" },
                  { icon: Truck, text: "Concierge Shipping", sub: "Global Express Network" },
                  { icon: RotateCcw, text: "House Return Policy", sub: "30-Day Evaluation" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-4 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#C6A664]">
                      <badge.icon size={20} className="sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white leading-none">{badge.text}</p>
                      <p className="text-[9px] sm:text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mt-2">{badge.sub}</p>
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
