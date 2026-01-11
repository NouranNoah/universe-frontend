import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/doctor";
const token = Cookies.get("Bearer");

export const getProfileDoctorFun =async()=>{
    const res = await axios.get(`${API}/profile`,{
        headers:{Authorization:token}
    })
    return res.data.data;
}