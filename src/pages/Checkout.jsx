import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { initiatePayment, dummyConfirm } from '../api/orders';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function Checkout() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (!orderId) {
      toast.error('Missing order id');
      return;
    }
    setLoading(true);
    try {
      const res = await initiatePayment(orderId); 
      if (res.requiresRedirect) {        
        toast.error('This environment expects dummy payments.');
        return;
      }
     
      await dummyConfirm(res.orderId);
      toast.success('Payment successful. Tickets issued!');
      navigate('/me/tickets');
    } catch (e) {
      console.error(e);
      toast.error('Payment init/confirm failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <h2 className="text-xl font-semibold text-indigo-300 mb-3">Checkout</h2>
        <p className="text-gray-300 mb-4">Order #{orderId ?? '—'}</p>
        <Button onClick={pay} disabled={loading}>
          {loading ? 'Processing…' : 'Pay now'}
        </Button>
      </Card>
    </div>
  );
}
