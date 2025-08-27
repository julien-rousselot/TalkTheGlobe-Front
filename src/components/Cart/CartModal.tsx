import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../contexts/CartContext";
import MaterialPayment from "../../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const safePrice = (price: number | string): number => {
  if (typeof price === "number") return price;
  const parsed = parseFloat(price);
  return isNaN(parsed) ? 0 : parsed;
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = React.useState("");
  const [consent, setConsent] = useState(true);
  const [step, setStep] = useState(1); // 1 = email/consent, 2 = payment
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setConsent(true);
      setStep(1);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleGoToPayment = async () => {
    setError(null);
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Send email and consent to backend
      const response = await fetch('http://localhost:3000/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          consent,
        }),
      });

      if (response.ok) {
        setStep(2); // Move to payment step
        setError(null);
      } else {
        setError("Failed to process your information. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-lg flex flex-col overflow-y-auto scrollbar-none"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
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
            <div className="p-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <FontAwesomeIcon
                    icon="shopping-cart"
                    className="text-6xl text-gray-300 mb-4"
                  />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center space-x-4 p-3 border rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={`http://localhost:3000${item.material.cover}`}
                        alt={item.material.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-800">
                          {item.material.title}
                        </h3>
                        <p className="text-red-600 font-bold">
                          €{safePrice(item.material.price).toFixed(2)}
                        </p>
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
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-red-600">€{totalPrice.toFixed(2)}</span>
                </div>
                
                {/* Step 1: Email and Consent */}
                {step === 1 && (
                  <>
                    <div className="text-sm text-gray-600 mb-3">
                      Step 1 of 2: Enter your information
                    </div>
                    <input
                      type="email"
                      placeholder="Your email to receive the PDF"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <label htmlFor="consent" className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={consent}
                        className="w-3 h-3"
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      Keep me updated with news and exclusive offers via email.
                    </label>
                    {/* Error Display */}
                    {error && (
                      <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <button
                        onClick={handleGoToPayment}
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Processing...' : 'Go to Payment'}
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <>
                    <div className="text-sm text-gray-600 mb-3">
                      Step 2 of 2: Complete your payment
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Email: {email}
                    </div>
                    <MaterialPayment material={items} email={email} />
                    <div className="space-y-2 mt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
