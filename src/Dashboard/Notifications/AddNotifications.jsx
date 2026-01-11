import React, { useState } from "react";
import { sendNotificationFun } from "../../services/notificationsService";
import Cookies from "js-cookie";

export default function AddNotifications({ setShowAddModal, getNotif }) {
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    sendTo: ""
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
      sendTo: ""
    });
    setErrormsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.sendTo) {
      setErrormsg("Please fill required fields");
      return;
    }

    setLoading(true);
    setErrormsg("");

    try {
      await sendNotificationFun({
        subject: form.subject,
        sendTo: form.sendTo,
      });

      getNotif();
      setShowAddModal(false);
    } catch (err) {
      setErrormsg(
        err.response?.data?.msg || "Failed to send notification"
      );
    } finally {
      setLoading(false);
    }
  };

  const removeSendTo = () => {
    setForm((prev) => ({ ...prev, sendTo: "" }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box profile-modal">
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


          {/* Send To with Chip */}
            <div className="notiLab">
            <label>Send to:</label>

            <div className="prereq-container">
                <div className="chips">
                {form.sendTo ? (
                    <span className="chip">
                    {form.sendTo}
                    <i
                        className="fa-solid fa-xmark"
                        onClick={removeSendTo}
                    ></i>
                    </span>
                ) : (
                    <span className="add-chip">+ Select receiver</span>
                )}
                </div>

                <div className="select-wrapper">
                <select
                    name="sendTo"
                    value={form.sendTo}
                    onChange={handleChange}
                    className="custom-select"
                >
                    <option value="">Select receiver</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="doctor">Doctor</option>
                    <option value="teaching assistant">Teaching Assistant</option>
                    <option value="all">All</option>
                </select>

                <i className="fa-solid fa-chevron-down select-icon"></i>
            </div>

            </div>
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
                {loading ? "Loading..." : "Add"}
            </button>
            </div>
        </form>
      </div>
    </div>
  );
}
