import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using RoadmapMaker, you agree to comply with these Terms and Conditions.",
  },
  {
    title: "User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.",
  },
  {
    title: "User Content",
    content:
      "You retain ownership of the roadmaps and content you create. However, you grant RoadmapMaker permission to display and distribute your content within the platform.",
  },
  {
    title: "Prohibited Activities",
    content:
      "Users must not upload illegal, offensive, copyrighted, or malicious content or attempt to disrupt the platform.",
  },
  {
    title: "Intellectual Property",
    content:
      "The RoadmapMaker platform, branding, logo, and design remain the intellectual property of RoadmapMaker unless otherwise stated.",
  },
  {
    title: "Disclaimer",
    content:
      "RoadmapMaker is provided for educational purposes. While we strive for accuracy, we do not guarantee that all learning resources or roadmaps are complete or error-free.",
  },
  {
    title: "Termination",
    content:
      "Accounts that violate these terms may be suspended or permanently removed without prior notice.",
  },
  {
    title: "Contact",
    content:
      "Questions regarding these Terms may be directed to support@roadmapmaker.com.",
  },
];

const TermsConditions = () => {
  return (
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
            Terms & Conditions
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
  );
};

export default TermsConditions;