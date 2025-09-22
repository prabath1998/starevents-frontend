import { useEffect, useState } from 'react';
import { listMyOrders } from '../api/orders';
import Card from '../components/Card';
import Empty from '../components/Empty';
import { format } from 'date-fns';
import { PackageIcon, FileTextIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const [data, setData] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen text-gray-400">
  //       <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  //         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  //       </svg>
  //       <span className="ml-3 text-lg font-medium">Loading orders...</span>
  //     </div>
  //   );
  // }

  // if (!data.items.length) {
  //   return <Empty title="No orders found" subtitle="You haven't placed any orders yet." />;
  // }

  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-400';
      case 'processing':
        return 'text-yellow-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white">My Bookings</h1>
        <button
          onClick={() => navigate('/reports')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2 rounded-md"
        >
          <FileTextIcon size={20} />
          <span className="hidden sm:inline">Reports</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map(o => (
          <Card
            key={o.id}
            className="p-5 rounded-xl shadow-lg border border-gray-800 bg-gray-900 transition-all duration-300 hover:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold text-white">Order #{o.orderNumber}</div>
              <div className={`text-sm font-medium ${getStatusClasses(o.status)}`}>
                {o.status}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 border-t border-gray-700 pt-3">
              <div className="flex items-center gap-2 text-gray-400">
                <PackageIcon size={16} />
                <span className="text-sm">
                  {format(new Date(o.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="text-xl font-bold text-indigo-400">
                ${(o.totalCents / 100).toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-1">{o.currency}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
