/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/header/Header'
import ThemeContext from './context/ThemeContext'

const Layout = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <>
    <div className={`flex flex-col  h-screen relative ${theme?"bg-[#141625]":""}`}>
      { <Header/>}
      <Outlet/>
    </div>
    </>
  )
}

export default Layout