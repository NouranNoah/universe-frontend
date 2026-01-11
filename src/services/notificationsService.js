import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/admin";
const token = Cookies.get("Bearer");

export const getNotificationFun = async()=>{
    const res =await axios.get(`${API}/notification`,{
        headers:{Authorization:token}
    })
    return res.data.data;
}
export const sendNotificationFun = async(notif)=>{
    const res =await axios.post(`${API}/notification`,notif,{
        headers:{Authorization:token}
    })
    return res.data;
}