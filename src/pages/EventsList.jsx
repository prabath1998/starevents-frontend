import { useEffect, useState } from 'react'
import { listEvents } from '../api/events'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Empty from '../components/Empty'
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { Input } from '../components/Input'

export default function EventsList() {
  const [data, setData] = useState({ items: [], total: 0 })
  const [q, setQ] = useState('')

  useEffect(() => { listEvents({ page:1, pageSize:21, q }).then(setData).catch(console.error) }, [q])

  return (
    <div className="space-y-4">
      <Card>
        <Input label="Search events" placeholder="Type a title, venue, or keyword…" value={q} onChange={e=>setQ(e.target.value)} />
      </Card>

      {data.items.length === 0 ? <Empty title="No events found" /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.items.map(e => (
            <Link key={e.id} to={`/events/${e.id}`} className="group">
              <Card className="h-full hover:border-indigo-600/70 transition">
                <h3 className="text-lg font-semibold text-indigo-400 group-hover:text-indigo-300">{e.title}</h3>
                <div className="mt-2 text-sm text-gray-400 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> {new Date(e.startTime).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" /> {e.venueName}{e.locationCity ? `, ${e.locationCity}` : ''}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
