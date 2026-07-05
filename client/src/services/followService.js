import api from "./api";

export const followUser = async (userId) => {
  const { data } = await api.post(`/follows/${userId}`);
  return data;
};

export const unfollowUser = async (userId) => {
  const { data } = await api.delete(`/follows/${userId}`);
  return data;
};

export const getFollowers = async (userId) => {
  const { data } = await api.get(`/follows/followers/${userId}`);
  return data;
};

export const getFollowing = async (userId) => {
  const { data } = await api.get(`/follows/following/${userId}`);
  return data;
};