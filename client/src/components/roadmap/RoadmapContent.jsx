import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Link2,
} from "lucide-react";

const Card = ({
  title,
  subtitle,
  icon: Icon,
  children,
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 30,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
    }}
    transition={{
      duration: 0.4,
    }}
    className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171717] via-[#121212] to-black shadow-[0_10px_60px_rgba(0,0,0,.35)]"
  >

    {/* Top Accent */}

    <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300" />

    <div className="p-8">

      <div className="mb-8 flex items-start justify-between">

        <div>

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">

            <Icon
              size={26}
              className="text-yellow-400"
            />

          </div>

          <h2 className="text-3xl font-bold">

            {title}

          </h2>

          {subtitle && (

            <p className="mt-2 text-gray-500">

              {subtitle}

            </p>

          )}

        </div>

      </div>

      {children}

    </div>

  </motion.div>
);

const RoadmapContent = ({ roadmap }) => {
  console.log("Roadmap Data:", roadmap);

  return (
    <div className="grid gap-10 xl:grid-cols-[2fr_1fr]">

      {/* LEFT */}

      <div className="space-y-8 xl:col-span-2">

        {/* About */}

        <Card
          title="About this Roadmap"
          subtitle="Everything you need before starting your learning journey."
          icon={BookOpen}
        >

          <p className="leading-9 text-gray-300">

            {roadmap.description}

          </p>

          {/* Stats */}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

              <p className="text-sm text-gray-500">

                Difficulty

              </p>

              <h3 className="mt-3 text-xl font-bold text-yellow-400">

                {roadmap.difficulty}

              </h3>

            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

              <p className="text-sm text-gray-500">

                Duration

              </p>

              <h3 className="mt-3 text-xl font-bold text-yellow-400">

                {roadmap.estimatedTime}

              </h3>

            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

              <p className="text-sm text-gray-500">

                Views

              </p>

              <h3 className="mt-3 text-xl font-bold text-yellow-400">

                {roadmap.views}

              </h3>

            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

              <p className="text-sm text-gray-500">

                Likes

              </p>

              <h3 className="mt-3 text-xl font-bold text-yellow-400">

                {roadmap.likes?.length || 0}

              </h3>

            </div>

          </div>

          {/* Tags */}

          {roadmap.tags?.length > 0 && (

            <div className="mt-10">

              <h3 className="mb-5 text-lg font-semibold">

                Popular Tags

              </h3>

              <div className="flex flex-wrap gap-3">

                {roadmap.tags.map((tag, index) => (

                  <motion.span
                    whileHover={{
                      scale: 1.05,
                    }}
                    key={index}
                    className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2 text-sm font-medium text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                  >

                    #{tag}

                  </motion.span>

                ))}

              </div>

            </div>

          )}

        </Card>

        {/* Learning Outcomes */}

        <Card
          title="What You'll Learn"
          icon={GraduationCap}
        >
          {roadmap.topics?.length ? (

            <div className="grid gap-4 md:grid-cols-2">

              {roadmap.topics.map((topic, index) => (

                <motion.div
                  key={topic._id || index}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-yellow-400/40 hover:bg-black/40"
                >

                  <div className="flex items-start gap-4">

                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 transition group-hover:bg-yellow-400 group-hover:text-black">

                      <CheckCircle2
                        size={20}
                        className="text-yellow-400 group-hover:text-black"
                      />

                    </div>

                    <div className="flex-1">

                      <div className="flex items-center justify-between">

                        <h3 className="font-semibold text-white">
                          {topic.title}
                        </h3>

                        <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                          Step {topic.order}
                        </span>

                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                        {topic.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">

                        <span className="text-xs text-gray-500">
                          {topic.resources?.length || 0} Resources
                        </span>

                        <span className="text-sm font-medium text-yellow-400 opacity-0 transition group-hover:opacity-100">
                          Learn →
                        </span>

                      </div>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-gray-500">
              No topics available.
            </div>
          )}
        </Card>

      </div>

      {/* RIGHT */}

      <div className="space-y-8">

        {/* Skills Covered */}

        <Card
          title="Skills Covered"
          subtitle="Technologies included in this roadmap."
          icon={BookOpen}
        >

          {roadmap.tags?.length ? (

            <div className="flex flex-wrap gap-3">

              {roadmap.tags.map((tag, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >

                  {tag}

                </motion.div>

              ))}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-white/10 py-8 text-center text-gray-500">

              No skills added.

            </div>

          )}

        </Card>

      </div>

    </div>
  );
};

export default RoadmapContent;