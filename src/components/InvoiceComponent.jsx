import React from 'react'
import { Link } from 'react-router-dom'

const InvoiceComponent = ({id,paymentDue,status,clientName,total}) => {
  return (
    <Link to="/detail" className='h-[72px] rounded-xl shadow-xl grid grid-cols-5 gap-x-10 content-center my-10 px-5'>
       
            <p className='text-[#0C0E16] text-[15px] font-bold'><span className='text-[#7E88C3] '>#</span>{id}</p>
       
        
            <p className='text-[#7E88C3] text-[13px] font-medium'>{paymentDue}</p>
        
       
            <p className='text-[#858BB2] text-[13px] font-medium'>{clientName}</p>
       
       
            <p className='text-[#0C0E16] text-[15px] font-bold'>£{total}</p>
      
        
            <button className={`p-3 rounded-lg font-bold ${status==="paid"?"bg-[#33D69F] text-[#33D69F] bg-opacity-[0.0571]":status==="pending"?"bg-[#FF8F00] text-[#FF8F00] bg-opacity-[0.0571]":"bg-[#373B53] text-[#373B53] bg-opacity-[0.0571]"}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
        
    </Link>
  )
}

export default InvoiceComponent