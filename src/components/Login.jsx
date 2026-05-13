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
    <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center px-4 py-20 relative overflow-hidden selection:bg-[#640D14] selection:text-white">
      {/* Refined Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#640D14]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#640D14]/3 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] bg-white rounded-[40px] border border-[#640D14]/10 shadow-[0_32px_80px_rgba(100,13,20,0.08)] p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-[#640D14] rounded-2xl text-white mb-8 shadow-lg shadow-[#640D14]/20"
          >
            <Sparkles size={24} />
          </motion.div>
          <h2 className="text-4xl font-serif text-[#2C1A0E] tracking-tight leading-none mb-3 font-bold">
            Welcome <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-[#640D14] lowercase text-5xl ml-1">Back</span>
          </h2>
          <p className="text-[#5C3D1E]/40 font-sans text-[10px] tracking-[0.4em] uppercase font-bold">The Atelier Awaits</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#5C3D1E]/40 ml-4">Email Credentials</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#5C3D1E]/20 group-focus-within:text-[#640D14] transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="excellence@velouraz.com"
                className="w-full pl-14 pr-6 py-4.5 rounded-[20px] bg-[#FDFAF5] border border-[#640D14]/10 focus:border-[#640D14] outline-none transition-all font-sans text-[#2C1A0E] placeholder:text-[#5C3D1E]/20 text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#5C3D1E]/40">Secret Password</label>
              <button type="button" className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#640D14]/60 hover:text-[#2C1A0E] transition-colors">Forgot?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#5C3D1E]/20 group-focus-within:text-[#640D14] transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4.5 rounded-[20px] bg-[#FDFAF5] border border-[#640D14]/10 focus:border-[#640D14] outline-none transition-all font-sans text-[#2C1A0E] placeholder:text-[#5C3D1E]/20 text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-4.5 rounded-[20px] bg-[#640D14] text-white font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-[#2C1A0E] transition-all transform active:scale-[0.98] shadow-xl shadow-[#640D14]/10 flex items-center justify-center gap-3 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Enter Boutique
                <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-[#640D14]/5 text-center">
          <p className="text-[10px] text-[#5C3D1E]/40 font-bold tracking-widest uppercase">
            New to the legacy?{" "}
            <Link to="/signup" className="text-[#640D14] font-black hover:text-[#2C1A0E] ml-1 transition-colors border-b border-[#640D14]/20 hover:border-[#2C1A0E]">
              Apply Here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

