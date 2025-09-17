import { useEffect, useState } from 'react'
import { adminListEvents, adminChangeEventStatus } from '../../api/admin'
import Table from '../../components/Table'
import Card from '../../components/Card'
import { Input, Select } from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

export default function AdminEvents() {
 const [q, setQ] = useState('');
const [status, setStatus] = useState('');
const [data, setData] = useState({ items: [] });

useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      const res = await adminListEvents({ q, status: status || undefined });
      if (!cancelled) setData(res);
    } catch {
      if (!cancelled) toast.error('Load failed');
    }
  })();

  return () => { cancelled = true; };
}, [q, status]);


  const change = async (id, st) => { await adminChangeEventStatus(id, st); toast.success('Status updated'); load() }

  return (
    <div className="space-y-4">
      <Card>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Search title/desc" value={q} onChange={e=>setQ(e.target.value)} />
          <Select value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">Any status</option>
            <option>Draft</option><option>Published</option><option>Canceled</option><option>Completed</option>
          </Select>
        </div>
      </Card>
      <Table
        columns={[
          { key:'title', label:'Title' },
          { key:'venueName', label:'Venue' },
          { key:'city', label:'City' },
          { key:'startTime', label:'Start', render:v=>new Date(v).toLocaleString() },
          { key:'status', label:'Status' },
          { key:'actions', label:'Actions', render:(_,r)=>(
            <div className="flex gap-2">
              <Button variant="secondary" onClick={()=>change(r.id,'Draft')}>Draft</Button>
              <Button onClick={()=>change(r.id,'Published')}>Publish</Button>
              <Button variant="danger" onClick={()=>change(r.id,'Canceled')}>Cancel</Button>
              <Button variant="secondary" onClick={()=>change(r.id,'Completed')}>Complete</Button>
            </div>
          )}
        ]}
        rows={data.items}
        keyField="id"
      />
    </div>
  )
}
