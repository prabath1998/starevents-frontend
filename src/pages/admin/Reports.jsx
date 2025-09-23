import { useState } from 'react';
import { dlAdminSales, dlAdminUsers, dlAdminEvents, dlAdminDiscounts } from '../../api/reports';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { downloadBlob } from '../../utils/download';
import toast from 'react-hot-toast';

export default function AdminReports() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const params = () => ({
    from: from ? new Date(from).toISOString() : undefined,
    to: to ? new Date(to).toISOString() : undefined,
  });

  const go = async (fn, name) => {
    try {
      const res = await fn(params());
      downloadBlob(res, name);
      toast.success('Download successful');
    } catch {
      toast.error('Download failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950/75 p-8 font-sans antialiased text-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Admin Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Generate and download reports on sales, users, events, and discounts with customizable date ranges.
          </p>
        </header>     

        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Data</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get a comprehensive list of all registered users.
            </p>
            <Button onClick={() => go(dlAdminUsers, 'admin-users.csv')} variant="secondary" className="w-full">
              Download Users Report
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Event Logs</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Export detailed records of all events.
            </p>
            <Button onClick={() => go(dlAdminEvents, 'admin-events.csv')} variant="secondary" className="w-full">
              Download Events Report
            </Button>
          </div>         
         

           <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Event Sales</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analyze all sales and their usage.
            </p>
            <Button onClick={() => go(dlAdminSales, 'admin-sales.csv')}  variant="secondary" className="w-full">
              Download Sales Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}