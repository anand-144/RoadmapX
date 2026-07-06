import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Bell,
  Plus,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 font-medium ${
      isActive
        ? "text-white"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white bg-white text-lg font-bold text-black">
              R
            </div>

            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-wide text-white">
                RoadmapX
              </h1>

              <p className="mb-1 text-xs text-yellow-500">
                Learn • Build • Share
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 lg:flex">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/explore" className={navLinkClass}>
              Explore
            </NavLink>

            <NavLink to="/builder" className={navLinkClass}>
              Builder
            </NavLink>

            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-white hover:text-white"
              >
                <Search size={19} />
              </button>

              <div
                className={`absolute right-0 top-14 overflow-hidden transition-all duration-300 ${
                  searchOpen
                    ? "w-80 opacity-100"
                    : "w-0 opacity-0"
                }`}
              >
                <div className="flex items-center rounded-xl border border-white/10 bg-[#111111] px-4 py-3 shadow-2xl">

                  <Search
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search roadmaps..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    autoFocus
                    className="ml-3 w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                  />

                  <button
                    onClick={() => {
                      setSearch("");
                      setSearchOpen(false);
                    }}
                    className="ml-2 text-gray-400 transition hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
                        {/* Notifications */}
            <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-white hover:text-white">
              <Bell size={19} />

              <span className="absolute right-2 top-2 h-3 w-3 rounded-full bg-red-600"></span>
            </button>

            {/* Create */}
            <Link
              to="/builder"
              className="hidden items-center gap-2 rounded-xl border border-white bg-white px-5 py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white lg:flex"
            >
              <Plus size={18} />
              Create
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="hidden rounded-xl border-2 border-white px-5 py-3 font-medium text-white transition-all duration-300 hover:bg-white/90 hover:text-black md:block"
            >
              Login
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all lg:hidden"
            >
              {menuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`fixed left-0 right-0 top-20 z-40 overflow-hidden border-b border-white/10 bg-black transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `mt-2 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/builder"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `mt-2 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Builder
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `mt-2 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-6 rounded-xl border border-white bg-white py-3 text-center font-semibold text-black transition hover:bg-black hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;