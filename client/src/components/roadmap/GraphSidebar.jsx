import React from "react";
import {
  BookOpen,
  FileText,
  Link2,
  ExternalLink,
  Sparkles,
  MousePointerClick,
} from "lucide-react";

const GraphSidebar = ({ topic }) => {
  if (!topic) {
    return (
      <div className="flex h-full flex-col justify-center border-l border-white/10 bg-[#0d0d0d] p-8">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10">

          <MousePointerClick
            size={36}
            className="text-yellow-400"
          />

        </div>

        <h2 className="mt-8 text-center text-2xl font-bold">
          Select a Topic
        </h2>

        <p className="mt-4 text-center leading-7 text-gray-400">
          Click any node on the roadmap to explore
          its description, learning resources,
          and other information.
        </p>

      </div>
    );
  }

  return (
    <div className="flex h-full flex-col border-l border-white/10 bg-[#0d0d0d]">

      {/* Header */}

      <div className="border-b border-white/10 p-8">

        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-400">

          <Sparkles size={16} />

          Step {topic.order}

        </div>

        <h2 className="text-3xl font-bold">
          {topic.title}
        </h2>

      </div>

      {/* Scrollable */}

      <div className="flex-1 overflow-y-auto p-8">

        {/* Description */}

        <div className="mb-10">

          <div className="mb-4 flex items-center gap-3">

            <FileText
              size={20}
              className="text-yellow-400"
            />

            <h3 className="text-lg font-semibold">
              Description
            </h3>

          </div>

          <p className="leading-8 text-gray-400">
            {topic.description}
          </p>

        </div>

        {/* Resources */}

        <div>

          <div className="mb-5 flex items-center gap-3">

            <BookOpen
              size={20}
              className="text-yellow-400"
            />

            <h3 className="text-lg font-semibold">
              Resources
            </h3>

          </div>

          {topic.resources?.length ? (

            <div className="space-y-4">

              {topic.resources.map(
                (resource, index) => (

                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-white/10 bg-[#151515] p-5 transition-all duration-300 hover:border-yellow-400 hover:bg-[#1b1b1b]"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">

                          {resource.type}

                        </span>

                        <h4 className="mt-4 font-semibold text-white">

                          {resource.title}

                        </h4>

                      </div>

                      <ExternalLink
                        size={18}
                        className="text-gray-500 transition group-hover:text-yellow-400"
                      />

                    </div>

                    <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">

                      <Link2 size={14} />

                      <span className="truncate">
                        {resource.url}
                      </span>

                    </div>

                  </a>

                )
              )}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">

              <BookOpen
                size={34}
                className="mx-auto text-gray-600"
              />

              <p className="mt-4 text-gray-500">
                No resources available.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default GraphSidebar;