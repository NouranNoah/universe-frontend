import React, { useEffect } from 'react';
import './NotificationDoc.css';
import { NavLink } from 'react-router-dom';
import { readNotificationFun } from '../../services/DoctorServices/notification';

export default function NotificationDoc({ onClose, notifications, setNotifications }) {

  
  const handleRead = async (id) => {
    try {
      await readNotificationFun(id);
      
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      onClose(); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notificationDropdown">
      <div className="notifHeader">
        <h4>Notifications</h4>
        <button className="closeBtn" onClick={onClose}>&times;</button>
      </div>

      <div className="notifList">
        {notifications.length === 0 ? (
          <p className="noNotif">No notifications yet.</p>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`notifItem ${notif.read ? 'read' : 'unread'}`}
              onClick={() => handleRead(notif.id)}
            >
              <p className="notifTitle">{notif.title}</p>
              <span className="notifTime">{notif.time}</span>
            </div>
          ))
        )}
      </div>

      <div className="notifFooter">
        <NavLink to="/doctor/notifications" onClick={onClose} className="seeAll">
          See All Notifications
        </NavLink>
      </div>
    </div>
  );
}
