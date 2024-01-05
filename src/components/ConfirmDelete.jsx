import React from 'react'
import Modal from '@mui/material/Modal';
import service from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLoader, stopLoader } from '../store/loader';

const ConfirmDelete = ({openDelete,handleCloseDelete,detailsid}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  async function deleteInvoice(){
    try {
      dispatch(startLoader())
      const deleteRes =  await service.deleteInvoice({documentId:detailsid})
      console.log("delete",deleteRes);
      if(deleteRes){
        navigate('/')
    }
    } catch (error) {
        // setError(error.message)
    }finally{
      dispatch(stopLoader())
    }
  }

  return (
    <div className='bg-white '>
      
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=' flex flex-col h-screen justify-center items-center'
      >
        <div className='bg-white p-7 rounded-lg '>
         <h2 className='text-[24px] font-bold  text-[#0C0E16]'>Confirm Deletion</h2>
         <p className='text[13px] font-medium text-[#888EB0] my-3 '>Are you sure you want to delete invoice #XM9141? This action cannot be <br/>undone.</p>
         <div className='flex justify-end items-center gap-x-5 px-3 my-3'>
          <button onClick={()=>handleCloseDelete()} className='text-[#7E88C3] text-[15px] font-bold  bg-[#F9FAFE] w-[150px] p-3 rounded-3xl '>Cancel</button>
          <button onClick={()=>deleteInvoice()} className='text-[#fff] text-[15px] font-bold  bg-[#EC5757] w-[150px] p-3 rounded-3xl'>Delete</button>
         </div>
        </div>
      </Modal>
    </div>
  )
}

export default ConfirmDelete