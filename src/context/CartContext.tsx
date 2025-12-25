import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getWhatsAppMessage: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setItems(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
      );
      
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { product, quantity, size, color }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const getWhatsAppMessage = () => {
    if (items.length === 0) return '';
    
    const itemsList = items
      .map(item => {
        let text = `• ${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`;
        if (item.size) text += ` (Size: ${item.size})`;
        if (item.color) text += ` (Color: ${item.color})`;
        return text;
      })
      .join('\n');
    
    return `Hi! I'd like to order:\n\n${itemsList}\n\nTotal: $${getTotalPrice().toFixed(2)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
