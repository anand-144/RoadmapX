import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We may collect your name, email address, profile information, and content you create such as roadmaps, comments, likes, and bookmarks.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to provide authentication, personalize your experience, improve our platform, and maintain the security of your account.",
  },
  {
    title: "Cookies",
    content:
      "RoadmapMaker may use cookies and similar technologies to improve performance, remember your preferences, and enhance your browsing experience.",
  },
  {
    title: "Third-Party Services",
    content:
      "We may use trusted services such as Google Authentication, Cloudinary, MongoDB, Render, and Vercel to provide parts of our platform.",
  },
  {
    title: "Data Security",
    content:
      "We take reasonable measures to protect your information. Passwords are encrypted and sensitive data is securely stored.",
  },
  {
    title: "Your Rights",
    content:
      "You may request to update or delete your account information at any time by contacting us.",
  },
  {
    title: "Contact",
    content:
      "For any privacy-related questions, please contact us at support@roadmapmaker.com.",
  },
];

const PrivacyPolicy = () => {
  return (
    <>

      <Helmet>
        <title>Privacy Policy | RoadmapX</title>

        <meta
          name="description"
          content="Read the RoadmapX Privacy Policy to understand how we collect, use, and protect your information."
        />
      </Helmet>
      
      <div className="relative min-h-screen overflow-hidden bg-[#050505] py-28 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
              Legal
            </span>

            <h1 className="mt-6 text-5xl font-black">
              Privacy Policy
            </h1>

            <p className="mt-4 text-gray-400">
              Last Updated: July 2026
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl border border-white/10 bg-[#111] p-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400">
                  {section.title}
                </h2>

                <p className="mt-4 leading-8 text-gray-400">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </>

  );
};

export default PrivacyPolicy;