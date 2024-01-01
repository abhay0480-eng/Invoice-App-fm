import React from 'react'

const AddInvoice = ({invoiceCount}) => {


  
  return (
    <div className='grid grid-cols-7 content-center mt-20'>
        <div className='col-span-4'>
            <h1 className='text-[#0C0E16] text-[36px] font-bold'>Invoices</h1>
            <p className='text-[#888EB0] text-[13px] font-medium'> {`There are ${invoiceCount} total invoices`}</p>
        </div>
        <div className='flex justify-center items-center col-span-1'>
            <p className='text-[#0C0E16] text-[15px] font-bold'>Filter by status</p>
        </div>
        <div className='flex justify-end items-center col-span-2'>
            <button className='bg-[#7C5DFA] p-4 rounded-3xl text-[#fff] text-[15px] font-bold flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="white"/>
            <path d="M17.3131 21.0229V17.3131H21.0229V14.7328H17.3131V11.0229H14.7328V14.7328H11.0229V17.3131H14.7328V21.0229H17.3131Z" fill="#7C5DFA"/>
            </svg>
             <span className='mx-2'> New Invoice</span>
            </button>
        </div>
    </div>
  )
}

export default AddInvoice