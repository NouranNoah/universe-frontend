import axiosInstance from "./axiosInstance";

const API = "/admin";

export const getAdmins = async () => {
  const res = await axiosInstance.get(`${API}/getAdmins`);
  return res.data.allAdmins;
};

export const addAdmins = async (form) => {
  const res = await axiosInstance.post(`${API}/addAdmin`, form);
  return res.data;
};

export const EditAdmins = async (adminId, form) => {
  const res = await axiosInstance.put(`${API}/editAdmin/${adminId}`, form);
  return res.data;
};

export const getTheAdmin = async (adminId) => {
  const res = await axiosInstance.get(`${API}/getAdmin/${adminId}`);
  return res.data;
};

export const deleteAdmins = async (adminId) => {
  const res = await axiosInstance.delete(`${API}/deleteAdmin/${adminId}`);
  return res.data;
};

// Profile
export const getProfilefun = async () => {
  const res = await axiosInstance.get(`${API}/profile`);
  return res.data;
};

export const editProfilefun = async (form) => {
  const res = await axiosInstance.put(`${API}/profile`, form);
  return res.data;
};

export const editPassfun = async (form) => {
  const res = await axiosInstance.put(`${API}/password`, form);
  return res.data;
};
