import { createSlice,createAsyncThunk,isRejectedWithValue } from "@reduxjs/toolkit";
import loginService from "../Service/loginService";




const initialState={
    isloginloading:false,
    isloginsuccess:false,
    isloginerror:false,
    loginmessage:'',    
}

export const loginuser=createAsyncThunk(
    'login/loginuser',
    async(user,thunkAPI)=>{
        try{
            return await loginService.loginuser(user)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    })



    export const loginSlice=createSlice({
        name:"login",
        initialState,
        reducers:{
            resetlogin:(state)=>{
                state.isloginloading=false
                state.isloginsuccess=false
                state.loginmessage=''
            },
        },


        extraReducers:(builder)=>{
            builder
            .addCase(loginuser.pending,(state)=>{
                state.isloginloading=true
                state.isloginsuccess=false
                state.isloginerror=false})

            .addCase(loginuser.fulfilled,(state,action)=>{
                state.isloginloading=false
                state.isloginsuccess=true
                state.isloginerror=false
                 state.isloginsuccess = action.payload.isSuccess;
                state.loginmessage=action.payload.message
            })  
            .addCase(loginuser.rejected,(state,action)=>{
                state.isloginloading=false
                state.isloginsuccess=false
                state.isloginerror=true
                 state.isloginsuccess = action.payload.isSuccess;
                state.loginmessage=action.payload.message
            })  
        }

    })
    export const{resetlogin}=loginSlice.actions
    export default loginSlice.reducer;

    