import api from "./api";

export const addBookmark = async (roadmapId) => {
  const { data } = await api.post(`/bookmarks/${roadmapId}`);
  return data;
};

export const removeBookmark = async (roadmapId) => {
  const { data } = await api.delete(`/bookmarks/${roadmapId}`);
  return data;
};

export const getMyBookmarks = async () => {
  const { data } = await api.get("/bookmarks/my");
  return data;
};