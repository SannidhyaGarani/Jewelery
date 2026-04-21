import React, { useState, useEffect } from 'react';
import { db } from '../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Search, Heart, ShoppingBag, Eye, ArrowRight, ChevronDown, Filter } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    { id: 'bs-1', name: "Solitaire Droplet Necklace", price: 120, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", category: "Luxury" },
    { id: 'bs-2', name: "Champagne Gold Ring", price: 85, image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?w=600&auto=format&fit=crop&q=60", category: "Everyday" },
    { id: 'bs-3', name: "Rose Quartz Eternity Ring", price: 150, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", category: "Bridal" },
    { id: 'bs-4', name: "Pearl Infused Bracelet", price: 95, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "New Arrivals" },
    { id: 'shop-5', name: "Diamond Halo Studs", price: 210, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", category: "Luxury" },
    { id: 'shop-6', name: "Vintage Gold Locket", price: 175, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&auto=format&fit=crop&q=60", category: "New Arrivals" },
    { id: 'shop-7', name: "Sapphire Night Pendant", price: 320, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", category: "Luxury" },
    { id: 'shop-8', name: "Minimalist Silver Band", price: 65, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800", category: "Everyday" },
    { id: 'shop-9', name: "Art Deco Emerald Ring", price: 280, image: "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?w=600&auto=format&fit=crop&q=60", category: "Bridal" },
    { id: 'shop-10', name: "Celestial Moon Necklace", price: 140, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800", category: "New Arrivals" },
    { id: 'shop-11', name: "Ornate Bridal Choker", price: 450, image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=600&auto=format&fit=crop&q=60", category: "Bridal" },
    { id: 'shop-12', name: "Infinity Knot Bangle", price: 110, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", category: "Everyday" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const dbProducts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const allProducts = [...curatedProducts];
        dbProducts.forEach(dbP => {
           if (!allProducts.find(p => p.name === dbP.name)) allProducts.push(dbP);
        });
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(curatedProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCollection = async (e, product, collectionName) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    try {
      const itemRef = doc(db, "users", user.uid, collectionName, product.id);
      await setDoc(itemRef, {
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || "",
        addedAt: new Date().toISOString()
      });
    } catch (error) { console.error(`Error adding to ${collectionName}:`, error); }
  };

  const categories = ['All', 'Bridal', 'Everyday', 'Luxury', 'New Arrivals'];
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
                     <button onClick={(e) => addToCollection(e, product, 'wishlist')} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-accent transition-colors border border-white/10">
                        <Heart size={14} strokeWidth={1.5} />
                     </button>
                     <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-accent transition-colors border border-white/10">
                        <Eye size={14} strokeWidth={1.5} />
                     </button>
                  </div>
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start">
                     <h3 className="font-serif text-xl tracking-wide text-white group-hover:text-accent transition-colors">{product.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">{product.category}</p>
                     <p className="font-serif text-lg text-accent">₹{product.price}.00</p>
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