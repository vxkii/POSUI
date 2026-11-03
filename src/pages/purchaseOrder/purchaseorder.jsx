import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getallitems } from "../../Slice/itemSlice"
import { getallPurchaseorder, RegpurchaseOrder, resetpurodr, resetSearchPurchaseOrderByName, SearchPurchaseOrderByName } from "../../Slice/purchaseSlice"
import { toast } from "react-toastify"
import { getallsupplier } from "../../Slice/supplierSlice"


export default function PurchaseOrder() {                         
          
  const navigate = useNavigate()
  const dispatch=useDispatch()


  const {allSupplier,isgetallsupplierloading,isgetallsuppliersuccess}=useSelector((state)=>state.supplier)
   const {allpurchaseorder}=useSelector((state)=>state.purchase)
   const {allitem,isgetallitemsLoading,isgetallitemsSuccess}=useSelector((state)=>state.Item)

   const{isregpurorderissuccess,isregpurodrsuccessmessage,isgetallpurchaseorderisloading,isgetallpurchaseorderissuccess}=useSelector((state)=>state.purchase)


   const [item,setitem]=useState({
        ItemCode:"",
        ItemName:"",
        UnitPrice:"",
        currentstock:"",
        // totalQuantity:"",
        total:"",
        Quantitytoorder:"",
        EstimatedCost:"",
        Supplier:""
    })


  //  const [formdata,setformdata]=useState({
        
  //       Supplier:""
  //   });

     const{ItemCode,ItemName,currentstock,Quantitytoorder,UnitPrice,EstimatedCost,Supplier}=item;

    //  const onchange=(e)=>{
    //     setformdata((prevState)=>({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }))
    // }

     const onsubmit=(e)=>{
        e.preventDefault()
         if(ItemCode==''|| ItemName==''||currentstock==''|| Quantitytoorder==''||UnitPrice==''||EstimatedCost==''||Supplier==''){
        toast.error("Fill The Columns")
        return 
    }
        const data={ItemCode,ItemName,currentstock,Quantitytoorder:String(Quantitytoorder),UnitPrice,EstimatedCost,Supplier}
         dispatch(RegpurchaseOrder(data))

         if(!ItemCode){
             toast.error("Enter ItemCode..!")
             return
         }
     }



     const handleItemChange = (e) => {
        const { name, value } = e.target;

        if (name === "ItemName") {
            const selected = allitem.find((Item) => Item.ItemName === value);

            setitem({
                ...item,
                ItemName: value,
                ItemCode: selected?.ItemCode || "",
                UnitPrice: selected?.ItemPrice || ""
            });
        } else if (name === "Quantitytoorder") {
            const Quantitytoorder = Number(value);
            const UnitPrice = Number(item.UnitPrice);

            // console.log('UnitPrice',UnitPrice)
            // console.log('Quantitytoorder',Quantitytoorder)

             const total = UnitPrice * Quantitytoorder;
            setitem({
                ...item,
                EstimatedCost: value,
                total: total,
                Quantitytoorder:Quantitytoorder,
                Supplier:Supplier
            });
        } else {
            setitem({
                ...item,
                [name]: value,
            });
        }
    }
    const [searchText, setSearchText] = useState("");
    
          const handleSearch = (e) => {
          
              const value = e.target.value;
          
              setSearchText(value);
          
              if (value.trim().length > 2) {
          
                  dispatch(SearchPurchaseOrderByName(value));
                  dispatch(resetSearchPurchaseOrderByName())
               
          
              }
              else  if (value.trim().length == 0 ) {
          
                  dispatch(getallPurchaseorder())
                  dispatch(resetSearchPurchaseOrderByName())
          
              }
          
          };

     
   useEffect(()=>{
    if(!isgetallpurchaseorderissuccess && !isgetallpurchaseorderisloading){
    }
             dispatch(getallPurchaseorder())
           },[dispatch])

    useEffect(()=>{
      if(isregpurorderissuccess&&isregpurodrsuccessmessage){
         dispatch(getallPurchaseorder())
        toast.success(isregpurodrsuccessmessage)
        
         dispatch(resetpurodr())}

    },[dispatch,isregpurodrsuccessmessage])

    useEffect(()=>{
      if( !isgetallitemsLoading && !isgetallitemsSuccess ){
        dispatch(getallitems())

      }
    })

    useEffect(()=>{
      if( !isgetallsupplierloading && !isgetallsuppliersuccess ){
        dispatch(getallsupplier())

      }
    })



      
     
     return (<>


    <nav className="navbar navbar-light">
      <div style={{ marginTop: 80, marginLeft: "50px" }}>
        <h2>Purchase Order</h2> </div>
      <div className="container-fluid">
        <a className="navbar-brand"><h3></h3></a>
        <div className="d-flex me-5"
        //
        >
          <input
             value={searchText}
             onChange={handleSearch} 
          className="form-control border-dark rounded-0" id="search" name="search" type="text" placeholder="Search placeorder" aria-label="Search" />

          <button 
           onClick={() => {
                            if (searchText.trim().length > 2) {
                                dispatch(SearchPurchaseOrderByName(searchText));
                            }
                        }}
          className="btn btn-dark me-2 rounded-0"  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg></button>

          <button className="btn btn-outline-dark col-4" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal"

          >PurchaseOrder</button>
        </div>
      </div>
    </nav>
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Purchaseorder</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
         

          <div > <form   onSubmit={onsubmit}>
            <div class="modal-body">
              <label>ItemCode</label> <br />
              <input type="text" name="ItemCode" className="form-control border border-success"
                placeholder="enter ItemCode" value={item.ItemCode} onChange={onchange}
                disabled
              />
            
              <label className="mt-3">ItemName</label> <br />
              <select name="ItemName" className="form-select  border border-success"
                value={item.ItemName}
                 onChange={handleItemChange}
                 
              >
                <option value="">
                    ---Select ItemName--
                </option>
                {allitem.map((i)=>(
                    <option key={i.ItemName}>{i.ItemName}</option>
                ))}
              </select>
            
              <label>Currentstock</label> <br />
              <input type="text" name="Currentstock" className="form-control border border-success"
                placeholder="enter Currentstock" 
              
                
                 onChange={handleItemChange}
              />
            
              <label>Quantitytoorder</label> <br />
              <input type="text" name="Quantitytoorder" className="form-control border border-success"
                placeholder="enter Quantity to order" onChange={handleItemChange}
              />
        
              <label>UnitPrice</label> <br />
              <input type="text" name="UnitPrice" className="form-control border border-success"
                placeholder="enter UnitPrice" value={item.UnitPrice} onChange={handleItemChange}
                disabled
              />
    
              <label>EstimatedCost</label> <br />
              <input type="text" name="EstimatedCost" className="form-control border border-success"
                placeholder="enter Estimated Cost" value={item.total} onChange={handleItemChange}
                disabled
              />
              

    
               <label className="mt-3">Supplier</label> <br />
              <select name="Supplier" className="form-select  border border-success"
                 onChange={handleItemChange}
              >
                <option value="">
                    ---Select ItemName--
                </option>
                {allSupplier.map((i)=>(
                    <option key={i.SupplierName}>{i.SupplierName}</option>
                ))}
              </select>

            </div>
             <div class="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={onsubmit} >order</button>
             </div>
            </form>
          </div>
          
          </div>
      </div>
    </div>





<div>
  {allpurchaseorder?.map((i)=>( 
    <div className="card mt-5" 
     key={i.ItemCode}
    >
      <div className="card-header">
        <div className='labelname'>
          #{i.ItemID}
          </div>

        {/* <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>

          <svg data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </div> */}
      </div>

      <div className="card-body">
        <div className='row'>
          <div className='col-2'>
            Item Code <br />
             {i.ItemCode} 
          </div>
          <div className='col-2'>
            Item Name <br />
            {i.ItemName}
          </div>
          
          <div className='col-2'>
            Ordered Quantity <br />
            {i.Quantitytoorder} 
          </div>
          <div className='col-2'>
           Estimated Cost <br />
            {i.EstimatedCost} 
          </div>
          <div className='col-2'>
           Unit Price<br />
             {i.UnitPrice} 
          </div>
          <div className='col-2'>
            Supplier<br />
             {i.Supplier} 
          </div>
         
        </div>
      </div>
    </div>
   ))} 
</div>



  
   







  </>)

}