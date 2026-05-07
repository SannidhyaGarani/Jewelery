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
  Crown,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const Account = () => {
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({ cart: 0, wishlist: 0 });
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        const cartSnap = await getDocs(collection(db, "users", user.uid, "cart"));
        const wishlistSnap = await getDocs(collection(db, "users", user.uid, "wishlist"));
        
        const ordersRef = collection(db, "users", user.uid, "orders");
        let ordersSnap;
        try {
          const ordersQuery = query(ordersRef, orderBy("createdAt", "desc"), limit(3));
          ordersSnap = await getDocs(ordersQuery);
        } catch (e) {
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

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate("/");
    } catch (error) {
      alert("Failed to delete account. Please try again.");
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
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar - Compact Profile */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/[0.03] backdrop-blur-xl rounded-[32px] p-8 border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C6A664]/10 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white overflow-hidden shadow-xl">
                    {userData?.photoURL ? (
                      <img src={userData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-[#C6A664]/30" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#C6A664] rounded-lg flex items-center justify-center text-black border-4 border-[#0A0A0A] shadow-lg">
                    <Crown size={14} />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-white tracking-tight leading-none mb-2">
                    {userData?.displayName || "Member"}
                  </h2>
                  <p className="text-[9px] font-bold text-[#C6A664] uppercase tracking-[0.3em]">Elite Status</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Points</span>
                  <span className="text-sm font-bold text-[#C6A664]">2,450 XP</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Member Since</span>
                  <span className="text-sm font-bold text-white/70">2026</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 space-y-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <LogOut size={16} className="text-white/30 group-hover:text-red-400" />
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Sign Out</span>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Stats Grid - Very Compact */}
            <div className="grid grid-cols-2 gap-4">
              <Link to="/cart" className="bg-white/[0.02] p-6 rounded-[24px] border border-white/10 hover:bg-white/[0.05] transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#C6A664]/10 flex items-center justify-center text-[#C6A664]">
                    <ShoppingBag size={16} />
                  </div>
                  <ChevronRight size={14} className="text-white/10 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-2xl font-sans font-bold text-white">{stats.cart}</p>
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1">Cart Pieces</p>
              </Link>
              <Link to="/wishlist" className="bg-white/[0.02] p-6 rounded-[24px] border border-white/10 hover:bg-white/[0.05] transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#C6A664]/10 flex items-center justify-center text-[#C6A664]">
                    <Heart size={16} fill="currentColor" />
                  </div>
                  <ChevronRight size={14} className="text-white/10 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-2xl font-sans font-bold text-white">{stats.wishlist}</p>
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1">Saved Items</p>
              </Link>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/[0.02] rounded-[32px] p-6 border border-red-500/10">
              {!showDeleteConfirm ? (
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full py-4 text-[9px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-[0.3em] transition-colors"
                >
                  Delete Account
                </button>
              ) : (
                <div className="space-y-4 text-center">
                  <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Are you sure?</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 py-2 bg-white/5 rounded-xl text-[9px] font-bold text-white uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleDeleteAccount}
                      className="flex-1 py-2 bg-red-600 rounded-xl text-[9px] font-bold text-white uppercase tracking-widest"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Activity */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.02] rounded-[32px] border border-white/10 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-3xl font-serif text-white mb-2">Acquisition History</h3>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Tracking your latest masterpieces</p>
                </div>
                <Link to="/orders" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all">
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="group flex items-center justify-between p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-[#C6A664] border border-white/5">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white tracking-widest">#{order.id.slice(0, 8).toUpperCase()}</p>
                          <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1">
                            {new Date(order.createdAt?.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#C6A664] mb-1">₹{Number(order.total).toLocaleString()}</p>
                        <span className="text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white/[0.01] rounded-[32px] border border-dashed border-white/10">
                    <ShoppingBag size={40} className="mx-auto text-white/5 mb-6" />
                    <p className="text-white/20 font-serif text-xl italic">No acquisitions yet</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: MapPin, label: "Shipping Addresses", sub: "2 Saved Locations" },
                { icon: CreditCard, label: "Payment Vault", sub: "Encrypted Methods" },
                { icon: Award, label: "Elite Rewards", sub: "Level: Platinum" },
                { icon: Bell, label: "Notification Center", sub: "3 Unread Updates" }
              ].map((action, i) => (
                <button key={i} className="flex items-center gap-6 p-6 rounded-[28px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#C6A664]/30 transition-all text-left group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#C6A664] group-hover:bg-[#C6A664] group-hover:text-black transition-all">
                    <action.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">{action.label}</p>
                    <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest">{action.sub}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
