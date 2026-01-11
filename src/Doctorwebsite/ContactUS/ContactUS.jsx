import React, { useState } from 'react'
import { addComplaintFun } from '../../services/reportService';

export default function ContactUS({setshowContactModal}) {
    const [form, setForm] = useState({
        subject: "",
    });
    
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);
    
    const resetAll = () => {
        setForm({
            subject: "",
        });
        setErrormsg("");
    };
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1) Check empty fields
        if (!form.subject) {
            setErrormsg("Please fill all data!");
            return;
        }

        setLoading(true);

        try {
            const data = await addComplaintFun(form);
            console.log("Done:", data);

            resetAll();
            setshowContactModal(false);

        } catch (err) {
            console.log("error:", err.response?.data);
            setErrormsg(err.response?.data?.errors?.[0]?.message);
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="modal-boxd">
        <i
            className="closeicon fa-solid fa-xmark"
            onClick={() => setshowContactModal(false)}
        ></i>

        <h3>Contact US</h3>

        <form onSubmit={handleSubmit}>
        {errormsg && <p className="error">{errormsg}</p>}

        <div>
            <label>Message:</label>
            <input
            type="text"
            placeholder="Your Message"
            name="subject"
            value={form.name}
            onChange={handleChange}
            />
        </div>

        <div className="btns-group">
            <button
            type="button"
            className="left-btn"
            onClick={resetAll}
            >
            <i className="fa-solid fa-repeat"></i> Reset all
            </button>

            <button type="submit" className="right-btn">
            {loading ? "Loading.." : "Send"}
            </button>
        </div>
        </form>
    </div>
    );
}
