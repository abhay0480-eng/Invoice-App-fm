import React from 'react'

const InvoiceComponent = ({id,paymentDue,status,clientName,total}) => {
  return (
    <div className='h-[72px] rounded-xl shadow-xl grid grid-cols-5 gap-x-10 content-center my-10 px-5'>
       
            <p className='text-[#0C0E16] text-[15px] font-bold'><span className='text-[#7E88C3] '>#</span>{id}</p>
       
        
            <p className='text-[#7E88C3] text-[13px] font-medium'>{paymentDue}</p>
        
       
            <p className='text-[#858BB2] text-[13px] font-medium'>{clientName}</p>
       
       
            <p className='text-[#0C0E16] text-[15px] font-bold'>£{total}</p>
      
        
            <button>
           {status}
            </button>
        
    </div>
  )
}

export default InvoiceComponent