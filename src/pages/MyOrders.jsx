import { useEffect, useState } from 'react'
import { listMyOrders } from '../api/orders'
import Card from '../components/Card'
import Empty from '../components/Empty'

export default function MyOrders() {
  const [data, setData] = useState({ items: [] })
  useEffect(()=>{ listMyOrders().then(setData).catch(()=>{}) }, [])

  if (!data.items.length) return <Empty title="No orders yet" subtitle="Your purchases will appear here" />

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.items.map(o => (
        <Card key={o.id}>
          <div className="flex items-center justify-between">
            <div className="text-indigo-300 font-medium">{o.orderNumber}</div>
            <span className="text-xs rounded px-2 py-1 border border-gray-700 bg-gray-800">{o.status}</span>
          </div>
          <div className="text-lg font-semibold mt-2">{(o.totalCents/100).toFixed(2)} {o.currency}</div>
          <div className="text-xs text-gray-500 mt-1">{new Date(o.createdAt).toLocaleString()}</div>
        </Card>
      ))}
    </div>
  )
}
