import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/admin";
const token = Cookies.get("Bearer");

export const getoverviewDashFun = async()=>{
    const res = await axios.get(`${API}/dashboardStats`,{
        headers:{Authorization:token}
    })
    return res.data.data
}

export const getAttendanceListFun = async()=>{
    const res = await axios.get(`${API}/attendance`,{
        headers:{Authorization:token}
    })
    return res.data
}

export const getEnrollmentListFun = async()=>{
    const res = await axios.get(`${API}/enrollment`,{
        headers:{Authorization:token}
    })
    return res.data
}
