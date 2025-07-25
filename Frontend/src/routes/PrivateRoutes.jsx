import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const Auth = !!localStorage.getItem('token')
    // console.log(Auth);
    
  return (
    Auth? <Outlet/>:<Navigate to={'/login'}/>
  )
}

export default PrivateRoutes
