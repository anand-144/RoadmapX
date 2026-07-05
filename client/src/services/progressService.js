import api from "./api";

export const completeTopic = async (roadmapId, topicId) => {
  const { data } = await api.post(
    `/progress/${roadmapId}/topic/${topicId}`
  );
  return data;
};

export const removeCompletedTopic = async (
  roadmapId,
  topicId
) => {
  const { data } = await api.delete(
    `/progress/${roadmapId}/topic/${topicId}`
  );
  return data;
};

export const getMyProgress = async () => {
  const { data } = await api.get("/progress/my");
  return data;
};

export const getRoadmapProgress = async (roadmapId) => {
  const { data } = await api.get(`/progress/${roadmapId}`);
  return data;
};