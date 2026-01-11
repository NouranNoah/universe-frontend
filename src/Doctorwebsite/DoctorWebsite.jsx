import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderDoctor from '../Components/HeaderDoctor/HeaderDoctor'
import FooterDoctor from '../Components/FooterDoctor/FooterDoctor'
import './DoctorWebsite.css'
export default function () {
  return (
    <div>
        <HeaderDoctor />
        <div className='docWebsite'>
          <Outlet />
        </div>
        <FooterDoctor />
    </div>
  )
}
