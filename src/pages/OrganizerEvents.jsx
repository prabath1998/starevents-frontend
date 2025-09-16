import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listMyEvents } from '../api/organizer'
import Card from '../components/Card'
import Button from '../components/Button'
import Empty from '../components/Empty'

export default function OrganizerEvents() {
  const [data, setData] = useState({ items: [] })
  useEffect(() => { listMyEvents().then(setData).catch(()=>{}) }, [])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-indigo-300">My Events</h2>
        <Link to="/organizer/create"><Button>Create Event</Button></Link>
      </div>
      {data.items.length === 0 ? <Empty title="No events yet" subtitle="Create your first event" /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.items.map(e => (
            <Card key={e.id}>
              <h3 className="text-lg font-medium text-gray-100">{e.title}</h3>
              <p className="text-sm text-gray-400">{e.venueName}</p>
              <div className="flex justify-between mt-3">
                <span className="text-xs text-gray-500">{new Date(e.startTime).toLocaleString()}</span>
                <Link to={`/organizer/${e.id}/ticket-types`} className="text-indigo-400 hover:text-indigo-300 text-sm">Manage tickets →</Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
