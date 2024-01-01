import React from 'react'

const Header = () => {
  return (
    <div className='fixed top-0 left-0 w-[103px] h-screen bg-[#373B53] flex flex-col justify-between  z-50  rounded-r-3xl shadow-lg'>
        <div className='h-[103px] bg-[#7C5DFA] flex justify-center items-center  rounded-r-3xl'>
        <img src='/assets/logo.svg' alt='' className=''/>
        </div>

        <div>
            <div className='h-[103px] flex justify-center items-center  '>
                <img src={`/assets/icon-sun.svg`} alt='' className='' />
            </div>
            <div className='h-[103px] flex justify-center items-center  '>
                <img src='/assets/image-avatar.jpg' alt='' className='rounded-full w-[40px] h-[40px]'/>
            </div>
        </div>
    </div>
  )
}

export default Header