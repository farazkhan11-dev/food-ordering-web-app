import { createContext, useContext, useState } from 'react';
const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (restaurant) => {
    const alreadyExists = wishlist.find((r) => r.id === restaurant.id);

    if (alreadyExists) {
    
      return;
    } else {
      setWishlist([...wishlist, restaurant]);
    }
  };


  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((r) => r.id !== id);
    setWishlist(updatedWishlist);
  };

  
  const isWishlisted = (id) => {
    const found = wishlist.find((r) => r.id === id);
    if (found) {
      return true;
    } else {
      return false;
    }
  };


  const toggleWishlist = (restaurant) => {
    if (isWishlisted(restaurant.id)) {
      removeFromWishlist(restaurant.id);
      return 'removed';
    } else {
      addToWishlist(restaurant);
      return 'added';
    }
  };


  
  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}


export function useWishlist() {
  return useContext(WishlistContext);
}