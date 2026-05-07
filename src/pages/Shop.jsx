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
    <div className="min-h-screen bg-[#0A0A0A] pt-48 pb-32 font-sans relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-white/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-white/5 hidden lg:block" />
      
      {selectedProduct && <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-white/10 pb-16">
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="block text-[10px] tracking-[0.6em] uppercase text-white/40"
            >
              Exquisite Selection
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-accent leading-tight tracking-tight"
            >
              <span style={{fontFamily: "var(--font-script)", fontWeight: 100}} className="text-5xl md:text-6xl lg:text-7xl block md:inline mb-2 md:mb-0 text-accent/80">The</span> Inventory
            </motion.h1>
          </div>
          
          <div className="mt-12 lg:mt-0 flex flex-col lg:flex-row gap-12 items-center">
             {/* Category Nav */}
             <nav className="flex items-center gap-10">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 relative pb-2 ${
                      selectedCategory === cat ? 'text-accent border-b border-accent' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </nav>
             
             {/* Search */}
             <div className="relative group">
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={14} />
                <input 
                   type="text" 
                   placeholder="SEARCH COLLECTION" 
                   className="bg-transparent border-b border-white/20 pr-8 py-2 text-[10px] tracking-[0.3em] uppercase text-white outline-none focus:border-accent transition-all w-48 font-bold"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {[...Array(8)].map((_, i) => <div key={i} className="aspect-[3/4] bg-white/[0.05] animate-pulse rounded-sm" />)}
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
                <div className="aspect-[3/4] overflow-hidden bg-[#111] mb-8 relative luxury-card border border-white/5 rounded-sm">
                  <img 
                    src={product.image || product.images?.[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  {/* Subtle actions */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-4">
                     <button 
                       onClick={(e) => handleAddToWishlist(e, product)} 
                       disabled={wishlistLoadings[product.id]}
                       className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors border ${
                         isInWishlist(product.id) 
                         ? 'bg-accent text-white border-accent' 
                         : 'bg-black/40 text-white hover:text-accent border-white/10'
                       }`}
                     >
                        {wishlistLoadings[product.id] ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Heart size={14} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        )}
                     </button>
                     <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-accent transition-colors border border-white/10">
                        <Eye size={14} strokeWidth={1.5} />
                     </button>
                  </div>

                  {/* Add to Cart Overlay Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                     <button 
                       onClick={(e) => product.stock > 0 && handleAddToCart(e, product)}
                       disabled={product.stock <= 0 || cartLoadings[product.id]}
                       className={`w-full py-3 rounded-full text-[9px] tracking-[0.3em] font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                         product.stock <= 0
                         ? 'bg-red-900/50 text-white cursor-not-allowed border border-red-500/30'
                         : isInCart(product.id) 
                         ? 'bg-accent text-white' 
                         : 'bg-white text-black hover:bg-accent hover:text-white'
                       }`}
                     >
                        {cartLoadings[product.id] && <Loader2 size={12} className="animate-spin" />}
                        {product.stock <= 0 ? 'Out of Stock' : isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                     </button>
                  </div>
                  {product.stock <= 0 && (
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-red-600 text-white text-[8px] tracking-[0.2em] font-black uppercase px-2 py-1 rounded-sm shadow-xl">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start">
                     <h3 className="font-serif text-xl tracking-wide text-white group-hover:text-accent transition-colors">{product.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">{product.category}</p>
                     <div className="flex items-center gap-3">
                        <p className="font-serif text-lg text-accent">₹{Number(product.price).toLocaleString()}</p>
                        {product.original_price > product.price && (
                           <p className="text-xs text-white/30 line-through">₹{Number(product.original_price).toLocaleString()}</p>
                        )}
                     </div>
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-t border-white/10">
                     <button className="text-[9px] tracking-[0.4em] uppercase text-white flex items-center gap-3">
                        View Details <ArrowRight size={12} className="text-accent" />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-white/5 bg-white/[0.02] rounded-3xl">
             <p className="font-serif text-3xl italic text-white/30 mb-8">No pieces found matching your criteria</p>
             <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="text-[11px] tracking-[0.4em] uppercase text-accent border-b border-accent pb-2">View All Pieces</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;