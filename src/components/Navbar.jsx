import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Button from './Button'
import { MusicalNoteIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-gray-950/70 border-b border-gray-900">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-indigo-400">
          <MusicalNoteIcon className="h-6 w-6" />
          <span className="font-semibold">StarEvents</span>
        </Link>
        <div className="flex gap-4 ml-6">
          <NavLink to="/events" className={({isActive}) => isActive ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}>Events</NavLink>
          {user && <NavLink to="/orders" className="text-gray-300 hover:text-white">My Orders</NavLink>}
          {user && <NavLink to="/organizer" className="text-gray-300 hover:text-white">Organizer</NavLink>}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {!user ? (
            <>
              <NavLink to="/login" className="text-gray-300 hover:text-white">Login</NavLink>
              <NavLink to="/register"><Button>Register</Button></NavLink>
            </>
          ) : (
            <>
              <span className="hidden sm:flex items-center gap-2 text-gray-300">
                <UserCircleIcon className="h-6 w-6" /> {user.email}
              </span>
              <Button variant="secondary" className="flex items-center gap-2" onClick={logout}>
                <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
