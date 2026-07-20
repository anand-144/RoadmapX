import React, { useMemo, useCallback } from "react";
import ReactFlow, {
    Background,
    Controls,
    MarkerType,
    Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import RoadmapNode from "./RoadmapNode";


const nodeTypes = {
    roadmap: RoadmapNode,
};

const HomeGraph = () => {
    const nodes = useMemo(
        () => [
            node("html", "HTML5", 0, 0),
            node("css", "CSS", -260, 170),
            node("js", "JavaScript", 260, 170),
            node("git", "GitHub", 0, 360),
            node("ts", "TypeScript", 0, 560),
            node("react", "React", 0, 760),
            node("redux", "Redux", -230, 960),
            node("next", "Next.js", 230, 960),
        ],
        []
    );

    const edges = useMemo(
        () => [
            edge("html", "css"),
            edge("html", "js"),
            edge("css", "git"),
            edge("js", "git"),
            edge("git", "ts"),
            edge("ts", "react"),
            edge("react", "redux"),
            edge("react", "next"),
        ],
        []
    );

    const onNodeClick = useCallback((_, node) => {
        console.log("Clicked:", node.id);
    }, []);

    return (
        <div className="relative h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.35 }}
                defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
                minZoom={0.4}
                maxZoom={1.8}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable
                panOnDrag
                panOnScroll
                zoomOnScroll
                zoomOnPinch
                zoomOnDoubleClick={false}
                onNodeClick={onNodeClick}
                proOptions={{ hideAttribution: true }}
            >
                <Background
                    gap={24}
                    size={1.3}
                    color="#2b2b2b"
                />

                <Controls
                    position="bottom-right"
                    showInteractive={false}
                />

                <Panel
                    position="top-left"
                    className="rounded-2xl border border-yellow-500/20 bg-black/70 px-4 py-3 backdrop-blur-xl"
                >
                    <h3 className="font-semibold text-yellow-400">
                        Knowledge Graph
                    </h3>
                    <p className="text-xs text-gray-400">
                        Zoom • Pan • Explore
                    </p>
                </Panel>
            </ReactFlow>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,.08),transparent_70%)]" />
        </div>
    );
};

function node(id, title, x, y) {
    return {
        id,

        type: "roadmap",

        position: {
            x,
            y,
        },

        data: {
            title,

            icon: title.toLowerCase(),

            category: "Frontend",

            description:
                "Master this technology from beginner to advanced with curated resources.",

            difficulty: "Beginner",

            time: "3 Weeks",

            resources: 24,

            views: "12.4K",

            likes: "1.2K",

            featured: true,

            slug: title.toLowerCase(),
        },
    };
}

function edge(source, target) {
    return {
        id: `${source}-${target}`,
        source,
        target,
        type: "smoothstep",
        animated: true,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#facc15",
        },
        style: {
            stroke: "#facc15",
            strokeWidth: 3,
            strokeLinecap: "round",
            filter: "drop-shadow(0 0 6px rgba(250,204,21,.45))",
        },
    };
}

export default HomeGraph;
