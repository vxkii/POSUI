import { configureStore } from "@reduxjs/toolkit";
import ItemSlice from '../Slice/itemSlice'
import supplierSlice from'../Slice/supplierSlice'
import purchaseSlice from"../Slice/purchaseSlice"
import stocksslice from "../Slice/stocksSlice";
import billSlice from "../Slice/billSlice";
import loginSlice from "../Slice/loginSlice";

const store =configureStore({
    reducer:{
        Item:ItemSlice,
        supplier:supplierSlice,
        purchase:purchaseSlice,
        stocks:stocksslice,
        bill:billSlice,
        login:loginSlice
        
    }
})
export default store