import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, Heart, User, ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useAuth } from './useAuth';
import { useStore } from '../hooks/useStore';

const LuxuryHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState(null);
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
    { 
      name: 'Collections', 
      href: '/shop', 
      megaMenu: {
        sections: [
          {
            title: 'JEWELLERY SETS',
            icon: '𝓥',
            items: ['Kundan Sets', 'Polki Sets', 'American Diamond Sets', 'Temple Jewellery Sets', 'Minimal Sets']
          },
          {
            title: 'EARRINGS',
            icon: '❂',
            items: ['Stud Earrings', 'Jhumka', 'Hoops', 'Chandbali', 'Drop Earrings']
          },
          {
            title: 'NECKLACES',
            icon: '◇',
            items: ['Choker Necklaces', 'Short Necklaces', 'Long Necklaces', 'Layered Necklaces', 'Pendant Necklaces']
          },
          {
            title: 'RINGS',
            icon: '○',
            items: ['Statement Rings', 'Adjustable Rings', 'Cocktail Rings', 'Stacking Rings', 'Band Rings']
          },
          {
            title: 'BANGLES',
            icon: '◎',
            items: ['Kada Bangles', 'Stone Bangles', 'Lac Bangles', 'Gold Plated Bangles', 'Pearl Bangles']
          },
          {
            title: 'ANKLETS',
            icon: '✧',
            items: ['Charms Anklets', 'Beaded Anklets', 'Chain Anklets', 'Oxidised Anklets', 'Minimal Anklets']
          }
        ],
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
        tagline: 'TIMELESS BEAUTY',
        heading: 'Crafted to Be Cherished'
      }
    },
    { 
      name: 'World Edit', 
      href: '/world-edit',
      megaMenu: {
        sections: [
          {
            title: 'KOREAN EDIT',
            icon: '⛩',
            items: ['Pearl Collection', 'Minimal Luxe', 'Crystal Drops', 'Layered Necklaces', 'Statement Earrings']
          },
          {
            title: 'TURKISH EDIT',
            icon: '🕌',
            items: ['Evil Eye Collection', 'Oxidised Silver', 'Teardrop Earrings', 'Enamel Jewellery', 'Layered Necklaces']
          },
          {
            title: 'INDIAN EDIT',
            icon: '◈',
            items: ['Kundan Jewellery', 'Polki Sets', 'Temple Jewels', 'Meenakari Collection', 'Jadau Jewellery']
          },
          {
            title: 'ARABIAN EDIT',
            icon: '☽',
            items: ['Statement Sets', 'Gold Plated', 'Coin Jewellery', 'Chunky Chains', 'Dangle Earrings']
          },
          {
            title: 'EUROPEAN EDIT',
            icon: '⚜',
            items: ['Minimal Gold', 'Pearl Jewellery', 'Sleek Rings', 'Hoop Earrings', 'Tennis Bracelets']
          },
          {
            title: 'THAI EDIT',
            icon: '❋',
            items: ['Beaded Jewellery', 'Handcrafted Silver', 'Color Stone Earrings', 'Floral Motifs', 'Boho Necklaces']
          }
        ],
        image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800',
        tagline: 'BEAUTY HAS NO BOUNDARIES',
        heading: 'Jewellery Inspired by Cultures, Crafted for You.'
      }
    },
    { 
      name: 'The Edit', 
      href: '/the-edit',
      megaMenu: {
        sections: [
          {
            title: 'TRENDING LUXE',
            icon: '✧',
            items: ['Statement Pieces', 'Korean Luxe', 'Minimal Gold', 'Pearl Trends', 'Layered Looks']
          },
          {
            title: 'BEST SELLERS',
            icon: '♡',
            items: ['Top Rated', 'Customer Favorites', 'Most Loved Earrings', 'Most Loved Necklaces', 'Most Loved Sets']
          }
        ],
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
        tagline: 'Curated Picks, Loved by Many',
        heading: 'HANDPICKED. TRENDING. TIMELESS.'
      }
    },
    { name: 'Journal', href: '/journal' },
    { name: 'Our Story', href: '/about' },
    { name: 'Exclusive Offers', href: '/offers' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#7A0E2E] py-2 px-4 text-center">
        <p className="text-[#FFFDF9] text-[10px] md:text-xs tracking-[0.1em] font-medium">
          ✨ Free Shipping Across India | Use Code: <span className="font-bold">VEL5</span> for 5% OFF on your first order
        </p>
      </div>

      <header 
        className={`w-full z-50 transition-all duration-300 bg-[#F8F4EF] sticky top-0 ${
          isScrolled ? 'shadow-lg py-1' : 'py-0'
        }`}
      >
        {/* Main Header */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-16 md:h-20 lg:h-24 flex items-center justify-between border-b border-[#D8CBBE]/30">
          {/* Left: Menu & Search */}
          <div className="flex items-center gap-2 md:gap-6 flex-1">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#2A2623] hover:text-[#7A0E2E] transition-colors"
            >
              <Menu size={20} md:size={24} strokeWidth={1.5} />
            </button>
            
            <div className="hidden lg:flex items-center gap-4">
              <button className="flex items-center gap-3 group">
                <div className="p-2.5 border border-[#D8CBBE] rounded-full group-hover:bg-[#7A0E2E] group-hover:border-[#7A0E2E] group-hover:text-[#FFFDF9] transition-all duration-500 shadow-sm">
                  <Menu size={16} strokeWidth={1.5} />
                </div>
              </button>
              <button className="flex items-center gap-3 group">
                <div className="p-2.5 border border-[#D8CBBE] rounded-full group-hover:bg-[#7A0E2E] group-hover:border-[#7A0E2E] group-hover:text-[#FFFDF9] transition-all duration-500 shadow-sm">
                  <Search size={16} strokeWidth={1.5} />
                </div>
              </button>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="transition-transform duration-500 hover:scale-105">
              <img 
                src="/img/logo.png" 
                alt="Velouraz" 
                className="h-10 md:h-14 lg:h-18 object-contain brightness-0" 
              />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-1 md:gap-4 lg:gap-6 flex-1">
            <Link to="/wishlist" className="p-2 text-[#2A2623] hover:text-[#7A0E2E] transition-all duration-300 relative group hidden sm:block">
              <Heart size={20} lg:size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#7A0E2E] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <div className="hidden md:block">
              {user ? (
                <Link to="/account" className="p-2 text-[#2A2623] hover:text-[#7A0E2E] transition-all duration-300 group">
                  <User size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                </Link>
              ) : (
                <Link to="/login" className="p-2 text-[#2A2623] hover:text-[#7A0E2E] transition-all duration-300 group">
                  <User size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                </Link>
              )}
            </div>

            <Link to="/cart" className="p-2 text-[#2A2623] hover:text-[#7A0E2E] transition-all duration-300 relative group">
              <ShoppingBag size={20} lg:size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#7A0E2E] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom: Desktop Navigation */}
        <nav className="hidden lg:block border-b border-[#D8CBBE]/30">
          <div className="max-w-[1440px] mx-auto flex justify-center relative">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="static"
                onMouseEnter={() => setActiveMegaMenu(link.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link 
                  to={link.href}
                  className={`px-8 py-5 text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-300 flex items-center gap-2 relative ${
                    activeMegaMenu === link.name ? 'text-[#7A0E2E]' : 'text-[#7B6D63]'
                  }`}
                >
                  {link.name}
                  {link.megaMenu && <ChevronDown size={12} className={`transition-transform duration-300 ${activeMegaMenu === link.name ? 'rotate-180' : ''}`} />}
                  {/* Underline */}
                  {activeMegaMenu === link.name && (
                    <motion.div 
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#7A0E2E]"
                      layoutId="navUnderline"
                    />
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeMegaMenu === link.name && link.megaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 w-full bg-[#FDFAF5] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border-t border-[#D8CBBE]/40 z-[100]"
                    >
                      <div className="max-w-[1440px] mx-auto flex h-[420px]">
                        {/* Links Sections */}
                        <div className="flex-1 py-8 px-10 overflow-y-auto no-scrollbar">
                          <div className={`grid gap-x-10 gap-y-8 ${
                            link.megaMenu.sections.length <= 2 ? 'grid-cols-2' :
                            link.megaMenu.sections.length <= 3 ? 'grid-cols-3' : 'grid-cols-3'
                          }`}>
                            {link.megaMenu.sections.map((section, idx) => (
                              <div key={idx} className="space-y-4">
                                {/* Category Header with Icon */}
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl font-light text-[#7A0E2E] opacity-80 leading-none">
                                    {section.icon || '✦'}
                                  </span>
                                  <h4 className="text-[11px] tracking-[0.2em] font-bold text-[#7A0E2E] uppercase">
                                    {section.title}
                                  </h4>
                                </div>
                                {/* Items */}
                                <ul className="space-y-2.5 pl-[2.25rem]">
                                  {section.items.map((item, i) => (
                                    <li key={i}>
                                      <Link 
                                        to={`${link.href}?item=${item.toLowerCase().replace(/ /g, '-')}`}
                                        className="text-[15px] text-[#2A2623]/80 hover:text-[#7A0E2E] transition-colors duration-300 font-serif block"
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                  {/* Shop All Link */}
                                  <li className="pt-1">
                                    <Link 
                                      to={`${link.href}?category=${section.title.toLowerCase().replace(/ /g, '-')}`}
                                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#7A0E2E] hover:text-[#5E0B24] transition-colors"
                                    >
                                      Shop all <ArrowRight size={13} strokeWidth={2.5} />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Image/Promo Section */}
                        <div className="w-[400px] relative overflow-hidden group border-l border-[#D8CBBE]/30 flex-shrink-0">
                          <img 
                            src={link.megaMenu.image} 
                            alt={link.name} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/70 via-[#1A1816]/10 to-transparent flex flex-col justify-end p-10">
                            <span className="text-[10px] tracking-[0.4em] font-bold text-white/80 uppercase mb-3">
                              {link.megaMenu.tagline}
                            </span>
                            <h3 className="text-3xl font-serif text-white mb-6 leading-snug italic">
                              {link.megaMenu.heading}
                            </h3>
                            <Link 
                              to={link.href}
                              className="inline-flex items-center gap-3 bg-[#7A0E2E] text-white px-7 py-3.5 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-[#5E0B24] transition-all duration-500 w-fit shadow-lg"
                            >
                              Explore Collections
                            </Link>
                          </div>

                          {/* Navigation Arrows */}
                          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#2A2623] hover:bg-white transition-colors z-10">
                            <ChevronLeft size={18} />
                          </button>
                          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#2A2623] hover:bg-white transition-colors z-10">
                            <ChevronRight size={18} />
                          </button>

                          {/* Pagination Dots */}
                          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            className="fixed inset-0 z-[100] bg-[#F8F4EF] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-[#D8CBBE]/30">
              <img src="/img/logo.png" alt="Velouraz" className="h-10 brightness-0" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 border border-[#D8CBBE] rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-[#D8CBBE]/20 last:border-0">
                  <div 
                    className="flex justify-between items-center py-5 cursor-pointer"
                    onClick={() => {
                      if (link.megaMenu) {
                        setMobileExpandedItem(mobileExpandedItem === link.name ? null : link.name);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    {link.megaMenu ? (
                      <span className="text-xl font-serif text-[#2A2623]">{link.name}</span>
                    ) : (
                      <Link 
                        to={link.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xl font-serif text-[#2A2623]"
                      >
                        {link.name}
                      </Link>
                    )}
                    {link.megaMenu && (
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform duration-300 ${mobileExpandedItem === link.name ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </div>
                  
                  {/* Mobile Submenu Accordion */}
                  <AnimatePresence>
                    {mobileExpandedItem === link.name && link.megaMenu && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-[#F4EEE8]/50 rounded-xl mb-4"
                      >
                        <div className="p-5 space-y-8">
                          {link.megaMenu.sections.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                              <h4 className="text-[10px] tracking-[0.2em] font-bold text-[#7A0E2E] uppercase">
                                {section.title}
                              </h4>
                              <ul className="space-y-3 pl-2">
                                {section.items.map((item, i) => (
                                  <li key={i}>
                                    <Link 
                                      to={`${link.href}?item=${item.toLowerCase().replace(/ /g, '-')}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="text-sm text-[#7B6D63] font-serif block"
                                    >
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile Actions Footer */}
            <div className="p-8 bg-[#F4EEE8] border-t border-[#D8CBBE]/30">
              <div className="flex justify-around items-center">
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2">
                  <Heart size={20} className="text-[#2A2623]" />
                  <span className="text-[9px] tracking-widest uppercase text-[#7B6D63]">Wishlist</span>
                </Link>
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2">
                  <User size={20} className="text-[#2A2623]" />
                  <span className="text-[9px] tracking-widest uppercase text-[#7B6D63]">Profile</span>
                </Link>
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2">
                  <ShoppingBag size={20} className="text-[#2A2623]" />
                  <span className="text-[9px] tracking-widest uppercase text-[#7B6D63]">Cart</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LuxuryHeader;
