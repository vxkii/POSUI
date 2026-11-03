import { createSlice,createAsyncThunk,isRejectedWithValue } from "@reduxjs/toolkit";
import BillService from "../../src/Service/billService"

const initialState={
    isaddbillloading:false,
    isaddbillerror:false,
    isaddbillsuccess:false,
    createbillmessage:'',   

    isgetallbillloading:false,
    isgetallbillsuccess:false,
    isgetallbillerror:false,
    allbill:[],

    isgetbybillIdloading:false,
    isgetbybillIdsuccess:false,
    isgetbybillIderror:false,
    selectedBill:[],
    issearchbillbydateloading: false,
    issearchbillbydatesuccess: false,
    issearchbillbydateerror: false,
   
}


export const AddBill=createAsyncThunk(
    'Bill/AddBill',
    async(bill,thunkAPI)=>{

        try{

            return await BillService.AddBill(bill)

        } catch(error){

            const message=(error.response && error.response.data &&
                 error.response.data.message) || error.message || error.tostring()


                return thunkAPI.rejectWithValue (message)

        }
    }
)
export const getallbill=createAsyncThunk(
    'Bill/getallbill',
    async(bill,thunkAPI)=>{    
        try{
            return await BillService.getallbill()
        } catch(error){
            const message=(error.response && error.response.data &&
                 error.response.data.message) || error.message || error.tostring()  
            }
        }
    )

export const getbybillId = createAsyncThunk(
    'Bill/getbillbyId',
    async (name, thunkAPI) => {
        try {
            return await BillService.getbillbyId(name)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const SearchBillByDate = createAsyncThunk(
    'Bill/SearchBillByDate',
    async (date, thunkAPI) => {
        try {
            return await BillService.SearchBillByDate(date);
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.detail) || error.message || error.toString();
            }
        }
    )






export const ItemSlice=createSlice({
    name:"Item",
    initialState,
    reducers:{
        resetcreatebill:(state)=>{
            state.isaddbillloading=false
            state.isaddbillerror=false
            state.isaddbillsuccess=false
            state.createbillmessage=''
        },
        resetgetallbill:(state)=>{
            state.isgetallbillloading=false
            state.isgetallbillsuccess=false
            state.isgetallbillerror=false
            state.allbill=[]
        },
        resetgetbybillId:(state)=>{
            state.isgetbybillIdloading=false
            state.isgetbybillIdsuccess=false
            state.isgetbybillIderror=false
            state.selectedBill=[]
        },
        resetSearchBillByDate: (state) => {
            state.issearchbillbydateloading = false;
            state.issearchbillbydatesuccess = false;
            state.issearchbillbydateerror = false;
            state.searchbillbydate = [];
        }
       
                    

    },
    extraReducers:(builder)=>{
        builder
        .addCase(AddBill.pending,(state)=>{
            state.isaddbillloading=true
            state.isaddbillerror=false
            state.isaddbillsuccess=false
        })
        .addCase(AddBill.fulfilled,(state,action)=>{
            state.isaddbillloading=false
            state.isaddbillsuccess=true
            state.createbillmessage=action.payload.message
        })
        .addCase(AddBill.rejected,(state,action)=>{
            state.isaddbillloading=false
            state.isaddbillerror=true
            state.isaddbillsuccess=false
            state.createbillmessage=action.payload
        })


        .addCase(getallbill.pending,(state)=>{
            state.isgetallbillloading=true
            state.isgetallbillerror=false
            state.isgetallbillsuccess=false
        })  
        .addCase(getallbill.fulfilled,(state,action)=>{
            state.isgetallbillloading=false
            state.isgetallbillsuccess=true
            state.allbill=action.payload
        })
        .addCase(getallbill.rejected,(state)=>{
            state.isgetallbillloading=false
            state.isgetallbillerror=true
            state.isgetallbillsuccess=false
           
        })  
        .addCase(getbybillId.pending,(state)=>{
            state.isgetbybillIdloading=true
            state.isgetbybillIderror=false
            state.isgetbybillIdsuccess=false
        })  
        .addCase(getbybillId.fulfilled,(state,action)=>{
            state.isgetbybillIdloading=false
            state.isgetbybillIdsuccess=true
            state.selectedBill=action.payload
        })
        .addCase(getbybillId.rejected,(state)=>{
            state.isgetbybillIdloading=false
            state.isgetbybillIderror=true
            state.isgetbybillIdsuccess=false
           
        })
        .addCase(SearchBillByDate.pending, (state) => {
            state.issearchbillbydateloading = true;
            state.issearchbillbydatesuccess = false;
            state.issearchbillbydateerror = false;
        })
        .addCase(SearchBillByDate.fulfilled, (state, action) => {
            state.issearchbillbydateloading = false;
            state.issearchbillbydatesuccess = true;
            state.allbill = action.payload;
        })
        .addCase(SearchBillByDate.rejected, (state) => {
            state.issearchbillbydateloading = false;
            state.issearchbillbydateerror = true;
        });

    }

})
export const {resetcreatebill,resetgetallbill,resetgetbybillId,resetSearchBillByDate}=ItemSlice.actions
export default ItemSlice.reducer