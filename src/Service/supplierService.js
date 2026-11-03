import authAxious from "../Config/interceptor";

const API_URL_REGISTER_SUPPLIER ='/Supplier/CreateSupplier'
const API_GET_ALL_SUPPLIER='/Supplier/getallsupplier'
const API_GET_SUPPLIER_BY_CODE='/Supplier/getbySuppliercode'
const API_UPDATE_SUPPLIER ='/Supplier/Updatesupplier'
const API_DELETE_BY_CODE_SUPPLIER='/Supplier/Supplierdelete'
const API_SEARCH_SUPPLIER_BY_NAME = '/Supplier/SearchSupplierByName'






const Registorsupplier=async(supplier)=>{
    console.log('hi1')
     console.log(supplier)
     const response= await authAxious.post(API_URL_REGISTER_SUPPLIER,supplier)
   return response.data
}


const getallsuppliers = async () => {

     const response= await authAxious.get(API_GET_ALL_SUPPLIER)
     return response.data
  // const responce =await authAxious.post(API_URL_REGISTER_STUDENT,{data})
//   const existingItem = await JSON.parse(localStorage.getItem("Items")) || [];
}

const getSupplierByCode = async (Suppliercode) => {

     const response= await authAxious.get(`${API_GET_SUPPLIER_BY_CODE}/${Suppliercode}`)
    return response.data
  // const byItems = JSON.parse(localStorage.getItem("Items")) || [];
}

const editSupplier =async(supplier)=>{
    console.log('mani',supplier)
    const responce= await authAxious.post(`${API_UPDATE_SUPPLIER}/${supplier.Suppliercode}`,supplier)
   return responce.data;
}

const deleteSuppliers =async(Suppliercode)=>{
    const responce= await authAxious.delete(`${API_DELETE_BY_CODE_SUPPLIER}/${Suppliercode}`)
   return responce.data;
}
const SearchSupplierByName = async (SupplierName) => {

    const response = await authAxious.get(
        API_SEARCH_SUPPLIER_BY_NAME,
        {
            params: {
                SupplierName: SupplierName
            }
        }
    );

    return response.data;
}



 const SupplierService={
    Registorsupplier,
    getallsuppliers,
    getSupplierByCode,
    editSupplier,
    deleteSuppliers,
    SearchSupplierByName
 }
 

 export default SupplierService