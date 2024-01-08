import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const InvoiceComponent = ({id,createdAt,status,clientName,total}) => {
  const dateOnly = new Date(createdAt).toISOString().split('T')[0];

const totalNum = total.map((item)=>parseInt(item.total))
const totalAmount = totalNum.reduce((acc, num) => acc + num, 0);
  return (
    <div >

    <Link to={`/detail/${id}`} className='h-[72px] rounded-xl shadow-xl md:grid md:grid-cols-5 md:gap-x-10 md:content-center md:my-10 md:px-5 md:text-center'>
       
            <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'><span className='text-[#7E88C3] '>#</span>{id}</p>
       
        
            <p className='text-[#7E88C3] text-[13px] font-medium m-auto'>{dateOnly}</p>
        
       
            <p className='text-[#858BB2] text-[13px] font-medium m-auto'>{clientName}</p>
       
       
            <p className='text-[#0C0E16] text-[15px] font-bold m-auto'>£{totalAmount}</p>
      
        <div className='flex justify-between items-center'>

            <button className={`p-3 rounded-lg flex justify-center items-center w-full mx-2  font-bold ${status==="paid"?"bg-[#33D69F] text-[#33D69F] bg-opacity-[0.0571]":status==="pending"?"bg-[#FF8F00] text-[#FF8F00] bg-opacity-[0.0571]":"bg-[#373B53] text-[#373B53] bg-opacity-[0.0571]"}`}>
               <div className={`w-2 h-2 rounded-full mx-2 ${status==="paid"?"bg-[#33D69F]":status==="pending"?"bg-[#FF8F00] ":"bg-[#373B53] "}`} ></div>{status.charAt(0).toUpperCase() + status.slice(1)}
              
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="#7C5DFA" stroke-width="2"/>
                </svg>
        
        </div>
    </Link>
    </div>
  )
}

export default InvoiceComponent