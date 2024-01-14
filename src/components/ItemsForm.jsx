import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const ItemsForm = ({ setItems, Items, itemIndex, onItemChange,onRemoveItem,details }) => {
  const {theme,setTheme} = useContext(ThemeContext)

  return (
    <div  className='grid grid-cols-9 gap-x-4 content-center text-[#7E88C3] text-[13px] font-medium my-4'>
            <div  className='col-span-3'>
            <input 
              defaultValue={details?.name} 
              onChange={(e) => onItemChange(itemIndex, 'name', e.target.value)}
             
              className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
            />
            </div>
            <div className='col-span-1'>
              <input 
              defaultValue={details?.quantity} 
              onChange={(e) => onItemChange(itemIndex, 'quantity', e.target.value)}
              className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
            />
            </div>
            <div className='col-span-2'>
            <input 
              defaultValue={details?.price} 
              onChange={(e) => onItemChange(itemIndex, 'price', e.target.value)}
              className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
            />
            </div>
            <div className='col-span-3 flex justify-between items-center gap-x-3'>
            <input 
              defaultValue={details?.total} 
              onChange={(e) => onItemChange(itemIndex, 'total', e.target.value)}
              className={`border-[1px]  ${theme?"bg-[#1E2139] border-[#252945] text-white":"bg-white border-[#DFE3FA]"} w-full p-3 rounded-md text-[#0C0E16] font-bold text-[15px]`}
            />
            <div className='col-span-1 cursor-pointer'>
              <img src='/assets/icon-delete.svg' alt='' className=' ' onClick={() => onRemoveItem(itemIndex)}/>
            </div>
            </div>
          </div>
  )
}

export default ItemsForm