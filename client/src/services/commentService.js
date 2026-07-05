import api from "./api";

export const addComment = async (roadmapId, commentData) => {
  const { data } = await api.post(
    `/comments/${roadmapId}`,
    commentData
  );
  return data;
};

export const getCommentsByRoadmap = async (roadmapId) => {
  const { data } = await api.get(`/comments/${roadmapId}`);
  return data;
};

export const updateComment = async (commentId, commentData) => {
  const { data } = await api.put(
    `/comments/${commentId}`,
    commentData
  );
  return data;
};

export const deleteComment = async (commentId) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};