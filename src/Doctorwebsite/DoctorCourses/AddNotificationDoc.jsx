import React, { useState } from 'react'
import Cookies from "js-cookie";
import { sendDocCourseNotfiFun } from '../../services/DoctorServices/coursesDocService';

export default function AddNotificationDoc({setShowAddModal ,courseId}) {
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [form, setForm] = useState({
        title:"",
        subject: ""
    });
    
    const nameUser = Cookies.get("name");
    const today = new Date().toLocaleDateString("en-GB"); //26/12/2025
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };
    
    const resetAll = () => {
        setForm({
        subject: "",
        title: ""
        });
        setErrormsg("");
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.subject.trim()) {
        setErrormsg("Please fill the Subject ,required field");
        return;
        }
    
        setLoading(true);
        setErrormsg("");
    
        try {
        await sendDocCourseNotfiFun(courseId,{
            title: form.title,
            subject: form.subject
        });
    
        setShowAddModal(false);
        } catch (err) {
        setErrormsg(
            err.response?.data?.msg || "Failed to send notification"
        );
        } finally {
        setLoading(false);
        }
    };
    
    
  return (
    <div className='notDoc'>
        <div className="modal-box">
        <i
            className="closeicon fa-solid fa-xmark"
            onClick={() => setShowAddModal(false)}
        ></i>

        <h3>Add New Notification</h3>
        {errormsg && <p className="error">{errormsg}</p>}

        <form onSubmit={handleSubmit}>
            {/* User + Date */}
            <div className="dateToNoti">
            <div className="notiLab">
                <label>Send by:</label>
                <input
                type="text"
                value={nameUser}
                className="larg"
                readOnly
                />
            </div>

            <div className="notiLab">
                <label>Send at:</label>
                <input
                type="text"
                value={today}
                className="larg"
                readOnly
                />
            </div>
            </div>
            
            {/* title */}
            <div className="notiLab">
            <label>Title:</label>
            <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="small"
                placeholder="write title"
            />
            </div>
            {/* Subject */}
            <div className="notiLab">
            <label>Subject:</label>
            <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="small"
                placeholder="EX: Please note that the Wanette car will no longer be available after October 30, 2024."
            />
            </div>


          {/* Buttons */}
            <div className="btns-group">
            <button type="button" className="left-btn" onClick={resetAll}>
                <i className="fa-solid fa-repeat"></i> Reset all
            </button>

            <button
                type="submit"
                className="right-btn"
                disabled={loading}
            >
                {loading ? "Loading..." : "Send"}
            </button>
            </div>
        </form>
    </div>
    </div>
  )
}
