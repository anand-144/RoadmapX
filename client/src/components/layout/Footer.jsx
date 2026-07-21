import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white bg-white text-lg font-bold text-black">
                R
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-wide text-white">
                  RoadmapX
                </h2>

                <p className="text-xs text-gray-500">
                  Learn • Build • Share
                </p>
              </div>
            </Link>

            <p className="mt-6 leading-7 text-gray-400">
              RoadmapX is a platform where developers discover, build,
              and share high-quality learning roadmaps. Learn faster,
              organize your journey, and inspire others.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Navigation
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/explore"
                  className="text-gray-400 transition hover:text-white"
                >
                  Explore
                </Link>
              </li>

              <li>
                <Link
                  to="/builder"
                  className="text-gray-400 transition hover:text-white"
                >
                  Builder
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 transition hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 transition hover:text-white"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 transition hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Connect
            </h3>

            <p className="mb-6 text-gray-400">
              Follow RoadmapX and stay updated with new learning
              roadmaps, community updates, and developer resources.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl border-4 border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-white/50 hover:bg-yellow-400 hover:text-black"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl border-4 border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-blue-700/70 hover:bg-yellow-400 hover:text-blue-700"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl border-4 border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-black/50 hover:bg-yellow-400 hover:text-black"
              >
                <FaXTwitter size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl border-4  border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-pink-600/50 hover:bg-yellow-400 hover:text-pink-600"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-400 border-b-2">
            © {year} RoadmapX. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-400  border-b-2">
            Made with
            <FaHeart className="text-red-500" />
            for developers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;