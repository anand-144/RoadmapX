import React from "react";
import { motion } from "framer-motion";
import RoadmapCard from "./RoadmapCard";

const RoadmapGrid = ({ roadmaps }) => {
  return (
    <motion.section
      layout
      className="grid grid-cols-1  gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
    >
      {roadmaps.map((roadmap, index) => (
        <RoadmapCard
          key={roadmap._id}
          roadmap={roadmap}
          index={index}
        />
      ))}
    </motion.section>
  );
};

export default RoadmapGrid;