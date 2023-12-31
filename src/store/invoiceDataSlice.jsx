

import { createSlice } from '@reduxjs/toolkit'
import Data from '../data.json'

const initialState = {
    invoiceData: Data
}

const invoiceDataSlice = createSlice({
        name:"invoice",
        initialState,
        reducers:{
            getInvoiceData: (state,action) =>{
                state.invoiceData = action.payload
                // localStorage.setItem('getProfileDetails', JSON.stringify(action.payload));
            },
        }
})


export const {getInvoiceData} = invoiceDataSlice.actions

export default invoiceDataSlice.reducer



