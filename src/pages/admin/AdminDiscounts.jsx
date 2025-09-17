import { useEffect, useState } from 'react'
import { adminListDiscounts, adminToggleDiscount } from '../../api/admin'
import Table from '../../components/Table'
import Card from '../../components/Card'
import { Input, Select } from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

export default function AdminDiscounts() {
 const [q, setQ] = useState('');
const [active, setActive] = useState('');
const [data, setData] = useState({ items: [] });

useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      const res = await adminListDiscounts({
        q,
        active: active === '' ? undefined : active === 'true'
      });
      if (!cancelled) setData(res);
    } catch {
      if (!cancelled) toast.error('Load failed');
    }
  })();

  return () => { cancelled = true; };
}, [q, active]);

  const toggle = async (d)=>{ await adminToggleDiscount(d.id, !d.isActive); toast.success('Updated'); load() }

  return (
    <div className="space-y-4">
      <Card>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Search code" value={q} onChange={e=>setQ(e.target.value)} />
          <Select value={active} onChange={e=>setActive(e.target.value)}>
            <option value="">Any</option><option value="true">Active</option><option value="false">Inactive</option>
          </Select>
        </div>
      </Card>
      <Table
        columns={[
          { key:'code', label:'Code' },
          { key:'type', label:'Type' },
          { key:'value', label:'Value' },
          { key:'scope', label:'Scope' },
          { key:'ticketTypeId', label:'TicketTypeId' },
          { key:'isActive', label:'Active', render:v=>v?'Yes':'No' },
          { key:'usedCount', label:'Used' },
          { key:'actions', label:'Actions', render:(_,r)=>(<Button onClick={()=>toggle(r)}>{r.isActive?'Disable':'Enable'}</Button>) }
        ]}
        rows={data.items}
        keyField="id"
      />
    </div>
  )
}
