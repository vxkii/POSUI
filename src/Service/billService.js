import authAxious from "../Config/interceptor";

const API_URL_ADDBILL_ITEM ='/bill/CreateBill'
const API_URL_GETALLBILL_ITEM ='/bill/getallbill'
const API_URL_GETBILLBYID_ITEM ='/bill/getbillbyId'
const API_SEARCH_BILL_BY_DATE = '/bill/SearchBillByDate';

export const AddBill = async (item) => {
    const response = await authAxious.post(API_URL_ADDBILL_ITEM, item)
    return response.data
}

export const getallbill = async () => {
    const response = await authAxious.get(API_URL_GETALLBILL_ITEM)
    return response.data
}
export const getbillbyId = async (billId) => {
    const response = await authAxious.get(`${API_URL_GETBILLBYID_ITEM}/${billId}`)
    return response.data
}



const SearchBillByDate = async (billDate) => {
    const response = await authAxious.get(
        API_SEARCH_BILL_BY_DATE,
        {
            params: {
                billDate: billDate
            }
        }
    );

    return response.data;
};


 const BillService={
    AddBill,
    getallbill,
    getbillbyId,    
    SearchBillByDate
 }
 

 export default BillService