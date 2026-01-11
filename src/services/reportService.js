import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app";
const token = Cookies.get("Bearer");

// Application reports 
export const getAllReportsFun = async(type = 'all')=>{
    const url =
    type === 'all'
      ? 'https://uni-verse-rho.vercel.app/report'
      : `https://uni-verse-rho.vercel.app/report?type=${type}`;

    const res = await axios.get(url,{
        headers:{Authorization:token}
    })
    return res.data;
}


export const deletereportFun = async (id)=>{
    const res = await axios.delete(`${API}/report/${id}`,{
        headers:{Authorization:token}
    })
    return res.data;
}
export const addReportFun = async (form)=>{
    const res = await axios.post(`${API}/report`,form,{
        headers:{Authorization:token}
    })
    return res.data;
}
export const getreportFun = async (id)=>{
    const res = await axios.get(`${API}/report/${id}`,{
        headers:{Authorization:token}
    })
    return res.data.data;
}
// Complaint Reports 
export const getAllComplaintFun = async (type)=>{
    const res = await axios.get(`${API}/complaint/?type=${type}`,{
        headers:{Authorization:token}
    })
    return res.data;
}
export const addComplaintFun = async (form)=>{
    const res = await axios.post(`${API}/complaint`,form,{
        headers:{Authorization:token}
    })
    
    return res.data;
}
