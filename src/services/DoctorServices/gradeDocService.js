// src/services/gradeDocService.js
import axiosInstance from "../axiosInstance";

const API = "/doctor/grade";

// ================= My Courses =================
export const getMyCoursesFun = async () => {
  const res = await axiosInstance.get(`${API}/courses`);
  return res.data.courses;
};

// ================= Components =================
export const addComponentFun = async (courseId, component) => {
  const res = await axiosInstance.post(`${API}/${courseId}/component`, component);
  return res.data;
};

export const getComponentOfCourseFun = async (courseId) => {
  const res = await axiosInstance.get(`${API}/courses/${courseId}/component`);
  return res.data.data;
};

export const updateSpecificComponentFun = async (courseId, componentId, component) => {
  const res = await axiosInstance.put(`${API}/${courseId}/component/${componentId}`, component);
  return res.data;
};

export const deleteSpecificComponentFun = async (courseId, componentId) => {
  const res = await axiosInstance.delete(`${API}/${courseId}/component/${componentId}`);
  return res.data;
};

// ================= Students =================
export const getStudentofCourseFun = async (courseId) => {
  const res = await axiosInstance.get(`${API}/courses/${courseId}/students`);
  return res.data;
};

export const updateGradesofStudentFun = async (courseId, studentId, component) => {
  const res = await axiosInstance.put(`${API}/courses/${courseId}/students/${studentId}`, component);
  return res.data;
};

// ================= Finalize =================
export const finalizeResultsFun = async (courseId) => {
  const res = await axiosInstance.put(`${API}/finalizeResults`, { courseId });
  return res.data;
};
