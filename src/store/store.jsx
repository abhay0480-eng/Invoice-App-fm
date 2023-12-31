import { configureStore } from "@reduxjs/toolkit";
import invoiceDataSlice from "./invoiceDataSlice";


 const store = configureStore({
    reducer:{
        invoice: invoiceDataSlice
    }
})

export default store


