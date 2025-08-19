import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api"; // ton instance axios/fetch vers le backend

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
      } catch (err: any) {
        console.error(err);
        setError("Impossible de récupérer les détails du paiement");
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [searchParams]);

  if (loading) return <p>Chargement des détails du paiement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!session) return null;
return (
  <div className="max-w-3xl mx-auto p-6 sm:p-8">
    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-green-600">
      Paiement réussi !
    </h1>
    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b pb-2">Détails de votre commande :</h2>
    <ul className="space-y-4">
      {session.items.map((item, i) => (
        <li
          key={i}
          className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
        >
          <div className="flex-1">
            <p className="font-semibold text-lg sm:text-xl">{item.title}</p>
            <p className="text-gray-600 mt-1">
              {(item.amount / 100).toFixed(2)} {session.currency.toUpperCase()}
            </p>
          </div>
          {item.cover && (
            <div className="relative w-full sm:w-32 h-32 mt-4 sm:mt-0 sm:ml-6">
              <img
                src={`https://tondomaine.com${item.cover}`} // adapte ton domaine ici
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-1 right-1 bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded-full shadow">
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
