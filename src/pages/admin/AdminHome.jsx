import { useEffect, useState } from 'react';
import { adminOverview } from '../../api/admin';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Users, Calendar, Megaphone, ShoppingCart, DollarSign, Ticket, BarChart2, Plus, ArrowRight } from 'lucide-react';

export default function AdminHome() {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminOverview({})
      .then(data => {
        setKpi(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load dashboard data.');
        setLoading(false);
      });
  }, []);

  const kpiMetrics = kpi ? [
    { name: 'Total Users', value: kpi.totalUsers, icon: Users, subtext: `+${kpi.newUsersLast30Days || 0} this month` },
    { name: 'Active Users', value: kpi.activeUsers, icon: User, subtext: `${(kpi.activeUserRate * 100).toFixed(1)}% of total` },
    { name: 'Total Events', value: kpi.totalEvents, icon: Calendar, subtext: `${kpi.publishedEvents || 0} published` },
    { name: 'Tickets Sold', value: kpi.totalTicketsIssued, icon: Ticket, subtext: `+${kpi.ticketsSoldLast30Days || 0} last month` },
    { name: 'Total Revenue', value: `$${(kpi.revenueCents / 100).toFixed(2)}`, icon: DollarSign, subtext: `+${kpi.revenueCentsLast30Days ? (kpi.revenueCentsLast30Days / 100).toFixed(2) : 0} this month` },
    { name: 'Total Orders', value: kpi.totalOrders, icon: ShoppingCart, subtext: `${kpi.paidOrders || 0} paid` },
  ] : [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
        <Button as={Link} to="/admin/create-event" className="flex items-center gap-2">
          <Plus size={18} /> New Event
        </Button>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-500 py-10">Loading key metrics...</p>
        ) : (
          kpiMetrics.map((item, index) => (
            <Card key={index} className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-6 flex items-start space-x-4 transition-transform duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl">
              <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-full text-indigo-400">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="text-lg font-medium text-gray-400">{item.name}</div>
                <div className="mt-1 text-4xl font-bold text-indigo-300">{item.value}</div>
                <div className="mt-1 text-sm text-gray-500">{item.subtext}</div>
              </div>
            </Card>
          ))
        )}
      </div>
      
      <hr className="border-gray-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Management & Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/events" className="group">
            <Card className="p-6 bg-gray-800/60 border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-indigo-500 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">Manage Events</h3>
                <Calendar className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <p className="text-gray-400 text-sm mb-4">View, edit, and publish all events on the platform.</p>
              <span className="flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Go to Events <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Card>
          </Link>

          <Link to="/admin/users" className="group">
            <Card className="p-6 bg-gray-800/60 border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-indigo-500 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">Manage Users</h3>
                <Users className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <p className="text-gray-400 text-sm mb-4">Oversee user accounts, roles, and permissions.</p>
              <span className="flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Go to Users <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Card>
          </Link>

          <Link to="/admin/discounts" className="group">
            <Card className="p-6 bg-gray-800/60 border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-indigo-500 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">Manage Discounts</h3>
                <ShoppingCart className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <p className="text-gray-400 text-sm mb-4">Track and audit all orders placed on the platform.</p>
              <span className="flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Go to Orders <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Card>
          </Link>

          <Link to="/admin/audit-logs" className="group">
            <Card className="p-6 bg-gray-800/60 border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-indigo-500 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">Audit Logs</h3>
                <BarChart2 className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <p className="text-gray-400 text-sm mb-4">Inspect a detailed log of all system activities.</p>
              <span className="flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Go to Logs <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}