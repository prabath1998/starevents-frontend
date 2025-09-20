// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   listDiscounts,
//   createDiscount,
//   updateDiscount,
//   deleteDiscount,
// } from "../../api/discounts";
// import DiscountForm from "../../components/DiscountForm";

// export default function DiscountsPage() {
//   const { eventId } = useParams(); 
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const data = await listDiscounts(eventId);
//       setRows(data);
//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to load discounts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [eventId]);

//   const onCreate = async (payload) => {
//     try {
//       await createDiscount(eventId, payload);
//       toast.success("Discount created");
//       setShowForm(false);
//       await load();
//     } catch (e) {
//       console.error(e);
//       toast.error(e.response?.data ?? "Create failed");
//     }
//   };

//   const onEdit = async (payload) => {
//     try {
//       await updateDiscount(eventId, editing.id, payload);
//       toast.success("Discount updated");
//       setEditing(null);
//       setShowForm(false);
//       await load();
//     } catch (e) {
//       console.error(e);
//       toast.error(e.response?.data ?? "Update failed");
//     }
//   };

//   const onDelete = async (id) => {
//     if (!confirm("Delete this discount?")) return;
//     try {
//       await deleteDiscount(eventId, id);
//       toast.success("Deleted");
//       await load();
//     } catch (e) {
//       console.error(e);
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <h1 className="text-2xl font-semibold">Discounts</h1>

//       {/* Create form */}
//       <div className="bg-neutral-900 p-4 rounded space-y-3">
//         <div className="grid grid-cols-2 gap-3">
//           <input
//             className="bg-neutral-800 px-3 py-2 rounded"
//             placeholder="CODE"
//             value={form.code}
//             onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
//           />
//           <select
//             className="bg-neutral-800 px-3 py-2 rounded"
//             value={form.kind}
//             onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value }))}
//           >
//             <option value="percent">Percent</option>
//             <option value="fixed">Fixed (LKR cents)</option>
//           </select>
//           {form.kind === "percent" ? (
//             <input
//               className="bg-neutral-800 px-3 py-2 rounded"
//               type="number"
//               min="1"
//               max="100"
//               placeholder="% off"
//               value={form.percentOff}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, percentOff: e.target.value }))
//               }
//             />
//           ) : (
//             <input
//               className="bg-neutral-800 px-3 py-2 rounded"
//               type="number"
//               min="0"
//               placeholder="Amount off (cents)"
//               value={form.amountOffCents ?? ""}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, amountOffCents: e.target.value }))
//               }
//             />
//           )}
//           <input
//             className="bg-neutral-800 px-3 py-2 rounded"
//             type="number"
//             min="1"
//             placeholder="Max redemptions"
//             value={form.maxRedemptions}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, maxRedemptions: e.target.value }))
//             }
//           />
//           <input
//             className="bg-neutral-800 px-3 py-2 rounded"
//             type="datetime-local"
//             value={form.startsAt}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, startsAt: e.target.value }))
//             }
//           />
//           <input
//             className="bg-neutral-800 px-3 py-2 rounded"
//             type="datetime-local"
//             value={form.endsAt}
//             onChange={(e) => setForm((f) => ({ ...f, endsAt: e.target.value }))}
//           />
//           <input
//             className="bg-neutral-800 px-3 py-2 rounded"
//             type="number"
//             min="0"
//             placeholder="Min order (cents)"
//             value={form.minOrderSubtotalCents ?? ""}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, minOrderSubtotalCents: e.target.value }))
//             }
//           />
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={form.isActive}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, isActive: e.target.checked }))
//               }
//             />
//             <span>Active</span>
//           </label>
//         </div>
//         <button
//           onClick={create}
//           className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500"
//         >
//           Create
//         </button>
//       </div>

//       {/* List */}
//       <div className="bg-neutral-900 p-4 rounded">
//         {loading ? (
//           <p className="text-gray-400">Loading…</p>
//         ) : items.length === 0 ? (
//           <p className="text-gray-400">No discounts yet.</p>
//         ) : (
//           <table className="w-full text-sm">
//             <thead className="text-gray-400">
//               <tr className="text-left">
//                 <th className="py-2">Code</th>
//                 <th>Type</th>
//                 <th>Value</th>
//                 <th>Max</th>
//                 <th>Redeemed</th>
//                 <th>Active</th>
//                 <th>Window</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((d) => (
//                 <tr key={d.id} className="border-t border-neutral-800">
//                   <td className="py-2 font-mono">{d.code}</td>
//                   <td>{d.type}</td>
//                   <td>
//                     {d.type === 0 /* Percent */
//                       ? `${d.percentOff}%`
//                       : `LKR ${money(d.amountOffCents)}`}
//                   </td>
//                   <td>{d.maxRedemptions}</td>
//                   <td>{d.redeemedCount}</td>
//                   <td>{d.isActive ? "Yes" : "No"}</td>
//                   <td className="text-xs">
//                     {d.startsAt ? new Date(d.startsAt).toLocaleString() : "—"} →{" "}
//                     {d.endsAt ? new Date(d.endsAt).toLocaleString() : "—"}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => toggle(d.id)}
//                       className="px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-600"
//                     >
//                       Toggle
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
