import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center px-6 py-32 relative overflow-hidden selection:bg-[#640D14] selection:text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#640D14]/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#640D14]/3 rounded-full blur-[140px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="w-full max-w-xl bg-white rounded-[48px] border border-[#640D14]/10 shadow-[0_40px_120px_rgba(44,26,14,0.1)] p-8 md:p-20 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#640D14]/5 rounded-[24px] text-[#640D14] mb-10 shadow-sm border border-[#640D14]/10">
            <Sparkles size={32} />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-[#2C1A0E] tracking-tighter leading-none mb-6 font-bold uppercase">
            Welcome <br />
            <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-[#640D14]/80 lowercase text-6xl md:text-9xl block mt-2">Back</span>
          </h2>
          <p className="text-[#5C3D1E]/40 font-sans text-[11px] tracking-[0.5em] uppercase font-black">The Atelier Awaits Your Presence</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-600 text-sm font-bold shadow-sm"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#5C3D1E]/30 ml-6">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-[#5C3D1E]/20 group-focus-within:text-[#640D14] transition-colors" size={22} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="excellence@velouraz.com"
                className="w-full pl-16 pr-8 py-6 rounded-[24px] bg-[#FDFAF5] border border-[#640D14]/10 focus:border-[#640D14]/40 outline-none transition-all font-sans text-[#2C1A0E] placeholder:text-[#5C3D1E]/20 shadow-sm font-medium text-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-6">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#5C3D1E]/30">Secret Password</label>
              <button type="button" className="text-[11px] font-black uppercase tracking-[0.3em] text-[#640D14]/60 hover:text-[#2C1A0E] transition-colors">Recovery</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-7 top-1/2 -translate-y-1/2 text-[#5C3D1E]/20 group-focus-within:text-[#640D14] transition-colors" size={22} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-16 pr-8 py-6 rounded-[24px] bg-[#FDFAF5] border border-[#640D14]/10 focus:border-[#640D14]/40 outline-none transition-all font-sans text-[#2C1A0E] placeholder:text-[#5C3D1E]/20 shadow-sm font-medium text-lg"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-6 rounded-[24px] bg-[#640D14] text-white font-black text-xs tracking-[0.5em] uppercase hover:bg-[#2C1A0E] transition-all transform active:scale-[0.98] shadow-2xl shadow-[#640D14]/20 flex items-center justify-center gap-4 mt-4"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Enter Boutique
                <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-16 text-center">
          <p className="text-[11px] text-[#5C3D1E]/40 font-black tracking-widest uppercase">
            New to the legacy?{" "}
            <Link to="/signup" className="text-[#640D14] font-black hover:text-[#2C1A0E] ml-2 transition-colors border-b-2 border-[#640D14]/20 hover:border-[#2C1A0E]">
              Initialize Membership
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};


export default Login;
