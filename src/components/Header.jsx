import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Menu, X, MessageSquare, Sparkles, ShoppingBag, Heart, User } from 'lucide-react';
import { useAuth } from './useAuth';
import { useStore } from '../hooks/useStore';

const LuxuryHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cartCount, wishlistCount } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SHOP', href: '/shop' },
    { name: 'CATEGORY', href: '/shop', dropdown: [
      { name: 'Necklaces', href: '/shop?category=necklaces' },
      { name: 'Rings', href: '/shop?category=rings' },
      { name: 'Earrings', href: '/shop?category=earrings' },
      { name: 'Bracelets', href: '/shop?category=bracelets' },
      { name: 'Watches', href: '/shop?category=watches' },
    ]},
    { name: 'CONTACT', href: '/contact' },
  ];

  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md border-white/10 shadow-lg' 
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Top Header Bar */}
        <motion.div 
          layout
          className="flex items-center justify-between px-4 lg:px-10 relative"
          style={{ height: isScrolled ? '70px' : '90px' }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          
          {/* Left Actions */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              <button 
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileMenuOpen(true);
                  } else {
                    setIsDesktopMenuOpen(!isDesktopMenuOpen);
                  }
                }}
                className="flex items-center gap-3 group"
              >
                <div className={`border rounded-full p-2.5 transition-all duration-500 ${isDesktopMenuOpen ? 'border-accent bg-accent text-white' : 'border-white/10 group-hover:border-accent/50 text-white'}`}>
                  {isDesktopMenuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
                </div>
                <span className="text-[10px] tracking-[0.25em] font-bold uppercase font-sans hidden sm:block text-neutral-400 group-hover:text-white transition-colors">
                  {isDesktopMenuOpen ? 'Close' : 'Menu'}
                </span>
              </button>

              {/* Desktop Popup Dropdown */}
              <AnimatePresence>
                {isDesktopMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 15, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full mt-4 w-[280px] bg-[#111] rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.5)] border border-white/10 p-8 z-[60]"
                  >
                    <div className="flex flex-col space-y-6">
                      {navLinks.map((link) => (
                        <div key={link.name} className="flex flex-col gap-4">
                          <Link 
                            to={link.href}
                            onClick={() => setIsDesktopMenuOpen(false)}
                            className="text-[11px] tracking-[0.25em] font-bold uppercase text-white hover:text-accent transition-colors"
                          >
                            {link.name}
                          </Link>
                          {link.dropdown && (
                            <div className="pl-4 flex flex-col gap-3 border-l border-white/5">
                              {link.dropdown.map(sub => (
                                <Link 
                                  key={sub.name}
                                  to={sub.href}
                                  onClick={() => setIsDesktopMenuOpen(false)}
                                  className="text-[9px] tracking-[0.2em] font-bold uppercase text-white/40 hover:text-accent transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="py-2">
                        <Link 
                          to="/contact"
                          onClick={() => setIsDesktopMenuOpen(false)}
                          className="flex items-center justify-center gap-3 bg-neutral-50 border border-neutral-100 rounded-full py-4 text-[10px] tracking-[0.3em] font-bold uppercase text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-500"
                        >
                          <Sparkles size={12} className="text-accent" />
                          Join the Club
                          <Sparkles size={12} className="text-accent" />
                        </Link>
                      </div>

                      <div className="flex flex-col space-y-4 pt-4 border-t border-neutral-50">
                        <Link to="/login" onClick={() => setIsDesktopMenuOpen(false)} className="text-[9px] tracking-[0.2em] font-bold uppercase text-neutral-400 hover:text-neutral-900 transition-colors">Sign In</Link>
                        <button onClick={() => setIsDesktopMenuOpen(false)} className="text-[9px] tracking-[0.2em] font-bold uppercase text-neutral-400 hover:text-neutral-900 transition-colors text-left">Search</button>
                        <button onClick={() => setIsDesktopMenuOpen(false)} className="text-[9px] tracking-[0.2em] font-bold uppercase text-neutral-400 hover:text-neutral-900 transition-colors text-left">Newsletter</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button className="flex items-center gap-2 group hidden md:flex transition-opacity hover:opacity-100">
              <div className="border border-white/20 rounded-full p-2.5 group-hover:border-accent transition-colors">
                <Search size={16} strokeWidth={1.5} className="text-white group-hover:text-accent transition-colors" />
              </div>
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex flex-col items-center flex-1 lg:flex-none">
            <Link to="/" className="flex flex-col items-center gap-1 group">
              <h1 className="font-serif text-3xl md:text-4xl text-accent tracking-tight font-normal">
                Velouraz
              </h1>
              <AnimatePresence>
                {!isScrolled && (
                  <motion.span 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/70 font-bold hidden md:block"
                  >
                    Atelier de Luxe
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center justify-end gap-6 flex-1">
            <div className="flex items-center gap-4">
              <Link to="/wishlist" className="p-2.5 border border-white/10 rounded-full text-white hover:text-accent hover:border-accent transition-all relative group">
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2.5 border border-white/10 rounded-full text-white hover:text-accent hover:border-accent transition-all relative group">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <Link to="/account" className="flex items-center gap-3 p-1.5 pr-5 border border-accent/30 rounded-full bg-accent/10 hover:bg-accent/20 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center">
                    <User size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] font-black uppercase text-accent group-hover:text-white transition-colors hidden lg:block">
                    {user.displayName?.split(' ')[0] || 'Member'}
                  </span>
                </Link>
              ) : (
                <Link to="/login" className="p-2.5 border border-white/10 rounded-full text-white hover:text-accent hover:border-accent transition-all relative group">
                  <User size={18} strokeWidth={1.5} />
                </Link>
              )}
            </div>
            
            <Link to="/contact" className="sm:hidden border border-white/10 rounded-full p-2.5">
               <MessageSquare size={16} strokeWidth={1.5} className="text-white" />
            </Link>
          </div>
        </motion.div>

        {/* Sub Navigation Bar */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden lg:flex justify-center items-center pb-6 space-x-12"
            >
               {navLinks.map((link) => (
                 <div 
                   key={link.name} 
                   className="relative group"
                   onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                   onMouseLeave={() => setActiveDropdown(null)}
                 >
                   <Link 
                     to={link.href}
                     className="text-[9px] tracking-[0.3em] font-bold uppercase font-sans text-white hover:text-accent transition-all relative block py-2"
                   >
                     {link.name}
                     <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-accent group-hover:w-full group-hover:left-0 transition-all duration-300" />
                   </Link>

                   {/* Sub-dropdown */}
                   {link.dropdown && (
                     <AnimatePresence>
                       {activeDropdown === link.name && (
                         <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: 10 }}
                           className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-[70]"
                         >
                           <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                             <div className="grid grid-cols-1 gap-1">
                               {link.dropdown.map(sub => (
                                 <Link
                                   key={sub.name}
                                   to={sub.href}
                                   onClick={() => setActiveDropdown(null)}
                                   className="group/item flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
                                 >
                                   <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-white/50 group-hover/item:text-white transition-colors">
                                     {sub.name}
                                   </span>
                                   <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover/item:opacity-100 transition-all scale-0 group-hover/item:scale-100" />
                                 </Link>
                               ))}
                             </div>
                             
                             <div className="mt-4 pt-4 border-t border-white/5">
                               <Link 
                                 to="/shop" 
                                 onClick={() => setActiveDropdown(null)}
                                 className="text-[8px] tracking-[0.3em] font-black uppercase text-accent hover:text-white transition-colors block text-center"
                               >
                                 View All Collections
                               </Link>
                             </div>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   )}
                 </div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating Chat Icon */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] bg-white border border-neutral-200 rounded-full p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300"
      >
         <MessageSquare size={20} strokeWidth={1.2} className="text-accent" />
      </motion.button>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-neutral-100">
              <span className="font-serif text-2xl text-neutral-900">Velouraz</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="border border-neutral-200 rounded-full p-2.5"
              >
                <X strokeWidth={1.5} size={20} className="text-neutral-900" />
              </button>
            </div>
            
            <div className="p-8 flex flex-col space-y-10 flex-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="space-y-4"
                >
                  <Link 
                    to={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-serif text-neutral-900 block"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-6 flex flex-col gap-4 border-l-2 border-accent/20">
                      {link.dropdown.map(sub => (
                        <Link 
                          key={sub.name}
                          to={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-sans font-medium text-neutral-500 hover:text-accent transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-8 pt-10 mt-auto border-t border-neutral-100"
              >
                 <div className="grid grid-cols-3 gap-4">
                    <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-3 p-6 bg-neutral-50 rounded-3xl group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-accent transition-colors shadow-sm">
                        <Heart size={24} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Wishlist</span>
                    </Link>
                    <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-3 p-6 bg-neutral-50 rounded-3xl group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-accent transition-colors shadow-sm">
                        <ShoppingBag size={24} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Cart ({cartCount})</span>
                    </Link>
                    <Link to={user ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-3 p-6 bg-neutral-50 rounded-3xl group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-accent transition-colors shadow-sm">
                        <User size={24} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{user ? "Profile" : "Sign In"}</span>
                    </Link>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LuxuryHeader;