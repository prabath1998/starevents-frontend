export default function Empty({ title="Nothing here", subtitle="Try changing filters" }) {
  return (
    <div className="text-center py-16 border border-dashed border-gray-800 rounded-xl">
      <h3 className="text-lg text-gray-300">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  )
}
