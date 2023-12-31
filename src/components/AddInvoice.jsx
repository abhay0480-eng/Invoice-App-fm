import React from 'react'

const AddInvoice = () => {
  return (
    <div className='grid grid-cols-7 content-center mt-20'>
        <div className='col-span-5'>
            <h1 className='text-[#0C0E16] text-[36px] font-bold'>Invoices</h1>
            <p className='text-[#888EB0] text-[13px] font-medium'> There are 7 total invoices</p>
        </div>
        <div className='flex justify-center items-center'>
            <p className='text-[#0C0E16] text-[15px] font-bold'>Filter by status</p>
        </div>
        <div className='flex justify-center items-center'>
            <button className='bg-[#7C5DFA] p-4 rounded-3xl text-[#fff] text-[15px] font-bold'>New Invoice</button>
        </div>
    </div>
  )
}

export default AddInvoice