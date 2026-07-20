import React, { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import RoadmapNode from "./RoadmapNode";
import GraphSidebar from "./GraphSidebar";

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

const RoadmapGraph = ({ roadmap }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics =
    roadmap?.topics
      ?.slice()
      ?.sort((a, b) => a.order - b.order) || [];

  const nodes = useMemo(() => {
    return topics.map((topic, index) => ({
      id: topic._id,

      type: "roadmapNode",

      position: {
        x: index % 2 === 0 ? 120 : 520,
        y: index * 200,
      },

      data: {
        topic,
        onClick: () =>
          setSelectedTopic(topic),
      },
    }));
  }, [topics]);

  const edges = useMemo(() => {
    return topics
      .slice(1)
      .map((topic, index) => ({
        id: `edge-${index}`,

        source: topics[index]._id,

        target: topic._id,

        animated: true,

        style: {
          stroke: "#facc15",
          strokeWidth: 3,
        },
      }));
  }, [topics]);

  return (
    <div className="h-[900px] overflow-hidden rounded-3xl border border-white/10 bg-[#111]">

      <div className="grid h-full lg:grid-cols-[1fr_340px]">

        {/* Graph */}

        <div className="h-full">

          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{
              padding: 0.3,
            }}
            proOptions={{hideAttribution: true}}
          >

            <Background
              gap={20}
              color="#2a2a2a"
            />

            <Controls />

          </ReactFlow>

        </div>

        {/* Sidebar */}

        <GraphSidebar
          topic={selectedTopic}
        />

      </div>

    </div>
  );
};

export default RoadmapGraph;