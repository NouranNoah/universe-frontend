import axiosInstance from "./axiosInstance";

const API = "/admin";

// ================= Students =================
export const addStudentFun = async (form) => {
  const res = await axiosInstance.post(
    `${API}/student`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return res.data;
};

export const getAllStudentFun = async () => {
  const res = await axiosInstance.get(`${API}/student`);
  return res.data.allStudents;
};

export const getStudentFun = async (id) => {
  const res = await axiosInstance.get(`${API}/student/${id}`);
  return res.data;
};

export const editStudentFun = async (id, form) => {
  const res = await axiosInstance.put(`${API}/student/${id}`, form);
  return res.data;
};

export const deleteStudentFun = async (id) => {
  const res = await axiosInstance.patch(`${API}/student/${id}`, {});
  return res.data;
};

// ================= Instructors =================
export const addInstructorFun = async (form) => {
  const res = await axiosInstance.post(`${API}/instructor`, form);
  return res.data;
};

export const getInstructorsFun = async () => {
  const res = await axiosInstance.get(`${API}/instructor`);
  return res.data;
};

export const getInstructorFun = async (id) => {
  const res = await axiosInstance.get(`${API}/instructor/${id}`);
  return res.data;
};

export const editInstructorFun = async (id, form) => {
  const res = await axiosInstance.put(`${API}/instructor/${id}`, form);
  return res.data;
};

export const updateInstructorStatusFun = async (id) => {
  const res = await axiosInstance.patch(`${API}/instructor/${id}`, {});
  return res.data;
};
