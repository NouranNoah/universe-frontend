import React, { useState } from 'react'
import './FooterDoctor.css'
import logo from '../../assets/logo.png';
import ContactUS from '../../Doctorwebsite/ContactUS/ContactUS';
import RatingWebSite from '../../Doctorwebsite/RatingWebSite/RatingWebSite';

export default function FooterDoctor() {
    const [showContactModal,setshowContactModal] = useState(false)
    const [showRatingModal,setshowRatingModal] = useState(false)
  return (
    <div className='FooterDoctor'>
        <div className='footerb1'>
            <div className='SidebarLogo'>
                <img src={logo} alt="logo" />
                <p>UniVerse</p>
            </div>
            <p>An all-in-one college management platform that gives full control over courses, notifications, and academic data. Designed with smart dashboards to simplify operations, enhance communication, and support efficient decision-making.</p>
        </div>
        <div className='footerb2'>
            <h4>SUPPORT</h4>
            <p>For questions or support click here <span onClick={()=>setshowContactModal(true)}>Contact US</span></p>
            <p>Add review for websit click here <span onClick={()=>setshowRatingModal(true)}>Review Website</span></p>
        </div>
        <div className='footerb3'>
            <h4>Contact information</h4>
            <p>Suez Canal University</p>
            <p>Computer and Informatics</p>
            <p>Ismailia, Egypt</p>
        </div>
        {showContactModal && (
            <div className="modal-overlay">
                <ContactUS setshowContactModal={setshowContactModal} />
            </div>
        )}
        {showRatingModal && (
            <div className="modal-overlay">
                <RatingWebSite setshowRatingModal={setshowRatingModal} />
            </div>
        )}
    </div>
  )
}
