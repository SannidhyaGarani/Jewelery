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
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center px-4 py-20 relative overflow-hidden selection:bg-[#7A0E2E] selection:text-white">
      {/* Refined Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7A0E2E]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7A0E2E]/3 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[500px] bg-white/40 backdrop-blur-xl rounded-[48px] border border-[#D8CBBE]/30 shadow-[0_32px_80px_rgba(122,14,46,0.08)] p-10 md:p-16 relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#7A0E2E] rounded-[24px] text-white mb-10 shadow-xl shadow-[#7A0E2E]/20"
          >
            <Sparkles size={28} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A2623] tracking-tighter leading-none mb-4 font-bold">
            The <span className="text-[#7A0E2E] italic font-light">Legacy</span>
          </h2>
          <p className="text-[#7B6D63] font-serif text-lg italic">Join the House of Velouraz</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-600 text-xs font-bold"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#7B6D63] ml-2">Full Name</label>
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7B6D63]/30 group-focus-within:text-[#7A0E2E] transition-colors" size={18} />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Monsieur/Madame Doe"
                className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-white/60 border border-[#D8CBBE]/50 focus:border-[#7A0E2E] outline-none transition-all font-sans text-[#2A2623] placeholder:text-[#7B6D63]/30 text-sm font-medium shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#7B6D63] ml-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7B6D63]/30 group-focus-within:text-[#7A0E2E] transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@velouraz.com"
                className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-white/60 border border-[#D8CBBE]/50 focus:border-[#7A0E2E] outline-none transition-all font-sans text-[#2A2623] placeholder:text-[#7B6D63]/30 text-sm font-medium shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#7B6D63] ml-2">Secret Password</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7B6D63]/30 group-focus-within:text-[#7A0E2E] transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-white/60 border border-[#D8CBBE]/50 focus:border-[#7A0E2E] outline-none transition-all font-sans text-[#2A2623] placeholder:text-[#7B6D63]/30 text-sm font-medium shadow-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-4 px-2 pt-4 pb-6">
            <ShieldCheck size={20} className="text-[#7A0E2E] flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#7B6D63] font-bold leading-relaxed uppercase tracking-[0.2em]">
              By joining, you accept our <span className="text-[#7A0E2E]">Statutes</span> and <span className="text-[#7A0E2E]">Privacy Protocol</span>.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-5 rounded-[24px] bg-[#2A2623] text-white font-bold text-[11px] tracking-[0.4em] uppercase hover:bg-[#7A0E2E] transition-all transform active:scale-[0.98] shadow-2xl shadow-[#2A2623]/10 flex items-center justify-center gap-4 mt-4"
          >
            {loading ? (
              <div className="w-6 h-6 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Apply for Membership
                <ArrowRight size={18} strokeWidth={2} className="group-hover:translate-x-2 transition-transform duration-500" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-[#D8CBBE]/30 text-center">
          <p className="text-[10px] text-[#7B6D63] font-bold tracking-widest uppercase">
            Already part of the legacy?{" "}
            <Link to="/login" className="text-[#7A0E2E] font-black hover:text-[#2A2623] ml-2 transition-colors border-b-2 border-[#7A0E2E]/20 hover:border-[#2A2623] pb-1">
              Secure Entry
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

