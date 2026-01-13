import axiosInstance from "./axiosInstance";

const API = "/admin";

export const getAllDepartment = async() => {
    const res = await axiosInstance.get(`${API}/department`)
    return res.data;
};
export const addDepartment = async(form) => {
    const res = await axiosInstance.post(`${API}/department`, form)
    return res.data;
};
export const getDepartment = async(id) => {
    const res = await axiosInstance.get(`${API}/department/${id}`)
    return res.data;
};
export const editDepartment = async(id , form) => {
    const res = await axiosInstance.put(`${API}/department/${id}`, form)
    return res.data;
};
export const deleteDepartment = async(id) => {
    const res = await axiosInstance.delete(`${API}/department/${id}`)
    return res.data;
};
