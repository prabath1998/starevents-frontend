import { useSearchParams, Link } from 'react-router-dom';
export default function CheckoutCancel() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold text-red-400">Payment cancelled</h2>
      <p className="text-gray-400 mt-2">Order #{orderId} was not charged.</p>
      <Link className="underline text-indigo-400 mt-4 inline-block" to={`/checkout?orderId=${orderId}`}>
        Try again
      </Link>
    </div>
  );
}