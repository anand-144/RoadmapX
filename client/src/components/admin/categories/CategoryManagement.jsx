import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FolderTree,
  Plus,
  Search,
} from "lucide-react";

import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategorySkeleton";
import EmptyCategories from "./EmptyCategories";
import CategoryFormModal from "./CategoryFormModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedDelete, setSelectedDelete] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [categories, search]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-4xl font-bold">
            Category Management
          </h2>

          <p className="mt-2 text-gray-400">
            Create, update and organize roadmap
            categories.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
        >
          <Plus size={18} />
          Add Category
        </button>

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-2xl border border-white/10 bg-[#111] py-4 pl-12 pr-5 outline-none transition focus:border-yellow-400"
        />

      </div>

      {/* Content */}

      {loading ? (
        <CategorySkeleton />
      ) : filteredCategories.length === 0 ? (
        <EmptyCategories />
      ) : (
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredCategories.map((category) => (
            <CategoryCard
              category={category}
              onEdit={() => {
                setSelectedCategory(category);
                setOpenModal(true);
              }}
              onDelete={() => {
                setSelectedDelete(category);
                setDeleteModal(true);
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Modal (Part 3) */}


      <CategoryFormModal
        open={openModal}
        setOpen={setOpenModal}
        category={selectedCategory}
        refresh={fetchCategories}
      />

      <DeleteCategoryModal
        open={deleteModal}
        setOpen={setDeleteModal}
        category={selectedDelete}
        refresh={fetchCategories}
      />

    </div>
  );
};

export default CategoryManagement;