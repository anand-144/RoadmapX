import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import ExploreHero from "../components/explore/ExploreHero";
import CategoryFilter from "../components/explore/CategoryFilter";
import FilterBar from "../components/explore/FilterBar";
import FeaturedSection from "../components/explore/FeaturedSection";
import RoadmapGrid from "../components/explore/RoadmapGrid";
import Pagination from "../components/explore/Pagination";
import RoadmapSkeleton from "../components/explore/RoadmapSkeleton";
import EmptyState from "../components/explore/EmptyState";
import { Helmet } from "react-helmet-async";

const Explore = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("q") || "";

  const [roadmaps, setRoadmaps] = useState([]);
  const [featuredRoadmaps, setFeaturedRoadmaps] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Main Roadmaps Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRoadmaps, setTotalRoadmaps] = useState(0);

  // Featured Pagination
  const [featuredPage, setFeaturedPage] = useState(1);
  const [featuredTotalPages, setFeaturedTotalPages] = useState(1);

  const limit = 6;

  // ==========================
  // Categories
  // ==========================

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`
      );

      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Main Roadmaps
  // ==========================

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/roadmaps`,
        {
          params: {
            search,
            category: selectedCategory,
            difficulty: selectedDifficulty,
            featured: false,
            sort: sortBy,
            page,
            limit,
          },
        }
      );
      setRoadmaps(res.data.roadmaps);
      setTotalRoadmaps(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Featured Roadmaps
  // ==========================

  const fetchFeaturedRoadmaps = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/roadmaps/featured`,
        {
          params: {
            page: featuredPage,
            limit: 6,
          },
        }
      );

      setFeaturedRoadmaps(res.data.roadmaps);
      setFeaturedTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Effects
  // ==========================

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchRoadmaps();
  }, [
    search,
    selectedCategory,
    selectedDifficulty,
    sortBy,
    page,
  ]);

  useEffect(() => {
    fetchFeaturedRoadmaps();
  }, [featuredPage]);

  return (

    <>
      <Helmet>
        <title>Explore The Learning Roadmap | RoadmapX</title>

        <meta
          name="description"
          content="Explore beautiful interactive learning roadmaps using RoadmapX."
        />
      </Helmet>

      <div className="min-h-screen bg-black pt-28 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <ExploreHero
            search={search}
            totalRoadmaps={totalRoadmaps}
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setPage={setPage}
          />

          <FilterBar
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setPage={setPage}
          />

          <FeaturedSection
            featuredRoadmaps={featuredRoadmaps}
            featuredPage={featuredPage}
            featuredTotalPages={featuredTotalPages}
            setFeaturedPage={setFeaturedPage}
          />

          {loading ? (
            <RoadmapSkeleton />
          ) : roadmaps.length === 0 ? (
            <EmptyState />
          ) : (
            <>

              <div className="mb-8 mt-16 flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Explore Roadmaps
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Browse all learning paths curated by the community.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
                  {totalRoadmaps} Roadmaps
                </div>
              </div>

              <RoadmapGrid roadmaps={roadmaps} />

              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Explore;