import React from 'react'
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';

const FormModal = ({open,handleClose,handleOpen,details}) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  

  const onSubmit = (data) => {
    // Construct the desired object structure using the form data
    const formData = {
      id: details?.id || '', 
      createdAt: details?.createdAt || '', // Replace with the appropriate value
      paymentDue: data['Invoice Date'] || '', // Assuming 'Invoice Date' is the field for paymentDue
      description: data['Project Description'] || '', // Assuming 'Project Description' is the field for description
      paymentTerms: details?.paymentTerms || 0, // Replace with the appropriate value
      clientName: data["Client’s Name"] || '', // Assuming 'Client’s Name' is the field for clientName
      clientEmail: data["Client’s Email"] || '', // Assuming 'Client’s Email' is the field for clientEmail
      status: details?.status || 'pending', // Replace with the appropriate value
      senderAddress: {
        street: data['Sender Street Address'] || '',
        city: data['Sender City'] || '',
        postCode: data['Sender Post Code'] || '',
        country: data['Sender Country'] || '',
      },
      clientAddress: {
        street: data['Street Address'] || '',
        city: data['City'] || '',
        postCode: data['Post Code'] || '',
        country: data['Country'] || '',
      },
      items: details?.items.map((item, index) => ({
        name: data[`ItemName ${index}`] || '',
        quantity: parseFloat(data[`Qty ${index}`]) || 0,
        price: parseFloat(data[`Price ${index}`]) || 0,
        total: parseFloat(data[`Total ${index}`]) || 0,
      })) || [],
      total: parseFloat(details?.total) || 0, // Replace with the appropriate value
    };

    console.log(formData);
  };
  return (
    <div className='bg-white '>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=''
      >
       <div className='bg-white w-[619px] h-[93vh]  fixed left-[105px] p-10 overflow-y-auto  '>
        <div className=''>

          <p className='text-[#0C0E16] text-[24px] font-bold'>Edit <span className='text-[#888EB0]'>#</span>{details?.id}</p>

          {/*  */}
          <p className='text-[#7C5DFA] font-bold text-[15px] my-6'>Bill From</p>
          <form onSubmit={handleSubmit(onSubmit)} className='h-[]'>

          <label className='text-[13px] font-medium text-[#7E88C3]'>Street Address</label>
          <input 
            defaultValue={details?.senderAddress?.street}
            {...register("Sender Street Address")} 
            className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
          />

          <div className='grid grid-cols-3 gap-x-5 mt-3'>
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>City</label>
              <input 
                defaultValue={details?.senderAddress?.city}
                {...register("Sender City")} 
                className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
              />
            </div>
            
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>Post Code</label>
              <input 
                defaultValue={details?.senderAddress?.postCode}
                {...register("Sender Post Code")} 
                className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
              />
            </div>

            <div>
            <label className='text-[13px] font-medium text-[#7E88C3]'>Country</label>
            <input 
              defaultValue={details?.senderAddress?.country}
              {...register("Sender Country")} 
              className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
            />
            </div>
          </div>



          {/*  */}
          <p className='text-[#7C5DFA] font-bold text-[15px] my-6'>Bill To</p>

          <div>
          <label className='text-[13px] font-medium text-[#7E88C3]'>Client’s Name</label>
          <input 
            defaultValue={details?.clientName}
            {...register("Client’s Name")} 
            className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
          />
          </div>

          <div>
          <label className='text-[13px] font-medium text-[#7E88C3]'>Client’s Email</label>
          <input 
            defaultValue={details?.clientEmail}
            {...register("Client’s Email")} 
            className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
          />
          </div>

          <div>
          <label className='text-[13px] font-medium text-[#7E88C3]'>Street Address</label>
          <input 
            defaultValue={details?.clientAddress?.street}
            {...register("Street Address")} 
            className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
          />
          </div>

          <div className='grid grid-cols-3 gap-x-5 mt-3'>
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>City</label>
              <input 
                defaultValue={details?.clientAddress?.city}
                {...register("City")} 
                className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
              />
            </div>
            
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>Post Code</label>
              <input 
                defaultValue={details?.clientAddress?.postCode}
                {...register("Post Code")} 
                className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
              />
            </div>

            <div>
            <label className='text-[13px] font-medium text-[#7E88C3]'>Country</label>
            <input 
              defaultValue={details?.clientAddress?.country}
              {...register("Country")} 
              className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
            />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-5 mt-3'>
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>Invoice Date</label>
              <input 
                type="date"
                defaultValue={details?.paymentDue}
                {...register("Invoice Date")} 
                className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
              />
            </div>
            
            <div>
              <label className='text-[13px] font-medium text-[#7E88C3]'>Payment Terms</label>
              <select {...register("Payment Terms")} value={`Net ${details?.paymentTerms} Days`} className='border-[1px] border-[#DFE3FA] w-full p-4 rounded-md text-[#0C0E16] font-bold text-[15px]'>
                <option value={`Net ${details?.paymentTerms} Days`}>{`Net ${details?.paymentTerms} Days`}</option>
              </select>
            </div>
          </div>

          <div>
          <label className='text-[13px] font-medium text-[#7E88C3]'>Project Description</label>
          <input 
            defaultValue={details?.description}
            {...register("Project Description")} 
            className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
          />
          </div>

          <p className='text-[#777F98] text-[18px] font-bold mt-4 mb-3'>Item List</p>


          <div className='grid grid-cols-9 gap-x-4 content-center text-[#7E88C3] text-[13px] font-medium my-4'>
            <p  className='col-span-3'>Item Name</p>
            <p className='col-span-1'>Qty.</p>
            <p className='col-span-2'>Price</p>
            <p className='col-span-2'>Total</p>
          </div>

          {details?.items?.map((item,index)=>{
            return(
            <div key={index} className='grid grid-cols-9 gap-x-4 content-center text-[#7E88C3] text-[13px] font-medium my-4'>
            <div  className='col-span-3'>
            <input 
              defaultValue={item?.name}
              {...register(`ItemName ${index}`)} 
              className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
            />
            </div>
            <div className='col-span-1'>
              <input 
              defaultValue={item?.quantity }
              {...register( `Qty ${index}`)} 
              className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
            />
            </div>
            <div className='col-span-2'>
            <input 
              defaultValue={item?.price}
              {...register( `Price ${index}`)} 
              className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
            />
            </div>
            <div className='col-span-3 flex justify-between items-center gap-x-3'>
            <input 
              defaultValue={item?.total}
              {...register( `Total ${index}`)} 
              className='border-[1px] border-[#DFE3FA] w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]'
            />
            <div className='col-span-1 cursor-pointer'>
              <img src='/assets/icon-delete.svg' alt='' className=' ' />
            </div>
            </div>
          </div>
            )
          })}

          <button className='text-[#7E88C3] text-[15px] font-bold bg-[#F9FAFE] rounded-3xl p-3 w-full'>+ Add New Item</button>

          <div className='flex justify-end gap-x-3  items-center text-center text-[15px] font-bold mt-4 w-[619px] left-[105px] py-4 bg-white fixed bottom-0'>
            <button className='text-[#7E88C3] bg-[#F9FAFE] rounded-3xl p-3 w-[150px] '>Cancel</button>
            <button className='text-[#fff] bg-[#7C5DFA] rounded-3xl p-3 w-[150px] mr-4'>Save Changes</button>
          </div>
          </form>
        </div>
       </div>
      </Modal>
    </div>
  )
}

export default FormModal