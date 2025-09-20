import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  listDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from '../../api/discounts';
import DiscountForm from '../../components/DiscountForm';
import { useParams } from 'react-router-dom';

export default function DiscountsPage() {
  const { eventId } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const data = await listDiscounts(eventId);
      
      setRows(Array.isArray(data?.items) ? data.items : []);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load discounts');
      setRows([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [eventId]); 

  const onCreate = async (payload) => {
    try {
      await createDiscount(eventId, payload);
      toast.success('Discount created');
      setShowForm(false);
      await load();
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data ?? 'Create failed');
    }
  };

  const onEdit = async (payload) => {
    try {
      await updateDiscount(eventId, editing.id, payload);
      toast.success('Discount updated');
      setEditing(null);
      setShowForm(false);
      await load();
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data ?? 'Update failed');
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this discount?')) return;
    try {
      await deleteDiscount(eventId, id);
      toast.success('Deleted');
      await load();
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data ?? 'Delete failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Discounts</h1>
        <button
          className="px-4 py-2 rounded-md bg-indigo-600"
          onClick={() => { setEditing(null); setShowForm(true); }}
        >
          New discount
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-slate-700 p-4 bg-slate-800/60">
          <DiscountForm
            editing={editing}
            onCancel={() => { setShowForm(false); setEditing(null); }}
            onSubmit={editing ? onEdit : onCreate}
          />
        </div>
      )}

      <div className="rounded-xl overflow-hidden border border-slate-700">
        <table className="w-full text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Value</th>
              <th className="px-3 py-2">Scope</th>
              <th className="px-3 py-2">TicketTypeId</th>
              <th className="px-3 py-2">MaxUses</th>
              <th className="px-3 py-2">Used</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2 w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-3 py-4" colSpan={9}>Loading…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-3 py-6 text-gray-400" colSpan={9}>No discounts yet.</td></tr>
            ) : rows.map((d) => (
              <tr key={d.id} className="border-t border-slate-700">
                <td className="px-3 py-2 font-mono">{d.code}</td>
                <td className="px-3 py-2">{d.type}</td>
                <td className="px-3 py-2">
                  {d.type === 'Percentage' ? `${d.value}%` : `${d.value}¢`}
                </td>
                <td className="px-3 py-2">{d.scope}</td>
                <td className="px-3 py-2">{d.ticketTypeId ?? '—'}</td>
                <td className="px-3 py-2">{d.maxUses ?? '—'}</td>
                <td className="px-3 py-2">{d.usedCount}</td>
                <td className="px-3 py-2">{d.isActive ? 'Yes' : 'No'}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded-md bg-slate-700"
                      onClick={() => { setEditing(d); setShowForm(true); }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded-md bg-rose-600"
                      onClick={() => onDelete(d.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
