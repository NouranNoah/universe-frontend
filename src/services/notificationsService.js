import axiosInstance from "./axiosInstance";

const API = "/admin";

export const getNotificationFun = async()=>{
    const res =await axiosInstance.get(`${API}/notification`)
    return res.data.data;
}
export const sendNotificationFun = async(notif)=>{
    const res =await axiosInstance.post(`${API}/notification`,notif)
    return res.data;
}