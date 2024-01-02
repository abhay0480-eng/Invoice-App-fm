import { configureStore } from "@reduxjs/toolkit";
import invoiceDataSlice from "./invoiceDataSlice";
import authSlice from "./authSlice";


 const store = configureStore({
    reducer:{
        invoice: invoiceDataSlice,
        auth: authSlice,
    }
})

export default store


