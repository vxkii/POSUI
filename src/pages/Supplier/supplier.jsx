import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { getallsupplier,deleteSuppliers, resetgetallsupplier, resetDeleteSupplier, resetUpdateSupplier, SearchSupplierByName } from "../../Slice/supplierSlice"
import { toast } from "react-toastify"

export default function Supplier(){

    const navigate=useNavigate()
    const dispatch=useDispatch()


    const[deletesupplierCode, setdeletesupplierCode]=useState("");
    
const update=(i)=>{ navigate(`/UpdateSupplier/${i.Suppliercode}`)}

    const suppreg=()=>{
        navigate("/SupplierRegistor")
    }


      const {allSupplier ,isgetallsupplierloading ,isgetallsuppliersuccess,isdeletesuppliersuccess,isdeletesuppliermessage ,
        iseditsupplierloading,iseditsuppliersuccess,iseditsupmessage
      }=useSelector((state)=>state.supplier)

      //  useEffect(()=>{
      //   if( isgetallsupplierloading && isgetallsuppliersuccess){
      //     dispatch(getallsupplier())
      //   }
      const [searchText, setSearchText] = useState("");

      const handleSearch = (e) => {
      
          const value = e.target.value;
      
          setSearchText(value);
      
          if (value.trim().length > 2) {
      
              dispatch(SearchSupplierByName(value));
              dispatch(resetgetallsupplier())
           
      
          }
          else  if (value.trim().length == 0 ) {
      
              dispatch(getallsupplier())
              dispatch(resetgetallsupplier())
      
          }
      
      };
      

       useEffect(()=>{
      if(!isgetallsupplierloading && !isgetallsuppliersuccess)
      
          dispatch(getallsupplier())
        },[dispatch]) 


       useEffect(() => {
        if(isdeletesuppliersuccess && isdeletesuppliermessage){
          toast.error(isdeletesuppliermessage)
          dispatch(resetDeleteSupplier())
          dispatch(getallsupplier())
          dispatch(resetgetallsupplier())
        }})
        useEffect(() => {
          if(iseditsuppliersuccess && iseditsupmessage){
            toast.success(iseditsupmessage)
            dispatch(resetUpdateSupplier())
            dispatch(getallsupplier())
            dispatch(resetgetallsupplier())
          }
        })

        


        
            
            
            
            return(<>

    <nav className="navbar navbar-light">
  <div style={{marginTop:80,marginLeft:"50px"}}> 
  <h2>Supplier</h2> </div>
  <div className="container-fluid">
    <a className="navbar-brand"><h3></h3></a>
    <div className="d-flex me-5"   
    // onClick={submit}
    >
      <input 
         value={searchText}
        onChange={handleSearch}
        className="form-control border-dark rounded-0" id="search" name="search" type="text" placeholder="Search Supplier" aria-label="Search"/>

      <button 
      onClick={() => {
                  if (searchText.trim().length > 2) {
                      dispatch(SearchSupplierByName(searchText));
                  }
              }}
               className="btn btn-dark me-2 rounded-0"  ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>

      <button className="btn btn-outline-dark col-4" type="submit" 
      onClick={suppreg} 
      >Add Supplier</button>
    </div>
  </div>
</nav>









<div>
  {allSupplier?.map((i)=>(
   
  
<div class="card">
  <div class="card-header" ><div   className="d-flex justify-content-end" style={{marginRight:10,gap:25}}><svg onClick={()=>update(i)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg>
<svg data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
   </div>
    {i.Suppliercode}
  </div>
  <div className="row">
   
    
    <div className="col md-4">
  <div class="card-body">
    <h5 class="card-title">Suppliercode</h5> {i.Suppliercode}
    <p class="card-text"></p>
    </div>
    </div>
   
   <div className="col md-4">
  <div class="card-body">
    <h5 class="card-title">SupplierName</h5> {i.SupplierName}
    <p class="card-text"></p>
    </div>
    </div>
   
   <div className="col md-4">
  <div class="card-body">
    <h5 class="card-title">SupplierAddress</h5> {i.SupplierAddress}
    <p class="card-text"></p>
    </div>
    </div>
</div>
</div>
 ))}
</div>




<div class="modal fade"
 id="exampleModal"
  tabindex="-1" 
  aria-labelledby="exampleModalLabel" 
  aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" 
        id="exampleModalLabel">
          Delete Supplier</h5>
        <button type="button" 
        class="btn-close" 
        data-bs-dismiss="modal" 
        aria-label="Close">

        </button>
      </div>
      <div class="modal-body">
        <input type="text"
        placeholder="Enter Code..."
        className="form-control"
        value={deletesupplierCode}
        onChange={(e)=>setdeletesupplierCode(e.target.value)}
         />
      </div>
      <div class="modal-footer">
        <button type="button" 
        class="btn btn-secondary" 
        data-bs-dismiss="modal">
          Close</button>


        <button type="button" class="btn btn-primary"
        onClick={()=>{
        dispatch(deleteSuppliers(deletesupplierCode));
          
        }}
         data-bs-dismiss="modal" >
          Delete Supplier
          </button>
      </div>
    </div>
  </div>
</div> 





</>)
}
