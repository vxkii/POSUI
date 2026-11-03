import authAxious from "../Config/interceptor";



const API_UPDATE_STOCK=`/Stocks/Updatestock`
const API_ADD_STOCK=`/Stocks/CreateStocks`
const API_GETALL_STOCKS=`/Stocks/getallstocks`
const API_GET_STOCK_BY_CODE=`/Stocks/getstockbycode`
const API_SEARCH_STOCK_BY_NAME = '/Stocks/SearchStockByName'




const Addstock =async(data)=>{
    const response=await authAxious.post(API_ADD_STOCK,data)
    return response.data
}


const getallstocks=async()=>{
    const response=await authAxious.get(API_GETALL_STOCKS)
    return response.data
}

const getbystockbycode=async(data)=>{
    const response=await authAxious.get(`${API_GET_STOCK_BY_CODE}/${data.ItemCode}`,data)
    return response.data
}


const editstock = async (ItemCode) => {

  const response= await authAxious.post(`${API_UPDATE_STOCK}/${ItemCode.ItemCode}`,ItemCode)
   return response.data
} 


const searchStockByName = async (ItemName) => {

    const response = await authAxious.get(
        API_SEARCH_STOCK_BY_NAME,
        {
            params: {
                ItemName: ItemName
            }
        }
    );

    return response.data;
}


const stocksservice={
    editstock,
    Addstock,
    getallstocks,
    getbystockbycode,
    searchStockByName

}
export default stocksservice

