import api from "./api";

export const getMyNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

export const markNotificationAsRead = async (notificationId) => {
  const { data } = await api.put(
    `/notifications/${notificationId}/read`
  );
  return data;
};

export const markAllNotificationsAsRead = async () => {
  const { data } = await api.put("/notifications/read-all");
  return data;
};

export const deleteNotification = async (notificationId) => {
  const { data } = await api.delete(
    `/notifications/${notificationId}`
  );
  return data;
};