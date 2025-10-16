import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import { useCart } from "../contexts/CartContext";
import { getImageUrl } from "../config/storage";

interface PaymentSession {
  id: string;
  amount_total: number;
  currency: string;
  customer_email: string;
  items: { title: string; quantity: number; amount: number, cover: string }[];
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent"); // PI réel
    if (!paymentIntentId) {
      setError("Aucune session de paiement trouvée");
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        setLoading(true);
        const response = await api.post('/stripe/payment-session', {
          payment_intent_id: paymentIntentId
        });
        setSession(response.data);
        clearCart();
      } catch (err: any) {
        setError("Impossible de récupérer les détails du paiement");
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        <p className="ml-4 text-lg text-gray-600">Vérification de votre paiement...</p>
      </div>
    );
  }
  if (error) return <p className="text-red-600">{error}</p>;
  if (!session) return null;
  return (
    <div className="mx-auto sm:p-6 md:px-[400px]  bg-talktheglobe">
      <h1 className="text-3xl  sm:text-4xl font-bold mb-6 text-center text-text">
        Paiement réussi !
      </h1>
      {session.customer_email && (
        <p className="text-center text-gray-700 mb-6">
          Un email de confirmation contenant votre reçu a été envoyé à <strong>{session.customer_email}</strong>.
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b pb-2">Détails de votre commande :</h2>
      <ul className="space-y-4">
        {session.items.map((item, i) => (
          <li
            key={i}
            className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex-1">
              <div></div>
              <p className="font-semibold text-lg sm:text-xl">{item.title} </p>
              <p className="text-gray-600 mt-1">
                {(item.amount / 100).toFixed(2)} {session.currency.toUpperCase()}
              </p>
            </div>
            {item.cover && (
              <div className="relative w-full sm:w-32 h-32 mt-4 sm:mt-0 sm:ml-6">
                <img
                  src={getImageUrl(item.cover)} // adapte ton domaine ici
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-1 right-1 bg-text text-white text-sm font-semibold px-2 py-1 rounded-full shadow">
                  x{item.quantity}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-right text-xl sm:text-2xl font-bold text-gray-800">
        Total : {(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}
      </p>
    </div>
  );
}
