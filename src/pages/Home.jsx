import React from 'react'
import AddInvoice from '../components/AddInvoice'
import Data from '../data.json'
import InvoiceComponent from '../components/InvoiceComponent'

const Home = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <AddInvoice/>

        {Data.map((item)=>{
            return(
                <div key={item.id}>
                    <InvoiceComponent id={item.id} paymentDue={item.paymentDue} clientName={item.clientName} status={item.status} total={item.total}/>
                </div>
            )
        })}
    </div>
  )
}

export default Home