
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filterData: {}
}

const filterInvoiceSlice = createSlice({
        name:"filter",
        initialState,
        reducers:{
            getfilterData: (state,action) =>{
                console.log(action.payload);
                state.filterData = action.payload
            },
        }
        
})


export const {getfilterData} = filterInvoiceSlice.actions

export default filterInvoiceSlice.reducer