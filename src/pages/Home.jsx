import { Link } from 'react-router-dom';
import Button from '../components/Button'; 
import Card from '../components/Card'; 
import { Sparkles, Ticket, QrCode } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate py-24 sm:py-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 opacity-40" 
          style={{
            background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.4) 0%, transparent 70%)'
          }}>
        </div>
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            Experience the Beat. Secure Your Seat.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Your premier destination for concerts, festivals, and cultural events. Find your next unforgettable experience and get your tickets instantly.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/events">
              <button 
                className="
                  px-8 py-3 rounded-full font-semibold transition-transform duration-300
                  transform hover:scale-105
                  bg-gradient-to-r from-indigo-500 to-purple-600
                  text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/50
                "
              >
                Browse Events
              </button>
            </Link>
            <a 
              href="#how" 
              className="
                flex items-center justify-center
                text-sm font-medium text-gray-400 hover:text-white transition-colors
              "
            >
              How it works <span aria-hidden="true" className="ml-1 text-xl">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how" className="mx-auto max-w-6xl py-16 sm:py-24 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-16">How it Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            className="
              bg-gray-800 border border-gray-700/50 p-8 flex flex-col items-center
              rounded-xl text-center transition-transform duration-500 transform
              hover:scale-105 hover:ring-2 hover:ring-indigo-500/50 relative
              overflow-hidden group
            "
          >
            <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="p-4 rounded-full bg-indigo-500/10 mb-6 relative z-10">
              <Sparkles className="h-10 w-10 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white relative z-10">1. Discover Your Vibe</h3>
            <p className="mt-3 text-sm text-gray-400 relative z-10">
              Explore a curated selection of events from music concerts to art exhibitions. Search by genre, location, or date to find your perfect match.
            </p>
          </Card>
          <Card 
            className="
              bg-gray-800 border border-gray-700/50 p-8 flex flex-col items-center
              rounded-xl text-center transition-transform duration-500 transform
              hover:scale-105 hover:ring-2 hover:ring-indigo-500/50 relative
              overflow-hidden group
            "
          >
            <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="p-4 rounded-full bg-indigo-500/10 mb-6 relative z-10">
              <Ticket className="h-10 w-10 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white relative z-10">2. Secure & Simple Booking</h3>
            <p className="mt-3 text-sm text-gray-400 relative z-10">
              Our streamlined checkout process ensures your ticket purchase is safe, fast, and effortless. Get instant confirmation right after payment.
            </p>
          </Card>
          <Card 
            className="
              bg-gray-800 border border-gray-700/50 p-8 flex flex-col items-center
              rounded-xl text-center transition-transform duration-500 transform
              hover:scale-105 hover:ring-2 hover:ring-indigo-500/50 relative
              overflow-hidden group
            "
          >
            <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="p-4 rounded-full bg-indigo-500/10 mb-6 relative z-10">
              <QrCode className="h-10 w-10 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white relative z-10">3. Go Live with Your E-Ticket</h3>
            <p className="mt-3 text-sm text-gray-400 relative z-10">
              No more paper tickets. Your e-ticket with a unique QR code is ready to scan directly from your phone. Just show up and enjoy the show!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}