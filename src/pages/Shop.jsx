import React, { useState, useEffect } from 'react';
import { db } from '../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Search, Heart, ShoppingBag, Eye, X, ChevronDown, Filter } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../components/useAuth';
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

  const curatedProducts = [
    {
      id: 'bs-1',
      name: "Solitaire Droplet Necklace",
      price: 120,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
      category: "Luxury"
    },
    {
      id: 'bs-2',
      name: "Champagne Gold Ring",
      price: 85,
      image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      category: "Everyday"
    },
    {
      id: 'bs-3',
      name: "Rose Quartz Eternity Ring",
      price: 150,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      category: "Bridal"
    },
    {
      id: 'bs-4',
      name: "Pearl Infused Bracelet",
      price: 95,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      category: "New Arrivals"
    },
    {
      id: 'shop-5',
      name: "Diamond Halo Studs",
      price: 210,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      category: "Luxury"
    },
    {
      id: 'shop-6',
      name: "Vintage Gold Locket",
      price: 175,
      image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      category: "New Arrivals"
    },
    {
      id: 'shop-7',
      name: "Sapphire Night Pendant",
      price: 320,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
      category: "Luxury"
    },
    {
      id: 'shop-8',
      name: "Minimalist Silver Band",
      price: 65,
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
      category: "Everyday"
    },
    {
      id: 'shop-9',
      name: "Art Deco Emerald Ring",
      price: 280,
      image: "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      category: "Bridal"
    },
    {
      id: 'shop-10',
      name: "Celestial Moon Necklace",
      price: 140,
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800",
      category: "New Arrivals"
    },
    {
      id: 'shop-11',
      name: "Ornate Bridal Choker",
      price: 450,
      image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      category: "Bridal"
    },
    {
      id: 'shop-12',
      name: "Infinity Knot Bangle",
      price: 110,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      category: "Everyday"
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const dbProducts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Merge DB products with curated ones, avoiding duplicates by name if possible
        const allProducts = [...curatedProducts];
        dbProducts.forEach(dbP => {
           if (!allProducts.find(p => p.name === dbP.name)) {
             allProducts.push(dbP);
           }
        });

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(curatedProducts); // Fallback to curated only
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCollection = async (e, product, collectionName) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const itemRef = doc(db, "users", user.uid, collectionName, product.id);
      await setDoc(itemRef, {
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || "",
        addedAt: new Date().toISOString()
      });
      // Premium toast/notification logic could go here
    } catch (error) {
      console.error(`Error adding to ${collectionName}:`, error);
    }
  };

  const categories = ['All', 'Bridal', 'Everyday', 'Luxury', 'New Arrivals'];
  
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // Default: newest (already default from firestore)
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 font-sans relative overflow-hidden">
      {/* Background Cinematic Grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] z-0" />
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C6A769]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      {selectedProduct && (
        <QuickView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 border border-[#C6A769]/30 text-[#C6A769] text-[10px] tracking-[0.5em] uppercase font-medium bg-[#C6A769]/5 mb-6"
          >
            The Collection
          </motion.span>
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2B2B2B] leading-[1.1]"
            >
              Shop All <span className="italic font-light text-[#C6A769]">Pieces</span>
            </motion.h1>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12 border-b border-[#2B2B2B]/5 pb-8">
          {/* Categories Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-500 relative pb-1 ${
                  selectedCategory === cat ? 'text-[#C6A769]' : 'text-[#2B2B2B]/40 hover:text-[#2B2B2B]'
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A769]" />
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#2B2B2B]/20 group-focus-within:text-[#C6A769] transition-colors duration-500" size={16} strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-transparent border-b border-[#2B2B2B]/10 pl-8 pr-4 py-3 text-[11px] tracking-wider text-[#2B2B2B] placeholder:text-[#2B2B2B]/20 outline-none focus:border-[#C6A769] transition-all duration-500 font-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
             <div className="flex items-center gap-3 group cursor-pointer relative">
                <span className="text-[10px] tracking-widest uppercase text-[#2B2B2B]/40">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[10px] tracking-widest uppercase text-[#2B2B2B] border-none outline-none cursor-pointer font-medium appearance-none pr-4"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown size={12} className="absolute right-0 text-[#2B2B2B]/40 pointer-events-none" />
             </div>
             <button 
               onClick={() => setShowFilters(!showFilters)}
               className="lg:hidden flex items-center gap-2 text-[#2B2B2B] text-[10px] tracking-widest uppercase border border-[#2B2B2B]/10 px-4 py-2 rounded-full"
             >
               <Filter size={14} /> Filters
             </button>
          </div>
        </div>

        {/* Mobile Categories (Collapsible) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden flex flex-wrap gap-3 mb-8 overflow-hidden"
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                  className={`px-5 py-2.5 rounded-full text-[10px] tracking-widest uppercase border transition-all ${
                    selectedCategory === cat ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]' : 'border-[#2B2B2B]/10 text-[#2B2B2B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-[3/4] bg-[#F3F2EE] animate-pulse rounded-sm" />
                <div className="h-4 bg-[#F3F2EE] animate-pulse w-3/4 mx-auto" />
                <div className="h-4 bg-[#F3F2EE] animate-pulse w-1/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F3F2EE] mb-6">
                  <img 
                    src={product.image || product.images?.[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  
                  {/* Glass Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#FAF9F6]/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-500" />
                  
                  {/* Floating Action Icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-[0.22, 1, 0.36, 1]">
                    <button 
                      onClick={(e) => addToCollection(e, product, 'wishlist')}
                      className="w-10 h-10 bg-white shadow-sm flex items-center justify-center text-[#2B2B2B] hover:text-[#C6A769] transition-colors"
                    >
                      <Heart size={16} strokeWidth={1} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="w-10 h-10 bg-white shadow-sm flex items-center justify-center text-[#2B2B2B] hover:text-[#C6A769] transition-colors"
                    >
                      <Eye size={16} strokeWidth={1} />
                    </button>
                  </div>

                  {/* Quick Add Bar */}
                  <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]">
                    <button 
                      onClick={(e) => addToCollection(e, product, 'cart')}
                      className="w-full bg-[#2B2B2B] text-white py-4 text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-2 hover:bg-[#C6A769] transition-colors"
                    >
                      <ShoppingBag size={14} strokeWidth={1.5} />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center px-2">
                  <span className="text-[#C6A769] text-[9px] tracking-[0.3em] uppercase block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {product.category || "General"}
                  </span>
                  <h3 className="text-[#2B2B2B] font-serif text-lg mb-2 group-hover:text-[#C6A769] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-[#2B2B2B]/60 text-[11px] tracking-widest translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                    ₹{product.price}.00
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-dashed border-[#2B2B2B]/10 rounded-sm">
             <div className="max-w-xs mx-auto">
               <p className="font-serif text-2xl text-[#2B2B2B]/40 mb-6 italic">No products found matching your search</p>
               <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="text-[10px] tracking-[0.3em] uppercase text-[#C6A769] border-b border-[#C6A769]/30 pb-1"
               >
                 View All Products
               </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;