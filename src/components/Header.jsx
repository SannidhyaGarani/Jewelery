import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, Heart, ShoppingBag, User, Menu, X, ChevronDown 
} from 'lucide-react';

const LuxuryHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);

  // Handle Scroll Effects (Shrink & Background)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/shop', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const collections = ['Bridal', 'Everyday', 'Luxury', 'New Arrivals'];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 lg:px-12 
          ${isScrolled 
            ? 'py-3 bg-[#FAF9F6]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
            : 'py-8 bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LEFT: Mobile Menu Trigger */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="text-[#2B2B2B]">
              <Menu strokeWidth={1.2} />
            </button>
          </div>

          {/* LEFT: Desktop Logo (Scales on scroll) */}
          <motion.div 
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[#2B2B2B] hover:text-[#C6A769] transition-colors duration-500">
              VELOURAZ
            </Link>
          </motion.div>

          {/* CENTER: Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(true)}
                onMouseLeave={() => link.hasDropdown && setActiveDropdown(false)}
              >
                <Link 
                  to={link.href}
                  className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#2B2B2B] hover:text-[#C6A769] transition-colors duration-300 flex items-center gap-1"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-500" />}
                </Link>
                
                {/* Active/Hover Underline Animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C6A769] transition-all duration-500 group-hover:w-full" />

                {/* Dropdown Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full -left-4 pt-6"
                      >
                        <div className="bg-[#FAF9F6] border border-[#2B2B2B]/5 shadow-xl min-w-[200px] py-4 backdrop-blur-xl">
                          {collections.map((item) => (
                            <Link 
                              key={item} 
                              to={`/shop?category=${item}`} 
                              className="block px-8 py-3 text-[10px] tracking-[0.2em] uppercase text-[#2B2B2B]/70 hover:text-[#C6A769] hover:bg-white/50 transition-all duration-300"
                              onClick={() => setActiveDropdown(false)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT: Utility Icons */}
          <div className="flex items-center space-x-5 md:space-x-7">
            <button className="text-[#2B2B2B] hover:text-[#C6A769] hover:drop-shadow-[0_0_8px_rgba(198,167,105,0.3)] transition-all duration-300">
              <Search strokeWidth={1.2} size={20} />
            </button>
            <button className="hidden md:block text-[#2B2B2B] hover:text-[#C6A769] transition-all duration-300">
              <Heart strokeWidth={1.2} size={20} />
            </button>
            <button className="hidden md:block text-[#2B2B2B] hover:text-[#C6A769] transition-all duration-300">
              <User strokeWidth={1.2} size={20} />
            </button>
            <button className="relative text-[#2B2B2B] hover:text-[#C6A769] transition-all duration-300">
              <ShoppingBag strokeWidth={1.2} size={20} />
              <span className="absolute -top-1 -right-2 bg-[#C6A769] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[#FAF9F6] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-16">
                <span className="font-serif text-2xl tracking-[0.2em]">Velouraz</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X strokeWidth={1.2} />
                </button>
              </div>
              
              <nav className="space-y-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-2xl font-serif text-[#2B2B2B] hover:text-[#C6A769] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="border-t border-[#2B2B2B]/10 pt-8 space-y-4">
              <p className="text-[10px] tracking-[0.3em] uppercase opacity-50">Private Appointments</p>
              <p className="text-[10px] tracking-[0.3em] uppercase opacity-50">Find a Boutique</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LuxuryHeader;