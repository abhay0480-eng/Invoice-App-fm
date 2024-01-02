import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import EditLayout from '../components/FormModal'
import ConfirmDelete from '../components/ConfirmDelete'
import FormModal from '../components/FormModal'

const DetailPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const {id} = useParams()
  const Data = useSelector(state=>state.invoice.invoiceData)

  const invoiceDetails = Data.filter((item)=> item.id === id)
  console.log(invoiceDetails);

  const details = invoiceDetails[0]

  return (
    <>
    <ConfirmDelete   handleCloseDelete={handleCloseDelete} openDelete={openDelete} />
    <FormModal handleOpen={handleOpen} handleClose={handleClose} open={open} details={details}/>
    <div className='max-w-5xl mx-auto mt-20'>
    <Link to='/' className='text-[#0C0E16] text-[15px] font-bold mb-5'>Go back</Link>
    <div className='grid grid-cols-7 content-center gap-x-5 bg-white p-5 rounded-lg mt-3'>
      <p className='text-[#858BB2] text-[13px] font-medium my-auto'>Status</p>
      <button className={`p-3 rounded-lg col-span-3  flex justify-center items-center w-[150px] mx-2  font-bold ${details.status==="paid"?"bg-[#33D69F] text-[#33D69F] bg-opacity-[0.0571]":details.status==="pending"?"bg-[#FF8F00] text-[#FF8F00] bg-opacity-[0.0571]":"bg-[#373B53] text-[#373B53] bg-opacity-[0.0571]"}`}>
        <div className={`w-2 h-2 rounded-full mx-2 ${details.status==="paid"?"bg-[#33D69F]":details.status==="pending"?"bg-[#FF8F00] ":"bg-[#373B53] "}`} ></div>{details.status.charAt(0).toUpperCase() + details.status.slice(1)}
      </button>
      <button className='text-[#7E88C3] text-[15px] font-bold' onClick={handleOpen}>Edit</button>
      <button className='bg-[#EC5757] rounded-3xl p-2 text-[15px] font-bold text-white'  onClick={handleOpenDelete}>Delete</button>
      <button className='bg-[#7C5DFA] rounded-3xl p-3 text-[15px] font-bold text-white'>Mark as Paid</button>
    </div>

    <div className='bg-white p-10 mt-10'>
      <div className='flex justify-between '>
        <div>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'><span className='text-[#7E88C3] '>#</span>{details.id}</p>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>{details.description}</p>
        </div>

        <div className='text-right text-[#7E88C3] text-[13px] font-medium'>
          <p>{details.senderAddress.street}</p>
          <p>{details.senderAddress.city}</p>
          <p>{details.senderAddress.postCode}</p>
          <p>{details.senderAddress.country}</p>
        </div>
      </div>

      <div className='grid grid-cols-4 mt-3'>
      <div>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Invoice Date</p>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.createdAt}</p>
      </div>
        <div>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Bill To</p>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.clientName}</p>
        </div>
        <div>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Sent to</p>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.clientEmail}</p>
        </div>
      </div>

      <div className='grid grid-cols-4 mt-3'>
        <div>
          <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Payment Due</p>
          <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.paymentDue}</p>
        </div>
        <div className='text-left col-span-3 text-[#7E88C3] text-[13px] font-medium'>
          <p>{details.clientAddress.street}</p>
          <p>{details.clientAddress.city}</p>
          <p>{details.clientAddress.postCode}</p>
          <p>{details.clientAddress.country}</p>
        </div>
      </div>

      <div className='bg-[#F9FAFE] w-full'>
        <div className='grid grid-cols-5 text-[#7E88C3] text-[13px] font-medium pt-10 px-10 mt-5 rounded-lg'>
          <p className='col-span-2'>Item Name</p>
          <p className='text-right'>QTY.</p>
          <p className='text-right'>Price</p>
          <p className='text-right'>Total</p>
        </div>

        <div className='py-5'>
        {details.items.map((item,index)=>{
          return(
            <div key={index} className='grid grid-cols-5 text-[#7E88C3] text-[13px] font-medium px-10 py-2 rounded-lg'>
            <p className='col-span-2 text-[#0C0E16] text-[15px] font-bold'>{item.name}</p>
            <p className=' text-[#7E88C3] text-[15px] font-bold text-right'>{item.quantity}</p>
            <p className=' text-[#7E88C3] text-[15px] font-bold text-right'>£{item.price}</p>
            <p className=' text-[#0C0E16] text-[15px] font-bold text-right'>£{item.total}</p>
          </div>
          )
        })}
        </div>

        <div className='py-5 flex justify-between items-center px-10 bg-[#373B53] rounded-b-xl'>
          <p className='text-[#fff] font-medium text-[13px]'>Amount Due</p>
          <p className='text-[#fff] font-bold text-[24px]'>£{details.total}</p>
        </div>
       
      </div>
    </div>
    </div>
    </>
  )
}

export default DetailPage