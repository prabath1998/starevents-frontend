import { useEffect, useState } from 'react';
import { listMyOrders } from '../api/orders';
import Card from '../components/Card';
import Empty from '../components/Empty';
import { format } from 'date-fns';
import { PackageIcon } from 'lucide-react';

export default function MyOrders() {
  const [data, setData] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listMyOrders()
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading orders...
      </div>
    );
  }

  if (!data.items.length) {
    return (
      <Empty
        title="No orders yet"
        subtitle="Your purchases will appear here."
      />
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white">My Orders</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map(o => (
          <Card 
            key={o.id} 
            className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-400">
                  <PackageIcon size={20} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">Order #{o.orderNumber}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {format(new Date(o.createdAt), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium rounded-full px-3 py-1 mt-1 border border-gray-600 text-gray-400 bg-gray-700">
                {o.status}
              </span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-xl font-bold text-indigo-400">
                ${(o.totalCents / 100).toFixed(2)}
                <span className="text-base font-normal text-gray-500 ml-1">{o.currency}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}