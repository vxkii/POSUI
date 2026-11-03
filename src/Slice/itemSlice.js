import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import ItemService from '../Service/itemService'
import Itemservice from '../Service/itemService'






const initialState = {
    isitemloading: false,
    isitemsuccess: false,
    isitemerror: false,
    createitemmesage: '',

    isgetallitemsLoading: false,
    isgetallitemsSuccess: false,
    isgetallitemsError: false,
    allitem: [],

    isdeleteitemloading: false,
    isdeleteitemsuccess: false,
    isdeleteitemerror: false,
    deleteitemmessage: '',

    isgetbycodeError: false,
    isgetbycodeloading: false,
    isgetbycodesuccess: false,

    isedititemisloading: false,
    isedititemissuccess: false,
    isedititemiserror: false,
    isedititemmessage: '',

    issearchitemloading: false,
    issearchitemsuccess: false,
    issearchitemerror: false,
    

}


export const RegistorItem = createAsyncThunk(
    'Item/RegistorItem',
    async (item, thunkAPI) => {
        try {
            return await ItemService.RegistorItem(item)
        }
        catch (error) {

            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.tostring()


            return thunkAPI.rejectWithValue(message)

        }

    }

)
export const getallitems = createAsyncThunk(
    'Item/getallitems',
    async (data, thunkAPI) => {
        try {
            console.log('hi')
            return await Itemservice.getallitems()
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteItems = createAsyncThunk(
    'Item/deleteItems',
    async (name, thunkAPI) => {
        try {
            console.log('hi1')
            return await ItemService.deleteItems(name)
        }
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const getItemByCode = createAsyncThunk(
    'Item/getItemByCode',
    async (ItemCode, thunkAPI) => {
        try {
            return await ItemService.getItemByCode(ItemCode)

        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const edititem = createAsyncThunk(
    'Item/edititem',
    async (ItemCode, thunkAPI) => {
        try {
            return await ItemService.edititem(ItemCode)

        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) || error.message || error.tostring()

            return thunkAPI.rejectWithValue(message)
        }
    }

)
export const SearchItemByName = createAsyncThunk(
    'Item/SearchItemByName',
    async (ItemName, thunkAPI) => {
        try {

            return await ItemService.SearchItemByName(ItemName);

        }
        catch (error) {

            const message = (error.response && error.response.data
                && error.response.data.detail) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)




export const ItemSlice = createSlice({
    name: "Item",
    initialState,
    reducers: {
        resetcreateitem: (state) => {
            state.isitemloading = false
            state.isitemsuccess = false
            state.createitemmesage = ''
        },
        resetgetallitems: (state) => {
            state.isgetallitemsLoading = false;
            state.isgetallitemsSuccess = false;
            state.isgetallitemsError = false;
            state.allitem = [];
        },
        resetupdateitem: (state) => {
            state.isedititemisloading = false
            state.isedititemissuccess = false
            state.isedititemmessage = ''
        },
        resetDeleteMessage: (state) => {
            state.isdeleteitemloading = false;
            state.isdeleteitemsuccess = false;
            state.isdeleteitemerror = false;
            state.deleteitemmessage = '';
        },
        resetsearchitem: (state) => {
            state.issearchitemloading = false;
            state.issearchitemsuccess = false;
            state.issearchitemerror = false;
        },
        resetUpdateMessage: (state) => {
            state.isedititemisloading = false;
            state.isedititemissuccess = false;
            state.isedititemiserror = false;
            state.isedititemmessage = '';
        },  


       

    },
    extraReducers: (builders) => {
        builders
            .addCase(RegistorItem.pending, (state) => {
                state.isitemloading = true
            })
            .addCase(RegistorItem.fulfilled, (state, action) => {
                state.isitemsuccess = true
                state.isitemloading = false
                debugger
                state.createitemmesage = action.payload.messages
            })
            .addCase(RegistorItem.rejected, (state) => {
                state.isitemerror = true
                state.isitemloading = false
            })

            .addCase(getallitems.pending, (state) => {
                state.isgetallitemsLoading = true
                state.isgetallitemsSuccess = false
            })
            .addCase(getallitems.fulfilled, (state, action) => {
                state.isgetallitemsLoading = false
                state.isgetallitemsSuccess = true
                state.allitem = action.payload
            })
            .addCase(getallitems.rejected, (state) => {
                state.isgetallitemsLoading = false
                state.isgetallitemsError = true
            })

            .addCase(deleteItems.pending, (state) => {
                state.isdeleteitemerror = false
                state.isdeleteitemloading = true
            })
            .addCase(deleteItems.fulfilled, (state,action) => {
                state.isdeleteitemloading = false
                state.isdeleteitemsuccess = true
                state.deleteitemmessage=action.payload.message
            })
            .addCase(deleteItems.rejected, (state) => {
                state.isdeleteitemloading = false
                state.isdeleteitemerror = true
            })

            .addCase(getItemByCode.rejected, (state) => {
                state.isgetbycodeError = true
                state.isgetbycodeloading = false
            })
            .addCase(getItemByCode.pending, (state) => {
                state.isgetbycodeError = false
                state.isgetbycodeloading = true
            })
            .addCase(getItemByCode.fulfilled, (state, action) => {
                state.isgetbycodeloading = false
                state.isgetbycodesuccess = true
                state.Items = action.payload
            })
            .addCase(edititem.fulfilled, (state, action) => {
                state.isedititemisloading = false
                state.isedititemissuccess = true
                state.isedititemmessage = action.payload.message
            })
            .addCase(edititem.pending, (state) => {
                state.isedititemisloading = true
                state.isedititemiserror = false
            })
            .addCase(edititem.rejected, (state) => {
                state.isedititemisloading = false
                state.isedititemiserror = true
            })
            .addCase(SearchItemByName.pending, (state) => {
                state.issearchitemloading = true;
                state.issearchitemsuccess = false;
                state.issearchitemerror = false;
            })

            .addCase(SearchItemByName.fulfilled, (state, action) => {
                state.issearchitemloading = false;
                state.issearchitemsuccess = true;
                state.allitem = action.payload;
            })

            .addCase(SearchItemByName.rejected, (state) => {
                state.issearchitemloading = false;
                state.issearchitemerror = true;
            })


    }


})

export const { resetcreateitem, resetupdateitem,resetgetallitems,resetsearchitem,resetDeleteMessage,resetUpdateMessage } = ItemSlice.actions


export default ItemSlice.reducer;