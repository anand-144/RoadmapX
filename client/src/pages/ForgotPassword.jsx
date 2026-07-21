import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authService";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      toast.error("Email is required.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      toast.error("Invalid email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await forgotPassword(email);

      toast.success(res.message);

      setSuccess(true);
      setEmail("");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong.";

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

          {/* Left Section */}
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
                  Forgot your password?
                </h2>

                <p className="mt-8 max-w-lg text-lg leading-8 text-gray-400">
                  No worries. Enter your registered email
                  address and we'll send you a secure link
                  to reset your password.
                </p>

              </div>
            </div>

            <div className="text-gray-500">
              © {new Date().getFullYear()} RoadmapX
            </div>

          </div>

          {/* Right Section */}
          <div className="flex items-center justify-center px-6 py-16 lg:px-12">

            <div className="w-full max-w-md">

              {!success ? (
                <>
                  <div className="mb-10">

                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Mail size={28} />
                    </div>

                    <h2 className="text-4xl font-bold">
                      Reset Password
                    </h2>

                    <p className="mt-3 text-gray-400">
                      Enter your registered email address
                      to receive a password reset link.
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

                    <div>

                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Email Address
                      </label>

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-white"
                      />

                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle
                            size={20}
                            className="animate-spin"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                  </form>
                </>
              ) : (
                <div className="text-center">

                  <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                    <Mail
                      size={40}
                      className="text-green-400"
                    />
                  </div>

                  <h2 className="text-4xl font-bold">
                    Check your email
                  </h2>

                  <p className="mt-5 leading-8 text-gray-400">
                    We've sent a password reset link to
                    your registered email address.

                    <br />
                    <br />

                    Please check your inbox and spam
                    folder.

                    <br />
                    <br />

                    The link expires in <b>15 minutes</b>.
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

              <p className="mt-8 text-center text-xs leading-6 text-gray-500">
                If you don't receive an email within a
                few minutes, verify the email address or
                check your spam folder.
              </p>

            </div>

          </div>

        </div>
      </div>
    </>

  );
};

export default ForgotPassword;