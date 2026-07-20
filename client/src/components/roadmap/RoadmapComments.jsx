import React, { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle, Send } from "lucide-react";

const RoadmapComments = ({ roadmapId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${roadmapId}`
      );

      setComments(data.comments || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (!content.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${roadmapId}`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (roadmapId) {
      fetchComments();
    }
  }, [roadmapId]);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-8">

      <div className="mb-8 flex items-center gap-3">
        <MessageCircle className="text-yellow-400" />
        <h2 className="text-3xl font-bold">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Input */}

      <textarea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 outline-none transition focus:border-yellow-400"
      />

      <button
        onClick={addComment}
        className="mt-4 flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-105"
      >
        <Send size={18} />
        Post Comment
      </button>

      {/* Comment List */}

      <div className="mt-10 space-y-5">

        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-gray-500">
            No comments yet.
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="flex items-center justify-between">

                <div>
                  <h4 className="font-semibold">
                    {comment.user?.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    @{comment.user?.username}
                  </p>
                </div>

                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>

              </div>

              <p className="mt-4 leading-7 text-gray-300">
                {comment.content}
              </p>

              {comment.isEdited && (
                <p className="mt-3 text-xs italic text-gray-500">
                  Edited
                </p>
              )}
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default RoadmapComments;