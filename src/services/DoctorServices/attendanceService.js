import axiosInstance from "../axiosInstance";

// create QR
export const createQRFun = async(form) => {
  const res = await axiosInstance.post("/doctor/createQR", form);
  return res.data;
}

// last attendance
export const lastAttendanceFun = async() => {
  const res = await axiosInstance.get("/doctor/attendance");
  return res.data;
}

// specific attendance
export const specificAttendanceFun = async(id) => {
  const res = await axiosInstance.get(`/doctor/attendance/${id}`);
  return res.data;
}
