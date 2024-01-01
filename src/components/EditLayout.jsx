import React from 'react'
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';

const EditLayout = ({open,handleClose,handleOpen,details}) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  

  const onSubmit = (data) => console.log(data)
  return (
    <div className='bg-white'>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=''
      >
       <div className='bg-white w-[619px] h-screen  fixed left-[105px] p-10'>
          <p className='text-[#0C0E16] text-[24px] font-bold'>Edit <span className='text-[#888EB0]'>#</span>{details.id}</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
             defaultValue="test" 
             {...register("example")} 
             />

           
            <input
             {...register("exampleRequired", { required: true })}
              />
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
          </form>
       </div>
      </Modal>
    </div>
  )
}

export default EditLayout