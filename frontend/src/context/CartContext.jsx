import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (foodItem, qty = 1) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x.foodItem === foodItem._id);
      if (existItem) {
        toast.info(`Updated ${foodItem.name} quantity in cart!`, { autoClose: 2000 });
        return prevItems.map((x) =>
          x.foodItem === existItem.foodItem ? { ...existItem, qty: existItem.qty + qty } : x
        );
      } else {
        toast.success(`Added ${foodItem.name} to cart!`, { autoClose: 2000 });
        return [...prevItems, { 
          foodItem: foodItem._id, 
          name: foodItem.name, 
          image: foodItem.image, 
          price: foodItem.price, 
          qty 
        }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const item = prevItems.find(x => x.foodItem === id);
      if(item) {
        toast.error(`Removed ${item.name} from cart`, { autoClose: 2000 });
      }
      return prevItems.filter((x) => x.foodItem !== id);
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((x) => (x.foodItem === id ? { ...x, qty } : x))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
