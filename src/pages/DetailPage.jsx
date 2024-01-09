import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import EditLayout from '../components/FormModal'
import ConfirmDelete from '../components/ConfirmDelete'
import FormModal from '../components/FormModal'
import { startLoader, stopLoader } from '../store/loader'
import service from '../appwrite/config'
import { Backdrop, CircularProgress, Paper } from '@mui/material'

const DetailPage = () => {

  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loader.status);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const {id} = useParams()
  const items = JSON.parse(localStorage.getItem('getInvoice'))
  const invoiceDetails = items?.filter((item)=> item.$id === id)
  console.log("invoiceDetails",invoiceDetails[0])
  const details = invoiceDetails[0]
  const dateOnly = new Date(details.$createdAt).toISOString().split('T')[0];
  const totalNum = details.items.map((item)=>parseInt(item.total))
  const totalAmount = totalNum.reduce((acc, num) => acc + num, 0)
  const [status, setStatus] = useState(details.status)
  console.log(status);

  async function changeStatus () {
    try {
      dispatch(startLoader())
      const invoiceRes = await service.updateStatus({status:"paid"},details.$id)
      console.log(invoiceRes.status);
      setStatus(invoiceRes.status)
    } catch (error) {
        // setError(error.message)
    }finally{
      dispatch(stopLoader())
    }
  }

  return (
    <>
     <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    <ConfirmDelete   handleCloseDelete={handleCloseDelete} openDelete={openDelete} detailsid = {details.$id} />
    <FormModal handleOpen={handleOpen} handleClose={handleClose} open={open} details={details} addNew={false}/>
    <div className='max-w-5xl mx-auto p-5 md:mt-20'>
    <Link to='/' className='text-[#0C0E16] text-[15px] font-bold mb-5'>Go back</Link>
    <div className='grid grid-cols-2  md:grid-cols-7 content-center gap-x-5 bg-white p-5 rounded-lg mt-3'>
      <p className='text-[#858BB2] text-[13px] font-medium my-auto'>Status</p>
      <div className='md:col-span-3'>
      <button className={`p-3 rounded-lg col-span-3  flex justify-center items-center w-[150px] mx-2  font-bold ${status==="paid"?"bg-[#33D69F] text-[#33D69F] bg-opacity-[0.0571]":status==="pending"?"bg-[#FF8F00] text-[#FF8F00] bg-opacity-[0.0571]":"bg-[#373B53] text-[#373B53] bg-opacity-[0.0571]"}`}>
        <div className={`w-2 h-2 rounded-full mx-2 ${status==="paid"?"bg-[#33D69F]":status==="pending"?"bg-[#FF8F00] ":"bg-[#373B53] "}`} ></div>{status.charAt(0).toUpperCase() + status.slice(1)}
      </button>
      </div>
      <button className='text-[#7E88C3] text-[15px] font-bold hidden md:block' onClick={handleOpen}>Edit</button>
      <button className='bg-[#EC5757] rounded-3xl p-2 text-[15px] font-bold text-white hidden md:block'  onClick={handleOpenDelete}>Delete</button>
      <button onClick={()=>changeStatus()} className='bg-[#7C5DFA] rounded-3xl p-3 text-[15px] font-bold text-white hidden md:block'>Mark as Paid</button>
    </div>

    <div className='bg-white p-5 md:p-10 mt-10 h-[100vh] md:h-auto'>
      <div className='md:flex justify-between '>
        <div>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'><span className='text-[#7E88C3] '>#</span>{details.$id}</p>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>{details.description}</p>
        </div>

        <div className=' my-3 md:my-auto md:text-right text-[#7E88C3] text-[13px] font-medium'>
          <p>{details.senderAddressStreet}</p>
          <p>{details.senderAddressCity}</p>
          <p>{details.senderAddressPostCode}</p>
          <p>{details.senderAddressCountry}</p>
        </div>
      </div>

      <div className='grid md:grid-cols-4 grid-cols-2 mt-3'>
      <div>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Invoice Date</p>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{dateOnly}</p>
      </div>
        <div>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Bill To</p>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.clientName}</p>
        </div>
        <div className='hidden md:block'>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Sent to</p>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.clientEmail}</p>
        </div>
      </div>

      <div className='grid  md:grid-cols-4 grid-cols-2 mt-3'>
        <div>
          <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Payment Due</p>
          <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.paymentDue}</p>
        </div>
        <div className='text-left md:col-span-3 text-[#7E88C3] text-[13px] font-medium'>
          <p>{details.clientAddressStreet}</p>
          <p>{details.clientAddressCity}</p>
          {/* <p>{details.clientAddress.postCode}</p> */}
          <p>{details.clientAddressCountry}</p>
        </div>
      </div>

      <div className='block md:hidden'>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Sent to</p>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.clientEmail}</p>
        </div>

      <div className='bg-[#F9FAFE] w-full mt-2'>
        <div className='md:grid md:grid-cols-5 hidden text-[#7E88C3] text-[13px] font-medium  pt-5 md:pt-10 px-10 mt-5 rounded-lg'>
          <p className='col-span-2'>Item Name</p>
          <p className='text-right'>QTY.</p>
          <p className='text-right'>Price</p>
          <p className='text-right'>Total</p>
        </div>

        <div className='py-5'>
        {details.items.map((item,index)=>{
          return(
          <div key={index}>
          <div  className='md:grid md:grid-cols-5 text-[#7E88C3] hidden  text-[13px] font-medium px-5 md:px-10 py-2 rounded-lg'>
            <p className='col-span-2 text-[#0C0E16] text-[15px] font-bold'>{item.name}</p>
            <p className=' text-[#7E88C3] text-[15px] font-bold text-right '>{item.quantity}</p>
            <p className=' text-[#7E88C3] text-[15px] font-bold text-right '>£{item.price}</p>
            <p className=' text-[#0C0E16] text-[15px] font-bold text-right'>£{item.total}</p>
          </div>
          <div className='flex justify-between items-center md:hidden px-5'>
            <div>
            <p className='col-span-2 text-[#0C0E16] text-[15px] font-bold'>{item.name}</p>
            <p className=' text-[#7E88C3] text-[15px] font-bold text-left '>{item.quantity} x {item.price}</p>
            </div>
            <div>
            <p className=' text-[#0C0E16] text-[15px] font-bold text-right'>£{item.total}</p>
            </div>
          </div>
          </div>
          )
        })}
        </div>

        <div className='py-5 flex justify-between items-center px-5 md:px-10 bg-[#373B53] rounded-b-xl'>
          <p className='text-[#fff] font-medium text-[13px]'>Amount Due</p>
          <p className='text-[#fff] font-bold text-[24px]'>£{totalAmount}</p>
        </div>
      </div>

    </div>
       
    </div>
   
    {/* <div className='  flex gap-x-3 md:hidden justify-evenly  items-center text-center text-[15px] font-bold md:mt-4 w-full md:w-[619px] md:left-[105px] py-4 bg-white fixed bottom-0'> */}
    <Paper elevation={5}  className='flex gap-x-3 md:hidden justify-evenly  items-center text-center text-[15px] font-bold md:mt-4 w-full md:w-[619px] md:left-[105px] py-4 bg-white fixed bottom-0'>
          <button className='text-[#7E88C3] text-[15px] font-bold ' onClick={handleOpen}>Edit</button>
          <button className='bg-[#EC5757] rounded-3xl p-2 text-[15px] font-bold text-white w-[90px]  mx-3'  onClick={handleOpenDelete}>Delete</button>
          <button onClick={()=>changeStatus()} className='bg-[#7C5DFA] rounded-3xl p-3 text-[15px] font-bold w-[150px] text-white '>Mark as Paid</button>
    </Paper>
        {/* </div> */}
    
    </>
  )
}

export default DetailPage