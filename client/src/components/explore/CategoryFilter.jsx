import React from "react";
import { motion } from "framer-motion";

const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setPage,
}) => {
  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setPage(1);
  };

  console.log(categories)

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Browse by Category
        </h2>

        <span className="text-sm text-gray-500">
          {categories.length} Categories
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* All */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -2 }}
          onClick={() => handleCategoryChange("")}
          className={`relative flex items-center whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${selectedCategory === ""
              ? "border-yellow-400 bg-yellow-400 text-black"
              : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            }`}
        >
          All
        </motion.button>

        {/* Categories */}
        {categories.map((category) => (
          <motion.button
            key={category._id}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
            onClick={() => handleCategoryChange(category._id)}
           className={`relative flex items-center whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${selectedCategory === category._id
                ? "border-yellow-400 bg-yellow-400 text-black"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
          >
            {category.icon && (
              <img
                src={`https://cdn.simpleicons.org/${category.icon}/ffffff`}
                alt={category.name}
                className="mr-2 h-5 w-5 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}

            {category.name}
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;