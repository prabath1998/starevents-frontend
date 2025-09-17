import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Button from "./Button";
import {
  MusicalNoteIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = (
    <>
      <NavLink
        to="/events"
        onClick={toggleMenu}
        className={({ isActive }) =>
          `py-2 transition-colors ${
            isActive ? "text-indigo-400 font-semibold" : "text-gray-300 hover:text-white"
          }`
        }
      >
        Events
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/orders"
            onClick={toggleMenu}
            className="py-2 transition-colors text-gray-300 hover:text-white"
          >
            My Orders
          </NavLink>
          <NavLink
            to="/organizer"
            onClick={toggleMenu}
            className="py-2 transition-colors text-gray-300 hover:text-white"
          >
            Manage Events
          </NavLink>
          <NavLink
            to="/me/tickets"
            onClick={toggleMenu}
            className="py-2 transition-colors text-gray-300 hover:text-white"
          >
            My Tickets
          </NavLink>
          {user.roles?.includes("Admin") && (
            <NavLink
              to="/admin"
              onClick={toggleMenu}
              className="py-2 transition-colors text-gray-300 hover:text-white"
            >
              Admin Dashboard
            </NavLink>
          )}
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-gray-950/70 border-b border-gray-800">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
          <MusicalNoteIcon className="h-7 w-7" />
          <span className="font-bold text-xl">StarEvents</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between ml-8">
          <div className="flex items-center gap-6">
            {navLinks}
          </div>
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <NavLink to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Login
                </NavLink>
                <NavLink to="/register">
                  <Button>Register</Button>
                </NavLink>
              </>
            ) : (
              <>
                <span className="flex items-center gap-2 text-gray-300 font-medium mr-2">
                  <UserCircleIcon className="h-6 w-6" /> {user.email}
                </span>
                <Button variant="secondary" onClick={logout}>
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {!user ? (
            <NavLink to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
              Login
            </NavLink>
          ) : (
            <span className="text-gray-300 text-sm">{user.email}</span>
          )}
          <Button variant="secondary" onClick={toggleMenu} className="p-2">
            <span className="sr-only">Open menu</span>
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gray-950/90 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col gap-3 px-4">
          {navLinks}
          {user && (
            <Button variant="secondary" onClick={logout} className="mt-2 w-full justify-center">
              <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}