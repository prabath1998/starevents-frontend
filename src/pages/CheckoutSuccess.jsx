
import { useSearchParams, Link } from 'react-router-dom';

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold text-green-400">Payment successful</h2>
      <p className="text-gray-400 mt-2">Order #{orderId}. Your tickets are ready.</p>
      <Link className="underline text-indigo-400 mt-4 inline-block" to="/me/tickets">
        View my tickets
      </Link>
    </div>
  );
}


