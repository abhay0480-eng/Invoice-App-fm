import React from 'react'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
   <>
   <div className='flex flex-col  h-screen relative'>
    <Header/>
    <Outlet/>
   </div>
   </>
  )
}

export default Layout