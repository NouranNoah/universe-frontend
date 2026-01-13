import React, { useState, useContext } from "react";
import { replyComplaintFun } from "../../../services/reportService";
import { AuthContext } from "../../../Auth/AuthContext/authContext";
import Cookies from "js-cookie";
export default function ReplyComplaint({ setShowModal, Usercomp, nameRevice }) {
  const { user } = useContext(AuthContext); 
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const token = Cookies.get("Bearer");
  console.log(token,'ff',Usercomp);
  
  const [form, setForm] = useState({
    subject: "",
    sendTo: Usercomp,
  });

  const nameUser = user?.name || "";
  const today = new Date().toLocaleDateString("en-GB");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetAll = () => {
    setForm({ subject: "", sendTo: Usercomp });
    setErrormsg("");
    setSended(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject.trim()) {
      setErrormsg("Please fill subject required field");
      return;
    }

    setLoading(true);
    setErrormsg("");

    try {
      await replyComplaintFun({
        subject: form.subject,
        sendTo: form.sendTo,
      });

      setSended(true);
      resetAll();

      console.log("Reply sent. Notification will be handled by backend.");

    } catch (err) {
        if(err.response?.data?.message){
            setErrormsg('User has disabled notifications or hasn’t registered a device')
        }
        else{
            setErrormsg("Failed to send the message!")
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box profile-modal">
        <i className="closeicon fa-solid fa-xmark" onClick={() => setShowModal(false)}></i>

        <h3>Reply</h3>
        {errormsg && <p className="error">{errormsg}</p>}
        {sended && <p className="success">Message sent successfully!</p>}

        <form onSubmit={handleSubmit}>
          <div className="dateToNoti">
            <div className="notiLab">
              <label>Send by:</label>
              <input type="text" value={nameUser} className="larg" readOnly />
            </div>

            <div className="notiLab">
              <label>Send at:</label>
              <input type="text" value={today} className="larg" readOnly />
            </div>
          </div>

          <div className="notiLab">
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="small"
              placeholder="EX: Please note that the Wanette car will no longer be available after October 30, 2024."
            />
          </div>

          <div className="notiLab">
            <label>Send to:</label>
            <input
              type="text"
              value={nameRevice}
              style={{ paddingLeft: "12%" }}
              readOnly
            />
          </div>

          <div className="btns-group">
            <button type="button" className="left-btn" onClick={resetAll}>
              <i className="fa-solid fa-repeat"></i> Reset all
            </button>

            <button type="submit" className="right-btn" disabled={loading}>
              {loading ? "Loading..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
