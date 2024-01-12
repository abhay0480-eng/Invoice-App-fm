import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { startLoader, stopLoader } from '../../store/loader'
import ThemeContext from '../../context/ThemeContext'


const Header = () => {

  const {theme,setTheme} = useContext(ThemeContext)

  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(startLoader())
    authService.logout().then(()=>{
      dispatch(logout())
      dispatch(stopLoader())
    })
  }

  console.log(theme);
  return (
    <div className='lg:fixed static top-0 left-0 h-[72px] w-full lg:w-[103px] lg:h-screen bg-[#373B53] flex lg:flex-col justify-between  z-50  lg:rounded-r-3xl shadow-lg'>
        <div className='lg:h-[103px] h-full w-[72px] lg:w-auto bg-[#7C5DFA] flex justify-center items-center  rounded-r-3xl'>
        <img src='/assets/logo.svg' alt='' className=''/>
        </div>

        <div className='flex justify-between items-center lg:block'>
            <div className='lg:h-[103px] h-[72px] flex justify-center items-center cursor-pointer '>
                <img src={`/assets/icon-sun.svg`} alt='' className='' onClick={()=>setTheme(pre=>!pre)} />
            </div>
            <div className='lg:h-[103px] h-[72px] flex'>
          {(authStatus) &&  <div className=' flex justify-center items-center mx-3 lg:mx-auto '>
                <img src='/assets/image-avatar.jpg' alt='' className='rounded-full w-[40px] h-[40px]'/>
            </div>}
                {/* <p className=' text-white text-center text-[14px] font-bold block'>{userData?.email.substring(0, userData?.email.indexOf('@'))}</p> */}
            </div>
           {(authStatus) && <div className=' px-2 lg:px-auto p-1 rounded-lg text-white cursor-pointer text-[14px] font-bold text-center my-1 '  onClick={() => logoutHandler()}>Logout</div>}
        </div>
    </div>
  )
}

export default Header