import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { register } from "../services/authService";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

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

    const {
      name,
      username,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !name.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      const message = "Please fill in all fields.";
      setError(message);
      toast.error(message);
      return;
    }

    if (username.length < 3) {
      const message =
        "Username must be at least 3 characters.";
      setError(message);
      toast.error(message);
      return;
    }

    if (password.length < 6) {
      const message =
        "Password must be at least 6 characters.";
      setError(message);
      toast.error(message);
      return;
    }

    if (password !== confirmPassword) {
      const message = "Passwords do not match.";
      setError(message);
      toast.error(message);
      return;
    }

    try {
      setLoading(true);

      const data = await register({
        name,
        username,
        email,
        password,
      });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success(
        `Welcome to RoadmapX, ${data.user.name}! 🎉`
      );

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Registration failed.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      <Helmet>
        <title>Create an Account | RoadmapX</title>

        <meta
          name="description"
          content="Sign up for RoadmapX and start creating, discovering, and sharing learning roadmaps."
        />

        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

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

                  <p className="text-sm text-yellow-500">
                    Learn • Build • Share
                  </p>

                </div>

              </Link>

              <div className="mt-24">

                <h2 className="max-w-md text-5xl font-bold leading-tight">
                  Start building your learning journey.
                </h2>

                <p className="mt-8 max-w-lg text-lg leading-8 text-gray-400">
                  Join thousands of developers,
                  students, and creators building
                  structured learning roadmaps,
                  tracking progress, and sharing
                  knowledge with the community.
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
                  Create Account
                </h2>

                <p className="mt-3 text-gray-400">
                  Join RoadmapX and start creating
                  your personalized learning journey.
                </p>

              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Full Name */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white"
                  />

                </div>

                {/* Username */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white"
                  />

                </div>

                {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
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
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition focus:border-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={
                        formData.confirmPassword
                      }
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition focus:border-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Register Button */}

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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

              </form>

              {/* Login */}

              <p className="mt-8 text-center text-gray-400">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-white hover:underline"
                >
                  Login
                </Link>

              </p>

              {/* Terms */}

              <p className="mt-6 text-center text-xs leading-6 text-gray-500">

                By creating an account, you agree to our{" "}

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
    </>


  );
};

export default Register;