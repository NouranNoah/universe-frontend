import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app";
const token = Cookies.get("Bearer");

//get notification
export const getNotificationsFun=async()=>{
    const res = await axios.get(`${API}/notification`,{
        headers:{Authorization:token}
    })
    return res.data.data
}
//read notification
export const readNotificationFun=async(id)=>{
    const res = await axios.patch(`${API}/notification/${id}`,{
        headers:{Authorization:token}
    })
    return res.data.data
}