import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getallbill, resetgetallbill, SearchBillByDate } from "../../Slice/billSlice"
import { useEffect, useState } from "react"

export default function TransactionPage1(){

    const navigate=useNavigate()

const dispatch=useDispatch()

const viewbill=(i)=>{
    { navigate(`/ViewBilling/${i.billId}`)}
}
  
    
     const {allbill}=useSelector((state)=>state.bill)

    const nxtbill=()=>{
        navigate("/TransactionPage2")
    }

     const [searchText, setSearchText] = useState("");
    
          const handleSearch = (e) => {
          
              const value = e.target.value;
          
              setSearchText(value);
          
              if (value.trim().length > 2) {
          
                  dispatch(SearchBillByDate(value));
                  dispatch(resetgetallbill())
               
          
              }
              else  if (value.trim().length == 0 ) {
          
                  dispatch(getallbill())
                  dispatch(resetgetallbill())
          
              }
          
          };


    useEffect(()=>{
        dispatch(getallbill())
    },[])


    return(<>
    
    
    <nav className="navbar navbar-light">
      <div style={{ marginTop: 80, marginLeft: "50px" }}>
        <h2>Transaction</h2> </div>
      <div className="container-fluid">
        <a className="navbar-brand"><h3></h3></a>
        <div className="d-flex me-5"
        //
        >
          <input
          value={searchText}
        onChange={handleSearch}    
          className="form-control border-dark rounded-0" id="search" name="search" type="date" placeholder="Search Bill" aria-label="Search" />

          <button
             onClick={() => {
                            if (searchText.trim().length > 2) {
                                dispatch(SearchBillByDate(searchText));
                            }
                        }} 
          className="btn btn-dark me-2 rounded-0"  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg></button>

          <button className="btn btn-outline-dark col-4" type="submit" 

        onClick={nxtbill} >New Bill</button>
        </div>
      </div>
    </nav>


    <div className="row">
<div>
  {allbill?.map((i)=>(
    
  







    <div class="card border border-success" style={{ width:'95%' ,marginTop: 20, marginLeft: 50 }}>
  <div class="card-header" >
    #{i.billId}
    <div   className="d-flex justify-content-end" style={{marginRight:10,gap:25}}><svg onClick={()=>viewbill(i)}  style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>
   </div>

   
    
  </div>
  <div className="row">
    <div className="col md-6">
  <div class="card-body">
    <h5 class="card-title">Bill Id:{i.billId}</h5> 
    <p class="card-text"></p>
    
    </div>
    </div>
    
    <div className="col md-6">
  <div class="card-body">
Date: {i.billDate.split("T")[0]}
  
    </div>
    </div>
   
  
</div>
</div>
))}
  </div>
</div>










    
    
    </>)
}