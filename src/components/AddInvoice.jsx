import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getfilterData } from '../store/fitterInvoiceSlice'

const AddInvoice = ({invoiceCount,handleOpen,filter,setFilter}) => {

  const dispatch = useDispatch()

  const [showFilter,setShowFilter] = useState(false)

 

  useEffect(()=>{
    dispatch(getfilterData(filter))
  },[showFilter])

 

  function handleChange(event){
   
    const {name,value,type,checked} = event.target
    console.log(checked);
    setFilter(pre => {
      return{
        ...pre,
        [name]: type === 'checkbox'? checked:value
      }
    })
  }


  
  return (
    <div className='grid grid-cols-7 content-center mt-20'>
        <div className='col-span-4'>
            <h1 className='text-[#0C0E16] text-[24px] md:text-[36px] font-bold'>Invoices</h1>
            <p className='text-[#888EB0] text-[13px] font-medium'> {`There are ${invoiceCount?invoiceCount:0} total invoices`}</p>
        </div>
        <div    className='flex cursor-pointer justify-center items-center col-span-1 relative'>
          <div className='flex justify-center items-center' onClick={()=> setShowFilter(pre=>!pre)}>
            <p  className='text-[#0C0E16] text-[15px] hidden md:block font-bold mx-2'>Filter by status</p>
            <p  className='text-[#0C0E16] text-[15px]  md:hidden font-bold mx-2'>Filter </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
            <path d="M1 6.22803L5.2279 2.00013L9.4558 6.22803" stroke="#7C5DFA" stroke-width="2"/>
            </svg>
          </div>
            {showFilter&&<div className='absolute text-[#0C0E16] text-[15px] font-bold left-0 -bottom-[100px] bg-white w-[200px] h-[120px] flex justify-center items-center shadow-2xl rounded-xl' >
              <form>
                <div className='flex  items-center'>
                  <input
                  type='checkbox'
                  id="isPending"
                  checked={filter.isPending}
                  onChange={handleChange}
                  name="isPending"
                  
                  />
                  <label htmlFor='isPending' className='mx-4'>Pending</label>
                </div>

                <div className='flex  items-center'>
                <input
                type='checkbox'
                id="isPaid"
                checked={filter.isPaid}
                onChange={handleChange}
                name="isPaid"
                // style={{ appearance: 'none', marginRight: '5px' }}
                />
                <label htmlFor='isPaid' className='mx-4'>Paid</label>
                </div>
              

                <div className='flex  items-center'>
                <input
                  type='checkbox'
                  id="isDraft"
                  checked={filter.isDraft}
                  onChange={handleChange}
                  name="isDraft"
                  // style={{ appearance: 'none', marginRight: '5px' }}
                  />
                  <label htmlFor='isDraft' className='mx-4'>Draft</label>
                </div>
             
              </form>
            </div>}
        </div>
        <div className='flex justify-end items-center col-span-2 ' >
            <button className='bg-[#7C5DFA] md:p-4 rounded-3xl text-[#fff] text-[15px] font-bold flex justify-center items-center' onClick={handleOpen}>
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