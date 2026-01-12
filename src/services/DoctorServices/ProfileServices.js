// src/services/doctorProfileService.js
import axiosInstance from "../axiosInstance";

// ================= Get Doctor Profile =================
export const getProfileDoctorFun = async () => {
  const res = await axiosInstance.get("/doctor/profile");
  return res.data.data;
};
