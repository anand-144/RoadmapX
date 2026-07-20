import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

import { FaInstagram , FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] py-28 text-white">

      {/* Background */}

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-yellow-500/10 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-yellow-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >

          <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2 text-sm text-yellow-400">

            Contact

          </span>

          <h1 className="mt-6 text-5xl font-black lg:text-6xl">

            Get In Touch

          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">

            Have a question, suggestion or found a bug?
            We'd love to hear from you.

          </p>

        </motion.div>

        {/* Main */}

        <div className="grid gap-10 lg:grid-cols-[1.3fr_.8fr]">

          {/* Form */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[36px] border border-white/10 bg-[#111] p-8"
          >

            <h2 className="mb-8 text-3xl font-bold">

              Send Message

            </h2>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-2xl border border-white/10 bg-[#0c0c0c] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-white/10 bg-[#0c0c0c] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl border border-white/10 bg-[#0c0c0c] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-[#0c0c0c] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <button
                className="flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
              >
                <Send size={18} />

                Send Message

              </button>

            </form>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            <div className="rounded-3xl border border-white/10 bg-[#111] p-8">

              <h2 className="mb-8 text-3xl font-bold">

                Contact Info

              </h2>

              <div className="space-y-6">

                <div className="flex items-center gap-4">

                  <Mail className="text-yellow-400" />

                  <span>support@roadmapmaker.com</span>

                </div>

                <div className="flex items-center gap-4">

                  <Phone className="text-yellow-400" />

                  <span>+91 98765 43210</span>

                </div>

                <div className="flex items-center gap-4">

                  <MapPin className="text-yellow-400" />

                  <span>Mumbai, India</span>

                </div>

              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111] p-8">

              <h2 className="mb-6 text-3xl font-bold">

                Follow Us

              </h2>

              <div className="flex gap-4">

                <a
                  href="#"
                  className="rounded-2xl border border-white/10 p-4 transition hover:border-yellow-400"
                >
                  <FaGithub />
                </a>

                <a
                  href="#"
                  className="rounded-2xl border border-white/10 p-4 transition hover:border-yellow-400"
                >
                  <FaInstagram />
                </a>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default Contact;