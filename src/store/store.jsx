import { configureStore } from "@reduxjs/toolkit";
import invoiceDataSlice from "./invoiceDataSlice";
import authSlice from "./authSlice";
import loaderSlice from './loader'


 const store = configureStore({
    reducer:{
        invoice: invoiceDataSlice,
        auth: authSlice,
        loader: loaderSlice,
    }
})

export default store


