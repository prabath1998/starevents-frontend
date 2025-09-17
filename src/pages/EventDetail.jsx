import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, getTicketTypes } from '../api/events';
import { createOrder } from '../api/orders';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const DEFAULT_EVENT_IMAGE = 'https://images.unsplash.com/photo-1524368535928-5b8907844510?q=80&w=2940&auto=format&fit=crop';

export default function EventDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [event, setEvent] = useState(null);
  const [types, setTypes] = useState([]);
  const [qty, setQty] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [eventData, ticketData] = await Promise.all([
          getEvent(id),
          getTicketTypes(id),
        ]);
        setEvent(eventData);
        setTypes(ticketData);
      } catch (error) {
        console.error('Failed to load event or tickets:', error);
        toast.error('Event not found or failed to load tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const add = (ttId, q) => setQty(s => ({ ...s, [ttId]: Math.max(0, (s[ttId] || 0) + q) }));

  const checkout = async () => {
    const items = Object.entries(qty).filter(([k, v]) => v > 0).map(([k, v]) => ({ ticketTypeId: +k, quantity: v }));
    if (!items.length) {
      return toast.error('Select at least one ticket to proceed.');
    }
    try {
      const res = await createOrder({ items, discountCode: null, buyerName: '', buyerEmail: '' });
      toast.success('Order created successfully!');
      nav('/checkout?orderId=' + res.id);
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Could not create order. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 mt-10">Loading event details...</div>;
  }

  if (!event) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="relative w-full h-80 overflow-hidden rounded-2xl shadow-xl mb-8">
        <img
          src={event.imageUrl || DEFAULT_EVENT_IMAGE}
          alt={event.title}
          className="w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold">{event.title}</h1>
          <div className="flex items-center text-gray-300 mt-2 space-x-4">
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-5 w-5" />
              <span>{event.venueName} • {event.locationCity}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-5 w-5" />
              <span>{new Date(event.startTime).toLocaleString()}</span>
            </div>
          </div>
          {event.description && <p className="text-gray-400 mt-4 max-w-2xl">{event.description}</p>}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Available Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map(t => (
          <Card key={t.id} className="flex flex-col p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:border-indigo-500 transition-all duration-300">
            <div className="flex-1 mb-4">
              <h3 className="text-xl font-semibold text-gray-100">{t.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{t.description}</p>
            </div>
            <div className="mt-auto">
              <div className="text-indigo-400 text-2xl font-bold">
               {t.priceCents.toFixed(2)} {t.currency}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Sales: {new Date(t.salesStart).toLocaleDateString()} – {new Date(t.salesEnd).toLocaleDateString()}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="secondary" onClick={() => add(t.id, -1)} className="rounded-full w-8 h-8 flex items-center justify-center">-</Button>
                  <span className="w-10 text-center text-lg text-white font-semibold">{qty[t.id] || 0}</span>
                  <Button onClick={() => add(t.id, 1)} className="rounded-full w-8 h-8 flex items-center justify-center">+</Button>
                </div>
                <div className="text-gray-400 text-sm">
                  Subtotal: {(qty[t.id] * t.priceCents || 0).toFixed(2)} {t.currency}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Sticky Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 shadow-top z-50">
        <div className="container mx-auto flex justify-end">
          <Button onClick={checkout} disabled={Object.values(qty).every(q => q === 0)}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}