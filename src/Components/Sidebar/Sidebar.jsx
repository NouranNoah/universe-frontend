import React, { useContext, useState } from 'react'
import './Sidebar.css'
import logo from '../../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import dashboardIcon from '../../assets/dashIcon.png';
import courseIcon from '../../assets/CourseIcon.png';
import IconUsers from '../../assets/IconUsers.png';
import IconAdmin from '../../assets/IconAdmin.png';
import IconDepart from '../../assets/IconDepart.png';
import IconNotif from '../../assets/IconNotfi.png';
import IconReport from '../../assets/iconReport.png';
import profileIcon from '../../assets/profileIcon.png';
import Cookies from 'js-cookie';
import { AuthContext } from '../../Auth/AuthContext/authContext';

export default function Sidebar() {
    const location = useLocation();
    const nameAdmin = Cookies.get('name');
    const [isMobileOpen, setIsMobileOpen] = useState(false);


    const [openUsers, setOpenUsers] = useState(false);
    const [openCourses, setOpenCourses] = useState(false);
    const [openReports, setOpenReports] = useState(false);

    const {logout} =  useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();         
      navigate("/login"); 
    };
  return (
    <>
      <div className="mobile-menu-icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        <i className="fa-solid fa-ellipsis"></i>
      </div>
      <div className={`Sidebar-content ${isMobileOpen ? "show" : ""}`}>

        <div className='SidebarLogo'>
          <img src={logo} alt="logo" />
          <p>UniVerse</p>
        </div>

        <div className='SidebarItems'>

          {/* Dashboard */}
          <Link to="/dashboard/dashboardAdmin" onClick={() => setIsMobileOpen(false)} className={`sidebar-item ${location.pathname === "/dashboard/dashboardAdmin" ? 'active' : ''}`}>
            <div className='i-name'>
              <img src={dashboardIcon} alt="" />
              Dashboard
            </div>
          </Link>

          {/* Courses */}
          <div className="sidebar-item">
            <div
              className="i-name"
              onClick={() => setOpenCourses(!openCourses)}
              style={{ cursor: "pointer" }}
            >
              <img src={courseIcon} alt="courseIcon" />
              Courses
              {
                openCourses?
                <i className="fa-solid fa-angle-down"></i>
                :
                <i className="fa-solid fa-angle-right"></i>
              }
            </div>

            {openCourses && (
              <div className="user-btn">
                <Link
                  to="/dashboard/course/doctor"
                  className={`sub-link ${location.pathname.includes("doctor") ? "activeUser" : ""}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  - Doctor
                </Link>

                <Link
                  to="/dashboard/course/teaching assistant"
                  className={`sub-link ${location.pathname.includes("teaching assistant") ? "activeUser" : ""}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  - Teaching Assistant
                </Link>
              </div>
            )}
          </div>

          {/* Users (Toggle) */}
          <div className="sidebar-item">
            <div
              className="i-name"
              onClick={() => setOpenUsers(!openUsers)}
              style={{ cursor: "pointer" }}
            >
              <img src={IconUsers} alt="" />
              Users
              {
                openUsers?
                <i className="fa-solid fa-angle-down"></i>
                :
                <i className="fa-solid fa-angle-right"></i>
              }
            </div>

            {openUsers && (
              <div className="user-btn">
                <Link
                  to="/dashboard/users/students"
                  className={`sub-link ${location.pathname.includes("students") ? "activeUser" : ""}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  - Students
                </Link>

                <Link
                  to="/dashboard/users/instructors"
                  className={`sub-link ${location.pathname.includes("instructors") ? "activeUser" : ""}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                - Instructors
                </Link>
              </div>
            )}
          </div>

          {/* Admins */}
          <Link to="/dashboard/admins" onClick={() => setIsMobileOpen(false)} className="sidebar-item">
            <div className='i-name'>
              <img src={IconAdmin} alt="" />
              Admins
            </div>
          </Link>

          <Link to="/dashboard/departments" onClick={() => setIsMobileOpen(false)} className="sidebar-item">
            <div className='i-name'>
              <img src={IconDepart} alt="IconDepart" />
              Departments
            </div>
          </Link>

          <Link to="/dashboard/notifications" onClick={() => setIsMobileOpen(false)} className="sidebar-item">
            <div className='i-name'>
              <img src={IconNotif} alt="IconNotif" />
              Notifications
            </div>
          </Link>

          <div className="sidebar-item">
            <div
              className="i-name"
              onClick={() => setOpenReports(!openReports)}
              style={{ cursor: "pointer" }}
            >
              <img src={IconReport} alt="IconReport" />
              Reports
              {
                openReports?
                <i className="fa-solid fa-angle-down"></i>
                :
                <i className="fa-solid fa-angle-right"></i>
              }
            </div>

            {openReports && (
              <div className="user-btn">
                <Link
                  to="/dashboard/reports/Application-reports"
                  className={`sub-link ${location.pathname.includes("Application-reports") ? "activeUser" : ""}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  - Application reports
                </Link>

                <Link
                  to="/dashboard/reports/Complaint-reports"
                  className={`sub-link ${location.pathname.includes("Complaint-reports") ? "activeUser" : ""}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                - Complaint reports
                </Link>
              </div>
            )}
          </div>

        </div>

        <div className='logOut' onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p>Logout</p>
        </div>

        {/* Profile */}
        <Link to='/dashboard/profile' onClick={() => setIsMobileOpen(false)} className="sidebar-item">
          <div className='profileBox'>
            <img src={profileIcon} alt="profileIcon" />
            <div>
              <p>Welcome back 👋</p>
              <h3>{nameAdmin}</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}