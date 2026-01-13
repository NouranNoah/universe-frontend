import axiosInstance from "./axiosInstance";
const API = "/admin";

export const getAllCoursesFun = async (type)=>{
    const res = await axiosInstance.get(`${API}/course?type=${type}`)
    return res.data;
}
export const getInstructorNameFun = async (type)=>{
    const res = await axiosInstance.get(`${API}/instructorName?type=${type}`)
    return res.data.allInstructors;
}
export const getCourseFun = async (id)=>{
    const res = await axiosInstance.get(`${API}/course/${id}`)
    return res.data.subject;
}
export const addCoursesFun = async (form)=>{
    const res = await axiosInstance.post(`${API}/course`,form)
    return res.data;
}
export const editStatueCoursesFun = async (id)=>{
    const res = await axiosInstance.patch(`${API}/course/${id}`,{})
    return res.data;
}
export const editCourseFun = async(id,form) =>{
    const res =await axiosInstance.put(`${API}/course/${id}`,form)
    return res.data
}