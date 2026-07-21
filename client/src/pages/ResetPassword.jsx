import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { resetPassword } from "../services/authService";
import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      const message = "Please fill in all fields.";
      setError(message);
      toast.error(message);
      return;
    }

    if (formData.password.length < 6) {
      const message =
        "Password must be at least 6 characters.";
      setError(message);
      toast.error(message);
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      const message = "Passwords do not match.";
      setError(message);
      toast.error(message);
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword(
        token,
        formData.password
      );

      toast.success(
        res.message || "Password updated successfully."
      );

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to reset password.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | RoadmapX</title>

        <meta
          name="description"
          content="Reset your RoadmapX account password securely."
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

                  <p className="text-sm text-gray-400">
                    Learn • Build • Share
                  </p>
                </div>
              </Link>

              <div className="mt-24">
                <h2 className="max-w-md text-5xl font-bold leading-tight">
                  Create a new password.
                </h2>

                <p className="mt-8 max-w-lg text-lg leading-8 text-gray-400">
                  Your new password should be secure,
                  unique, and easy for you to remember.
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

              {!success ? (
                <>
                  <div className="mb-10">

                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Lock size={28} />
                    </div>

                    <h2 className="text-4xl font-bold">
                      Reset Password
                    </h2>

                    <p className="mt-3 text-gray-400">
                      Enter your new password below.
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

                    {/* Password */}

                    <div>

                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        New Password
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
                          placeholder="Enter new password"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-white"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
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
                          placeholder="Confirm password"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-white"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>

                      </div>

                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle
                            size={20}
                            className="animate-spin"
                          />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </button>

                  </form>
                </>
              ) : (
                <div className="text-center">

                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2
                      size={42}
                      className="text-green-400"
                    />
                  </div>

                  <h2 className="text-4xl font-bold">
                    Password Updated
                  </h2>

                  <p className="mt-5 leading-8 text-gray-400">
                    Your password has been changed
                    successfully.

                    <br />
                    <br />

                    Redirecting you to login...
                  </p>

                </div>
              )}

              <div className="mt-10">

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 font-medium text-gray-400 transition hover:text-white"
                >
                  <ArrowLeft size={18} />
                  Back to Login
                </Link>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>

  );
};

export default ResetPassword;