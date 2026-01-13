import React, { useState } from 'react'
import { sendDocCourseNotfiFun } from '../../services/DoctorServices/coursesDocService';

export default function AddNotificationDoc({setShowAddModal ,courseId}) {
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendedDone,setSendedDone] = useState(false);
    const [form, setForm] = useState({
        title:"",
        subject: ""
    });
    
    const nameUser = localStorage.getItem("name");
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
        const notificationData = {
            title: form.title || form.subject,
            subject: form.subject
        };
        
        await sendDocCourseNotfiFun(courseId, notificationData);
        setSendedDone(true)
        } catch (err) {
        // معالجة الأخطاء
        let errorMessage = "Failed to send notification";
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage = data?.msg || 
                          data?.message || 
                          data?.error ||
                          `Server error: ${status}`;
        } else if (err.request) {
            errorMessage = "Network error. Please check your connection.";
        } else {
            errorMessage = err.message || "An error occurred while sending notification";
        }
        
        setErrormsg(errorMessage);
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
        {sendedDone && <p className="success">Notification sent successfully <i class="fa-solid fa-circle-check"></i></p>}

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
