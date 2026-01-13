// src/services/doctorService.js
import axiosInstance from "../axiosInstance";

// ================= Courses =================
export const getDocCoursesFun = async () => {
  const res = await axiosInstance.get("/doctor/courses");
  return res.data.courses;
};

export const getDocCourseFun = async (id) => {
  const res = await axiosInstance.get(`/doctor/course/${id}`);
  return res.data.data;
};

// ================= Notifications =================
export const sendDocCourseNotfiFun = async (id, notfi) => {
  // إرسال البيانات مباشرة - الـ API يتوقع { title, subject } وليس { notfi: {...} }
  const notificationPayload = {
    title: notfi.title || notfi.subject || "Notification",
    subject: notfi.subject
  };
  
  const res = await axiosInstance.post(`/doctor/course/${id}/notification`, notificationPayload);
  return res.data;
};

// ================= Add Lecture Link =================
export const addLinkLectureDocCourseFun = async (id, linklecture) => {
  const res = await axiosInstance.post(`/doctor/lecture/${id}/link`, linklecture);
  return res.data;
};

// ================= Add Material Link =================
export const addLinkMaterialDocCourseFun = async (id, link) => {
  const res = await axiosInstance.post(`/doctor/course/${id}/matrial`, link);
  return res.data;
};

// ================= Add Quiz Link =================
export const addLinkQuizsDocCourseFun = async (id, link) => {
  const res = await axiosInstance.post(`/doctor/course/${id}/quiz`, link);
  return res.data;
};
