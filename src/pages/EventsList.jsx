import { useEffect, useState } from 'react';
import { listEvents } from '../api/events';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Empty from '../components/Empty';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Input } from '../components/Input';
import { debounce } from 'lodash';

export default function EventsList() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const result = await listEvents({ page: 1, pageSize: 21, q });
        setData(result);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    const debouncedFetch = debounce(fetchEvents, 300);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [q]);

  const handleSearchChange = (e) => {
    setQ(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 text-center">Upcoming Events</h1>
        <p className="text-gray-400 text-center mb-6">Explore a variety of events happening near you.</p>
        <div className="w-full max-w-lg mx-auto">
          <Input
            label="Search events"
            placeholder="Search by title, venue, or keyword..."
            value={q}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading events...</div>
      ) : data.items.length === 0 ? (
        <Empty title="No events found" description="Try adjusting your search or check back later." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.items.map((e) => (
            <Link key={e.id} to={`/events/${e.id}`}>
              <Card className="h-full flex flex-col justify-between p-6 bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-lg hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                <div>
                  <h3 className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 leading-tight">
                    {e.title}
                  </h3>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <span>{new Date(e.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    <span>{e.venueName}{e.locationCity ? `, ${e.locationCity}` : ''}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}