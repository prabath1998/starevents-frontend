import { useSearchParams, useNavigate } from 'react-router-dom';
import { initiatePayment } from '../api/orders';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {
  CreditCardIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';

export default function Checkout() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get('orderId');
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (!orderId) return toast.error('Missing order id');
    setLoading(true);
    try {
      const res = await initiatePayment(orderId);

      if (res.provider !== 'Stripe') {
        toast.error('Unexpected provider');
        return;
      }

      if (res.requiresRedirect && res.redirectUrl) {
        window.location.href = res.redirectUrl;
        return;
      }

      if (res.sessionId) {
        toast.error('Stripe session created but no redirect URL returned.');
      } else {
        toast.error('Payment init failed: missing session info.');
      }
    } catch (e) {
      console.error(e);
      toast.error('Payment init failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <Card className="max-w-md w-full rounded-2xl shadow-2xl bg-gray-900 p-8">
        <div className="flex flex-col items-center">
          <div className="bg-indigo-500 rounded-full p-4 mb-4">
            <ShoppingBagIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Order Summary</h2>
          <p className="text-gray-400 mb-6 text-center">
            Review your order details and proceed to payment.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 font-medium">Order ID:</span>
            <span className="text-indigo-400 font-mono text-sm">
              #{orderId ?? '—'}
            </span>
          </div>
          <div className="flex items-center text-green-400">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <span>Order confirmed and ready for payment.</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center bg-gray-800 p-4 rounded-xl">
            <CreditCardIcon className="h-6 w-6 text-indigo-400 mr-4" />
            <div>
              <p className="text-gray-200 font-semibold">Stripe Secure Payment</p>
              <p className="text-gray-500 text-sm">
                You will be redirected to Stripe to complete your purchase.
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={pay}
          disabled={loading}
          className="w-full mt-8 py-3 text-lg font-bold rounded-lg transition-transform transform active:scale-95"
        >
          {loading ? 'Redirecting…' : 'Pay with Stripe'}
        </Button>
      </Card>
    </div>
  );
}