import { useEffect, useState } from 'react';
import { listMyOrders } from '../api/orders';
import Card from '../components/Card';
import Empty from '../components/Empty';

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
        // Handle error state if needed, e.g., show a message
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
    return <Empty title="No orders yet" subtitle="Your purchases will appear here" />;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map(o => (
          <Card key={o.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Order #{o.orderNumber}</div>
              <span className="text-xs font-semibold rounded-full px-3 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200">
                {o.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${(o.totalCents / 100).toFixed(2)}
                <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-1">{o.currency}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {new Date(o.createdAt).toLocaleDateString()}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
