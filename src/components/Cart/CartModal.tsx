import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCart } from '../../contexts/CartContext';
import MaterialPayment from '../../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Utility function to safely convert price to number
const safePrice = (price: number | string): number => {
  if (typeof price === 'number') return price;
  const parsed = parseFloat(price);
  return isNaN(parsed) ? 0 : parsed;
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      {/* Cart Sidebar */}
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <FontAwesomeIcon icon="shopping-cart" className="text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  {/* Product Image */}
                  <img
                    src={`http://localhost:3000${item.material.cover}`}
                    alt={item.material.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800">
                      {item.material.title}
                    </h3>
                    <p className="text-red-600 font-bold">
                      €{safePrice(item.material.price).toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-red-600">€{totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              {/* Example: Render MaterialPayment for the first item in the cart */}
              <MaterialPayment material={items} />
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
