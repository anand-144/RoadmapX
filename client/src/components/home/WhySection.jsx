import React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  BookOpen,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Interactive Learning Graphs",
    description:
      "Visualize technologies as connected roadmaps instead of reading endless documentation. Follow the right learning sequence with ease.",
  },
  {
    icon: BookOpen,
    title: "Curated Learning Resources",
    description:
      "Every roadmap contains carefully selected articles, videos and official documentation so you always learn from trusted sources.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Learn together with thousands of developers. Discover community roadmaps, discussions and recommendations.",
  },
  {
    icon: TrendingUp,
    title: "Structured Growth",
    description:
      "Track your progress from beginner to advanced with organized milestones designed for real-world learning.",
  },
];

const stats = [
  {
    number: "250+",
    label: "Roadmaps",
  },
  {
    number: "50+",
    label: "Categories",
  },
  {
    number: "1200+",
    label: "Resources",
  },
  {
    number: "25K+",
    label: "Developers",
  },
];

const WhySection = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28 text-white">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-yellow-500/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-500/10 blur-[150px]" />

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.04]">

        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(to right,#fff 1px,transparent 1px),
            linear-gradient(to bottom,#fff 1px,transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >

          <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">

            Why RoadmapMaker

          </span>

          <h2 className="mt-8 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">

            Learn Smarter,

            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">

              Not Harder.

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-400">

            Everything you need to master a technology in one place —
            interactive roadmaps, curated resources, structured learning
            paths and an active developer community.

          </p>

        </motion.div>

        {/* Feature Grid */}

        <div className="grid gap-8 lg:grid-cols-2">
                      {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#121212] to-[#0a0a0a] p-8 transition-all duration-500 hover:border-yellow-400/40 hover:shadow-[0_0_60px_rgba(250,204,21,.12)]"
              >
                {/* Glow */}

                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-yellow-500/5 blur-[90px] transition-all duration-500 group-hover:bg-yellow-500/10" />

                {/* Icon */}

                <div className="mb-8 flex h-18 w-18 items-center justify-center rounded-3xl bg-yellow-500/10 transition duration-300 group-hover:scale-110 group-hover:bg-yellow-400">

                  <Icon
                    size={34}
                    className="text-yellow-400 transition group-hover:text-black"
                  />

                </div>

                {/* Title */}

                <h3 className="text-3xl font-bold transition group-hover:text-yellow-400">

                  {feature.title}

                </h3>

                {/* Description */}

                <p className="mt-6 leading-8 text-gray-400">

                  {feature.description}

                </p>

                {/* Bottom */}

                <div className="mt-10 flex items-center justify-between">

                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">

                    Learn More

                  </span>

                  <div className="h-[2px] w-16 bg-yellow-400 transition-all duration-300 group-hover:w-28" />

                </div>

              </motion.div>
            );
          })}

        </div>

        {/* Stats */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-28 grid gap-6 rounded-[36px] border border-white/10 bg-gradient-to-r from-[#111] to-[#090909] p-8 sm:grid-cols-2 lg:grid-cols-4"
        >

          {stats.map((item) => (

            <div
              key={item.label}
              className="group text-center"
            >

              <h3 className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-5xl font-black text-transparent transition group-hover:scale-110">

                {item.number}

              </h3>

              <p className="mt-4 text-lg text-gray-400">

                {item.label}

              </p>

            </div>

          ))}

        </motion.div>

      </div>

    </section>
  );
};

export default WhySection;