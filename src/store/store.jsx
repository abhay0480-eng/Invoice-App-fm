import { configureStore } from "@reduxjs/toolkit";
import invoiceDataSlice from "./invoiceDataSlice";
import authSlice from "./authSlice";
import loaderSlice from './loader'
import filterInvoiceSlice from './fitterInvoiceSlice'


 const store = configureStore({
    reducer:{
        invoice: invoiceDataSlice,
        auth: authSlice,
        loader: loaderSlice,
        filter: filterInvoiceSlice
    }
})

export default store


