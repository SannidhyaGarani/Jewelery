import React, { useEffect, useState } from "react";
import { db } from "../components/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowLeft, ShieldCheck, Truck, Minus, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { useStore } from "../hooks/useStore";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartQuantity, removeFromCart } = useStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveStocks, setLiveStocks] = useState({});
  
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    setItems(cartItems);
    
    const validateStock = async () => {
      if (cartItems.length === 0) return;
      
      const newLiveStocks = {};
      for (const item of cartItems) {
        try {
          if (!item.id || item.id.startsWith('bs-')) continue;
          const pRef = doc(db, "products", item.id);
          const pSnap = await getDoc(pRef);
          
          if (pSnap.exists()) {
            const actualStock = Number(pSnap.data().stock || 0);
            newLiveStocks[item.id] = actualStock;
            if (actualStock <= 0) {
              // Out of stock: remove from cart entirely
              await removeFromCart(item.id);
            } else if (item.quantity > actualStock) {
              await updateCartQuantity(item.id, actualStock);
            }
          }
        } catch (e) {
          console.error("Stock validation error:", e);
        }
      }
      setLiveStocks(newLiveStocks);
    };

    if (cartItems.length > 0) {
      validateStock();
    }
    
    setLoading(false);
  }, [cartItems, updateCartQuantity, removeFromCart]);

  const removeItem = async (id) => {
    await removeFromCart(id);
  };

  const subtotal = items.reduce((sum, i) => sum + (Number(i.price) * (i.quantity || 1)), 0);

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
      setCouponError("Invalid code");
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
      <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#7A0E2E]"></div>
      </div>
    );
  }

  const total = Math.max(0, subtotal - discount);

  return (
    <div className="min-h-screen bg-[#F8F4EF] pt-20 pb-32 px-4 sm:px-8 font-sans text-[#2A2623]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-20 border-b border-[#D8CBBE]/30 pb-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#7B6D63] hover:text-[#7A0E2E] transition-all mb-8 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform duration-500" />
            Continue Browsing
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-5xl sm:text-7xl font-serif text-[#2A2623] tracking-tighter leading-none">
              The <span className="text-[#7A0E2E] italic font-light">Cart</span>
            </h1>
            <p className="text-[#7B6D63] font-serif text-lg italic">{items.length} pieces reserved for you</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Item List */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key={item.id}
                  className="group flex flex-col sm:flex-row items-center gap-10 py-10 border-b border-[#D8CBBE]/20 last:border-0"
                >
                  <div className="w-full sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden bg-[#F4EEE8] border border-[#D8CBBE]/30 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[#2A2623]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="flex-1 w-full space-y-6">
                    <div className="flex justify-between items-start gap-6">
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-[#7A0E2E] uppercase tracking-[0.4em]">Velouraz Atelier</span>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2623] leading-tight">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-[#7B6D63]/30 hover:text-[#7A0E2E] transition-colors"
                      >
                        <Trash2 size={20} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-8 pt-4">
                      <div className="flex items-center border border-[#D8CBBE]/50 rounded-full px-2 py-1 bg-white/50 backdrop-blur-sm">
                        <button
                          onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                          className="w-10 h-10 flex items-center justify-center text-[#2A2623] hover:text-[#7A0E2E] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold text-[#2A2623] text-xs tracking-widest">
                          {item.quantity || 1}
                        </span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                          disabled={(item.quantity || 1) >= Math.min(10, liveStocks[item.id] ?? item.stock ?? 1)}
                          className="w-10 h-10 flex items-center justify-center text-[#2A2623] hover:text-[#7A0E2E] transition-colors disabled:opacity-20"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-xl font-medium text-[#7A0E2E]">₹{(Number(item.price) * (item.quantity || 1)).toLocaleString()}</p>
                        {Number(item.original_price) > Number(item.price) && (
                          <p className="text-sm text-[#7B6D63]/40 line-through">₹{(Number(item.original_price) * (item.quantity || 1)).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {items.length === 0 && (
              <div className="py-40 text-center bg-[#F4EEE8]/30 rounded-[40px] border border-[#D8CBBE]/20">
                <ShoppingBag size={48} strokeWidth={1} className="mx-auto text-[#7A0E2E]/20 mb-8" />
                <p className="text-[#7B6D63] font-serif text-2xl italic mb-10">Your selection is empty.</p>
                <Link to="/shop" className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#7A0E2E] border-b-2 border-[#7A0E2E] pb-2 hover:text-[#2A2623] hover:border-[#2A2623] transition-all">
                  Begin Discovery
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <aside className="lg:col-span-4">
            <div className="bg-white/40 backdrop-blur-2xl rounded-[32px] border border-[#D8CBBE]/30 p-10 sticky top-32 shadow-[0_20px_50px_rgba(122,14,46,0.05)]">
              <h2 className="text-3xl font-serif text-[#2A2623] mb-10 border-b border-[#D8CBBE]/20 pb-6">Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B6D63]">
                  <span>Subtotal</span>
                  <span className="text-[#2A2623]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B6D63]">
                  <span>Delivery</span>
                  <span className="text-[#7A0E2E] italic">Complimentary</span>
                </div>

                {/* Coupon Area */}
                <div className="pt-4 space-y-4">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="OFFER CODE" 
                      className="w-full bg-white border border-[#D8CBBE]/50 rounded-xl px-6 py-5 text-[10px] font-bold tracking-[0.4em] text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all uppercase placeholder:text-[#7B6D63]/30"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    {!appliedCoupon ? (
                      <button 
                        onClick={handleApplyCoupon}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#2A2623] text-white px-6 py-3 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-[#7A0E2E] transition-all"
                      >
                        Apply
                      </button>
                    ) : (
                      <button 
                        onClick={removeCoupon}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-[9px] font-bold uppercase tracking-widest px-3"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Code '{appliedCoupon}' Active</span>
                    </div>
                  )}
                  {couponError && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-xl border border-red-100">
                      <AlertCircle size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{couponError}</span>
                    </div>
                  )}
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600 pt-2">
                    <span>Privilege Discount</span>
                    <span>− ₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-8 border-t border-[#D8CBBE]/30 flex justify-between items-end">
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#2A2623]">Grand Total</span>
                  <span className="text-3xl font-serif text-[#7A0E2E]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => items.length > 0 && navigate("/checkout")}
                disabled={items.length === 0}
                className="w-full bg-[#2A2623] text-white py-6 rounded-2xl text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#7A0E2E] transition-all duration-500 shadow-xl shadow-[#2A2623]/10 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Proceed to Checkout
              </button>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <ShieldCheck size={20} className="text-[#7A0E2E]/60" strokeWidth={1} />
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#7B6D63]">Secure Payment</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <Truck size={20} className="text-[#7A0E2E]/60" strokeWidth={1} />
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#7B6D63]">Express Delivery</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;

