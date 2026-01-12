import axiosInstance from "./axiosInstance";

const API = "/admin";


export const getoverviewDashFun = async()=>{
    const res = await axiosInstance.get(`${API}/dashboardStats`)
    return res.data.data
}

export const getAttendanceListFun = async()=>{
    const res = await axiosInstance.get(`${API}/attendance`)
    return res.data
}

export const getEnrollmentListFun = async()=>{
    const res = await axiosInstance.get(`${API}/enrollment`)
    return res.data
}
