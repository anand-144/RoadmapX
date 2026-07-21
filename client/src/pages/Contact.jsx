import React, {useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  LoaderCircle,
} from "lucide-react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

import { sendContactMessage } from "../services/contactService";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = form;

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await sendContactMessage(form);

      toast.success(res.message);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user) {
    setForm((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
    }));
  }
}, []);

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

            <form
              onSubmit={handleSubmit}
              className="space-y-6">

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                readOnly
                placeholder="Full Name"
                className="w-full rounded-2xl border border-white/10 bg-[#0c0c0c] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                readOnly
                placeholder="Email Address"
                className="w-full rounded-2xl border border-white/10 bg-[#0c0c0c] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl border border-white/10 bg-[#0c0c0c] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-[#0c0c0c] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
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