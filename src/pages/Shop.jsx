import React, { useState, useEffect } from 'react';
import { db } from '../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Search, Heart, ShoppingBag, Eye, ArrowRight, ChevronDown, Filter, Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../components/useAuth';
import { useStore } from '../hooks/useStore';
import { doc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import QuickView from '../components/QuickView';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [cartLoadings, setCartLoadings] = useState({});
  const [wishlistLoadings, setWishlistLoadings] = useState({});
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryQuery = searchParams.get('category');
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const curatedProducts = [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const dbProducts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(dbProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(curatedProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const { addToCart, addToWishlist, isInCart, isInWishlist } = useStore();

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    setCartLoadings(prev => ({ ...prev, [product.id]: true }));
    try {
      await addToCart(product);
    } finally {
      setCartLoadings(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleAddToWishlist = async (e, product) => {
    e.stopPropagation();
    setWishlistLoadings(prev => ({ ...prev, [product.id]: true }));
    try {
      await addToWishlist(product);
    } finally {
      setWishlistLoadings(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const categories = ['All', 'Necklace', 'Earrings', 'Rings', 'Bracelet', 'Bangles', 'Bridal Wear', 'Anklets'];
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F8F4EF] pt-20 pb-32 font-sans relative overflow-hidden text-[#2A2623]">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#D8CBBE]/20 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#D8CBBE]/20 hidden lg:block" />
      
      {selectedProduct && <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-[#D8CBBE]/30 pb-16">
          <div className="space-y-6 text-center lg:text-left w-full lg:w-auto">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="block text-[10px] tracking-[0.6em] uppercase text-[#7B6D63] font-bold"
            >
              Exquisite Selection
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A2623] leading-tight tracking-tight"
            >
              <span className="text-[#7A0E2E] italic font-light block md:inline mb-2 md:mb-0">The</span> Inventory
            </motion.h1>
          </div>
          
          <div className="mt-12 lg:mt-0 flex flex-col lg:flex-row gap-12 items-center w-full lg:w-auto">
             {/* Category Nav */}
             <nav className="flex items-center gap-6 lg:gap-10 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[9px] tracking-[0.3em] uppercase transition-all duration-300 relative pb-2 flex-shrink-0 font-bold ${
                      selectedCategory === cat ? 'text-[#7A0E2E] border-b-2 border-[#7A0E2E]' : 'text-[#7B6D63]/50 hover:text-[#7A0E2E]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </nav>
             
             {/* Search */}
             <div className="relative group w-full lg:w-auto">
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7B6D63]/30 group-focus-within:text-[#7A0E2E] transition-colors" size={14} />
                <input 
                   type="text" 
                   placeholder="SEARCH COLLECTION" 
                   className="bg-transparent border-b border-[#D8CBBE]/50 pr-8 py-2 text-[10px] tracking-[0.3em] uppercase text-[#2A2623] outline-none focus:border-[#7A0E2E] transition-all w-full lg:w-48 font-bold placeholder:text-[#7B6D63]/30"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {[...Array(8)].map((_, i) => <div key={i} className="aspect-[3/4] bg-[#7A0E2E]/5 animate-pulse rounded-2xl border border-[#D8CBBE]/20" />)}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
                className="group cursor-pointer relative"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#F4EEE8] mb-8 relative border border-[#D8CBBE]/30 rounded-2xl transition-all duration-700 ease-out group-hover:shadow-[0_30px_60px_rgba(122,14,46,0.1)]">
                  <img 
                    src={product.image || product.images?.[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-[#2A2623]/0 group-hover:bg-[#2A2623]/5 transition-colors duration-500" />
                  
                  {/* Subtle actions */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 flex flex-col gap-4 z-20">
                     <button 
                       onClick={(e) => handleAddToWishlist(e, product)} 
                       disabled={wishlistLoadings[product.id]}
                       className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all border ${
                         isInWishlist(product.id) 
                         ? 'bg-[#7A0E2E] text-white border-[#7A0E2E]' 
                         : 'bg-white/90 text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white border-white/20 shadow-lg'
                       }`}
                     >
                        {wishlistLoadings[product.id] ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Heart size={16} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        )}
                     </button>
                     <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white transition-all border border-white/20 shadow-lg">
                        <Eye size={16} strokeWidth={1.5} />
                     </button>
                  </div>

                  {/* Add to Cart Overlay Button */}
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                     <button 
                       onClick={(e) => product.stock > 0 && handleAddToCart(e, product)}
                       disabled={product.stock <= 0 || cartLoadings[product.id]}
                       className={`w-full py-4 text-[10px] tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-3 transition-all rounded-xl shadow-xl ${
                         product.stock <= 0
                         ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-100'
                         : isInCart(product.id) 
                         ? 'bg-[#7A0E2E] text-white' 
                         : 'bg-[#2A2623] text-white hover:bg-[#7A0E2E] border-none'
                       }`}
                     >
                        {cartLoadings[product.id] ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <ShoppingBag size={14} />
                        )}
                        {product.stock <= 0 ? 'Out of Stock' : isInCart(product.id) ? 'Added to Cart' : 'Acquire Piece'}
                     </button>
                  </div>
                  {product.stock <= 0 && (
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-[#7A0E2E] text-white text-[8px] tracking-[0.3em] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 px-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                     <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#7B6D63] mb-1">{product.brand || "Velouraz Atelier"}</p>
                     <h3 className="font-serif text-xl text-[#2A2623] group-hover:text-[#7A0E2E] transition-colors duration-300">{product.name}</h3>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                     <p className="text-base font-medium text-[#7A0E2E]">₹{Number(product.price).toLocaleString()}</p>
                     {product.original_price > product.price && (
                        <p className="text-sm text-[#7B6D63]/50 line-through">₹{Number(product.original_price).toLocaleString()}</p>
                     )}
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 border-t border-[#D8CBBE]/30">
                     <button className="text-[9px] tracking-[0.4em] uppercase text-[#7A0E2E] flex items-center gap-3 font-bold group/btn mx-auto">
                        View Details <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-[#D8CBBE]/30 bg-[#F4EEE8]/40 rounded-[40px]">
             <p className="font-serif text-3xl italic text-[#7B6D63]/30 mb-8">No pieces found matching your criteria</p>
             <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="text-[11px] tracking-[0.4em] uppercase text-[#7A0E2E] border-b-2 border-[#7A0E2E] pb-2 font-bold">View All Pieces</button>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};


export default Shop;