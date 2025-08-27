import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { Material, CartItem, CartContextType } from '../types/types';
import { useToast } from './ToastContext';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from '../api';

// --- Utility functions ---
const safePrice = (price: number | string): number => {
  const parsed = typeof price === 'number' ? price : parseFloat(price);
  return isNaN(parsed) ? 0 : parsed;
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// --- Cart reducer ---
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Material }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartState { items: CartItem[]; }

const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try { localStorage.setItem('cart', JSON.stringify(items)); } catch {}
};

const initialState: CartState = { items: [] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item),
        };
      }
      return { ...state, items: [...state.items, { id: action.payload.id, material: action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map(item => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)
          .filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

// --- Cart context ---
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { addToast } = useToast();

  useEffect(() => { const saved = loadCartFromStorage(); if (saved.length) dispatch({ type: 'LOAD_CART', payload: saved }); }, []);
  useEffect(() => { saveCartToStorage(state.items); }, [state.items]);

  const addToCart = (material: Material) => {
    const exists = state.items.find(item => item.id === material.id);
    dispatch({ type: 'ADD_TO_CART', payload: material });
    addToast(`${material.title} ${exists ? 'quantity updated' : 'added'} in cart!`, 'success');
  };

  const removeFromCart = (id: string) => {
    const item = state.items.find(i => i.id === id);
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    if (item) addToast(`${item.material.title} removed from cart`, 'info');
  };

  const updateQuantity = (id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => { dispatch({ type: 'CLEAR_CART' }); addToast('Cart cleared', 'info'); };

  return (
    <CartContext.Provider value={{ items: state.items, totalItems: state.items.reduce((t, i) => t + i.quantity, 0), totalPrice: state.items.reduce((t, i) => t + safePrice(i.material.price) * i.quantity, 0), addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

// --- Stripe payment ---
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ email }: { email: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      return setError("Veuillez saisir votre email");
    }
    
    if (!isValidEmail(email)) {
      return setError("L'adresse email que vous avez saisie est invalide. Veuillez vérifier et réessayer.");
    }
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await stripe.confirmPayment({ 
        elements, 
        confirmParams: { 
          return_url: `${window.location.origin}/payment-success` 
        } 
      });
      
      if (error) {
        setError(error.message || 'Payment failed');
        addToast(error.message || 'Payment failed', 'error');
      } else {
        addToast('Payment processing...', 'success');
      }
    } catch (err: any) {
      const msg = err.message || 'An unexpected error occurred';
      setError(msg);
      addToast(msg, 'error');
    } finally { 
      setLoading(false); 
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>}
      <button disabled={!stripe || loading} className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

export default function MaterialPayment({ material, email }: { material: CartItem[]; email: string; }) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createPaymentIntent = async () => {
      
      setLoading(true);
      setError(null);
      try {
        const response = await api.post("/stripe/create-payment-intent", { 
          items: material.map(i => ({ 
            id: i.id, 
            price: i.material.price, 
            quantity: i.quantity, 
            name: i.material.title 
          })),
          email
        });
        
        
        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          setError("Failed to create payment intent");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to initialize payment");
      } finally { 
        setLoading(false); 
      }
      
    };
    createPaymentIntent();
  }, [material, email]);

  if (loading) return <p>Initializing payment...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!clientSecret) return <p>Payment not available</p>;

  return <Elements stripe={stripePromise} options={{ clientSecret }}><CheckoutForm email={email} /></Elements>;
}
