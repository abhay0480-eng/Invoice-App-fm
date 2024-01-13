import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import EditLayout from '../components/FormModal'
import ConfirmDelete from '../components/ConfirmDelete'
import FormModal from '../components/FormModal'
import { startLoader, stopLoader } from '../store/loader'
import service from '../appwrite/config'
import { Backdrop, CircularProgress, Paper } from '@mui/material'
import ThemeContext from '../context/ThemeContext'

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

  const {theme} = useContext(ThemeContext)


  return (
    <>
     <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    <ConfirmDelete   handleCloseDelete={handleCloseDelete} openDelete={openDelete} detailsid = {details.$id} />
    <FormModal handleOpen={handleOpen} handleClose={handleClose} open={open} details={details} addNew={false}/>
    <div className='max-w-5xl mx-auto p-5 bg-[#141625] lg:mt-10'>
    <Link to='/' className={`${theme?"text-[#fff]":"text-[#0C0E16]"}  text-[15px] font-bold mb-5`}>Go back</Link>
    <div className={`grid grid-cols-2  lg:grid-cols-7 content-center gap-x-5 ${!theme?"bg-white":"bg-[#1E2139]"} p-5 rounded-lg mt-3`}>
      <p className={` ${theme?"text-[#DFE3FA]":"text-[#858BB2]"}  text-[13px] font-medium my-auto`}>Status</p>
      <div className='lg:col-span-3'>
      <button className={`p-3 rounded-lg col-span-3  flex justify-center items-center  w-[118px] lg:w-[150px] mx-2  font-bold ${status==="paid"?"bg-[#33D69F] text-[#33D69F] bg-opacity-[0.0571]":status==="pending"?"bg-[#FF8F00] text-[#FF8F00] bg-opacity-[0.0571]":"bg-[#373B53] text-[#373B53] bg-opacity-[0.0571]"}`}>
        <div className={`w-2 h-2 rounded-full mx-2 ${status==="paid"?"bg-[#33D69F]":status==="pending"?"bg-[#FF8F00] ":"bg-[#373B53] "}`} ></div>{status.charAt(0).toUpperCase() + status.slice(1)}
      </button>
      </div>
      <button className={`${!theme?"text-[#7E88C3]":"text-[#DFE3FA]"} text-[15px] font-bold hidden lg:block`} onClick={handleOpen}>Edit</button>
      <button className='bg-[#EC5757] rounded-3xl p-2 text-[15px] font-bold text-white hidden lg:block'  onClick={handleOpenDelete}>Delete</button>
      <button onClick={()=>changeStatus()} className='bg-[#7C5DFA] rounded-3xl p-3 text-[15px] font-bold text-white hidden lg:block'>Mark as Paid</button>
    </div>

    <div className={`${!theme?"bg-white":"bg-[#1E2139]"} p-5 lg:p-10 mt-10 h-[100vh] lg:h-auto`}>
      <div className='lg:flex justify-between '>
        <div>
        <p className={`${theme?"text-[#fff]":"text-[#0C0E16]"} text-[15px] font-bold  lg:m-auto`}><span className='text-[#7E88C3] '>#</span>{details.$id}</p>

        <p className={`text-[13px] ${theme?"text-[#DFE3FA]":"text-[#7E88C3]"} font-medium  my-1`}>{details.description}</p>
        </div>

        <div className= {`my-3 lg:my-auto lg:text-right ${theme?"text-[#DFE3FA]":"text-[#7E88C3]"} text-[13px] font-medium `}>
          <p>{details.senderAddressCity}</p>
          <p>{details.senderAddressPostCode}</p>
          <p>{details.senderAddressCountry}</p>
        </div>
      </div>

      <div className='grid lg:grid-cols-4 grid-cols-2 mt-3'>
      <div>
        <p className={`text-[13px] font-medium  ${theme?"text-[#DFE3FA]":"text-[#7E88C3]"} my-2`}>Invoice Date</p>
        <p className={`${theme?"text-[#DFE3FA]":"text-[#0C0E16]"} text-[15px] font-bold  m-auto`}>{dateOnly}</p>
      </div>
        <div>
        <p className={`text-[13px] font-medium  ${theme?"text-[#DFE3FA]":"text-[#7E88C3]"} my-2`}>Bill To</p>
        <p className={`${theme?"text-[#DFE3FA]":"text-[#0C0E16]"} text-[15px] font-bold  m-auto`}>{details.clientName}</p>
        </div>
        <div className='hidden lg:block'>
        <p className={`text-[13px] font-medium  ${theme?"text-[#DFE3FA]":"text-[#7E88C3]"} my-2`}>Sent to</p>
        <p className={`${theme?"text-[#DFE3FA]":"text-[#0C0E16]"} text-[15px] font-bold  m-auto`}>{details.clientEmail}</p>
        </div>
      </div>

      <div className='grid  lg:grid-cols-4 grid-cols-2 mt-3'>
        <div>
          <p className={`text-[13px] font-medium  ${theme?"text-[#DFE3FA]":"text-[#7E88C3]"} my-2`}>Payment Due</p>
          <p className={`${theme?"text-[#DFE3FA]":"text-[#0C0E16]"} text-[15px] font-bold  m-auto`}>{details.paymentDue}</p>
        </div>
        <div className={`text-left lg:col-span-3 ${theme?"text-[#DFE3FA]":"text-[#7E88C3]"} text-[13px] font-medium`}>
          <p>{details.clientAddressStreet}</p>
          <p>{details.clientAddressCity}</p>
          {/* <p>{details.clientAddress.postCode}</p> */}
          <p>{details.clientAddressCountry}</p>
        </div>
      </div>

      <div className='block lg:hidden'>
        <p className='text-[13px] font-medium text-[#7E88C3] my-1'>Sent to</p>
        <p className='text-[#0C0E16] text-[15px] font-bold  m-auto'>{details.clientEmail}</p>
        </div>

      <div className={`${theme?"bg-[#252945]":"bg-[#F9FAFE]"} w-full mt-10 lg:mt-2 rounded-lg`}>
        <div className='lg:grid lg:grid-cols-5 hidden text-[#7E88C3] text-[13px] font-medium  pt-5 lg:pt-10 px-10 mt-5 rounded-lg'>
          <p className='col-span-2'>Item Name</p>
          <p className='text-right'>QTY.</p>
          <p className='text-right'>Price</p>
          <p className='text-right'>Total</p>
        </div>

        <div className='py-5 rounded-lg'>
        {details.items.map((item,index)=>{
          return(
          <div key={index}>
          <div  className='lg:grid lg:grid-cols-5 text-[#7E88C3] hidden  text-[13px] font-medium px-5 lg:px-10 py-2 rounded-lg'>
            <p className= {`col-span-2 ${theme?"text-[#fff]":"text-[#0C0E16]"}  text-[15px] font-bold`}>{item.name}</p>
            <p className= {` ${theme?"text-[#fff]":"text-[#7E88C3]"}  text-[15px] font-bold text-right`} >{item.quantity}</p>
            <p className={` ${theme?"text-[#fff]":"text-[#7E88C3]"}  text-[15px] font-bold text-right`}>£{item.price}</p>
            <p className={` ${theme?"text-[#fff]":"text-[#7E88C3]"}  text-[15px] font-bold text-right`}>£{item.total}</p>
          </div>
          <div className='flex justify-between items-center lg:hidden px-5'>
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

        <div className={`py-5 flex justify-between items-center px-5 lg:px-10 ${!theme?"bg-[#373B53]" : "bg-[#0C0E16]"} rounded-b-xl`}>
          <p className='text-[#fff] font-medium text-[13px]'>Amount Due</p>
          <p className='text-[#fff] font-bold text-[24px]'>£{totalAmount}</p>
        </div>
      </div>

    </div>
       
    </div>
   
    {/* <div className='  flex gap-x-3 lg:hidden justify-evenly  items-center text-center text-[15px] font-bold lg:mt-4 w-full lg:w-[619px] lg:left-[105px] py-4 bg-white fixed bottom-0'> */}
    <Paper elevation={5}  className='flex gap-x-3 lg:hidden justify-evenly  items-center text-center text-[15px] font-bold lg:mt-4 w-full lg:w-[619px] lg:left-[105px] py-4 bg-white fixed bottom-0'>
          <button className='text-[#7E88C3] text-[15px] font-bold ' onClick={handleOpen}>Edit</button>
          <button className='bg-[#EC5757] rounded-3xl p-2 text-[15px] font-bold text-white w-[90px]  mx-3'  onClick={handleOpenDelete}>Delete</button>
          <button onClick={()=>changeStatus()} className='bg-[#7C5DFA] rounded-3xl p-3 text-[15px] font-bold w-[150px] text-white '>Mark as Paid</button>
    </Paper>
        {/* </div> */}
    
    </>
  )
}

export default DetailPage