'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  quantity: number;
}

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId: string) => {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.id} - Quantity: {item.quantity}{' '}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addToCart('product1')}>Add to Cart</button>
    </div>
  );
};