import React, { useEffect, useState } from 'react'
import './Reports.css'
import { Outlet } from 'react-router-dom'
import { getAllReportsFun } from '../../services/reportService'

export default function Reports() {
    

  return (
    <div className='userDash'>
        <Outlet />
    </div>
  )
}
