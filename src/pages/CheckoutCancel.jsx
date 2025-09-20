import { useSearchParams, Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import Card from '../components/Card';

export default function CheckoutCancel() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId');

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gray-800 border border-gray-700/50 p-8 sm:p-10 rounded-xl text-center shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-red-500/10">
            <XCircle className="h-10 w-10 text-red-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white animate-fade-in-down">
          Payment Cancelled
        </h2>
        <p className="mt-4 text-gray-300 text-lg">
          No worries, your order has not been charged.
        </p>
        {orderId && (
          <p className="mt-2 text-sm text-gray-400 font-mono">
            Order #
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500 font-bold">
              {orderId}
            </span>
          </p>
        )}

        <Link
          className="mt-8 inline-block px-6 py-3 rounded-full font-semibold transition-transform duration-300 transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          to={`/events`}
        >
          Try Again
        </Link>
      </Card>
    </div>
  );
}