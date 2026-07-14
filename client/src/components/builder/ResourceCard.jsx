import React from "react";
import {
  Link,
  Trash2,
  BookOpen,
} from "lucide-react";

const resourceTypes = [
  "Documentation",
  "YouTube",
  "Article",
  "Course",
  "GitHub",
  "Website",
];

const ResourceCard = ({
  topicId,
  resource,
  resourceIndex,
  updateResource,
  deleteResource,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <BookOpen
            size={18}
            className="text-yellow-400"
          />

          <span className="font-semibold">
            Resource {resourceIndex + 1}
          </span>
        </div>

        <button
          onClick={() =>
            deleteResource(topicId, resourceIndex)
          }
          className="rounded-xl p-2 text-red-400 transition hover:bg-red-500/10"
        >
          <Trash2 size={18} />
        </button>

      </div>

      <div className="space-y-5">

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Resource Title
          </label>

          <input
            type="text"
            placeholder="React Official Docs"
            value={resource.title}
            onChange={(e) =>
              updateResource(
                topicId,
                resourceIndex,
                "title",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none transition focus:border-yellow-400"
          />
        </div>

        {/* Type */}
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Resource Type
          </label>

          <select
            value={resource.type}
            onChange={(e) =>
              updateResource(
                topicId,
                resourceIndex,
                "type",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none transition focus:border-yellow-400"
          >
            {resourceTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* URL */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <Link size={14} />
            Resource URL
          </label>

          <input
            type="url"
            placeholder="https://..."
            value={resource.url}
            onChange={(e) =>
              updateResource(
                topicId,
                resourceIndex,
                "url",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none transition focus:border-yellow-400"
          />
        </div>

      </div>

    </div>
  );
};

export default ResourceCard;