import Navbar from './components/Navbar.jsx'
import RoutesView from './routes.jsx'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-6xl w-full mx-auto px-4 py-6 flex-1">
        <RoutesView />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-gray-900 text-gray-100 border border-gray-700',
          success: { iconTheme: { primary: '#4ade80', secondary: '#0f172a' } },
          error:   { iconTheme: { primary: '#f87171', secondary: '#0f172a' } },
        }}
      />
    </div>
  )
}
