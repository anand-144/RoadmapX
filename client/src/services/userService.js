import api from "./api";

export const getProfile = async () => {
    const {data} = await api.get("/user/profile");
    return data;
};

export const updateProfile = async (userData) => {
    const {data} = await api.put("/user/profile", userData);
    return data;
};

export const getUserByUsername = async (username) => {
  const { data } = await api.get(`/user/${username}`);
  return data;
};