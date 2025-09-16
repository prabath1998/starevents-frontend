import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Home() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-950 to-gray-900 border-indigo-900/40">
        <h1 className="text-2xl sm:text-3xl font-semibold text-indigo-300">Discover concerts & cultural events</h1>
        <p className="text-gray-300 mt-2">Browse upcoming shows, book tickets securely, and get instant QR e-tickets.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/events"><Button>Browse Events</Button></Link>
          <a href="#how" className="text-gray-300 hover:text-white">How it works →</a>
        </div>
      </Card>
      <div id="how" className="grid sm:grid-cols-3 gap-4">
        <Card><h3 className="font-medium">1. Find an event</h3><p className="text-sm text-gray-400">Search by city, category, or date.</p></Card>
        <Card><h3 className="font-medium">2. Book & pay</h3><p className="text-sm text-gray-400">Secure online payment & instant confirmation.</p></Card>
        <Card><h3 className="font-medium">3. Scan & enjoy</h3><p className="text-sm text-gray-400">Use your QR e-ticket at the venue.</p></Card>
      </div>
    </div>
  )
}
