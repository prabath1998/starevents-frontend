export default function Table({ columns=[], rows=[], keyField='id', empty="No data" }) {
  return (
    <div className="overflow-x-auto border border-gray-800 rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-900/80">
          <tr>
            {columns.map(col => (
              <th key={col.key||col.label} className="text-left px-3 py-2 font-semibold text-gray-300">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={columns.length}>{empty}</td></tr>
          ) : rows.map(r => (
            <tr key={r[keyField]} className="border-t border-gray-800 hover:bg-gray-900/50">
              {columns.map(col => (
                <td key={col.key||col.label} className="px-3 py-2 text-gray-200">
                  {col.render ? col.render(r[col.key], r) : r[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
