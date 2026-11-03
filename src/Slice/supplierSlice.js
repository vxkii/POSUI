import { createSlice,createAsyncThunk,isRejectedWithValue } from "@reduxjs/toolkit";
import SupplierService from "../Service/supplierService"






const initialState={
    issuppisloading:false,
    issupiserror:false,
    issupissuccess:false,
    issuppmesage:'',


    isgetallsupplierloading:false,
    isgetallsuppliererror:false,
    isgetallsuppliersuccess:false,
    allSupplier:[],


    isgetbycodeError:false,
    isgetbycodeloading:false,
    isgetbycodesuccess:false,
    SupplierbyCode:[],

    iseditsupplierloading:false,
    iseditsuppliererror:false,
    iseditsuppliersuccess:false,
    iseditsupmessage:'',

    isdeletesupplierloading:false,
    isdeletesuppliererror:false,
    isdeletesuppliersuccess:false,
    isdeletesuppliermessage:'',

     issearchsupplierloading: false,
    issearchsuppliersuccess: false,
    issearchsuppliererror: false,
    

}




export const Registorsupplier=createAsyncThunk(
    'supplier/Registorsupplier',
    async(supplier,thunkAPI)=>{
        try{
            return await SupplierService.Registorsupplier(supplier)
        }
        catch(error){

            const message=(error.response && error.response.data &&
                 error.response.data.message) || error.message || error.tostring()


                return thunkAPI.rejectWithValue (message)

        }
        
    }

)
export const getallsupplier = createAsyncThunk(
    'supplier/getallsuppliers',
    async (data, thunkAPI) => {
        try {
            console.log('hi')
            return await SupplierService.getallsuppliers()
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getSupplierByCode = createAsyncThunk(
    'supplier/getSupplierByCode',
    async (Suppliercode, thunkAPI) => {
        try {
            return await SupplierService.getSupplierByCode(Suppliercode)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const editSupplier = createAsyncThunk(
    'supplier/editSupplier',
    async (supplier, thunkAPI) => {
        try {
            return await SupplierService.editSupplier(supplier)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteSuppliers = createAsyncThunk(
    'supplier/deleteSuppliers',
    async (Suppliercode, thunkAPI) => {
        try {
            return await SupplierService.deleteSuppliers(Suppliercode)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const SearchSupplierByName = createAsyncThunk(
    'Supplier/SearchSupplierByName',
    async (SupplierName, thunkAPI) => {
        try {

            return await SupplierService.SearchSupplierByName(SupplierName);

        }
        catch (error) {

            const message = (error.response && error.response.data
                && error.response.data.detail) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)


export const SupplierSlice=createSlice({
    name:"supplier",
    initialState,
    reducers:{
        resetcreatesupplier:(state)=>{
            state.issuppisloading=false
            state.issupissuccess=false
            state.issuppmesage=''           
        },
        resetUpdateSupplier:(state)=>{
            state.iseditsupplierloading=false;
            state.iseditsuppliersuccess=false;
            state.iseditsupmessage=''
        },
        resetDeleteSupplier:(state)=>{
            state.isdeletesupplierloading=false;
            state.isdeletesuppliersuccess=false;
            state.isdeletesuppliermessage='';
        },
        resetgetallsupplier:(state)=>{
            state.isgetallsupplierloading=false;
            state.isgetallsuppliersuccess=false;
            state.allSupplier=[];
        }

    },


    extraReducers:(builders)=>{
        builders

        .addCase(Registorsupplier.pending,(state)=>{
            state.issuppisloading=true
            state.issupiserror=false
        })
         .addCase(Registorsupplier.fulfilled,(state,action)=>{
            state.issuppisloading=false
            state.issupissuccess=true
            state.issuppmesage=action.payload.messages
        })
        .addCase(Registorsupplier.rejected,(state)=>{
            state.issupiserror=true
            state.issuppisloading=false
        })
        .addCase(getallsupplier.pending,(state)=>{
            state.isgetallsupplierloading=true
            state.isgetallsuppliererror=false
        })
        .addCase(getallsupplier.fulfilled,(state,action)=>{
            state.isgetallsupplierloading=false
            state.isgetallsuppliersuccess=true
            state.allSupplier=action.payload
        })
        .addCase(getallsupplier.rejected,(state)=>{
            state.isgetallsuppliererror=true
            state.isgetallsupplierloading=false
        })
        .addCase(getSupplierByCode.pending,(state)=>{
            state.isgetbycodeloading=true
            state.isgetbycodeError=false
        })
        .addCase(getSupplierByCode.fulfilled,(state,action)=>{
            state.isgetbycodeloading=false
            state.isgetbycodesuccess=true
            state.SupplierbyCode=action.payload
        })
        .addCase(getSupplierByCode.rejected,(state)=>{
            state.isgetbycodeError=true
            state.isgetbycodeloading=false
        })
        .addCase(editSupplier.pending,(state)=>{
            state.iseditsupplierloading=true
            state.iseditsuppliererror=false
        })
        .addCase(editSupplier.fulfilled,(state,action)=>{
            state.iseditsupplierloading=false
            state.iseditsuppliersuccess=true
            state.iseditsupmessage=action.payload.message
        })
        .addCase(editSupplier.rejected,(state)=>{
            state.iseditsuppliererror=true
            state.iseditsupplierloading=false
        })
        .addCase(deleteSuppliers.pending,(state)=>{
            state.isdeletesupplierloading=true
            state.isdeletesuppliererror=false
        })
        .addCase(deleteSuppliers.fulfilled,(state,action)=>{
            state.isdeletesupplierloading=false
            state.isdeletesuppliersuccess=true
            state.isdeletesuppliermessage=action.payload.message
        })
        .addCase(deleteSuppliers.rejected,(state)=>{
            state.isdeletesuppliererror=true
            state.isdeletesupplierloading=false
        })
        .addCase(SearchSupplierByName.pending, (state) => {
            state.issearchsupplierloading = true;
            state.issearchsuppliersuccess = false;
            state.issearchsuppliererror = false;
        })

        .addCase(SearchSupplierByName.fulfilled, (state, action) => {
            state.issearchsupplierloading = false;
            state.issearchsuppliersuccess = true;
            state.allSupplier = action.payload;
        })
        .addCase(SearchSupplierByName.rejected, (state, action) => {
            state.issearchsupplierloading = false;
            state.issearchsuppliererror = true;
        });


    }
})

export const {resetcreatesupplier,resetgetallsupplier,resetDeleteSupplier,resetUpdateSupplier}=SupplierSlice.actions;

export default SupplierSlice.reducer;