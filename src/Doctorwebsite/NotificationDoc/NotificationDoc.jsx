import './NotificationDoc.css';
import { readNotificationFun } from '../../services/DoctorServices/notification';

export default function NotificationDoc({ onSelect, onClose, notifications, setNotifications }) {

  const handleRead = async (id) => {
    try {
      await readNotificationFun(id);

      setNotifications(prev =>
        prev.map(n =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
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
              key={notif._id}
              className={`notifItem ${notif.isRead ? 'read' : 'unread'}`}
              onClick={() => {
                handleRead(notif._id);
                onSelect(notif);
              }}
            >
              <p className="notifTitle">{notif.title}</p>
              <span className="notifTime">
                {notif.createdAt.split("T")[0]}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
