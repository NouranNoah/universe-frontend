import React from 'react'
import './Users.css'
import { Outlet } from 'react-router-dom'

export default function Users() {
  
  return (
    <div className='userDash'>
      <Outlet />
    </div>
  )
}
