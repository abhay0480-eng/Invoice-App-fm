import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { startLoader, stopLoader } from '../../store/loader'


const Header = () => {

  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(startLoader())
    authService.logout().then(()=>{
      dispatch(logout())
      dispatch(stopLoader())
    })
  }
  return (
    <div className='md:fixed static top-0 left-0 h-[72px] w-full md:w-[103px] md:h-screen bg-[#373B53] flex md:flex-col justify-between  z-50  md:rounded-r-3xl shadow-lg'>
        <div className='md:h-[103px] h-full w-[72px] md:w-auto bg-[#7C5DFA] flex justify-center items-center  rounded-r-3xl'>
        <img src='/assets/logo.svg' alt='' className=''/>
        </div>

        <div className='flex justify-between items-center md:block'>
            <div className='md:h-[103px] h-[72px] flex justify-center items-center  '>
                <img src={`/assets/icon-sun.svg`} alt='' className='' />
            </div>
            <div className='md:h-[103px] h-[72px] flex'>
          {(authStatus) &&  <div className=' flex justify-center items-center mx-3 md:mx-auto '>
                <img src='/assets/image-avatar.jpg' alt='' className='rounded-full w-[40px] h-[40px]'/>
            </div>}
                {/* <p className=' text-white text-center text-[14px] font-bold block'>{userData?.email.substring(0, userData?.email.indexOf('@'))}</p> */}
            </div>
           {(authStatus) && <div className=' px-2 md:px-auto p-1 rounded-lg text-white cursor-pointer text-[14px] font-bold text-center my-1 '  onClick={() => logoutHandler()}>Logout</div>}
        </div>
    </div>
  )
}

export default Header