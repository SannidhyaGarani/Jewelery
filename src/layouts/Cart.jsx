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
      <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#640D14]"></div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, i) => sum + (Number(i.price) * (i.quantity || 1)), 0);
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="min-h-screen bg-[#FDFAF5] pt-32 sm:pt-48 pb-20 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Main Cart Area */}
          <div className="flex-1">
            <div className="mb-8 sm:mb-16">
              <Link to="/shop" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#5C3D1E]/40 hover:text-[#640D14] transition-all mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                Return to Gallery
              </Link>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl sm:text-7xl md:text-8xl font-serif text-[#2C1A0E] tracking-tighter leading-none mb-6"
              >
                Votre <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-[#640D14]/80 text-6xl sm:text-8xl md:text-9xl block md:inline">Panier</span>
              </motion.h1>
              <p className="text-[#5C3D1E]/40 font-sans text-[11px] tracking-[0.4em] uppercase font-black italic">Your exquisite selection — {items.length} pieces</p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="group relative bg-white rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-8 sm:gap-12 transition-all duration-700 hover:shadow-xl border border-[#640D14]/5"
                  >
                    <div className="w-full sm:w-48 aspect-square sm:h-48 rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#FDFAF5] border border-[#640D14]/10 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left w-full">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black text-[#640D14] uppercase tracking-[0.4em]">Atelier Edition</span>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#2C1A0E] font-bold">{item.name}</h3>
                        <p className="text-[13px] sm:text-sm text-[#5C3D1E]/60 font-sans tracking-wide mt-3 leading-relaxed line-clamp-2 sm:line-clamp-none">Artisan-crafted masterpiece featuring premium stones and timeless detailing.</p>
                      </div>

                      {/* Quantity & Price Controls */}
                      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-8">
                        <div className="flex flex-col gap-4 w-full sm:w-auto">
                          <span className="text-[9px] font-black text-[#5C3D1E]/20 uppercase tracking-[0.3em] text-center sm:text-left">Quantity</span>
                          <div className="flex items-center justify-center sm:justify-start">
                            <div className="flex items-center border border-[#640D14]/10 rounded-2xl overflow-hidden bg-[#FDFAF5] p-1.5 shadow-sm">
                              <button
                                onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                                className="w-10 h-10 flex items-center justify-center text-[#2C1A0E] hover:bg-[#640D14]/5 rounded-xl transition-all active:scale-90"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 sm:w-14 text-center font-black text-[#2C1A0E] text-lg">
                                {item.quantity || 1}
                              </span>
                              <button 
                                onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                                disabled={(item.quantity || 1) >= Math.min(10, liveStocks[item.id] ?? item.stock ?? 1)}
                                className="w-10 h-10 flex items-center justify-center text-[#2C1A0E] hover:bg-[#640D14]/5 rounded-xl transition-all active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                          {(item.quantity || 1) >= (liveStocks[item.id] ?? item.stock ?? 1) && (
                            <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mt-2 text-center sm:text-left animate-pulse">
                              Max Stock Reached
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-4 w-full sm:w-auto items-center sm:items-end">
                          <span className="text-[9px] font-black text-[#5C3D1E]/20 uppercase tracking-[0.3em]">Item Price</span>
                          <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-sans font-black text-[#2C1A0E] tracking-tight">₹{Number(item.price).toLocaleString()}</span>
                            {item.original_price > item.price && (
                              <span className="text-sm font-sans font-black text-[#5C3D1E]/20 line-through decoration-[#640D14]/30 decoration-2">₹{Number(item.original_price).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-6 right-6 sm:static p-5 sm:p-6 rounded-2xl bg-[#640D14]/5 text-[#640D14]/30 hover:bg-red-50 hover:text-red-600 transition-all transform active:scale-95 border border-[#640D14]/10 group/remove shadow-sm"
                      title="Remove Item"
                    >
                      <Trash2 size={20} className="sm:w-6 sm:h-6 transition-transform group-hover/remove:rotate-12" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length === 0 && (
                <div className="bg-white rounded-[40px] sm:rounded-[60px] border-2 border-dashed border-[#640D14]/10 p-16 sm:p-32 text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#640D14]/5 rounded-[40px] flex items-center justify-center mx-auto mb-10 text-[#640D14]/20">
                    <ShoppingBag size={48} />
                  </div>
                  <p className="text-[#5C3D1E]/40 font-serif text-2xl sm:text-3xl italic">The sanctuary is currently unoccupied.</p>
                  <Link to="/shop" className="inline-block mt-12 px-12 sm:px-16 py-5 sm:py-6 bg-[#640D14] text-white rounded-[24px] font-black uppercase tracking-[0.4em] text-[11px] sm:text-xs hover:bg-[#2C1A0E] transition-all shadow-xl active:scale-95">
                    Explore The Collection
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[480px] shrink-0">
            <div className="bg-white rounded-[48px] sm:rounded-[64px] border border-[#640D14]/10 shadow-2xl p-10 sm:p-14 sticky top-40 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#640D14]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2C1A0E] mb-10 sm:mb-12 relative z-10">Acquisition Summary</h2>
              
              <div className="space-y-6 sm:space-y-8 mb-10 relative z-10">
                <div className="flex justify-between text-[#5C3D1E]/40 font-black text-[11px] sm:text-[12px] uppercase tracking-[0.3em]">
                  <span>Subtotal Value</span>
                  <span className="font-black text-[#2C1A0E]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5C3D1E]/40 font-black text-[11px] sm:text-[12px] uppercase tracking-[0.3em]">
                  <span>Elite Concierge</span>
                  <span className="text-[#640D14] font-black">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#5C3D1E]/40 font-black text-[11px] sm:text-[12px] uppercase tracking-[0.3em]">
                  <span>Duty & Taxes</span>
                  <span className="font-black text-[#2C1A0E]">₹0.00</span>
                </div>

                {/* Coupon Input Area */}
                <div className="pt-6 space-y-5">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="ENTER COUPON CODE" 
                      className={`w-full bg-[#FDFAF5] border-2 ${couponError ? 'border-red-500/30' : 'border-[#640D14]/10'} rounded-[24px] px-8 py-5 text-[11px] font-black tracking-[0.3em] text-[#2C1A0E] outline-none focus:border-[#640D14] transition-all uppercase placeholder:text-[#5C3D1E]/20 pr-32`}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    {!appliedCoupon ? (
                      <button 
                        onClick={handleApplyCoupon}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#640D14] text-white px-6 py-3 rounded-[16px] text-[10px] font-black uppercase tracking-widest hover:bg-[#2C1A0E] transition-all shadow-lg active:scale-95"
                      >
                        Apply
                      </button>
                    ) : (
                      <button 
                        onClick={removeCoupon}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-50 text-red-600 px-6 py-3 rounded-[16px] text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95"
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
                        className="flex items-center gap-3 text-[11px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 p-5 rounded-[20px] border border-emerald-100 shadow-sm"
                      >
                        <CheckCircle2 size={16} />
                        Coupon '{appliedCoupon}' Applied Successfully
                      </motion.div>
                    )}
                    {couponError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 text-[11px] font-black text-red-600 uppercase tracking-widest bg-red-50 p-5 rounded-[20px] border border-red-100 shadow-sm"
                      >
                        <AlertCircle size={16} />
                        {couponError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-black text-[12px] uppercase tracking-[0.2em] bg-emerald-50 p-5 rounded-[20px] border border-emerald-100">
                    <span className="flex items-center gap-3"><Ticket size={16} /> Discount Value</span>
                    <span className="font-black">− ₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-10 border-t-2 border-dashed border-[#640D14]/10 flex justify-between items-end">
                  <div className="flex flex-col gap-3">
                    <span className="text-[11px] font-black text-[#5C3D1E]/30 uppercase tracking-[0.4em]">Total Acquisition</span>
                    <span className="text-5xl sm:text-6xl font-sans font-black text-[#640D14] tracking-tighter">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0}
                className="w-full py-6 sm:py-7 rounded-[28px] bg-[#640D14] text-white font-black text-xs sm:text-sm tracking-[0.4em] uppercase hover:bg-[#2C1A0E] transition-all transform active:scale-[0.98] disabled:opacity-20 shadow-2xl shadow-[#640D14]/20 mb-10 sm:mb-12 relative z-10"
              >
                Proceed to Checkout
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-6 sm:gap-8 pt-10 border-t border-[#640D14]/5 relative z-10">
                {[
                  { icon: ShieldCheck, text: "Vault-Secure Checkout", sub: "End-to-End Encryption" },
                  { icon: Truck, text: "Concierge Shipping", sub: "Global Express Network" },
                  { icon: RotateCcw, text: "House Return Policy", sub: "30-Day Evaluation" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-5 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[20px] bg-[#640D14]/5 border border-[#640D14]/10 flex items-center justify-center text-[#640D14] shadow-sm">
                      <badge.icon size={24} className="sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-black text-[#2C1A0E] leading-none">{badge.text}</p>
                      <p className="text-[10px] sm:text-[11px] font-black text-[#5C3D1E]/30 uppercase tracking-[0.3em] mt-2.5">{badge.sub}</p>
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
