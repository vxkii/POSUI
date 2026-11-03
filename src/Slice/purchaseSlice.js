import { createSlice,createAsyncThunk,isRejectedWithValue } from "@reduxjs/toolkit";
import purchaseOrderService from "../Service/purchaseService"

const initialState={
    isregpurorderisloading:false,
    isregpurorderissuccess:false,
    isregpurorderisrejected:false,
    isregpurodrsuccessmessage:'',

    isgetallpurchaseorderisloading:false,
    isgetallpurchaseorderissuccess:false,
    isgetallpurchaseorderisrejected:false,
    allpurchaseorder:[],

      issearchpurchaseorderloading: false,
    issearchpurchaseordersuccess: false,
    issearchpurchaseordererror: false,

    
}


export const RegpurchaseOrder=createAsyncThunk(
    'purchase/RegpurchaseOrder',
    async(purchase,thunkAPI)=>{
        try{
            return await purchaseOrderService.RegpurchaseOrder(purchase)
        }
        catch(error){

            const message=(error.response && error.response.data &&
                 error.response.data.message) || error.message || error.tostring()


                return thunkAPI.rejectWithValue (message)

        }
        
    }

)


export const getallPurchaseorder = createAsyncThunk(
    'purchase/getallPurchaseorder',
    async (purchase, thunkAPI) => {
        try {
            return await purchaseOrderService.getallPurchaseorder()
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const SearchPurchaseOrderByName = createAsyncThunk(
    'PurchaseOrder/SearchPurchaseOrderByName',
    async (ItemName, thunkAPI) => {
        try {

            return await purchaseOrderService.SearchPurchaseOrderByName(ItemName);

        }
        catch (error) {

            const message = (error.response && error.response.data
                && error.response.data.detail) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const purchaseSlice=createSlice({
    name:"purchase",
    initialState,
    reducers:{
        resetpurodr:(state)=>{
            state.isregpurorderisloading=false
            state.isregpurorderissuccess=false
            state.isregpurodrsuccessmessage=''
        },
        resetSearchPurchaseOrderByName: (state) => {
            state.issearchpurchaseorderloading = false;
            state.issearchpurchaseordersuccess = false;
            state.issearchpurchaseordererror = false;
        }

    },

     extraReducers:(builders)=>{
        builders


        .addCase(RegpurchaseOrder.pending,(state)=>{
           state.isregpurorderisloading=true
           state.isregpurorderisrejected=false
        })
        .addCase(RegpurchaseOrder.fulfilled,(state,action)=>{
            state.isregpurorderisloading=false
            state.isregpurorderissuccess=true
            state.isregpurodrsuccessmessage=action.payload.messages
        })

        .addCase(RegpurchaseOrder.rejected,(state)=>{
            state.isregpurorderisloading=false
            state.isregpurorderisrejected=true
        })
        
         .addCase(getallPurchaseorder.pending,(state)=>{
            state.isgetallpurchaseorderisloading=true
            state.isgetallpurchaseorderisrejected=false
         })
         .addCase(getallPurchaseorder.fulfilled,(state,action)=>{
            state.isgetallpurchaseorderisloading=false
            state.isgetallpurchaseorderissuccess=true
            state.allpurchaseorder=action.payload
         })
         .addCase(getallPurchaseorder.rejected,(state)=>{
            state.isgetallpurchaseorderisloading=false
            state.isgetallpurchaseorderisrejected=true
         })
         .addCase(SearchPurchaseOrderByName.pending, (state) => {
            state.issearchpurchaseorderloading = true;
            state.issearchpurchaseordersuccess = false;
            state.issearchpurchaseordererror = false;
        })
        .addCase(SearchPurchaseOrderByName.fulfilled, (state, action) => {
            state.issearchpurchaseorderloading = false;
            state.issearchpurchaseordersuccess = true;
            state.allpurchaseorder = action.payload;
        })
        .addCase(SearchPurchaseOrderByName.rejected, (state) => {
            state.issearchpurchaseorderloading = false;
            state.issearchpurchaseordererror = true;
        });


     }
    })

    export const {resetpurodr, resetSearchPurchaseOrderByName} = purchaseSlice.actions


    export default purchaseSlice.reducer;
