import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { Sparkles, Ticket, QrCode } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter blur-sm"></div>
        <div className="relative z-10 mx-auto max-w-4xl text-center py-20 sm:py-32">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Experience the Beat. Secure Your Seat.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Your premier destination for concerts, festivals, and cultural events. Find your next unforgettable experience and get your tickets instantly.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/events">
              <Button className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold rounded-full shadow-lg transform hover:scale-105">
                Browse Events
              </Button>
            </Link>
            <a href="#how" className="flex items-center justify-center text-sm font-medium text-gray-300 hover:text-white transition-colors">
              How it works <span aria-hidden="true" className="ml-1">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how" className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-12">How it Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border border-gray-700/50 p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="p-3 rounded-full bg-indigo-500/10 mb-4">
              <Sparkles className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">1. Discover Your Vibe</h3>
            <p className="mt-2 text-sm text-gray-400">
              Explore a curated selection of events from music concerts to art exhibitions. Search by genre, location, or date to find your perfect match.
            </p>
          </Card>
          <Card className="bg-gray-800 border border-gray-700/50 p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="p-3 rounded-full bg-indigo-500/10 mb-4">
              <Ticket className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">2. Secure & Simple Booking</h3>
            <p className="mt-2 text-sm text-gray-400">
              Our streamlined checkout process ensures your ticket purchase is safe, fast, and effortless. Get instant confirmation right after payment.
            </p>
          </Card>
          <Card className="bg-gray-800 border border-gray-700/50 p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="p-3 rounded-full bg-indigo-500/10 mb-4">
              <QrCode className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">3. Go Live with Your E-Ticket</h3>
            <p className="mt-2 text-sm text-gray-400">
              No more paper tickets. Your e-ticket with a unique QR code is ready to scan directly from your phone. Just show up and enjoy the show!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}