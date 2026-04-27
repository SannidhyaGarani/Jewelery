import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../components/useAuth';
import { db } from '../components/Firebase';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Sync with Firestore or LocalStorage
  useEffect(() => {
    let unsubscribeCart = () => {};
    let unsubscribeWishlist = () => {};

    if (user) {
      // Real-time sync for logged-in user
      const cartRef = collection(db, "users", user.uid, "cart");
      unsubscribeCart = onSnapshot(cartRef, (snap) => {
        setCartItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });

      const wishRef = collection(db, "users", user.uid, "wishlist");
      unsubscribeWishlist = onSnapshot(wishRef, (snap) => {
        setWishlistItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });
    } else {
      // Guest: Load from LocalStorage
      const loadLocal = () => {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(localCart);
        setWishlistItems([]);
      };
      loadLocal();
      
      // Listen for storage changes in other tabs
      window.addEventListener('storage', loadLocal);
      return () => window.removeEventListener('storage', loadLocal);
    }

    return () => {
      unsubscribeCart();
      unsubscribeWishlist();
    };
  }, [user]);

  const addToCart = async (product, qty = 1) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0] || "",
      addedAt: new Date().toISOString(),
      quantity: qty
    };

    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid, "cart", product.id), item);
        return true;
      } catch (error) {
        console.error("Error adding to cart:", error);
        return false;
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!localCart.find(i => i.id === product.id)) {
        localCart.push(item);
        localStorage.setItem('cart', JSON.stringify(localCart));
        setCartItems([...localCart]);
      }
      return true;
    }
  };

  const addToWishlist = async (product) => {
    if (!user) {
      navigate('/login');
      return false;
    }

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0] || "",
      addedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, "users", user.uid, "wishlist", product.id), item);
      return true;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return false;
    }
  };

  const isInCart = (productId) => cartItems.some(i => i.id === productId);
  const isInWishlist = (productId) => wishlistItems.some(i => i.id === productId);

  return (
    <StoreContext.Provider value={{ 
      cartItems, 
      wishlistItems, 
      cartCount: cartItems.length, 
      wishlistCount: wishlistItems.length,
      addToCart, 
      addToWishlist, 
      isInCart, 
      isInWishlist 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};

// Compatibility export for old hook name
export const useCartWishlist = useStore;
