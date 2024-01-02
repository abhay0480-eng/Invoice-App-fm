/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/header/Header'

const Layout = () => {

  const authStatus = useSelector(state => state.auth.status)
  const location = useLocation();

  console.log(location.pathname);
  const status = location.pathname!=="/preview"
  return (
    <>
    <div className='flex flex-col  h-screen relative'>
      {(authStatus&& status) && <Header/>}
      <Outlet/>
    </div>
    </>
  )
}

export default Layout