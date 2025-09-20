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

    const change = async (id, st) => {
        await adminChangeEventStatus(id, st);
        toast.success('Status updated');
        load()
    }

    // Function to download report as CSV
    const downloadReport = () => {
        if (data.items.length === 0) {
            toast.error('No data to download');
            return;
        }

        // Define CSV headers
        const headers = ['Title', 'Venue', 'City', 'Start Time', 'Status'];

        // Convert data to CSV format
        const csvData = data.items.map(item => [
            `"${item.title.replace(/"/g, '""')}"`,
            `"${(item.venueName || '').replace(/"/g, '""')}"`,
            `"${(item.city || '').replace(/"/g, '""')}"`,
            `"${new Date(item.startTime).toLocaleString()}"`,
            `"${item.status}"`
        ].join(','));

        // Combine headers and data
        const csvContent = [headers.join(','), ...csvData].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `events-report-${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success('Report downloaded');
    }

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

            {/* Add download button */}
            <div className="flex justify-end">
                <Button
                    onClick={downloadReport}
                    className="flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Report
                </Button>
            </div>

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
