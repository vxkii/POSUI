import authAxious from "../Config/interceptor";


const API_URL_REGISTER_PURCHASEORDER='/PurchaseOrder/regpurchaseorder'
const API_GET_ALL_PURCHASEORDER='/PurchaseOrder/getallpurchaseorder'
const API_SEARCH_PURCHASEORDER_BY_NAME = '/PurchaseOrder/SearchPurchaseOrderByName'


const RegpurchaseOrder=async(purchaseorder)=>{
      const response= await authAxious.post(API_URL_REGISTER_PURCHASEORDER,purchaseorder)
      return response.data
}

const getallPurchaseorder = async () => {

     const response= await authAxious.get(API_GET_ALL_PURCHASEORDER)
     return response.data
}

const SearchPurchaseOrderByName = async (ItemName) => {

    const response = await authAxious.get(
        API_SEARCH_PURCHASEORDER_BY_NAME,
        {
            params: {
                ItemName: ItemName
            }
        }
    );

    return response.data;
}




 const purchaseOrderService={
    RegpurchaseOrder,
    getallPurchaseorder,
    SearchPurchaseOrderByName
 }
 export default purchaseOrderService