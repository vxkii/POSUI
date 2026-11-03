import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import stocksservice from '../Service/stocksservice'


const initialState={
    iseditstockloading:false,
    iseditstocksuccess:false,
    iseditstockerror:false,
    editstockSucceesMessage:'',

    isaddstockisloading:false,
    isaddstockissuccess:false,
    isaddstockiserror:false,
    addstockmessage:'',

    isgetallstocksloading:false,
    isgetallstocksuccess:false,
    isgetallstockserror:false,
    allstocks:[],

    isgetbystockbycodeisloading:false,
    isgetbystockbycodeissuccess:false,
    isgetbystockbycodeiserror:false,
    stockbycode:[],

      issearchstockloading: false,
    issearchstocksuccess: false,
    issearchstockerror: false,


}
export const Addstock= createAsyncThunk(
    'stocks/Addstock',
    async(data,thunkAPI)=>{
        try{
            console.log(data)
            return await stocksservice.Addstock(data)
        }catch(error){
            const message=(error.response && error.response.data &&
                 error.response.data.message) || error.message ||  error.toString()

                 return thunkAPI.rejectWithValue (message)
        }

    }
)

export const getallstocks= createAsyncThunk(
    'stocks/getallstocks',
    async(data,thunkAPI)=>{ 
        try{
            return await stocksservice.getallstocks(data)
        }catch(error){
            const message=(error.response && error.response.data &&
                 error.response.data.message) || error.message ||  error.toString()

                 return thunkAPI.rejectWithValue (message)
        }

    }
)

export const getbystockbycode= createAsyncThunk(
    'stocks/getbystockbycode',
    async(data,thunkAPI)=>{
        try{
            return await stocksservice.getbystockbycode(data)
        }catch(error){
            const message=(error.response && error.response.data &&
                 error.response.data.message) || error.message ||  error.toString()

                 return thunkAPI.rejectWithValue (message)
        }

    }
)

export const editstock = createAsyncThunk(
    'stocks/editstock',
    async (data, thunkAPI) => {
        try {
            // console.log('datadata', data)
            return await stocksservice.editstock(data)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const SearchStockByName = createAsyncThunk(
    'Stocks/SearchStockByName',
    async (ItemName, thunkAPI) => {
        try {

            return await stocksservice.searchStockByName(ItemName);

        }
        catch (error) {

            const message = (error.response && error.response.data
                && error.response.data.detail) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const stocksslice = createSlice({
    name: "stocks",
    initialState,
    reducers: {
        reseteditstock: (state) => {
            state.iseditstockloading = false
            state.iseditstocksuccess = false
            state.iseditstockerror = false
            state.editstockSucceesMessage = ''
        },
         resetSearchStockByName: (state) => {
            state.issearchstockloading = false;
            state.issearchstocksuccess = false;
            state.issearchstockerror = false;
        },
    },
        
        
   
extraReducers:(builders) => {
        builders
         .addCase(editstock.pending, (state) => {
                        state.iseditstockloading = true
                        state.iseditstocksuccess = false
                        state.iseditstockerror = false
        
                    })
        .addCase(editstock.fulfilled, (state,action) => {
                        state.iseditstockloading = false
                        state.iseditstocksuccess = true
                        state.iseditstockerror = false
                        state.editstockSucceesMessage=action.payload.message

        
                    })
        .addCase(editstock.rejected, (state) => {
                        state.iseditstockloading = false
                        state.iseditstocksuccess = false
                        state.iseditstockerror = true
        
                    })    
        
        .addCase(Addstock.pending,(state)=>{
            state.isaddstockisloading=true
            state.isaddstockissuccess=false
            state.isaddstockiserror=false
        })
        .addCase(Addstock.fulfilled,(state,action)=>{
            state.isaddstockissuccess=true
            state.isaddstockisloading=false
            state.isaddstockiserror=false
            state.addstockmessage=action.payload.message
        })
        .addCase(Addstock.rejected,(state)=>{
            state.isaddstockiserror=true
            state.isaddstockisloading=false
            state.isaddstockissuccess=false

        })
        .addCase(getallstocks.pending,(state)=>{
            state.isgetallstocksloading=true
            state.isgetallstocksuccess=false
            state.isgetallstockserror=false 
        })
        .addCase(getallstocks.fulfilled,(state,action)=>{
            state.isgetallstocksloading=false
            state.isgetallstocksuccess=true
            state.isgetallstockserror=false 
            state.allstocks=action.payload 
        })
        .addCase(getallstocks.rejected,(state)=>{
            state.isgetallstocksloading=false
            state.isgetallstocksuccess=false
            state.isgetallstockserror=true 
        })
        .addCase(getbystockbycode.pending,(state)=>{
            state.isgetbystockbycodeisloading=true
            state.isgetbystockbycodeissuccess=false
            state.isgetbystockbycodeiserror=false 
        })
        .addCase(getbystockbycode.fulfilled,(state,action)=>{
            state.isgetbystockbycodeisloading=false
            state.isgetbystockbycodeissuccess=true
            state.isgetbystockbycodeiserror=false 
            state.stockbycode=action.payload 
        })
        .addCase(getbystockbycode.rejected,(state)=>{
            state.isgetbystockbycodeisloading=false
            state.isgetbystockbycodeissuccess=false
            state.isgetbystockbycodeiserror=true 
        })
        .addCase(SearchStockByName.pending, (state) => {
            state.issearchstockloading = true;
            state.issearchstocksuccess = false;
            state.issearchstockerror = false;
        })
        .addCase(SearchStockByName.fulfilled, (state, action) => {
            state.issearchstockloading = false;
            state.issearchstocksuccess = true;
            state.allstocks = action.payload;
        })
        .addCase(SearchStockByName.rejected, (state) => {
            state.issearchstockloading = false;
            state.issearchstockerror = true;
        })


        }
                                 

    })
    export const {reseteditstock,resetSearchStockByName}=stocksslice.actions
export default stocksslice.reducer;