import { useEffect, useState } from 'react'
import { adminAuditLogs } from '../../api/admin'
import Table from '../../components/Table'
import Card from '../../components/Card'
import Button from '../../components/Button'

export default function AdminAuditLogs() {
 const [page, setPage] = useState(1);
const [data, setData] = useState({ items: [], total: 0, pageSize: 50 });

useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      const res = await adminAuditLogs({ page, pageSize: 50 });
      if (!cancelled) setData(res);
    } catch {
      if (!cancelled) toast.error('Load failed');
    }
  })();

  return () => { cancelled = true; };
}, [page]);


  return (
    <div className="space-y-3">
      <Table
        columns={[
          { key:'id', label:'ID' },
          { key:'actorUserId', label:'Actor' },
          { key:'action', label:'Action' },
          { key:'entityType', label:'Entity' },
          { key:'entityId', label:'EntityId' },
          { key:'createdAt', label:'At', render:v=>new Date(v).toLocaleString() },
        ]}
        rows={data.items}
        keyField="id"
      />
      <Card>
        <div className="flex items-center justify-between">
          <Button variant="secondary" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</Button>
          <div className="text-sm text-gray-400">Page {page}</div>
          <Button variant="secondary" disabled={(page*data.pageSize)>=data.total} onClick={()=>setPage(p=>p+1)}>Next</Button>
        </div>
      </Card>
    </div>
  )
}
