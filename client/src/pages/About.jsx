import React from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    BookOpen,
    Target,
    Brain,
    Rocket,
    LibraryBig
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const About = () => {



    return (


        <>
            <Helmet>
                <title>About RoadmapX | Learn, Build & Share</title>

                <meta
                    name="description"
                    content="Learn about RoadmapX, our mission, and how we're helping developers and learners create, discover, and share structured learning roadmaps."
                />

                <meta
                    name="keywords"
                    content="about roadmapx, roadmap platform, developer community"
                />
            </Helmet>

            <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

                {/* Background */}

                <div className="absolute inset-0">

                    <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-yellow-500/10 blur-[160px]" />

                    <div className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-yellow-500/10 blur-[170px]" />

                </div>

                {/* Grid */}

                <div className="absolute inset-0 opacity-[0.04]">

                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage: `
              linear-gradient(to right,#fff 1px,transparent 1px),
              linear-gradient(to bottom,#fff 1px,transparent 1px)
            `,
                            backgroundSize: "70px 70px",
                        }}
                    />

                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-28">

                    {/* Hero */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="mx-auto max-w-4xl text-center"
                    >

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-3">

                            <Sparkles
                                size={18}
                                className="text-yellow-400"
                            />

                            <span className="text-sm font-medium text-yellow-300">

                                About RoadmapMaker

                            </span>

                        </div>

                        <h1 className="text-5xl font-black leading-tight md:text-6xl lg:text-7xl">

                            Learn Smarter Through

                            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">

                                Interactive Roadmaps

                            </span>

                        </h1>

                        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-400">

                            RoadmapMaker is a modern learning platform designed to
                            help developers master technologies through structured
                            roadmaps, visual knowledge graphs, and carefully curated
                            learning resources.

                        </p>

                    </motion.div>

                    {/* Story */}

                    <div className="mt-28 grid items-center gap-14 lg:grid-cols-2">

                        {/* Left */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -40,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#161616] via-[#111] to-[#090909] p-10"
                        >

                            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-yellow-500/10 blur-[100px]" />

                            <div className="relative flex h-full flex-col items-center justify-center text-center">

                                <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-yellow-500/10">

                                    <BookOpen
                                        size={52}
                                        className="text-yellow-400"
                                    />

                                </div>

                                <h2 className="text-3xl font-bold">

                                    One Platform.

                                </h2>

                                <h2 className="mt-2 text-3xl font-bold text-yellow-400">

                                    Endless Learning.

                                </h2>

                            </div>

                        </motion.div>

                        {/* Right */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 40,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                        >

                            <div className="mb-5 flex items-center gap-3">

                                <Target
                                    className="text-yellow-400"
                                    size={24}
                                />

                                <h2 className="text-4xl font-bold">

                                    Our Story

                                </h2>

                            </div>

                            <p className="leading-9 text-gray-400">

                                Learning a new technology usually means jumping between
                                YouTube videos, documentation, blogs, and countless
                                tutorials. That process can feel overwhelming and
                                unstructured.

                            </p>

                            <p className="mt-6 leading-9 text-gray-400">

                                RoadmapMaker was created to simplify that journey by
                                organizing technologies into interactive learning
                                roadmaps. Instead of wondering what to learn next,
                                developers can follow a clear path from beginner to
                                advanced while discovering the best resources along
                                the way.

                            </p>

                            <p className="mt-6 leading-9 text-gray-400">

                                Our goal is to make learning more visual, structured,
                                and enjoyable for every developer.

                            </p>

                        </motion.div>

                    </div>


                    {/* Why RoadmapMaker */}

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
                        className="mt-32"
                    >

                        <div className="text-center">

                            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">

                                Why Choose Us

                            </span>

                            <h2 className="mt-6 text-4xl font-black lg:text-5xl">

                                Everything You Need To

                                <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">

                                    Learn Efficiently

                                </span>

                            </h2>

                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-3">

                            {[
                                {
                                    icon: <Brain size={32} className="text-cyan-500" />,
                                    title: "Interactive Learning",
                                    desc: "Visual roadmaps make learning easier by showing technologies as connected knowledge instead of isolated topics.",
                                },
                                {
                                    icon: <LibraryBig size={32} className="text-red-500" />,
                                    title: "Curated Resources",
                                    desc: "Access carefully selected documentation, tutorials, videos and references for every step of your journey.",
                                },
                                {
                                    icon: <Rocket size={32} className="text-orange-500" />,
                                    title: "Structured Growth",
                                    desc: "Follow clear learning paths from beginner to advanced without wasting time deciding what comes next.",
                                },
                            ].map((item, index) => (

                                <motion.div
                                    key={index}
                                    whileHover={{
                                        y: -8,
                                    }}
                                    className="group rounded-[30px] border border-white/10 bg-gradient-to-br from-[#171717] via-[#111] to-[#090909] p-8 transition-all duration-300 hover:border-yellow-400/30 hover:shadow-[0_0_40px_rgba(250,204,21,.08)]"
                                >

                                    <div className="mb-6 text-5xl">

                                        {item.icon}

                                    </div>

                                    <h3 className="text-2xl font-bold transition group-hover:text-yellow-400">

                                        {item.title}

                                    </h3>

                                    <p className="mt-5 leading-8 text-gray-400">

                                        {item.desc}

                                    </p>

                                </motion.div>

                            ))}

                        </div>

                    </motion.div>

                    {/* CTA */}

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
                        className="mt-32 overflow-hidden rounded-[40px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-[#111] to-yellow-500/10 p-12 text-center"
                    >

                        <h2 className="text-4xl font-black lg:text-5xl">

                            Ready to Start Learning?

                        </h2>

                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">

                            Explore interactive roadmaps, discover curated learning
                            resources, and build your skills step by step with
                            RoadmapMaker.

                        </p>

                        <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">

                            <Link
                                to="/explore"
                                className="rounded-2xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
                            >

                                Explore Roadmaps

                            </Link>

                            <Link
                                to="/builder"
                                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold transition hover:border-yellow-400"
                            >

                                Build Your Roadmap

                            </Link>

                        </div>

                    </motion.div>

                </div>

            </div>
        </>
    );
};

export default About;