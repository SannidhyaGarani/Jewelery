import React, { useState, useEffect } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { 
  User, 
  Package, 
  Heart, 
  LogOut, 
  ChevronRight, 
  Settings, 
  ShoppingBag, 
  CreditCard, 
  MapPin, 
  Bell,
  Award,
  Star,
  Crown
} from "lucide-react";
import { motion } from "framer-motion";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({ cart: 0, wishlist: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch User Profile
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        // Fetch Cart Count
        const cartSnap = await getDocs(collection(db, "users", user.uid, "cart"));
        const wishlistSnap = await getDocs(collection(db, "users", user.uid, "wishlist"));
        
        // Fetch Recent Orders
        const ordersRef = collection(db, "users", user.uid, "orders");
        let ordersSnap;
        try {
          const ordersQuery = query(ordersRef, orderBy("createdAt", "desc"), limit(3));
          ordersSnap = await getDocs(ordersQuery);
        } catch (e) {
          // If index doesn't exist yet
          ordersSnap = await getDocs(query(ordersRef, limit(3)));
        }
        
        setRecentOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setStats({
          cart: cartSnap.size,
          wishlist: wishlistSnap.size
        });
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        
        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] backdrop-blur-xl rounded-[60px] p-10 md:p-20 mb-16 relative overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C6A664]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="relative group">
                <div className="w-44 h-44 rounded-[48px] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white overflow-hidden shadow-2xl">
                  {userData?.photoURL ? (
                    <img src={userData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent">
                      <User size={72} className="text-[#C6A664]/30" />
                    </div>
                  )}
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-4 -right-4 w-14 h-14 bg-[#C6A664] rounded-[24px] flex items-center justify-center text-black border-[6px] border-[#0A0A0A] shadow-2xl"
                >
                  <Crown size={24} />
                </motion.div>
              </div>
              
              <div className="text-center lg:text-left space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-[#C6A664] uppercase tracking-[0.4em]">Velouraz Elite Member</span>
                  <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">
                    {userData?.displayName || "L'Excellence Member"}
                  </h1>
                </div>
                <p className="text-white/40 font-sans text-lg tracking-wide">{user?.email}</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                  <span className="px-6 py-2 rounded-2xl bg-white/5 backdrop-blur-sm text-white/60 text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2">
                    <Star size={12} className="text-[#C6A664]" /> Platinum Status
                  </span>
                  <span className="px-6 py-2 rounded-2xl bg-[#C6A664]/10 text-[#C6A664] text-[10px] font-bold uppercase tracking-widest border border-[#C6A664]/20">
                    2,450 Prestige Points
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-10 py-5 rounded-[24px] bg-white/[0.03] text-white/60 font-bold uppercase tracking-[0.2em] text-[10px] border border-white/10 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all flex items-center gap-3 shadow-xl"
            >
              <LogOut size={16} />
              Secured Logout
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left Column: Stats & Menu */}
          <div className="lg:col-span-4 space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Link to="/cart" className="group bg-white/[0.02] p-10 rounded-[48px] border border-white/10 hover:bg-white/[0.04] transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6A664]/5 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#C6A664]/10 flex items-center justify-center text-[#C6A664] mb-8 group-hover:scale-110 transition-transform">
                  <ShoppingBag size={28} />
                </div>
                <p className="text-5xl font-sans font-bold text-white tracking-tighter leading-none">{stats.cart}</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-4 italic">Acquisitions</p>
              </Link>
              
              <Link to="/wishlist" className="group bg-white/[0.02] p-10 rounded-[48px] border border-white/10 hover:bg-white/[0.04] transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6A664]/5 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#C6A664]/10 flex items-center justify-center text-[#C6A664] mb-8 group-hover:scale-110 transition-transform">
                  <Heart size={28} fill="currentColor" />
                </div>
                <p className="text-5xl font-sans font-bold text-white tracking-tighter leading-none">{stats.wishlist}</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-4 italic">Sanctuary Pieces</p>
              </Link>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white/[0.02] rounded-[56px] border border-white/10 overflow-hidden p-6 shadow-2xl">
              <h3 className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Personal Atelier</h3>
              <div className="space-y-2">
                {[
                  { icon: Settings, label: "House Settings" },
                  { icon: Package, label: "Order Archives" },
                  { icon: CreditCard, label: "Vault Methods" },
                  { icon: MapPin, label: "Elite Addresses" },
                  { icon: Bell, label: "Communications" },
                ].map((item, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-6 rounded-[32px] hover:bg-white/5 transition-all group text-left border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#C6A664] flex items-center justify-center border border-white/5 group-hover:bg-[#C6A664] group-hover:text-black transition-colors">
                        <item.icon size={20} />
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-widest">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-white/10 group-hover:translate-x-1 group-hover:text-[#C6A664] transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Recent Activity */}
          <div className="lg:col-span-8 space-y-16">
            <div className="bg-white/[0.02] rounded-[64px] border border-white/10 p-12 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A664]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-16 relative z-10">
                <div>
                  <h3 className="text-4xl font-serif text-white tracking-tight">Recent Archives</h3>
                  <p className="text-white/30 font-sans text-sm tracking-widest uppercase mt-2">Tracking your latest masterpieces</p>
                </div>
                <Link to="/orders" className="px-10 py-4 rounded-2xl border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all w-fit">
                  Full Catalog
                </Link>
              </div>

              <div className="relative z-10">
                {recentOrders.length > 0 ? (
                  <div className="space-y-6">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="group flex flex-col sm:flex-row items-center justify-between p-10 rounded-[48px] bg-white/[0.03] border border-white/5 hover:border-[#C6A664]/30 hover:bg-white/[0.05] transition-all duration-700">
                        <div className="flex items-center gap-8 mb-6 sm:mb-0">
                          <div className="w-20 h-20 rounded-[28px] bg-black/40 flex items-center justify-center text-[#C6A664] border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                            <Package size={32} />
                          </div>
                          <div>
                            <p className="text-xl font-serif text-white">Ref. #{order.id.slice(0, 8).toUpperCase()}</p>
                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em] mt-2">Acquired {new Date(order.createdAt?.seconds * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                          </div>
                        </div>
                        <div className="text-center sm:text-right space-y-4">
                          <p className="text-3xl font-sans font-bold text-[#C6A664] tracking-tighter">₹{Number(order.total).toLocaleString()}</p>
                          <span className="inline-flex px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-[#C6A664]/10 text-[#C6A664] border border-[#C6A664]/20 shadow-lg shadow-[#C6A664]/5">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-28 bg-white/[0.01] rounded-[56px] border border-dashed border-white/10">
                    <div className="w-24 h-24 rounded-[36px] bg-white/5 flex items-center justify-center text-[#C6A664]/20 mx-auto mb-10 shadow-2xl">
                      <ShoppingBag size={48} />
                    </div>
                    <h4 className="text-3xl font-serif text-white/60 mb-4 italic">No acquisitions recorded</h4>
                    <p className="text-white/20 font-sans text-xs tracking-[0.3em] uppercase mb-12 max-w-xs mx-auto leading-relaxed">Your jewellery journey awaits its first chapter.</p>
                    <Link to="/shop" className="inline-flex items-center gap-4 px-12 py-6 bg-[#C6A664] text-black rounded-[28px] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-2xl shadow-[#C6A664]/10">
                      Explore Atelier
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Loyalty Banner */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-[#C6A664] rounded-[60px] p-12 md:p-20 text-black relative overflow-hidden shadow-[0_40px_100px_rgba(198,166,100,0.2)]"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="text-center md:text-left space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Loyalty Program</span>
                  <h3 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">Prestige Rewards</h3>
                  <p className="text-black/60 font-medium text-lg italic">You are approaching your next complimentary acquisition.</p>
                </div>
                <button className="px-12 py-6 bg-[#0A0A0A] text-white rounded-[32px] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-[#0A0A0A] transition-all shadow-2xl shadow-black/20">
                  Redeem Excellence
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
