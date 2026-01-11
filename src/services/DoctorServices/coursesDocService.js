import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/doctor";
const token = Cookies.get("Bearer");

export const getDocCoursesFun = async()=>{
    const res =await axios.get(`${API}/courses`,{
        headers:{Authorization:token}
    })
    return res.data.courses
}
export const getDocCourseFun = async(id)=>{
    const res =await axios.get(`${API}/course/${id}`,{
        headers:{Authorization:token}
    })
    return res.data.data
}
// NotfiFun
export const sendDocCourseNotfiFun = async(id,notfi)=>{
    const res =await axios.post(`${API}/course/${id}/notification`,
        {
            notfi
        },{
        headers:{Authorization:token}
    })
    return res.data
}
//add link to lecture
export const addLinkLectureDocCourseFun = async(id,linklecture)=>{
    const res =await axios.post(`${API}/lecture/${id}/link`,linklecture,{
        headers:{Authorization:token}
    })
    return res.data
}
//add link to Material
export const addLinkMaterialDocCourseFun = async(id,link)=>{
    const res =await axios.post(`${API}/course/${id}/matrial`,link,{
        headers:{Authorization:token}
    })
    return res.data
}
//add link to Quizs
export const addLinkQuizsDocCourseFun = async(id,link)=>{
    const res =await axios.post(`${API}/course/${id}/quiz`,link,{
        headers:{Authorization:token}
    })
    return res.data
}