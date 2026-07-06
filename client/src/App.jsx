import { Routes, Route, useLocation } from "react-router-dom";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Protected Route
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import Builder from "./pages/Builder";
import RoadmapDetails from "./pages/RoadmapDetails";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const App = () => {
  const location = useLocation();

  // Routes where Navbar & Footer should NOT appear
  const hideLayout = ["/dashboard", "/login" , "/register"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
    <div className="min-h-screen flex flex-col"> 

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/roadmap/:slug" element={<RoadmapDetails />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/builder" element={<Builder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;