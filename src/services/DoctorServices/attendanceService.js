import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/doctor";
const getAuthHeaders = () => ({
    Authorization: Cookies.get("Bearer")
});

//createQRFun
export const createQRFun = async(form)=>{
    const res = await axios.post(`${API}/createQR`,form,{
        headers:getAuthHeaders()
    })
    return res.data
}
//last attendance
export const lastAttendanceFun = async()=>{
    const res = await axios.get(`${API}/attendance`,{
        headers:getAuthHeaders()
    })
    return res.data
}

//specific attendance
export const specificAttendanceFun = async(id)=>{
    const res = await axios.get(`${API}/attendance/${id}`,{
        headers:getAuthHeaders()
    })
    return res.data
}


