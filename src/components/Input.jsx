export function Input({ label, hint, ...props }) {
  return (
    <label className="grid gap-1">
      {label && <span className="text-sm text-gray-300">{label}</span>}
      <input
        className="rounded-lg bg-gray-900 border border-gray-800 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
      {hint && <span className="text-xs text-gray-500">{hint}</span>}
    </label>
  )
}
export function Textarea({ label, ...props }) {
  return (
    <label className="grid gap-1">
      {label && <span className="text-sm text-gray-300">{label}</span>}
      <textarea
        className="rounded-lg bg-gray-900 border border-gray-800 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
    </label>
  )
}
export function Select({ label, children, ...props }) {
  return (
    <label className="grid gap-1">
      {label && <span className="text-sm text-gray-300">{label}</span>}
      <select
        className="rounded-lg bg-gray-900 border border-gray-800 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      >{children}</select>
    </label>
  )
}
