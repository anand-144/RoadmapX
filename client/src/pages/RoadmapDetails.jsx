import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import RoadmapHero from "../components/roadmap/RoadmapHero";
import RoadmapContent from "../components/roadmap/RoadmapContent";
import RoadmapActions from "../components/roadmap/RoadmapActions";
import AuthorCard from "../components/roadmap/AuthorCard";
import RoadmapComments from "../components/roadmap/RoadmapComments";
import RelatedRoadmaps from "../components/roadmap/RelatedRoadmaps";
import GraphBanner from "../components/roadmap/GraphBanner";

const RoadmapDetails = () => {
  const { slug } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedRoadmaps, setRelatedRoadmaps] = useState([]);

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

  const token = localStorage.getItem("token");

  const handleLike = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/likes/${roadmap._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRoadmap();
    } catch (err) {
      console.log(err);
    }
  };
  const handleBookmark = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookmarks/${roadmap._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRoadmap();
    } catch (err) {
      console.log(err);
    }
  };


  const fetchRelatedRoadmaps = async () => {
    try {
      if (!roadmap?.category?._id) return;

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/roadmaps`,
        {
          params: {
            category: roadmap.category._id,
            limit: 3,
          },
        }
      );

      const filtered = data.roadmaps.filter(
        (item) => item._id !== roadmap._id
      );

      setRelatedRoadmaps(filtered);
    } catch (error) {
      console.log(error);
    }
  };





  useEffect(() => {
    fetchRoadmap();
  }, [slug]);

  useEffect(() => {
    if (roadmap) {
      fetchRelatedRoadmaps();
    }
  }, [roadmap]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-96 animate-pulse rounded-3xl bg-[#111]" />
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-black pt-28 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold">
            Roadmap not found
          </h2>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-b from-black via-[#090909] to-black pt-28 text-white">

    <div className="mx-auto max-w-7xl space-y-14 px-6">

      {/* Hero */}

      <RoadmapHero roadmap={roadmap} />

      {/* Main Content */}

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">

        {/* Left */}

        <div className="space-y-8">

          <RoadmapContent roadmap={roadmap} />

        </div>

        {/* Right */}

        <div className="sticky top-28 space-y-8 self-start">

          <RoadmapActions
            roadmap={roadmap}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />

          <AuthorCard roadmap={roadmap} />

        </div>

      </section>

      {/* Interactive Graph */}

      <GraphBanner roadmap={roadmap} />

      {/* Bottom */}

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">

        {/* Comments */}

        <RoadmapComments roadmapId={roadmap._id} />

        {/* Related */}

        <RelatedRoadmaps
          roadmaps={relatedRoadmaps}
        />

      </section>

    </div>

  </div>
);
};

export default RoadmapDetails;