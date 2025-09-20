import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Card from '../components/Card';

export default function CheckoutSuccess() {
  const [params] = useSearchParams(); 

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gray-800 border border-gray-700/50 p-8 sm:p-10 rounded-xl text-center shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-green-500/10">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white animate-fade-in-down">
          Payment Successful!
        </h2>
        <p className="mt-4 text-gray-300 text-lg">
          Your order is complete. We're excited for you to experience the event!
        </p>       

        <Link
          className="mt-8 inline-block px-6 py-3 rounded-full font-semibold transition-transform duration-300 transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          to="/me/tickets"
        >
          View My Tickets
        </Link>
       
        <style jsx>{`
          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.6s ease-out forwards;
          }
        `}</style>
      </Card>
    </div>
  );
}