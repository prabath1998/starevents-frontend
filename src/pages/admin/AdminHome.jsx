import { useEffect, useState } from 'react';
import { adminOverview } from '../../api/admin';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Users, Calendar, Megaphone, ShoppingCart, DollarSign, Ticket, BarChart2 } from 'lucide-react';

export default function AdminHome() {
  const [kpi, setKpi] = useState(null);
  useEffect(() => {
    adminOverview({})
      .then(setKpi)
      .catch(() => toast.error('Failed to load KPIs'));
  }, []);

  const kpiData = kpi
    ? [
        { name: 'Total Users', value: kpi.totalUsers, icon: <Users /> },
        { name: 'Active Users', value: kpi.activeUsers, icon: <User /> },
        { name: 'Total Events', value: kpi.totalEvents, icon: <Calendar /> },
        { name: 'Published Events', value: kpi.publishedEvents, icon: <Megaphone /> },
        { name: 'Total Orders', value: kpi.totalOrders, icon: <ShoppingCart /> },
        { name: 'Paid Orders', value: kpi.paidOrders, icon: <DollarSign /> },
        { name: 'Tickets Issued', value: kpi.totalTicketsIssued, icon: <Ticket /> },
        { name: 'Revenue', value: `$${(kpi.revenueCents / 100).toFixed(2)}`, icon: <BarChart2 /> },
      ]
    : [];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.length > 0 ? (
          kpiData.map((item) => (
            <Card key={item.name} className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-6 flex items-center space-x-4 transition-transform duration-300 hover:scale-[1.02]">
              <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-full text-indigo-400">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-400">{item.name}</div>
                <div className="mt-1 text-3xl font-bold text-indigo-300">{item.value}</div>
              </div>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Loading data...</p>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-6">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/users">
            <Button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors">
              <Users size={18} /> Manage Users
            </Button>
          </Link>
          <Link to="/admin/events">
            <Button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors">
              <Calendar size={18} /> Manage Events
            </Button>
          </Link>
          <Link to="/admin/discounts">
            <Button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors">
              <DollarSign size={18} /> Manage Discounts
            </Button>
          </Link>
          <Link to="/admin/audit-logs">
            <Button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors">
              <BarChart2 size={18} /> Audit Logs
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}