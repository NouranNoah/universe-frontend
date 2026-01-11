import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/admin";
const token = Cookies.get("Bearer");


export const getAllDepartment = async() => {
    const res = await axios.get(`${API}/department`,
        {
            headers: {Authorization : token}
        }
    )
    return res.data;
};
export const addDepartment = async(form) => {
    const res = await axios.post(`${API}/department`, form,
        {
            headers: {Authorization : token}
        }
    )
    return res.data;
};
export const getDepartment = async(id) => {
    const res = await axios.get(`${API}/department/${id}`, 
        {
            headers: {Authorization : token}
        }
    )
    return res.data;
};
export const editDepartment = async(id , form) => {
    const res = await axios.put(`${API}/department/${id}`, form,
        {
            headers: {Authorization : token}
        }
    )
    return res.data;
};
export const deleteDepartment = async(id) => {
    const res = await axios.delete(`${API}/department/${id}`,
        {
            headers: {Authorization : token}
        }
    )
    return res.data;
};
