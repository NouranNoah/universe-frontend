// src/services/dashServices.js
import axiosInstance from "../axiosInstance";

// ================= Dashboard Data =================
export const getNumStudentCoursesFun = async () => {
  const res = await axiosInstance.get("/doctor/dashboardStats");
  return res.data.data;
};

// ================= Attendance Stats by Year/Month =================
export const getAttendanceStatsFun = async () => {
  const res = await axiosInstance.get("/doctor/attendanceStats");
  return res.data.data;
};

// ================= Students Performance Statistics =================
export const getStudentsStatisticsFun = async () => {
  const res = await axiosInstance.get("/doctor/studentsStatistics");
  return res.data.data;
};
