// src/services/notificationService.js
import axiosInstance from "../axiosInstance";

// ================= Get Notifications =================
export const getNotificationsFun = async () => {
  const res = await axiosInstance.get("/notification");
  return res.data.data;
};

// ================= Read Notification =================
export const readNotificationFun = async (id) => {
  const res = await axiosInstance.patch(`/notification/${id}`);
  return res.data.data;
};
