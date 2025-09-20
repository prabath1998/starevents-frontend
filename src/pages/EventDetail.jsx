import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent, getTicketTypes } from "../api/events";
import { createOrder } from "../api/orders";
import Card from "../components/Card";
import Button from "../components/Button";
import PromoHint from "../components/PromoHint";
import toast from "react-hot-toast";
import {
  ClockIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "../utils/helper";
import { listPublicDiscounts } from "../api/discounts";

const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2940&auto=format&fit=crop";

export default function EventDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [event, setEvent] = useState(null);
  const [types, setTypes] = useState([]);
  const [qty, setQty] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasPromo, setHasPromo] = useState(false);

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
        const promos = await listPublicDiscounts(id);
        setHasPromo(promos?.length > 0);
      } catch (error) {
        console.error("Failed to load event or tickets:", error);
        toast.error("Event not found or failed to load tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const add = (ttId, q) =>
    setQty((s) => ({ ...s, [ttId]: Math.max(0, (s[ttId] || 0) + q) }));

  const checkout = async () => {
    const items = Object.entries(qty)
      .filter(([k, v]) => v > 0)
      .map(([k, v]) => ({ ticketTypeId: +k, quantity: v }));

    if (!items.length) {
      return toast.error("Please select at least one ticket to proceed.");
    }

    try {
      const res = await createOrder({
        items,
        discountCode: null,
        buyerName: "",
        buyerEmail: "",
      });
      toast.success("Order created successfully!");
      nav("/checkout?orderId=" + res.id);
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Could not create order. Please try again.");
    }
  };

  const totalCents = Object.entries(qty).reduce((total, [typeId, quantity]) => {
    const ticketType = types.find((t) => t.id === +typeId);
    return total + (ticketType ? ticketType.priceCents * quantity : 0);
  }, 0);

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {hasPromo && <PromoHint eventId={id} />}    
      <div className="relative w-full h-screen lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={event.imageUrl || DEFAULT_EVENT_IMAGE}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent z-10"></div>
        <div className="relative z-20 text-center p-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight drop-shadow-lg animate-fade-in-up">
            {event.title}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center text-gray-300 mt-6 gap-4 sm:gap-10 text-lg">
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-6 w-6 text-indigo-400" />
              <span>
                {event.venueName} • {event.locationCity}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-indigo-400" />
              <span>{new Date(event.startTime).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
     
      <div className="container mx-auto px-4 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 bg-gray-800/50 border border-gray-700/50 rounded-3xl backdrop-blur-md shadow-2xl animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-6">
                About the Event
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {event.description ||
                  "No description available for this event."}
              </p>
            </Card>            
          </div>
        
          <div className="lg:col-span-1">
            <Card className="p-8 bg-gray-800/50 border border-gray-700/50 rounded-3xl backdrop-blur-md shadow-2xl sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Available Tickets
              </h2>
              <div className="space-y-6">
                {types.length > 0 ? (
                  types.map((t) => (
                    <div key={t.id} className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {t.name}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {t.description}
                          </p>
                        </div>
                        <div className="text-indigo-400 text-3xl font-bold ml-4">
                          {formatCurrency(t.priceCents, t.currency)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs text-gray-500">
                          Sales: {new Date(t.salesStart).toLocaleDateString()} –{" "}
                          {new Date(t.salesEnd).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => add(t.id, -1)}
                            disabled={(qty[t.id] || 0) === 0}
                            className="rounded-full w-8 h-8 flex items-center justify-center"
                          >
                            -<MinusIcon className="w-4 h-4" />
                          </Button>
                          <span className="w-10 text-center text-lg text-white font-semibold">
                            {qty[t.id] || 0}
                          </span>
                          <Button
                            onClick={() => add(t.id, 1)}
                            className="rounded-full w-8 h-8 flex items-center justify-center"
                          >
                            +<PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No tickets are currently available for this event.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      
      <div className="fixed bottom-0 left-0 right-0 bg-gray-950/70 border-t border-gray-800 backdrop-blur-xl p-6 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <span className="text-gray-300">Total:</span>
            <span className="text-white text-3xl font-bold ml-3">
              {formatCurrency(totalCents, types[0]?.currency || "LKR")}
            </span>
          </div>
          <Button
            onClick={checkout}
            disabled={Object.values(qty).every((q) => q === 0)}
            className="text-lg px-8 py-4"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
