import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const { clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart and notify user
    clearCart();
    addToast('Payment successful! Your cart has been cleared.', 'success');

    // Optional: redirect to home after few seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [clearCart, addToast, navigate]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Thank you for your purchase!</h1>
      <p>Your payment was successful. Redirecting to home...</p>
    </div>
  );
}
