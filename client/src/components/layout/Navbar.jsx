import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Bell,
  Plus,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Shield,
} from "lucide-react";

import toast from "react-hot-toast";

const Navbar = () => {
const [menuOpen, setMenuOpen] = useState(false);
const [searchOpen, setSearchOpen] = useState(false);
const [profileOpen, setProfileOpen] = useState(false);
const [search, setSearch] = useState("");

const profileRef = useRef(null);
const menuRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    
    toast.success("Logged out successfully ")

    setTimeout(() => {      
      window.location.href = "/";
    },1000);
  };

  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 font-medium ${
      isActive ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  useEffect(() => {
  const handleClickOutside = (event) => {
    // Close profile dropdown
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setProfileOpen(false);
    }

    if (
      menuOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white bg-white text-lg font-bold text-black">
              R
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-wide text-white">RoadmapX</h1>
              <p className="text-xs text-yellow-500">Learn • Build • Share</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/explore" className={navLinkClass}>Explore</NavLink>
            <NavLink to="/builder" className={navLinkClass}>Builder</NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {/* Mobile Profile */}
<div ref={profileRef} className="relative md:hidden">
  {user ? (
    <>
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-sm text-black">
          {user.name?.charAt(0).toUpperCase()}
        </div>
      </button>

      {profileOpen && (
        <div className="fixed right-4 top-24 z-[60] w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-black/80 p-2 shadow-2xl">

          <div className="border-b border-white/10 p-3">
            <h3 className="font-semibold text-white">
              {user.name}
            </h3>

            <p className="text-sm text-gray-400">
              @{user.username}
            </p>
          </div>

          <Link
            to={`/profile/${user.username}`}
            onClick={() => {
              setProfileOpen(false);
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"
          >
            <User size={18} />
            Profile
          </Link>

          <Link
            to="/dashboard"
            onClick={() => {
              setProfileOpen(false);
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {user.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => {
                setProfileOpen(false);
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"
            >
              <Shield size={18} />
              Admin Panel
            </Link>
          )}

          <Link
            to="/settings"
            onClick={() => {
              setProfileOpen(false);
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"
          >
            <Settings size={18} />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg p-3 text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}
    </>
  ) : (
    <Link
      to="/login"
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:border-white hover:text-white"
    >
      <User size={20} />
    </Link>
  )}
</div>

            <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:border-white hover:text-white">
              <Bell size={19}/>
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-600"/>
            </button>

            <Link
              to="/builder"
              className="hidden lg:flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-3 font-semibold text-black hover:bg-black hover:text-white transition"
            >
              <Plus size={18}/>Create
            </Link>

            {user ? (
              <div ref={profileRef} className="relative hidden md:block">
                <button
                  onClick={()=>setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-black">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={18}/>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-[#111] p-2 shadow-2xl">
                    <div className="border-b border-white/10 p-3">
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>

                    <Link to={`/profile/${user.username}`} onClick={()=>setProfileOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"><User size={18}/>Profile</Link>
                    <Link to="/dashboard" onClick={()=>setProfileOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"><LayoutDashboard size={18}/>Dashboard</Link>

                    {user.role==="admin" && (
                      <Link to="/admin" onClick={()=>setProfileOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"><Shield size={18}/>Admin Panel</Link>
                    )}

                    <Link to="/settings" onClick={()=>setProfileOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"><Settings size={18}/>Settings</Link>

                    <button onClick={handleLogout} className="mt-2 flex w-full items-center gap-3 rounded-lg p-3 text-red-400 hover:bg-red-500/10">
                      <LogOut size={18}/>Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block rounded-xl border-2 border-white px-5 py-3 font-medium text-white hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
            )}

            <button
              onClick={()=>setMenuOpen(!menuOpen)}
              className="flex lg:hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
            >
              {menuOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>
      </header>

    {/* ====================== MOBILE NAVIGATION ====================== */}
{menuOpen && (
  <>
    {/* Backdrop */}
    <div
      onClick={() => setMenuOpen(false)}
      className="fixed inset-0 top-20 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
    />

    {/* Mobile Menu */}
    <div ref={menuRef} className="fixed inset-x-0 top-20 bottom-0 z-50 overflow-y-auto border-t border-white/10 bg-[#0b0b0b] shadow-2xl lg:hidden">
      <div className="flex min-h-full flex-col px-6 py-6 pb-10">

        {/* Search */}
        <div className="mb-6">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search roadmaps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-2">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-white font-semibold text-black"
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
              `flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-white font-semibold text-black"
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
              `flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-white font-semibold text-black"
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
              `flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-white font-semibold text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

        </div>

        {/* Create Button */}
        <Link
          to="/builder"
          onClick={() => setMenuOpen(false)}
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-black transition-all duration-300 hover:bg-gray-200"
        >
          <Plus size={18} />
          Create Roadmap
        </Link>

        {/* Divider */}
        <div className="my-6 border-t border-white/10" />
      </div>
    </div>
  </>
)}
    </>
  );
};

export default Navbar;
