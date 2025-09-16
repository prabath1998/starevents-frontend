export default function Field({ label, children }) {
  return (
    <label style={{ display:'grid', gap:6 }}>
      <span>{label}</span>
      {children}
    </label>
  )
}
