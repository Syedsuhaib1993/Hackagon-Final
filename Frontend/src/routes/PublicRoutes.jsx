import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
     const Auth = !!localStorage.getItem('token')
    console.log(Auth);
  return (
   Auth? <Navigate to={'/'}/>:<Outlet/>
  )
}

export default PublicRoutes
