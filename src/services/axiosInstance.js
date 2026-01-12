import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://uni-verse-rho.vercel.app",
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("Bearer");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default axiosInstance;
