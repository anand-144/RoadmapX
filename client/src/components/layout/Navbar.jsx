import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const notificationRef = useRef(null);

  const [search, setSearch] = useState("");

  const profileRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();



  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileOpen(false);

    toast.success("Logged out successfully ")

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/explore?q=${encodeURIComponent(search.trim())}`);

    setSearch("");
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    if (!token) return;

    try {
      setNotificationLoading(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(data.notifications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setNotificationLoading(false);
    }
  };


  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const markAllRead = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/read-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;


  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 font-medium ${isActive ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
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

          {/* Desktop Search */}
          <div className="hidden items-center lg:flex">

            {!searchOpen ? (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-white hover:text-white"
              >
                <Search size={19} />
              </button>
            ) : (
              <div className="flex items-center gap-2">

                <div className="relative animate-in fade-in slide-in-from-right-2 duration-300">

                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search roadmaps..."
                    className="w-72 rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />

                </div>

                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearch("");
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-red-500 hover:text-red-400"
                >
                  <X size={19} />
                </button>

              </div>
            )}

          </div>

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

            <div ref={notificationRef} className="relative">

              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);

                  if (!notificationOpen) {
                    fetchNotifications();
                  }
                }}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:border-white hover:text-white"
              >
                <Bell size={19} />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl z-50">

                  <div className="flex items-center justify-between border-b border-white/10 p-4">
                    <h3 className="font-semibold text-white">Notifications</h3>

                    {notifications.length > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-yellow-400 hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[450px] overflow-y-auto">

                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-white">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification._id}
                          onClick={() => {
                            if (!notification.isRead) {
                              markAsRead(notification._id);
                            }
                          }}
                          className={`group border-b border-white/5 p-4 transition hover:bg-white/5 ${!notification.isRead ? "bg-yellow-500/5" : ""
                            }`}
                        >
                          <div className="flex items-start justify-between gap-3">

                            <div className="flex-1">
                              <p className="text-sm text-white font-medium">
                                {notification.message}
                              </p>

                              <p className="mt-1 text-xs text-yellow-500 font-medium">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification._id);
                              }}
                              className="rounded-lg p-2 text-white transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                            >
                              <Trash2 size={16}/>
                            </button>

                          </div>
                        </div>
                      ))
                    )}

                  </div>
                </div>
              )}

            </div>

            <Link
              to="/builder"
              className="hidden lg:flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-3 font-semibold text-black hover:bg-black hover:text-white transition"
            >
              <Plus size={18} />Create
            </Link>

            {user ? (
              <div ref={profileRef} className="relative hidden md:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-black">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={18} className="text-white" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-[#111] p-2 shadow-2xl">
                    <div className="border-b border-white/10 p-3">
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>

                    <Link to={`/profile/${user.username}`} onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"><User size={18} />Profile</Link>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"><LayoutDashboard size={18} />Dashboard</Link>

                    {user.role === "admin" && (
                      <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"><Shield size={18} />Admin Panel</Link>
                    )}

                    <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-gray-300 hover:bg-white/10"><Settings size={18} />Settings</Link>

                    <button onClick={handleLogout} className="mt-2 flex w-full items-center gap-3 rounded-lg p-3 text-red-400 hover:bg-red-500/10">
                      <LogOut size={18} />Logout
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
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex lg:hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                        setMenuOpen(false);
                      }
                    }}
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
                    `flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${isActive
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
                    `flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${isActive
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
                    `flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${isActive
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
                    `flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${isActive
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
