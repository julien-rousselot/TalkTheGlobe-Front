import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { Material, CartItem, CartContextType } from '../types/types';
import { useToast } from './ToastContext';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from '../api';
// Utility function to safely convert price to number
const safePrice = (price: number | string): number => {
  if (typeof price === 'number') return price;
  const parsed = parseFloat(price);
  return isNaN(parsed) ? 0 : parsed;
};

// Actions for cart reducer
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Material }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Cart state interface
interface CartState {
  items: CartItem[];
}

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Initial state
const initialState: CartState = {
  items: [],
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If new item, add it to cart
        return {
          ...state,
          items: [...state.items, { id: action.payload.id, material: action.payload, quantity: 1 }],
        };
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          ...state,
          items: state.items.filter(item => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { addToast } = useToast();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage(state.items);
  }, [state.items]);

  // Calculate derived values
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => {
    const price = safePrice(item.material.price);
    return total + (price * item.quantity);
  }, 0);

  // Actions
  const addToCart = (material: Material) => {
    const existingItem = state.items.find(item => item.id === material.id);
    dispatch({ type: 'ADD_TO_CART', payload: material });
    
    if (existingItem) {
      addToast(`${material.title} quantity updated in cart!`, 'success');
    } else {
      addToast(`${material.title} added to cart!`, 'success');
    }
  };

  const removeFromCart = (id: string) => {
    const item = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    if (item) {
      addToast(`${item.material.title} removed from cart`, 'info');
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    addToast('Cart cleared', 'info');
  };

  const value: CartContextType = {
    items: state.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        setError(error.message || 'Payment failed');
        addToast(error.message || 'Payment failed', 'error');
      } else {
        addToast('Payment processing...', 'success');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
          {error}
        </div>
      )}
      <button 
        disabled={!stripe || loading} 
        className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

export default function MaterialPayment({ material }: { material: CartItem[] }) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.post("/stripe/create-payment-intent", {
          items: material.map((item: any) => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
          })),
        });
        
        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          setError("Failed to create payment intent");
        }
      } catch (err: any) {
        console.error("Error creating payment intent:", err);
        setError(err.response?.data?.message || "Failed to initialize payment");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [material]);

  if (loading) return <p>Initializing payment...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!clientSecret) return <p>Payment not available</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}