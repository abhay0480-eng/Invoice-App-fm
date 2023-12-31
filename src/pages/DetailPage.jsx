import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
  const {id} = useParams()
  const Data = useSelector(state=>state.invoice.invoiceData)

  const invoiceDetails = Data.filter((item)=> item.id === id)
  console.log(invoiceDetails);

  return (
    <div className='text-center'>{id}</div>
  )
}

export default DetailPage