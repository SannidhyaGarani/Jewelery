import React, { useState } from "react";
import { useStore } from "../hooks/useStore";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, addDoc, serverTimestamp, doc, deleteDoc, writeBatch, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, ArrowLeft, CreditCard, User, Mail, Phone, MapPin } from "lucide-react";

const Checkout = () => {
  const { cartItems, cartCount } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cartItems.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);

  const [stockStatus, setStockStatus] = useState({});

  React.useEffect(() => {
    const checkAllStock = async () => {
      const status = {};
      for (const item of cartItems) {
        try {
          if (!item.id || item.id.startsWith('bs-')) continue;
          const pRef = doc(db, "products", item.id);
          const pSnap = await getDoc(pRef);
          if (pSnap.exists()) {
            const currentStock = Number(pSnap.data().stock || 0);
            status[item.id] = currentStock;
          }
        } catch (e) {
          console.error(e);
        }
      }
      setStockStatus(status);
    };
    if (cartItems.length > 0) checkAllStock();
  }, [cartItems]);

  const isAnyOutOfStock = cartItems.some(item => {
    const stock = stockStatus[item.id];
    return stock !== undefined && stock < (item.quantity || 1);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert("Please fill in all shipping details.");
      return;
    }

    setLoading(true);

    // 1. Verify Stock Availability
    try {
      for (const item of cartItems) {
        if (!item.id || item.id.startsWith('bs-')) continue;
        const pRef = doc(db, "products", item.id);
        const pSnap = await getDoc(pRef);
        if (pSnap.exists()) {
          const currentStock = pSnap.data().stock || 0;
          if (currentStock < (item.quantity || 1)) {
            alert(`Apologies. "${item.name}" has only ${currentStock} pieces left in stock. Please adjust your selection.`);
            setLoading(false);
            return;
          }
        }
      }
    } catch (e) {
      console.error("Stock check error:", e);
      alert("Error verifying stock. Please try again.");
      setLoading(false);
      return;
    }

    const RAZORPAY_KEY_ID = "rzp_test_1DP5mmOlF5G5ag";

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "Velouraz Luxury",
      description: "Order Payment",
      image: "/img/logo.png",
      handler: async function (response) {
        // Payment successful
        try {
          // 1. Create order in Firestore
          const orderData = {
            userId: user?.uid || "guest",
            items: cartItems,
            total: total,
            shippingDetails: formData,
            paymentId: response.razorpay_payment_id,
            status: "Paid",
            createdAt: serverTimestamp(),
          };

          await addDoc(collection(db, "orders"), orderData);

          // 2. Clear cart and Update Stock
          const batch = writeBatch(db);
          
          if (user) {
            for (const item of cartItems) {
              // Remove from cart
              const cartRef = doc(db, "users", user.uid, "cart", item.id);
              batch.delete(cartRef);
              
              // Decrease stock by purchased quantity
              if (item.id && !item.id.startsWith('bs-')) {
                const productRef = doc(db, "products", item.id);
                const pSnap = await getDoc(productRef); // Get fresh stock
                const freshStock = pSnap.exists() ? (pSnap.data().stock || 0) : 0;
                batch.update(productRef, {
                  stock: Number(freshStock) - (item.quantity || 1)
                });
              }
            }
          } else {
            for (const item of cartItems) {
              // Decrease stock for guest users too
              if (item.id && !item.id.startsWith('bs-')) {
                const productRef = doc(db, "products", item.id);
                const pSnap = await getDoc(productRef);
                const freshStock = pSnap.exists() ? (pSnap.data().stock || 0) : 0;
                batch.update(productRef, {
                  stock: Number(freshStock) - (item.quantity || 1)
                });
              }
            }
            localStorage.removeItem("cart");
          }
          await batch.commit();

          alert("Payment Successful! Your order has been placed.");
          navigate("/account"); // Redirect to account or orders page
        } catch (error) {
          console.error("Error creating order:", error);
          alert("Payment successful, but failed to save order details. Please contact support.");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email || "info@velouraz.in",
        contact: formData.phone || "695035916",
      },
      theme: {
        color: "#640D14",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment Failed: " + response.error.description);
      setLoading(false);
    });
    rzp1.open();
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex flex-col items-center justify-center p-6 pt-32">
        <h1 className="text-4xl font-serif text-[#2C1A0E] mb-6">Your collection is empty</h1>
        <Link to="/shop" className="px-10 py-4 bg-[#640D14] text-white font-bold rounded-xl uppercase tracking-widest text-xs shadow-xl">
          Return to Atelier
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5] pt-48 pb-20 px-6 text-[#2C1A0E]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <Link to="/cart" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#5C3D1E]/40 hover:text-[#640D14] transition-all mb-10 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Selection
          </Link>
          <h1 className="text-5xl md:text-7xl font-serif text-[#2C1A0E] tracking-tighter leading-none mb-4">
            Finalize <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-[#640D14]/80 text-6xl md:text-8xl block md:inline">Acquisition</span>
          </h1>
          <p className="text-[#5C3D1E]/40 font-sans text-[10px] tracking-[0.4em] uppercase font-black">Secure Bespoke Checkout</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-10">
            <section className="bg-white rounded-[40px] border border-[#640D14]/10 p-10 md:p-14 shadow-sm">
              <h2 className="text-3xl font-serif text-[#2C1A0E] mb-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#640D14]/5 flex items-center justify-center text-[#640D14] shadow-sm">
                  <Truck size={24} />
                </div>
                Shipping & Contact
              </h2>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#5C3D1E]/40 uppercase tracking-[0.3em]">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5C3D1E]/20" />
                      <input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#FDFAF5] border border-[#640D14]/10 rounded-2xl py-4.5 pl-14 pr-6 text-[#2C1A0E] font-sans outline-none focus:border-[#640D14] transition-all shadow-sm placeholder:text-[#5C3D1E]/20"
                        placeholder="Jean-Pierre Velour"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#5C3D1E]/40 uppercase tracking-[0.3em]">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5C3D1E]/20" />
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#FDFAF5] border border-[#640D14]/10 rounded-2xl py-4.5 pl-14 pr-6 text-[#2C1A0E] font-sans outline-none focus:border-[#640D14] transition-all shadow-sm placeholder:text-[#5C3D1E]/20"
                        placeholder="jean@velour.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#5C3D1E]/40 uppercase tracking-[0.3em]">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5C3D1E]/20" />
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#FDFAF5] border border-[#640D14]/10 rounded-2xl py-4.5 pl-14 pr-6 text-[#2C1A0E] font-sans outline-none focus:border-[#640D14] transition-all shadow-sm placeholder:text-[#5C3D1E]/20"
                      placeholder="+91 99999 00000"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#5C3D1E]/40 uppercase tracking-[0.3em]">Shipping Address</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-5 top-5 text-[#5C3D1E]/20" />
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-[#FDFAF5] border border-[#640D14]/10 rounded-2xl py-4.5 pl-14 pr-6 text-[#2C1A0E] font-sans outline-none focus:border-[#640D14] transition-all shadow-sm resize-none placeholder:text-[#5C3D1E]/20"
                      placeholder="Suite 504, Parisian Boulevard..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#5C3D1E]/40 uppercase tracking-[0.3em]">City</label>
                    <input 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#FDFAF5] border border-[#640D14]/10 rounded-2xl py-4.5 px-6 text-[#2C1A0E] font-sans outline-none focus:border-[#640D14] transition-all shadow-sm placeholder:text-[#5C3D1E]/20"
                      placeholder="Paris"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#5C3D1E]/40 uppercase tracking-[0.3em]">Pincode / Zip</label>
                    <input 
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-[#FDFAF5] border border-[#640D14]/10 rounded-2xl py-4.5 px-6 text-[#2C1A0E] font-sans outline-none focus:border-[#640D14] transition-all shadow-sm placeholder:text-[#5C3D1E]/20"
                      placeholder="75001"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Section */}
          <aside className="lg:col-span-5">
            <div className="bg-white rounded-[40px] border border-[#640D14]/10 p-10 md:p-14 sticky top-40 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#640D14]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-3xl font-serif text-[#2C1A0E] mb-10 relative z-10">Order Summary</h2>
              
              <div className="space-y-6 mb-10 relative z-10 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 py-4 border-b border-[#640D14]/5 last:border-0">
                    <div className="w-16 h-16 rounded-2xl bg-[#FDFAF5] border border-[#640D14]/5 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-serif text-[#2C1A0E] truncate font-bold">{item.name}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <p className="text-[10px] font-black text-[#5C3D1E]/30 uppercase tracking-widest">Qty: {item.quantity || 1}</p>
                        {stockStatus[item.id] !== undefined && stockStatus[item.id] < (item.quantity || 1) && (
                          <span className="text-[9px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100 shadow-sm">
                            Only {stockStatus[item.id]} Avail.
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[14px] font-sans font-black text-[#640D14] flex-shrink-0">₹{(Number(item.price) * (item.quantity || 1)).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 mb-12 relative z-10">
                <div className="flex justify-between text-[#5C3D1E]/50 text-[12px] font-black uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-[#2C1A0E]">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5C3D1E]/50 text-[12px] font-black uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-[#640D14]">Complimentary</span>
                </div>
                <div className="pt-8 mt-4 border-t border-[#640D14]/10 flex justify-between items-center">
                  <span className="text-[#2C1A0E] font-serif text-2xl">Total Due</span>
                  <span className="text-4xl font-sans font-black text-[#640D14]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={loading || isAnyOutOfStock}
                className={`w-full py-7 rounded-[32px] font-black text-[11px] tracking-[0.5em] uppercase transition-all transform active:scale-[0.98] relative z-10 flex items-center justify-center gap-4 shadow-xl ${
                  isAnyOutOfStock 
                  ? 'bg-[#2C1A0E]/10 text-[#2C1A0E]/40 cursor-not-allowed' 
                  : 'bg-[#640D14] text-white hover:bg-[#2C1A0E]'
                }`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                ) : isAnyOutOfStock ? (
                  "Adjust Selection"
                ) : (
                  <>
                    <CreditCard size={20} strokeWidth={2} />
                    Complete Payment
                  </>
                )}
              </button>

              <div className="mt-10 pt-10 border-t border-[#640D14]/10 flex flex-col gap-5 relative z-10">
                <div className="flex items-center gap-4 text-[#5C3D1E]/40">
                  <ShieldCheck size={20} className="text-[#640D14]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Encrypted via Razorpay</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};


export default Checkout;
