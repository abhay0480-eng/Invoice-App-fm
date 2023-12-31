import React from 'react'
import AddInvoice from '../components/AddInvoice'
import InvoiceComponent from '../components/InvoiceComponent'
import { useSelector } from 'react-redux'

const Home = () => {

    const Data = useSelector(state=>state.invoice.invoiceData)
  return (
    <div className='max-w-4xl mx-auto'>
        <AddInvoice invoiceCount = {Data.length}/>
        {Data.length>0?<div className=''>
        {Data.map((item)=>{
            return(
                <div key={item.id}>
                    <InvoiceComponent id={item.id} paymentDue={item.paymentDue} clientName={item.clientName} status={item.status} total={item.total}/>
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

export default Home