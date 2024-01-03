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
    <div className='fixed top-0 left-0 w-[103px] h-screen bg-[#373B53] flex flex-col justify-between  z-50  rounded-r-3xl shadow-lg'>
        <div className='h-[103px] bg-[#7C5DFA] flex justify-center items-center  rounded-r-3xl'>
        <img src='/assets/logo.svg' alt='' className=''/>
        </div>

        <div>
            <div className='h-[103px] flex justify-center items-center  '>
                <img src={`/assets/icon-sun.svg`} alt='' className='' />
            </div>
          {(authStatus) &&  <div className='h-[103px] flex justify-center items-center  '>
                <img src='/assets/image-avatar.jpg' alt='' className='rounded-full w-[40px] h-[40px]'/>
            </div>}
           {(authStatus) && <div className='  p-1 rounded-lg text-white cursor-pointer text-[14px] font-bold text-center my-1 '  onClick={() => logoutHandler()}>Logout</div>}
        </div>
    </div>
  )
}

export default Header