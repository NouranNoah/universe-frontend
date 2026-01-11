import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/doctor/grade";
const getAuthHeaders = () => ({
    Authorization: Cookies.get("Bearer")
});


//get my courses
export const getMyCoursesFun = async()=>{
    const res =await axios.get(`${API}/courses`,{
        headers: getAuthHeaders()
    })
    return res.data.courses
}

//add component
export const addComponentFun = async(courseId,component)=>{
    const res =await axios.post(`${API}/${courseId}/component`,component,{
        headers: getAuthHeaders()
    })
    return res.data
}

//get component of course
export const getComponentOfCourseFun = async(courseId)=>{
    const res =await axios.get(`${API}/courses/${courseId}/component`,{
        headers: getAuthHeaders()
    })
    return res.data.data
}
//update specific component
export const updateSpecificComponentFun = async(courseId,componentId,component)=>{
    const res =await axios.put(`${API}/${courseId}/component/${componentId}`,component,{
        headers: getAuthHeaders()
    })
    return res.data
}
//delete specific component
export const deleteSpecificComponentFun = async(courseId,componentId)=>{
    const res =await axios.delete(`${API}/${courseId}/component/${componentId}`,{
        headers: getAuthHeaders()
    })
    return res.data
}



//get student of course
export const getStudentofCourseFun = async(courseId)=>{
    const res =await axios.get(`${API}/courses/${courseId}/students`,{
        headers: getAuthHeaders()
    })
    return res.data
}

//update grades of student
export const updateGradesofStudentFun = async(courseId,studentId,component)=>{
    const res =await axios.put(`${API}/courses/${courseId}/students/${studentId}`,component,{
        headers: getAuthHeaders()
    })
    return res.data
}

//put finalize results
export const finalizeResultsFun = async(courseId)=>{
    const res =await axios.put(`${API}/finalizeResults`,{courseId},{
        headers: getAuthHeaders(),
    })
    return res.data
}
