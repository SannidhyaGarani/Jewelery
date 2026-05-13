import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Menu, X, MessageSquare, ShoppingBag, Heart, User } from 'lucide-react';
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
      { name: 'Necklace', href: '/shop?category=necklace' },
      { name: 'Rings', href: '/shop?category=rings' },
      { name: 'Earrings', href: '/shop?category=earrings' },
      { name: 'Bracelet', href: '/shop?category=bracelet' },
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
            ? 'bg-[#FDFAF5]/95 backdrop-blur-md border-[#C9A96E]/20 shadow-[0_4px_30px_rgba(44,26,14,0.05)]' 
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
          <div className="flex items-center gap-3 md:gap-4 flex-1">
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
                <div className={`border rounded-full p-2 md:p-2.5 transition-all duration-500 ${isDesktopMenuOpen ? 'border-[#640D14] bg-[#640D14] text-white' : 'border-[#2C1A0E]/10 group-hover:border-[#640D14]/50 text-[#2C1A0E]'}`}>
                  {isDesktopMenuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
                </div>
                <span className={`text-[10px] tracking-[0.25em] font-bold uppercase font-sans hidden xl:block transition-colors ${isScrolled ? 'text-[#5C3D1E]/60' : 'text-[#2C1A0E]/40'} group-hover:text-[#640D14]`}>
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
                    className="absolute left-0 top-full mt-4 w-[280px] bg-[#FDFAF5] rounded-3xl shadow-[0_30px_90px_rgba(44,26,14,0.15)] border border-[#C9A96E]/20 p-8 z-[60] hidden lg:block"
                  >
                    <div className="flex flex-col space-y-6">
                      {navLinks.map((link) => (
                        <div key={link.name} className="flex flex-col gap-4">
                          <Link 
                            to={link.href}
                            onClick={() => setIsDesktopMenuOpen(false)}
                            className="text-[11px] tracking-[0.25em] font-bold uppercase text-[#2C1A0E] hover:text-[#640D14] transition-colors"
                          >
                            {link.name}
                          </Link>
                          {link.dropdown && (
                            <div className="pl-4 flex flex-col gap-3 border-l border-[#640D14]/10">
                              {link.dropdown.map(sub => (
                                <Link 
                                  key={sub.name}
                                  to={sub.href}
                                  onClick={() => setIsDesktopMenuOpen(false)}
                                  className="text-[9px] tracking-[0.2em] font-bold uppercase text-[#5C3D1E]/40 hover:text-[#640D14] transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button className="flex items-center gap-2 group hidden lg:flex transition-opacity hover:opacity-100">
              <div className="border border-[#2C1A0E]/10 rounded-full p-2.5 group-hover:border-[#640D14] transition-colors">
                <Search size={16} strokeWidth={1.5} className="text-[#2C1A0E] group-hover:text-[#640D14] transition-colors" />
              </div>
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex flex-col items-center flex-1 lg:flex-none">
            <Link to="/" className="flex flex-col items-center gap-1 group text-center">
              <img 
                src="/img/logo.png" 
                alt="Velouraz" 
                className={`transition-all duration-500 object-contain w-auto brightness-[0.2] ${isScrolled ? 'h-11' : 'h-14'}`} 
              />
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center justify-end gap-2 md:gap-6 flex-1">
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/wishlist" className="p-2 md:p-2.5 border border-[#2C1A0E]/10 rounded-full text-[#2C1A0E] hover:text-[#640D14] hover:border-[#640D14] transition-all relative group hidden sm:flex">
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#640D14] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2 md:p-2.5 border border-[#2C1A0E]/10 rounded-full text-[#2C1A0E] hover:text-[#640D14] hover:border-[#640D14] transition-all relative group">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#640D14] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <Link to="/account" className="flex items-center gap-2 p-1 md:p-1.5 md:pr-5 border border-[#640D14]/30 rounded-full bg-[#640D14]/5 hover:bg-[#640D14]/10 transition-all group">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#640D14] text-white flex items-center justify-center">
                    <User size={14} md:size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] font-black uppercase text-[#640D14] group-hover:text-[#640D14]/80 transition-colors hidden lg:block">
                    {user.displayName?.split(' ')[0] || 'Member'}
                  </span>
                </Link>
              ) : (
                <Link to="/login" className="p-2 md:p-2.5 border border-[#2C1A0E]/10 rounded-full text-[#2C1A0E] hover:text-[#640D14] hover:border-[#640D14] transition-all relative group">
                  <User size={18} strokeWidth={1.5} />
                </Link>
              )}
            </div>
            
            <Link to="/contact" className="hidden sm:flex lg:hidden border border-[#2C1A0E]/10 rounded-full p-2 md:p-2.5 hover:border-[#640D14] transition-colors">
               <MessageSquare size={16} strokeWidth={1.5} className="text-[#2C1A0E]" />
            </Link>
          </div>
        </motion.div>

        {/* Sub Navigation Bar - Only for Desktop */}
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
                     className="text-[9px] tracking-[0.3em] font-bold uppercase font-sans text-[#2C1A0E]/70 hover:text-accent transition-all relative block py-2"
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
                           <div className="bg-[#FDFAF5] backdrop-blur-xl rounded-2xl border border-[#C9A96E]/20 p-6 shadow-[0_20px_50px_rgba(44,26,14,0.1)]">
                             <div className="grid grid-cols-1 gap-1">
                               {link.dropdown.map(sub => (
                                 <Link
                                   key={sub.name}
                                   to={sub.href}
                                   onClick={() => setActiveDropdown(null)}
                                   className="group/item flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#F5EDD8] transition-all"
                                 >
                                   <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#5C3D1E]/60 group-hover/item:text-[#2C1A0E] transition-colors">
                                     {sub.name}
                                   </span>
                                   <div className="w-1.5 h-1.5 rounded-full bg-[#640D14] opacity-0 group-hover/item:opacity-100 transition-all scale-0 group-hover/item:scale-100" />
                                 </Link>
                               ))}
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

      {/* Floating Chat Icon - Desktop Only */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] bg-[#FDFAF5] border border-[#C9A96E]/20 rounded-full p-4 shadow-[0_20px_50px_rgba(44,26,14,0.1)] hover:shadow-xl transition-all duration-300 hidden md:block"
      >
         <MessageSquare size={20} strokeWidth={1.2} className="text-accent" />
      </motion.button>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#FDFAF5] flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-[#C9A96E]/10 bg-[#FDFAF5]/80 backdrop-blur-xl">
              <img src="/img/logo.png" alt="Velouraz" className="h-10 brightness-[0.2]" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="border border-[#C9A96E]/20 rounded-full p-2.5 text-[#2C1A0E] bg-white/50"
              >
                <X strokeWidth={1.5} size={24} />
              </button>
            </div>
            
            <div className="p-8 flex flex-col space-y-8 flex-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="space-y-4"
                >
                  <Link 
                    to={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-serif text-[#2C1A0E] hover:text-accent transition-colors block"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-6 flex flex-col gap-4 border-l border-[#C9A96E]/10">
                      {link.dropdown.map(sub => (
                        <Link 
                          key={sub.name}
                          to={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-sans font-medium text-[#5C3D1E]/40 hover:text-accent transition-colors"
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
                className="flex flex-col gap-8 pt-10 mt-auto border-t border-[#C9A96E]/10"
              >
                 <div className="grid grid-cols-3 gap-4">
                    <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-3 p-4 bg-[#F5EDD8]/50 rounded-2xl group border border-[#C9A96E]/10">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2C1A0E]/30 group-hover:text-accent transition-colors">
                        <Heart size={20} />
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#5C3D1E]/40">Wishlist</span>
                    </Link>
                    <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-3 p-4 bg-[#F5EDD8]/50 rounded-2xl group border border-[#C9A96E]/10">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2C1A0E]/30 group-hover:text-accent transition-colors">
                        <ShoppingBag size={20} />
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#5C3D1E]/40">Cart ({cartCount})</span>
                    </Link>
                    <Link to={user ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-3 p-4 bg-[#F5EDD8]/50 rounded-2xl group border border-[#C9A96E]/10">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2C1A0E]/30 group-hover:text-accent transition-colors">
                        <User size={20} />
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#5C3D1E]/40">{user ? "Profile" : "Sign In"}</span>
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