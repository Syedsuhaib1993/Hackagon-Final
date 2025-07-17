import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
     const user =JSON.parse(localStorage.getItem('user'));
        
  return (
    user.role == "Admin" ? <Outlet/>:<Navigate to={'/'}/>
  )
}

export default AdminRoutes
