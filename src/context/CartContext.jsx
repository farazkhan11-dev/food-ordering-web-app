import { createContext, useContext, useState } from 'react';

// Create a context to share cart data across the whole app
const CartContext = createContext();

export function CartProvider({ children }) {


  const [cartItems, setCartItems] = useState([]);


  // ADD ITEM TO CART 
  const addToCart = (item) => {
    const alreadyInCart = cartItems.find((i) => i.id === item.id);

    if (alreadyInCart) {
      const updatedItems = cartItems.map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + 1 };
        } else {
          return i;
        }
      });
      setCartItems(updatedItems);

    } else {
      // Item is new — add it with quantity 1
      const newItem = { ...item, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };


  // REMOVE ITEM FROM CART 

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter((i) => i.id !== id);
    setCartItems(updatedItems);
  };


  // INCREASE QUANTITY 
  const increaseQty = (id) => {
    const updatedItems = cartItems.map((i) => {
      if (i.id === id) {
        return { ...i, quantity: i.quantity + 1 };
      } else {
        return i;
      }
    });
    setCartItems(updatedItems);
  };


  //  DECREASE QUANTITY
  const decreaseQty = (id) => {
    const item = cartItems.find((i) => i.id === id);

    if (item.quantity === 1) {
      // Remove item from cart completely
      const updatedItems = cartItems.filter((i) => i.id !== id);
      setCartItems(updatedItems);

    } else {
      // Just reduce quantity by 1
      const updatedItems = cartItems.map((i) => {
        if (i.id === id) {
          return { ...i, quantity: i.quantity - 1 };
        } else {
          return i;
        }
      });
      setCartItems(updatedItems);
    }
  };


  // CLEAR CART 
  const clearCart = () => {
    setCartItems([]);
  };


  // TOTAL ITEM COUNT 
  let totalItems = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalItems = totalItems + cartItems[i].quantity;
  }


  // TOTAL PRICE 
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice = totalPrice + cartItems[i].price * cartItems[i].quantity;
  }



  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}