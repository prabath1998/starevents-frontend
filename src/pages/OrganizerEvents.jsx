import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listMyEvents } from '../api/organizer';
import Card from '../components/Card';
import Button from '../components/Button';
import Empty from '../components/Empty';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function OrganizerEvents() {
  const [data, setData] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await listMyEvents();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        toast.error('Could not load your events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gray-800 rounded-xl shadow-lg">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">My Events</h2>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Manage all your created events in one place.</p>
        </div>
        <Link to="/organizer/create">
          <Button>Create New Event</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading events...</div>
      ) : data.items.length === 0 ? (
        <Empty 
          title="No events yet" 
          description="Click the button above to create your very first event." 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map(e => (
            <Card key={e.id} className="p-6 bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-lg hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-indigo-400 leading-tight">{e.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{e.venueName}</p>

              <div className="mt-4 space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <span>{new Date(e.startTime).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500" />
                  <span>{e.locationCity}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
                <Link 
                  to={`/organizer/${e.id}/ticket-types`} 
                  className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors"
                >
                  Manage tickets →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}