

import { createSlice } from '@reduxjs/toolkit'
import Data from '../data.json'

const initialState = {
    invoiceData: {}
}

const invoiceDataSlice = createSlice({
        name:"invoice",
        initialState,
        reducers:{
            getInvoiceData: (state,action) =>{
                state.invoiceData = action.payload
                localStorage.setItem('getInvoice', JSON.stringify(action.payload));
            },
        }
        
})


export const {getInvoiceData} = invoiceDataSlice.actions

export default invoiceDataSlice.reducer



