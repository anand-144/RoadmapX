import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  GitBranch,
} from "lucide-react";

import RoadmapGraph from "../components/roadmap/RoadmapGraph";

const RoadmapGraphPage = () => {
  const { slug } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/roadmaps/${slug}`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      setRoadmap(data.roadmap);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-[700px] animate-pulse rounded-3xl bg-[#111]" />
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-black pt-28 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Roadmap not found
          </h2>
        </div>
      </div>
    );
  }

  const totalResources =
    roadmap.topics?.reduce(
      (sum, topic) =>
        sum + (topic.resources?.length || 0),
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-black pt-28 text-white">

      <div className="mx-auto max-w-7xl px-6">

        {/* Back */}

        <Link
          to={`/roadmap/${roadmap.slug}`}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-5 py-3 transition hover:border-yellow-400"
        >
          <ArrowLeft size={18} />

          Back to Roadmap
        </Link>

        {/* Header */}

        <div className="mb-10 rounded-3xl border border-white/10 bg-[#111] p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-400">

                <GitBranch size={16} />

                Interactive Learning Graph

              </div>

              <h1 className="text-4xl font-bold">

                {roadmap.title}

              </h1>

              <p className="mt-4 max-w-3xl leading-8 text-gray-400">

                Explore every topic visually.
                Click any node to reveal learning
                resources and navigate through the
                roadmap interactively.

              </p>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-4">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center">

                <BookOpen
                  className="mx-auto text-yellow-400"
                  size={22}
                />

                <h3 className="mt-3 text-2xl font-bold">

                  {roadmap.topics?.length || 0}

                </h3>

                <p className="text-sm text-gray-500">

                  Topics

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center">

                <GitBranch
                  className="mx-auto text-yellow-400"
                  size={22}
                />

                <h3 className="mt-3 text-2xl font-bold">

                  {totalResources}

                </h3>

                <p className="text-sm text-gray-500">

                  Resources

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center">

                <Clock3
                  className="mx-auto text-yellow-400"
                  size={22}
                />

                <h3 className="mt-3 text-xl font-bold">

                  {roadmap.estimatedTime}

                </h3>

                <p className="text-sm text-gray-500">

                  Duration

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Graph */}

        <RoadmapGraph roadmap={roadmap} />

      </div>

    </div>
  );
};

export default RoadmapGraphPage;