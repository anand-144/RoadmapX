import api from "./api";

export const getRoadmaps = async (params = {}) => {
  const { data } = await api.get("/roadmaps", {
    params,
  });

  return data;
};

export const getRoadmapBySlug = async (slug) => {
  const { data } = await api.get(`/roadmaps/${slug}`);
  return data;
};

export const createRoadmap = async (roadmapData) => {
  const { data } = await api.post("/roadmaps", roadmapData);
  return data;
};

export const updateRoadmap = async (id, roadmapData) => {
  const { data } = await api.put(`/roadmaps/${id}`, roadmapData);
  return data;
};

export const deleteRoadmap = async (id) => {
  const { data } = await api.delete(`/roadmaps/${id}`);
  return data;
};