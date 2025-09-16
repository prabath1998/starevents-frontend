export default function Button({ children, variant='primary', className='', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition'
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary:'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700',
    danger:  'bg-red-600 hover:bg-red-700 text-white',
    ghost:   'hover:bg-gray-800 text-gray-200'
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>
}
