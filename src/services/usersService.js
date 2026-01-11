import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/admin";
const token = Cookies.get("Bearer");


// Student....
export const addStudentFun = async (form)=> {
    const res = await axios.post(`${API}/student`, form ,
        {
            headers:{
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return res.data
}
export const getAllStudentFun = async ()=> {
    const res = await axios.get(`${API}/student`, 
        {
            headers:{Authorization: token}
        }
    )
    return res.data.allStudents
}
export const getStudentFun = async (id)=> {
    const res = await axios.get(`${API}/student/${id}`, 
        {
            headers:{Authorization: token}
        }
    )
    return res.data
}
export const editStudentFun = async (id, form)=> {
    const res = await axios.put(`${API}/student/${id}`, form ,
        {
            headers:{Authorization: token}
        }
    )
    return res.data
}
export const deleteStudentFun = async (id)=> {
    const res = await axios.patch(`${API}/student/${id}`,{},
        {
            headers:{Authorization: token}
        }
    )
    return res.data
}
// ------------------------------------------------------
// Instructors....
export const addInstructorFun = async (form) =>{
    const res =await axios.post(`${API}/instructor`, form,{
        headers:{
            Authorization:token
        }
    })
    return res.data;
}
export const getInstructorsFun = async () =>{
    const res =await axios.get(`${API}/instructor`,{
        headers:{
            Authorization:token
        }
    })
    return res.data;
}
export const getInstructorFun = async (id) =>{
    const res =await axios.get(`${API}/instructor/${id}`,{
        headers:{
            Authorization:token
        }
    })
    return res.data;
}
export const editInstructorFun = async (id,form) =>{
    const res =await axios.put(`${API}/instructor/${id}`,form,{
        headers:{
            Authorization:token
        }
    })
    return res.data;
}
export const updateInstructorStatusFun = async (id) =>{
    const res =await axios.patch(`${API}/instructor/${id}`,{},{
        headers:{
            Authorization:token
        }
    })
    return res.data;
}