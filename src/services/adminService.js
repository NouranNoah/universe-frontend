// src/services/adminService.js
import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/admin";
const token = Cookies.get("Bearer");

export const getAdmins = async () => {
    const res = await axios.get(`${API}/getAdmins`, {
        headers: { Authorization: token },
    });
    return res.data.allAdmins;
};

export const addAdmins = async (form)=>{
    const res = await axios.post(`${API}/addAdmin`,form,{
                headers:{Authorization: token}
    });
    return  res.data;
};

export const EditAdmins = async (adminId ,form) =>{
    const res = await axios.put(`${API}/editAdmin/${adminId}`,form,
        {
            headers: { Authorization : token }
        }
    );
    return res.data;
}

export const getTheAdmin = async (adminId) =>{
    const res = await axios.get(`${API}/getAdmin/${adminId}`, {
            headers: { Authorization: token}
        });
    return res.data;
}
export const deleteAdmins = async (adminId) =>{
    const res = await axios.delete(`${API}/deleteAdmin/${adminId}`,{
            headers:{
                Authorization: token
            }                
    })
    return res.data
}

// Profile
export const getProfilefun = async ()=>{
    const res =await axios.get(`${API}/profile`,{
        headers:{Authorization:token}
    })
    return res.data
}
export const editProfilefun = async (form)=>{
    const res =await axios.put(`${API}/profile`,form,{
        headers:{Authorization:token}
    })
    return res.data
}
export const editPassfun = async (form)=>{
    const res =await axios.put(`${API}/password`,form,{
        headers:{Authorization:token}
    })
    return res.data
}