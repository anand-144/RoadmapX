import api from "./api";

export const likeRoadmap = async (roadmapId) => {
  const { data } = await api.post(`/likes/${roadmapId}`);
  return data;
};

export const unlikeRoadmap = async (roadmapId) => {
  const { data } = await api.delete(`/likes/${roadmapId}`);
  return data;
};

export const getRoadmapLikes = async (roadmapId) => {
  const { data } = await api.get(`/likes/${roadmapId}`);
  return data;
};