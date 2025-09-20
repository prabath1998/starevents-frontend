import { useEffect, useMemo, useState } from 'react';
// import { listTicketTypes } from '../api/discounts';

const initial = {
  code: '',
  type: 'Percentage',     
  value: 10,
  scope: 'Order',         
  ticketTypeId: null,
  startsAt: '',
  endsAt: '',
  maxUses: null,
  minSubtotalCents: null,
  isActive: true,
};

export default function DiscountForm({ onSubmit, onCancel, editing }) {
  const [form, setForm] = useState(editing ? {
    ...editing,
    startsAt: editing.startsAt ? editing.startsAt.slice(0,16) : '',
    endsAt: editing.endsAt ? editing.endsAt.slice(0,16) : '',
  } : initial);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    let mounted = true;
    // listTicketTypes().then((d) => mounted && setTypes(d));
    return () => (mounted = false);
  }, []);

  const canPickTicket = useMemo(() => form.scope === 'TicketType', [form.scope]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    
    const payload = {
      code: form.code.trim(),
      type: form.type,
      value: Number(form.value),
      scope: form.scope,
      ticketTypeId: canPickTicket && form.ticketTypeId ? Number(form.ticketTypeId) : null,
      startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
      endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : null,
      maxUses: form.maxUses ? Number(form.maxUses) : null,
      minSubtotalCents: form.minSubtotalCents ? Number(form.minSubtotalCents) : null,
      isActive: !!form.isActive,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-gray-300">Code</span>
          <input
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.code}
            onChange={(e) => set('code', e.target.value.toUpperCase())}
            required
            maxLength={50}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Type</span>
          <select
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.type}
            onChange={(e) => set('type', e.target.value)}
          >
            <option>Percentage</option>
            <option>Amount</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Value {form.type === 'Percentage' ? '(%)' : '(cents)'}</span>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.value}
            onChange={(e) => set('value', e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Scope</span>
          <select
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.scope}
            onChange={(e) => set('scope', e.target.value)}
          >
            <option>Order</option>
            <option>TicketType</option>
          </select>
        </label>

        <label className={`block ${canPickTicket ? '' : 'opacity-50'}`}>
          <span className="text-sm text-gray-300">Ticket Type (when Scope = TicketType)</span>
          <select
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.ticketTypeId ?? ''}
            onChange={(e) => set('ticketTypeId', e.target.value || null)}
            disabled={!canPickTicket}
          >
            <option value="">— Not selected —</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.eventTitle ? `${t.eventTitle} — ` : ''}{t.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Starts At</span>
          <input
            type="datetime-local"
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.startsAt}
            onChange={(e) => set('startsAt', e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Ends At</span>
          <input
            type="datetime-local"
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.endsAt}
            onChange={(e) => set('endsAt', e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Max Uses</span>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.maxUses ?? ''}
            onChange={(e) => set('maxUses', e.target.value ? Number(e.target.value) : null)}
            placeholder="Unlimited"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Min Subtotal (cents)</span>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2"
            value={form.minSubtotalCents ?? ''}
            onChange={(e) => set('minSubtotalCents', e.target.value ? Number(e.target.value) : null)}
            placeholder="Optional"
          />
        </label>
      </div>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => set('isActive', e.target.checked)}
        />
        <span className="text-gray-300">Active</span>
      </label>

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-slate-700">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600">
          {editing ? 'Save changes' : 'Create discount'}
        </button>
      </div>
    </form>
  );
}
