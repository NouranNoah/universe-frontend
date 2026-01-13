import React from 'react'

export default function NotificationModal({data,onClose}) {
  return (
    <div className="modal-overlay">
            <div className="modal-box NotfiGet">
            <i
                className="closeicon fa-solid fa-xmark"
                onClick={onClose}
            ></i>

            <h3>{data.title}</h3>

             {/* createdAt */}
            <div className="notiLab">
                <label>Send at:</label>
                <input
                type="text"
                value={data.createdAt ? data.createdAt.split("T")[0] : ""}
                className="larg"
                readOnly
                />
            </div>
    
            {/* Subject */}
            <div className="notiLab">
                <label>Subject:</label>
                <input
                    type="text"
                    name="subject"
                    value={data.subject}
                    readOnly
                    className="small"
                />
            </div>
        </div>
    </div>
  )
}
