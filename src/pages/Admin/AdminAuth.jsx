import React, { useState } from 'react';
import { db } from "../../components/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const AdminAuth = ({ onAuthSuccess }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const q = query(
        collection(db, "admins"), 
        where("adminId", "==", adminId),
        where("password", "==", password)
      );
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        const adminData = { firestoreId: snap.docs[0].id, ...snap.docs[0].data() };
        onAuthSuccess(adminData);
      } else {
        setError("Invalid Admin ID or Password.");
      }
    } catch (err) {
      setError("An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-slate-700/30 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#811331]/20 blur-[100px]" />
      </div>

      <div className="w-full max-w-md px-6 relative z-10">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-white/10 border border-white/20 text-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <span className="text-2xl font-serif tracking-widest">AD</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Admin Portal
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Sign in with your Admin credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  Admin ID
                </label>
                <input 
                  type="text" 
                  required
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#811331]/50 focus:border-transparent transition-all"
                  placeholder="e.g. admin_01"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#811331]/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-400 font-medium text-center">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#811331] to-[#a21940] hover:from-[#650f27] hover:to-[#811331] text-white rounded-xl font-medium shadow-lg shadow-[#811331]/20 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center mt-2"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Velouraz Admin Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
