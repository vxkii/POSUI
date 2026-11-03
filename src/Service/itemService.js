import authAxious from "../Config/interceptor";


const API_URL_REGISTER_ITEM ='/item/Createitem'
const API_GET_ALL_ITEM='/item/getallItem'
const API_DELETE_BY_CODE_ITEM='/item/Itemdelete'
const API_UPDATE_BY_CODE_ITEM='/item/GetItemByCode'
const API_UPDATE_ITEM ='/item/Updateemployee'
const API_SEARCH_ITEM_BY_NAME = '/item/SearchItemByName'


const RegistorItem=async(item)=>{
     const response= await authAxious.post(API_URL_REGISTER_ITEM,item)
   return response.data
    // const insertItem= await JSON.parse(localStorage.getItem("Items"))||[];

    // insertItem.push(item);

    // localStorage.setItem("Items",JSON.stringify(insertItem));
    // return{
    //     success:true,
    //     message:"item Added successfully",
    //     item,
    // };


}
const getallitems = async () => {

     const response= await authAxious.get(API_GET_ALL_ITEM)
     return response.data


}

const deleteItems =async(ItemCode)=>{
    const responce= await authAxious.delete(`${API_DELETE_BY_CODE_ITEM}/${ItemCode}`)
   return responce.data;
    


}

const getItemByCode = async (ItemCode) => {

    const response= await authAxious.get(`${API_UPDATE_BY_CODE_ITEM}/${ItemCode}`)
   return response.data

}


const edititem =async(Item)=>{
    // console.log('mani',Item)
    const responce= await authAxious.post(`${API_UPDATE_ITEM}/${Item.ItemCode}`,Item)
   return responce.data;
}

const SearchItemByName = async (ItemName) => {

    const response = await authAxious.get(
        API_SEARCH_ITEM_BY_NAME,
        {
            params: {
                ItemName: ItemName
            }
        }
    );

    return response.data;
}





    const ItemService={
        RegistorItem,
        getallitems,
        deleteItems,
        getItemByCode,
        edititem,
        SearchItemByName

    }
export default ItemService