
import axios from "axios";
import Cookies from "js-cookie";

const API = "https://uni-verse-rho.vercel.app/doctor";
const token = Cookies.get("Bearer");

export const getNumStudentCoursesFun = async()=>{
    const res = await axios.get(`${API}/dashboardStats`,{
        headers:{
            Authorization:token
        }
    })
    return res.data.data;
}
//attendance stats by year and month
export const getAttendanceStatsFun = async()=>{
    const res = await axios.get(`${API}/attendanceStats`,{
        headers:{
            Authorization:token
        }
    })
    return res.data.data;
}
//Attendance statistics
export const getStudentsStatisticsFun = async()=>{
    const res = await axios.get(`${API}/studentsStatistics`,{
        headers:{
            Authorization:token
        }
    })
    return res.data.data;
}