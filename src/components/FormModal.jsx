import React, { useContext, useState } from 'react'
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { startLoader, stopLoader } from '../store/loader';
import service from '../appwrite/config';
import ItemsForm from './ItemsForm';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import ThemeContext from '../context/ThemeContext';

const FormModal = ({open,handleClose,handleOpen,details,invoiceData,id,addNew}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {theme,setTheme} = useContext(ThemeContext)


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [error,setError] =useState("")

  const [Items, setItems] = useState([
    {
      name: '',
      quantity: '',
      price: '',
      total: '',
    },
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...Items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddNewItem = () => {
    const newItem = {
      name: '',
      quantity: '',
      price: '',
      total: '',
    };

    setItems([...Items, newItem]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...Items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };



  const onSubmit = async(data ) => {
    setError("")
    try {
      dispatch(startLoader())
      if(addNew){
        handleClose();
      const invoiceRes =   await service.addInvoiceInfo({...data,UserID:id,status:"pending",items:Items} )
      console.log("invoiceRes",invoiceRes);
      if(invoiceRes){
        
        navigate('/')
      }
      }else{
        handleClose();
        console.log("data",data);
        const invoiceRes =  await service.updateInvoiceInfo({...data,items:Items},details.$id)
        console.log("invoiceResUpdate",invoiceRes);
      
      }
      
    } catch (error) {
        setError(error.message)
    }finally{
      dispatch(stopLoader())
    }
  }


  return (
    <div className={` ${!theme?"!bg-[#141625]":"!bg-white"}`} >
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=''
      >
      <div>
       <div className={`${theme?"!bg-[#141625]":"!bg-white"} w-full lg:w-[619px] h-[90vh] lg:h-[93vh]  fixed  lg:left-[105px] p-6 lg:p-10 overflow-y-auto `} >
        <div className=''>
         {!addNew?<p className={`${!theme?"text-[#0C0E16]":"text-[#fff]"} text-[24px] font-bold`}>Edit <span className={`text-[#888EB0] `}>#</span>{details?.$id}</p>:<p className={`${!theme?"text-[#0C0E16]":"text-[#fff]"} text-[24px] font-bold`}>New Invoice</p>}

        
          <p className='text-[#7C5DFA] font-bold text-[15px] my-6'>Bill From</p>

        {/* form starts */}
          <form onSubmit={handleSubmit(onSubmit)} className=''>

            {/* sender address starts */}

          <label className='text-[13px] font-medium text-[#7E88C3]'>Street Address</label>
          <input 
            defaultValue={details?.senderAddressStreet}
            {...register("senderAddressStreet")} 
            className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
          />

          <div className='grid grid-cols-3 gap-x-5 mt-3'>
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>City</label>
              <input 
                defaultValue={details?.senderAddressCity}
                {...register("senderAddressCity")} 
                className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
              />
            </div>
            
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>Post Code</label>
              <input 
                defaultValue={details?.senderAddressPostCode}
                {...register("senderAddressPostCode")} 
                className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
              />
            </div>

            <div>
            <label className='text-[13px] font-medium text-[#7E88C3]'>Country</label>
            <input 
              defaultValue={details?.senderAddressCountry}
              {...register("senderAddressCountry")} 
              className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
            />
            </div>
          </div>

            {/* sender address ends */}




          {/* clientName */}
          <p className='text-[#7C5DFA] font-bold text-[15px] my-6'>Bill To</p>

          <div>
          <label className='text-[13px] font-medium text-[#7E88C3]'>Client’s Name</label>
          <input 
            defaultValue={details?.clientName}
            {...register("clientName")} 
            className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
          />
          </div>


          {/* clientEmail */}

          <div>
          <label className='text-[13px] font-medium text-[#7E88C3]'>Client’s Email</label>
          <input 
            defaultValue={details?.clientEmail}
            {...register("clientEmail")} 
            className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
          />
          </div>


          {/* clientAddress starts */}

          <div>
          <label className='text-[13px] font-medium text-[#7E88C3]'>Street Address</label>
          <input 
            defaultValue={details?.clientAddressStreet}
            {...register("clientAddressStreet")} 
            className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
          />
          </div>

          <div className='grid grid-cols-3 gap-x-5 mt-3'>
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>City</label>
              <input 
                defaultValue={details?.clientAddressCity}
                {...register("clientAddressCity")} 
                className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
              />
            </div>
            
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>Post Code</label>
              <input 
                defaultValue={details?.clientAddressPostCode}
                {...register("clientAddressPostCode")} 
                className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
              />
            </div>

            <div>
            <label className='text-[13px] font-medium text-[#7E88C3]'>Country</label>
            <input 
              defaultValue={details?.clientAddressCountry}
              {...register("clientAddressCountry")} 
              className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
            />
            </div>
          </div>

          {/* clientAddress ends */}



          {/* paymentDue */}

          <div className='grid grid-cols-2 gap-x-5 mt-3'>
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>Invoice Date</label>
              <input 
                type="date"
                defaultValue={details?.paymentDue}
                {...register("paymentDue")} 
                className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
              />
            </div>

            
          {/* paymentTerms */}
            
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>Payment Terms</label>
              <select {...register("paymentTerms")} defaultValue={details?.paymentTerms}  className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}>
                <option value={1}>{`Net 1 Days`}</option>
                <option value={7}>{`Net 7 Days`}</option>
                <option value={14}>{`Net 14 Days`}</option>
                <option value={30}>{`Net 30 Days`}</option>
              </select>
            </div>
          </div>
          {/* description */}

          <div>
          <label className='text-[13px] font-medium text-[#7E88C3]'>Project Description</label>
          <input 
            defaultValue={details?.description}
            {...register("description")} 
            className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
          />
          </div>



          {/* Item List */}

          <p className='text-[#777F98] text-[18px] font-bold mt-4 mb-3'>Item List</p>


          <div className='grid grid-cols-9 gap-x-4 content-center text-[#7E88C3] text-[13px] font-medium my-4'>
            <p  className='col-span-3'>Item Name</p>
            <p className='col-span-1'>Qty.</p>
            <p className='col-span-2'>Price</p>
            <p className='col-span-2'>Total</p>
          </div>

          <Paper elevation={5}  className={`flex left-0  gap-x-3  justify-evenly  items-center text-center text-[15px] font-bold lg:mt-4 !w-full  lg:!w-[619px] lg:left-[105px] py-4 ${!theme?"!bg-white":"!bg-[#1E2139]"} fixed bottom-0`}>
            <div onClick={()=>handleClose()} className='text-[#7E88C3] bg-[#F9FAFE] rounded-3xl p-3 w-[150px] cursor-pointer '>Cancel</div>
            <button className='text-[#fff] bg-[#7C5DFA] rounded-3xl p-3 w-[150px] mr-4'>Save Changes</button>
            </Paper>
          </form>
        {Items?.map((item, index) => (
          <ItemsForm key={index} itemIndex={index} Items={Items} setItems={setItems} onItemChange={handleItemChange} onRemoveItem={handleRemoveItem} details={details?.items[index]} />
        ))}

      <button onClick={handleAddNewItem} className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-3xl text-[#0C0E16] font-bold text-[15px]`}>
        + Add New Item
      </button>
        </div>
       
       </div>
       
        </div>
      </Modal>
    </div>
  )
}

export default FormModal