import axiosInstance from "./axiosInstance";

const API = "/admin";

// ================= Application Reports =================
export const getAllReportsFun = async (type = "all") => {
  const url =
    type === "all"
      ? "/report"
      : `/report?type=${type}`;

  const res = await axiosInstance.get(url);
  return res.data;
};

export const deletereportFun = async (id) => {
  const res = await axiosInstance.delete(`https://uni-verse-rho.vercel.app/report/${id}`);
  return res.data;
};

export const addReportFun = async (form) => {
  const res = await axiosInstance.post(`https://uni-verse-rho.vercel.app/report`, form);
  return res.data;
};

export const getreportFun = async (id) => {
  const res = await axiosInstance.get(`https://uni-verse-rho.vercel.app/report/${id}`);
  return res.data.data;
};

// ================= Complaint Reports =================
export const getAllComplaintFun = async (type) => {
  const res = await axiosInstance.get(
    `https://uni-verse-rho.vercel.app/complaint?type=${type}`
  );
  return res.data;
};

export const addComplaintFun = async (form) => {
  const res = await axiosInstance.post(
    `https://uni-verse-rho.vercel.app/complaint`,
    form
  );
  return res.data;
};
export const replyComplaintFun = async (form) => {
  const res = await axiosInstance.post(`${API}/reply`,form);
  return res.data;
};
