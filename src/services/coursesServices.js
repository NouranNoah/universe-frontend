import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/admin";
const token = Cookies.get("Bearer");

export const getAllCoursesFun = async (type)=>{
    const res = await axios.get(`${API}/course?type=${type}`,
        {
            headers:{Authorization:token},
    })
    return res.data;
}
export const getInstructorNameFun = async (type)=>{
    const res = await axios.get(`${API}/instructorName?type=${type}`,
        {
            headers:{Authorization:token},
    })
    return res.data.allInstructors;
}
export const getCourseFun = async (id)=>{
    const res = await axios.get(`${API}/course/${id}`,{
        headers:{Authorization:token}
    })
    return res.data.subject;
}
export const addCoursesFun = async (form)=>{
    const res = await axios.post(`${API}/course`,form,{
        headers:{
            Authorization:token,
            "Content-Type": "application/json"
    }
    })
    return res.data;
}
export const editStatueCoursesFun = async (id)=>{
    const res = await axios.patch(`${API}/course/${id}`,{},{
        headers:{
            Authorization:token
    }
    })
    return res.data;
}
export const editCourseFun = async(id,form) =>{
    const res =await axios.put(`${API}/course/${id}`,form,{
        headers:{Authorization: token}
    })
    return res.data
}