import React, { useEffect, useState } from 'react';
import { createQRFun } from '../../services/DoctorServices/attendanceService';
import { getMyCoursesFun } from '../../services/DoctorServices/gradeDocService';
import Cookies from "js-cookie";

export default function CreatQr({ setCreatQr, getLastAttendance }) {
  const [errormsg, setErrormsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  
  const [form, setForm] = useState({
    name: '',
    courseId: '',
    expireAfterMinutes: '15', // default 15 minutes
  });

  // handle change for name and courseId
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const resetAll = () => {
    setForm({
      name: '',
      courseId: '',
      expireAfterMinutes: '15',
    });
    setErrormsg('');
  };

  // Convert HH:mm to total minutes
  const getMinutes = (val) => Number(val);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const expireAfterMinutesNumber = getMinutes(form.expireAfterMinutes);

    // Validation
    if (!form.name.trim()) {
      setErrormsg('Lecture name is required');
      return;
    }
    if (!form.courseId.trim()) {
      setErrormsg('Course is required');
      return;
    }
    
    if (!expireAfterMinutesNumber || expireAfterMinutesNumber <= 0) {
        setErrormsg("Minutes must be greater than 0");
        return;
    }

    
    setLoading(true);
    setErrormsg('');

    try {
      await createQRFun({
        name: form.name.trim(),
        courseId: form.courseId,
        expireAfterMinutes: expireAfterMinutesNumber,
      });
      Cookies.set('expireAfterMinutes',expireAfterMinutesNumber)
      console.log('set',expireAfterMinutesNumber);
      getLastAttendance(); // refresh list
      setCreatQr(false);
    } catch (err) {
      setErrormsg(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        'Failed to create QR'
      );
    } finally {
      setLoading(false);
    }
  };

  const getCourses = async () => {
    setLoading(true);
    setErrormsg('');

    try {
      const data = await getMyCoursesFun();
      if (!data || data.length === 0) {
        setErrormsg('No courses found.');
        setCourses([]);
        return;
      }
      setCourses(data);
    } catch (err) {
      console.error(err);
      setErrormsg('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="notDoc comp">
      <div className="modal-box">
        <i
          className="closeicon fa-solid fa-xmark"
          onClick={() => setCreatQr(false)}
        ></i>

        <h3>Create QR Code</h3>

        {errormsg && <p className="error">{errormsg}</p>}

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="notiLab">
            <label style={{ width: '20%' }}>Lecture name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Lecture 1"
            />
          </div>

          {/* TIME */}
          <div className="dateToNoti">
            <div className="notiLab">
                <label>Minutes:</label>
                <input
                    type="number"
                    name="expireAfterMinutes"
                    value={form.expireAfterMinutes}
                    onChange={handleChange}
                    placeholder="15"
                    min={1} 
                />
            </div>


            {/* COURSE SELECT */}
            <select
              value={form.courseId}
              name="courseId"
              onChange={handleChange}
            >
              <option value="">Select course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}
          <div className="btns-group">
            <button
              type="button"
              className="left-btn"
              onClick={resetAll}
            >
              <i className="fa-solid fa-repeat"></i> Reset
            </button>

            <button
              type="submit"
              className="right-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save QR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
