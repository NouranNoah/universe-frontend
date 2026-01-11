import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import './HeaderDoctor.css';
import { getProfileDoctorFun } from '../../services/DoctorServices/ProfileServices';
import profileDefult from '../../assets/default-profile-picture.jpg';
import NotificationDoc from '../../Doctorwebsite/NotificationDoc/NotificationDoc';
import { getNotificationsFun } from '../../services/DoctorServices/notification';
import { AuthContext } from '../../Auth/AuthContext/authContext';

export default function HeaderDoctor() {
  const [imgDoc, setImgDoc] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openNotfi, setopenNotfi] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getImgDoc = async () => {
      setLoading(true)
      try {
        const res = await getProfileDoctorFun(); 
        setImgDoc(res.profileImage);
      } catch(err) {
        console.log('failed to get profile image!');
        setImgDoc(profileDefult);
      } finally {
        setLoading(false)
      }
    }
    getImgDoc();
  }, [])

  
  useEffect(() => {
    const fetchNotifi = async () => {
      setNotifLoading(true);
      try {
        const data = await getNotificationsFun();
        console.log(data);
        
        setNotifications(data);
      } catch (err) {
        console.log(err);
      } finally {
        setNotifLoading(false);
      }
    }
    fetchNotifi();
  }, []); 

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={`HeaderWeb ${menuOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div className='SidebarLogo'>
        <img src={logo} alt="logo" />
        <p>UniVerse</p>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav */}
      <ul className='navLinks'>
        {[
          { path: '/doctor', label: 'Dashboard' },
          { path: '/doctor/DoctorCourses', label: 'Courses' },
          { path: '/doctor/DoctorGrades', label: 'Grades' },
          { path: '/doctor/DoctorAttendance', label: 'Attendance' },
        ]
          .filter(item => {
            if (item.label === 'Attendance') {
              return user?.type === 'doctor';
            }
            return true;
          })
          .map((item) => (
            <li key={item.path} onClick={() => setMenuOpen(false)}>
              <NavLink
                end
                to={item.path}
                className={({ isActive }) => isActive ? 'activeLink' : ''}
              >
                <div className="linkText">{item.label}</div>
                <div className="underline"></div>
              </NavLink>
            </li>
          ))
        }
      </ul>


      {/* Right Side */}
      <div className="rightSide">
        <div className="notif" onClick={() => setopenNotfi(!openNotfi)}>
            <i className="fa-solid fa-bell"></i>
            {unreadCount > 0 && <div className='num-of-notif'>{unreadCount}</div>}
            {openNotfi && (
                <NotificationDoc 
                onClose={() => setopenNotfi(false)} 
                notifications={notifications} 
                setNotifications={setNotifications} 
                />
            )}
        </div>

        {loading ? (
          <div className="profile-loading"></div>
        ) : (
          <NavLink to='/doctor/your-profile'>
            <img className="profile-img" src={imgDoc} alt="Profile-img" />
          </NavLink>
        )}

      </div>

    </div>
  );
}
