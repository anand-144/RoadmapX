import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import RoadmapCard from "./RoadmapCard";
import RoadmapSkeleton from "./RoadmapSkeleton";
import EmptyRoadmaps from "./EmptyRoadmaps";
import DeleteRoadmapModal from "./DeleteRoadmapModal";
import RoadmapFilters from "./RoadmapFilters";
import Pagination from "./Pagination";
import RoadmapStats from "./RoadmapStats";

const RoadmapManagement = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalRoadmaps: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    featured: 0,
  });

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/roadmaps?page=${page}&limit=10&search=${search}&status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoadmaps(data.roadmaps);
      setPagination(data.pagination);

      // If backend returns stats
      if (data.stats) {
        setStats(data.stats);
      } else {
        // Temporary fallback
        setStats({
          total: data.pagination.totalRoadmaps,
          published: data.roadmaps.filter(
            (r) => r.status === "Published"
          ).length,
          drafts: data.roadmaps.filter(
            (r) => r.status === "Draft"
          ).length,
          featured: data.roadmaps.filter(
            (r) => r.isFeatured
          ).length,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, status]);

  useEffect(() => {
    fetchRoadmaps();
  }, [page, search, status]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-4xl font-bold">
            Roadmap Management
          </h2>

          <p className="mt-2 text-gray-400">
            Manage every roadmap on the platform.
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black">
          {pagination.totalRoadmaps} Roadmaps
        </div>

      </div>

      {/* Stats */}

      <RoadmapStats stats={stats} />

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search roadmaps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#111] py-4 pl-12 pr-5 outline-none transition focus:border-yellow-400"
        />

      </div>

      {/* Filters */}

      <RoadmapFilters
        status={status}
        setStatus={setStatus}
      />

      {/* Roadmaps */}

      {loading ? (
        <RoadmapSkeleton />
      ) : roadmaps.length === 0 ? (
        <EmptyRoadmaps />
      ) : (
        <motion.div
          layout
          className="grid gap-6"
        >
          {roadmaps.map((roadmap) => (
            <RoadmapCard
              key={roadmap._id}
              roadmap={roadmap}
              refresh={fetchRoadmaps}
              onDelete={() => {
                setSelectedRoadmap(roadmap);
                setDeleteModal(true);
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Delete Modal */}

      <DeleteRoadmapModal
        open={deleteModal}
        setOpen={setDeleteModal}
        roadmap={selectedRoadmap}
        refresh={fetchRoadmaps}
      />

      {/* Pagination */}

      <Pagination
        page={page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />

    </div>
  );
};

export default RoadmapManagement;