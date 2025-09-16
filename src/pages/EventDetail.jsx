import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEvent, getTicketTypes } from '../api/events'
import { createOrder } from '../api/orders'
import Card from '../components/Card'
import Button from '../components/Button'
import toast from 'react-hot-toast'

export default function EventDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const [event, setEvent] = useState(null)
  const [types, setTypes] = useState([])
  const [qty, setQty] = useState({})

  useEffect(() => {
    getEvent(id).then(setEvent).catch(()=>toast.error('Event not found'))
    getTicketTypes(id).then(setTypes).catch(()=>toast.error('Failed to load tickets'))
  }, [id])

  const add = (ttId, q) => setQty(s => ({ ...s, [ttId]: Math.max(0, (s[ttId]||0) + q) }))

  const checkout = async () => {
    const items = Object.entries(qty).filter(([k,v]) => v>0).map(([k,v]) => ({ ticketTypeId:+k, quantity:v }))
    if (!items.length) return toast('Select at least one ticket')
    try {
      const res = await createOrder({ items, discountCode:null, buyerName:'', buyerEmail:'' })
      toast.success('Order created')
      nav('/checkout?orderId='+res.id)
    } catch { toast.error('Could not create order') }
  }

  if (!event) return null
  return (
    <div className="space-y-5">
      <Card>
        <h2 className="text-2xl font-semibold text-indigo-300">{event.title}</h2>
        <p className="text-gray-300 mt-2">{event.venueName} • {event.locationCity}</p>
        {event.description && <p className="text-gray-400 mt-3">{event.description}</p>}
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {types.map(t => (
          <Card key={t.id} className="flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-100">{t.name}</h3>
              <div className="text-indigo-300 text-xl font-semibold mt-1">
                {(t.priceCents/100).toFixed(2)} {t.currency}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                On sale: {new Date(t.salesStart).toLocaleDateString()} – {new Date(t.salesEnd).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button variant="secondary" onClick={()=>add(t.id,-1)}>-</Button>
              <span className="w-10 text-center">{qty[t.id] || 0}</span>
              <Button onClick={()=>add(t.id,1)}>+</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={checkout}>Checkout</Button>
      </div>
    </div>
  )
}
