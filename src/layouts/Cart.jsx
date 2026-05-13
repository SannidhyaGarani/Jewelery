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
      <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#640D14]"></div>
      </div>
    );
  }

  const total = Math.max(0, subtotal - discount);

  return (
    <div className="min-h-screen bg-[#FDFAF5] pt-24 sm:pt-32 pb-16 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-[#640D14]/40 hover:text-[#640D14] transition-all mb-6 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Gallery
            </Link>
            <h1 className="text-4xl sm:text-6xl font-serif text-[#2C1A0E] tracking-tight leading-none">
              Your <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-[#640D14] text-5xl sm:text-7xl">Selection</span>
            </h1>
          </div>
          <p className="text-[#5C3D1E]/40 font-sans text-[10px] tracking-[0.4em] uppercase font-bold italic border-b border-[#640D14]/10 pb-2">{items.length} exquisite pieces</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Item List */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key={item.id}
                  className="group bg-white rounded-3xl p-4 sm:p-5 flex items-center gap-5 border border-[#640D14]/5 hover:shadow-lg hover:shadow-[#640D14]/5 transition-all duration-500"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-[#FDFAF5] flex-shrink-0 border border-[#640D14]/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[8px] font-bold text-[#640D14] uppercase tracking-[0.2em] mb-1 block">Atelier Piece</span>
                        <h3 className="text-lg sm:text-xl font-serif text-[#2C1A0E] font-bold truncate leading-tight">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-[#5C3D1E]/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex items-center bg-[#FDFAF5] rounded-xl p-1 border border-[#640D14]/5">
                        <button
                          onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#2C1A0E] hover:bg-white rounded-lg transition-all"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-bold text-[#2C1A0E] text-xs">
                          {item.quantity || 1}
                        </span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                          disabled={(item.quantity || 1) >= Math.min(10, liveStocks[item.id] ?? item.stock ?? 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#2C1A0E] hover:bg-white rounded-lg transition-all disabled:opacity-20"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#2C1A0E] block">₹{(Number(item.price) * (item.quantity || 1)).toLocaleString()}</span>
                        {Number(item.original_price) > Number(item.price) && (
                          <span className="text-[10px] text-[#5C3D1E]/20 line-through">₹{(Number(item.original_price) * (item.quantity || 1)).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {items.length === 0 && (
              <div className="bg-white rounded-3xl border-2 border-dashed border-[#640D14]/10 p-12 text-center">
                <ShoppingBag size={40} className="mx-auto text-[#640D14]/10 mb-4" />
                <p className="text-[#5C3D1E]/40 font-serif text-xl italic">The boutique is empty.</p>
                <Link to="/shop" className="inline-block mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#640D14] border-b border-[#640D14]/20 pb-1 hover:border-[#640D14] transition-all">
                  Begin Exploring
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <aside className="lg:col-span-5">
            <div className="bg-white rounded-[40px] border border-[#640D14]/10 p-8 sm:p-10 sticky top-32 shadow-[0_20px_50px_rgba(100,13,20,0.05)]">
              <h2 className="text-2xl font-serif text-[#2C1A0E] mb-8 border-b border-[#640D14]/5 pb-4">Acquisition</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#5C3D1E]/40">
                  <span>Subtotal</span>
                  <span className="text-[#2C1A0E]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#5C3D1E]/40">
                  <span>Shipping</span>
                  <span className="text-[#640D14]">Complimentary</span>
                </div>

                {/* Coupon Area */}
                <div className="pt-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="COUPON CODE" 
                      className="w-full bg-[#FDFAF5] border border-[#640D14]/10 rounded-2xl px-6 py-4 text-[10px] font-bold tracking-widest text-[#2C1A0E] outline-none focus:border-[#640D14] transition-all uppercase placeholder:text-[#5C3D1E]/20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    {!appliedCoupon ? (
                      <button 
                        onClick={handleApplyCoupon}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#640D14] text-white px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-[#2C1A0E] transition-all"
                      >
                        Apply
                      </button>
                    ) : (
                      <button 
                        onClick={removeCoupon}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-[9px] font-bold uppercase tracking-widest px-3"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {appliedCoupon && (
                    <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest mt-2 ml-2 flex items-center gap-1">
                      <CheckCircle2 size={10} /> '{appliedCoupon}' Applied
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-2 ml-2 flex items-center gap-1">
                      <AlertCircle size={10} /> {couponError}
                    </p>
                  )}
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                    <span>Discount Applied</span>
                    <span>− ₹{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-[#640D14]/10 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-[#5C3D1E]/30 uppercase tracking-[0.3em]">Total</span>
                  <span className="text-4xl font-serif font-bold text-[#640D14]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0}
                className="w-full py-5 rounded-2xl bg-[#640D14] text-white font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-[#2C1A0E] transition-all transform active:scale-[0.98] disabled:opacity-20 shadow-xl shadow-[#640D14]/10"
              >
                Proceed to Checkout
              </button>

              {/* Badges Section */}
              <div className="mt-10 grid grid-cols-1 gap-4 pt-8 border-t border-[#640D14]/5">
                {[
                  { icon: ShieldCheck, text: "Vault-Secure Payment" },
                  { icon: Truck, text: "White-Glove Shipping" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 opacity-40">
                    <badge.icon size={14} className="text-[#640D14]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#2C1A0E]">{badge.text}</span>
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

