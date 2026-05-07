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

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "Velouraz Luxury",
      description: "Order Payment",
      image: "https://example.com/logo.png", // Optional
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
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#C6A664",
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
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 pt-32">
        <h1 className="text-4xl font-serif text-white mb-6">Your collection is empty</h1>
        <Link to="/shop" className="px-10 py-4 bg-[#C6A664] text-black font-bold rounded-xl uppercase tracking-widest text-xs">
          Return to Atelier
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-[#C6A664] transition-colors mb-8">
            <ArrowLeft size={14} />
            Back to Selection
          </Link>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none mb-4">
            Finalize <span className="text-[#C6A664]">Acquisition</span>
          </h1>
          <p className="text-white/40 font-sans text-sm tracking-widest uppercase">Secure Checkout Process</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white/[0.02] backdrop-blur-xl rounded-[40px] border border-white/5 p-8 md:p-10">
              <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C6A664]/10 flex items-center justify-center text-[#C6A664]">
                  <Truck size={20} />
                </div>
                Shipping & Contact
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-sans outline-none focus:border-[#C6A664]/50 transition-colors"
                        placeholder="Jean-Pierre Velour"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-sans outline-none focus:border-[#C6A664]/50 transition-colors"
                        placeholder="jean@velour.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-sans outline-none focus:border-[#C6A664]/50 transition-colors"
                      placeholder="+91 99999 00000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Shipping Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-4 text-white/20" />
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-sans outline-none focus:border-[#C6A664]/50 transition-colors"
                      placeholder="Suite 504, Parisian Boulevard..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">City</label>
                    <input 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white font-sans outline-none focus:border-[#C6A664]/50 transition-colors"
                      placeholder="Paris"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Pincode / Zip</label>
                    <input 
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white font-sans outline-none focus:border-[#C6A664]/50 transition-colors"
                      placeholder="75001"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Section */}
          <aside className="lg:col-span-5">
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-[40px] border border-white/10 p-10 sticky top-32 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A664]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-2xl font-serif text-white mb-8 relative z-10">Order Summary</h2>
              
              <div className="space-y-4 mb-8 relative z-10 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-black/40" />
                    <div className="flex-1">
                      <p className="text-sm font-serif text-white truncate">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Qty: {item.quantity || 1}</p>
                        {stockStatus[item.id] !== undefined && stockStatus[item.id] < (item.quantity || 1) && (
                          <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                            Only {stockStatus[item.id]} Avail.
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-sans font-bold text-[#C6A664]">₹{(Number(item.price) * (item.quantity || 1)).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10 relative z-10">
                <div className="flex justify-between text-white/40 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/40 text-sm">
                  <span>Shipping</span>
                  <span className="text-[#C6A664] font-bold">Complimentary</span>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-white font-serif text-xl">Total Due</span>
                  <span className="text-3xl font-sans font-bold text-[#C6A664]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={loading || isAnyOutOfStock}
                className={`w-full py-6 rounded-2xl text-black font-bold text-xs tracking-[0.4em] uppercase transition-all transform active:scale-[0.98] relative z-10 flex items-center justify-center gap-3 ${
                  isAnyOutOfStock 
                  ? 'bg-red-900/50 text-white cursor-not-allowed opacity-50' 
                  : 'bg-[#C6A664] hover:bg-white'
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : isAnyOutOfStock ? (
                  "Adjust Quantities in Cart"
                ) : (
                  <>
                    <CreditCard size={18} />
                    Complete Payment
                  </>
                )}
              </button>

              <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4 relative z-10">
                <div className="flex items-center gap-4 text-white/30">
                  <ShieldCheck size={18} className="text-[#C6A664]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Payment via Razorpay</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
