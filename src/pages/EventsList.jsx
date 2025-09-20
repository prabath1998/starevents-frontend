import { useEffect, useState } from "react";
import { listEvents } from "../api/events";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Empty from "../components/Empty";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Input } from "../components/Input";
import { debounce } from "lodash";
import SkeletonCard from "../components/SkeletonCard"; 

const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2940&auto=format&fit=crop";

export default function EventsList() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const result = await listEvents({ page: 1, pageSize: 21, q });
        setData(result);
      } catch (error) {
        console.error("Failed to fetch events:", error);
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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map(
            (
              _,
              index 
            ) => (
              <SkeletonCard key={index} />
            )
          )}
        </div>
      );
    }

    if (data.items.length === 0) {
      return (
        <Empty
          title="No events found"
          description="Try adjusting your search or check back later."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.items.map((e) => (
          <Link key={e.id} to={`/events/${e.id}`} className="group block">
            <Card className="h-full flex flex-col bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-lg hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
              <img
                src={e.imageUrl || DEFAULT_EVENT_IMAGE}
                alt={e.title}
                className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                    {e.title}
                  </h3>
                  <div className="mt-4 space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-indigo-400" />
                      <span>{new Date(e.startTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-5 w-5 text-indigo-400" />
                      <span>
                        {e.venueName}
                        {e.locationCity ? `, ${e.locationCity}` : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Upcoming Events
        </h1>
        <p className="text-gray-400 mb-6">
          Explore a variety of events happening near you.
        </p>
        <div className="w-full max-w-lg mx-auto">
          <Input
            label="Search events"
            placeholder="Search by title, venue, or keyword..."
            value={q}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
