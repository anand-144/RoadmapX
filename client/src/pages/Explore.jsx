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

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalRoadmaps, setTotalRoadmaps] = useState(0);

  const limit = 12;

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
            sort: sortBy,
            page,
            limit,
          },
        }
      );

      setRoadmaps(res.data.roadmaps);

      const featured = res.data.roadmaps.filter((r) => r.isFeatured);
      const normal = res.data.roadmaps.filter((r) => !r.isFeatured);

      setFeaturedRoadmaps(featured);
      setRoadmaps(normal);

      setTotalRoadmaps(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
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
        />

        {loading ? (
          <RoadmapSkeleton />
        ) : roadmaps.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <RoadmapGrid
              roadmaps={roadmaps}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        )}

      </div>
    </div>
  );
};

export default Explore;