import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password, displayName);
      navigate("/");
    } catch (err) {
      setError(err.message || "We couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#C6A664]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-white/[0.02] backdrop-blur-xl rounded-[48px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] p-8 md:p-16 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C6A664] rounded-2xl text-black mb-8 shadow-2xl shadow-[#C6A664]/20">
            <Sparkles size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
            Begin Your <span className="text-[#C6A664]">Legacy</span>
          </h2>
          <p className="text-white/40 font-sans text-sm tracking-widest uppercase">Join the Atelier de Luxe</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-4">Full Name</label>
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C6A664] transition-colors" size={20} />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Monsieur/Madame Doe"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-[#C6A664]/50 outline-none transition-all font-sans text-white placeholder:text-white/10 shadow-inner"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-4">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C6A664] transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Excellence@velouraz.com"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-[#C6A664]/50 outline-none transition-all font-sans text-white placeholder:text-white/10 shadow-inner"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-4">Secret Password</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C6A664] transition-colors" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-[#C6A664]/50 outline-none transition-all font-sans text-white placeholder:text-white/10 shadow-inner"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-3 px-2 py-4">
            <ShieldCheck size={18} className="text-[#C6A664] flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-white/30 font-bold leading-relaxed uppercase tracking-widest">
              By initiating membership, you accept the <span className="text-white">Velouraz Statutes</span> and <span className="text-white">Privacy Protocol</span>.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-5 rounded-2xl bg-[#C6A664] text-black font-bold text-sm tracking-[0.3em] uppercase hover:bg-white transition-all transform active:scale-[0.98] shadow-2xl shadow-[#C6A664]/10 flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs text-white/30 font-medium tracking-wide">
            Already part of the legacy?{" "}
            <Link to="/login" className="text-[#C6A664] font-bold hover:text-white ml-1 transition-colors underline-offset-4 hover:underline">
              Secure Entry
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
