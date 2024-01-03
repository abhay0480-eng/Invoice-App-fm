import React, { useEffect } from 'react'
import AddInvoice from '../components/AddInvoice'
import InvoiceComponent from '../components/InvoiceComponent'
import { useDispatch, useSelector } from 'react-redux'
import FormModal from '../components/FormModal'
import { Backdrop, CircularProgress } from '@mui/material'
import { startLoader, stopLoader } from '../store/loader'
import service from '../appwrite/config'
import { getInvoiceData } from '../store/invoiceDataSlice'

const Dashboard = () => {

const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isLoading = useSelector((state) => state.loader.status);
  const userData = useSelector((state) => state.auth.userData?.$id);
  const invoiceData = useSelector((state) => state.invoice.invoiceData);
  const id = userData?.toString();
  const dispatch = useDispatch()

  console.log(userData);
  console.log(invoiceData);

  useEffect(() => {

    async function fetchData() {
      try {
        dispatch(startLoader())
        const setInvoiceData = await service.getInvoice(id);
        console.log(setInvoiceData.documents);
        if(setInvoiceData.documents.length>0){
          dispatch(getInvoiceData(setInvoiceData.documents))
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        dispatch(stopLoader())
      }
    }

    fetchData();
  }, []);


  return (
    <div className='max-w-4xl mx-auto'>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <AddInvoice invoiceCount = {invoiceData.length} handleOpen={handleOpen}/>

        <FormModal handleOpen={handleOpen} handleClose={handleClose} open={open} invoiceData={invoiceData} id={id}/>

        {invoiceData.length>0?<div className=''>
        {invoiceData.map((item)=>{
            return(
                <div key={item.$id}>
                    <InvoiceComponent id={item.$id} createdAt={item.$createdAt} clientName={item.clientName} status={item.status} total={item.items}/>
                </div>
            )
        })}
        </div> 
        : 
        
        <div>
            <img src='/assets/illustration-empty.svg' alt='' className='mx-auto mt-20'/>
            <h1 className='text-[#0C0E16] text-[24px] font-bold text-center my-5'>There is nothing here</h1>
            <p className='text-[#888EB0] text-[13px] font-medium text-center'>  Create an invoice by clicking the <span className='font-bold'>New Invoice </span>button and get started</p>
        </div>
        }
    </div>
  )
}

export default Dashboard