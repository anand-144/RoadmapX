import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { login as loginAPI } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (
      !formData.emailOrUsername.trim() ||
      !formData.password.trim()
      
    ) {
      setError("Please fill in all fields.");
      return;
    }
    

    try {
      setLoading(true);

      const data = await loginAPI(formData);

      console.log("Login Response:", data);
      console.log("Context Login Called");

      login(data.user, data.token);

      toast.success(`Welcome back, ${data.user.name}! 🎉`);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden flex-col justify-between border-r border-white/10 bg-[#050505] p-16 lg:flex">

          <div>
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white bg-white text-xl font-bold text-black">
                R
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  RoadmapX
                </h1>

                <p className="text-sm text-gray-400">
                  Learn • Build • Share
                </p>
              </div>
            </Link>

            <div className="mt-24">
              <h2 className="max-w-md text-5xl font-bold leading-tight">
                Continue your learning journey.
              </h2>

              <p className="mt-8 max-w-lg text-lg leading-8 text-gray-400">
                Discover curated roadmaps, build your
                own learning paths, follow creators,
                and become part of the RoadmapX
                community.
              </p>
            </div>
          </div>

          <div className="text-gray-500">
            © {new Date().getFullYear()} RoadmapX
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-16 lg:px-12">

          <div className="w-full max-w-md">

            <div className="mb-10">
              <h2 className="text-4xl font-bold">
                Welcome Back
              </h2>

              <p className="mt-3 text-gray-400">
                Login to continue building your
                roadmap.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Email / Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email or Username
                </label>

                <input
                  type="text"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  placeholder="Enter your email or username"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition focus:border-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-black accent-white"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-gray-400 transition hover:text-white"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white py-3 font-semibold text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={20}
                      className="animate-spin"
                    />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-white hover:underline"
              >
                Register
              </Link>
            </p>

            {/* Terms */}
            <p className="mt-6 text-center text-xs leading-6 text-gray-500">
              By continuing, you agree to our{" "}
              <Link
                to="/terms"
                className="hover:text-white"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="hover:text-white"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;