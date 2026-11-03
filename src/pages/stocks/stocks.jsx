import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getallitems } from "../../Slice/itemSlice";
import { useEffect, useState } from "react";
import { editstock, resetSearchStockByName, SearchStockByName } from "../../Slice/stocksSlice";
import { toast } from "react-toastify";
import { getallstocks, getbystockbycode  } from "../../Slice/stocksSlice";

export default function StocksPage1(){  
  const navigate=useNavigate();
  const dispatch=useDispatch();

  // const getbycode=(i)=>{i.ItemCode}
  // 


  const [formData, setFormData] = useState({
             ItemCode:'',
            ItemName:'',
            AvailableQuantity:''
        });


  const {ItemCode,ItemName,AvailableQuantity} = formData;

  const {iseditstockloading,iseditstocksuccess,iseditstockerror,editstockSucceesMessage,stockbycode}=useSelector((state)=>state.stocks)

  useEffect(()=>{
    dispatch(getbystockbycode())
  },[dispatch])

   useEffect(() => {
    if (stockbycode) {
        setFormData({
            ItemCode: stockbycode.ItemCode || "",
            ItemName: stockbycode.ItemName || "",
            AvailableQuantity: stockbycode.AvailableQuantity || "",
        });
    }
}, [stockbycode]);


             const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

  const onSubmit = (e) => {
          e.preventDefault();
  
         dispatch(
      editstock({
          ItemCode,
          ItemName,
          AvailableQuantity

      })
    );
      };



  const onclicks=(i)=>{
    console.log('i',i)
    dispatch(getbystockbycode(i))
    // setFormData(i)
    }



  const {allstocks}=useSelector((state)=>state.stocks)

  
  

  const open=()=>{navigate("/AddStock")}


   const [searchText, setSearchText] = useState("");
  
        const handleSearch = (e) => {
        
            const value = e.target.value;
        
            setSearchText(value);
        
            if (value.trim().length > 2) {
        
                dispatch(SearchStockByName(value));
                dispatch(resetSearchStockByName())
             
        
            }
            else  if (value.trim().length == 0 ) {
        
                dispatch(getallstocks())
                dispatch(resetSearchStockByName())
        
            }
        
        };


 

 

       useEffect(()=>{
    dispatch(getallstocks())
  },[dispatch])

  





  // useEffect(() => {
  //   if (iseditstocksuccess && editstockSucceesMessage) {
  //     toast.success(editstockSucceesMessage); 
  //   }
  // }, [iseditstocksuccess, editstockSucceesMessage])

  //   useEffect(() => {
  //   if (iseditstocksuccess && editstockSucceesMessage) {
  //     toast.success(editstockSucceesMessage); 
  //   }
  // }, [iseditstocksuccess, editstockSucceesMessage])

     return(<>
  
      <h1 className="styleitem">Stocks</h1>
 <nav className="navbar navbar-light">

  
  <div className="container-fluid">
    <a className="navbar-brand"><h3></h3></a>
    <div className="d-flex me-5"   
   
    >
      <input
       value={searchText}
             onChange={handleSearch}
       className="form-control border-dark rounded-0" id="search" name="search" type="text" placeholder="Search Stocks" aria-label="Search"/>

      <button 
       onClick={() => {
                                  if (searchText.trim().length > 2) {
                                      dispatch(SearchStockByName(searchText));
                                  }
                              }}
      className="btn btn-dark me-2 rounded-0"  ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>

      <button className="btn btn-outline-dark col-4" type="submit" onClick={open}>Add Stock</button>
      <br />

      


    </div>
    
    
  </div>

  
</nav>

  <div>
   {allstocks?.map((i)=>( 
    <div className="card mt-5" 
     key={i.ItemCode}
    >
      <div className="card-header">
        <div className='labelname'>
          {i.ItemCode} 
          </div>
          
          
          
    <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
     <div style={{marginRight:150}}>{(parseInt(i.AvailableQuantity)?? 0) === 0 ? (
                                            <span className="text-danger fw-bold">Out of stock</span>
                                             ) : (
                                            <span className="text-success fw-bold">Stocks Available</span>
                                            )}
   </div>
        <svg 
        onClick={() => {onclicks(i)}}  
        
        data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg>
    </div>
       
      </div>

      <div className="card-body">
      


        <div className='row'>
          <div className='col-3'>
            Item Code <br />
             {i.ItemCode} 
          </div>
          <div className='col-3'>
            ItemName<br />
            {i.ItemName}
          </div>
          
          <div className='col-3'>
            Available Quantity <br />
            {i.AvailableQuantity ?? 0} 
          </div>
        
        
         
        </div>
      
      </div>
    

    </div>
    ))}  
    </div>




       
     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Stock</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
         
         

          <div > <form   onSubmit={onSubmit}>
            <div class="modal-body">
              <label>ItemCode</label> <br />
              <input type="text" name="ItemCode" className="form-control border border-success"
                placeholder="enter ItemCode" 
                value={formData.ItemCode} disabled

              />
            
              <label>ItemName</label> <br />
              <input type="text" name="ItemName" className="form-control border border-success"
                placeholder="enter ItemName"  value={formData.ItemName} disabled
              />
            
              <label>AvailableQuantity</label> <br />
              <input type="text" name="AvailableQuantity" className="form-control border border-success"
                placeholder="enter AvailableQuantity" value={formData.AvailableQuantity} onChange={onChange}
              />
            
             

            </div>
             <div class="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success "data-bs-dismiss="modal" onClick={onSubmit} >Update</button>
             </div>
            
            </form>
            
          </div>
          
          
          </div>
      </div>
    </div> 
      
     

         
    
  
  
  

 {/* <div
  className="modal fade"
  id="exampleModal"
  tabIndex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <form onSubmit={onsubmit}>
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Update Stocks
          </h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div className="modal-body">

          <label htmlFor="ItemCode">
            Item Code{" "}
            <span style={{ color: "#ff0000" }}>*</span>
          </label>

          <input
            type="text"
            id="ItemCode"
            name="ItemCode"
            className="form-control border border-success"
            disabled
            value={formdata?.ItemCode || ""}
            onChange={onchange}
          />

          <label htmlFor="MinimumQuantity">
            Minimum Quantity{" "}
            <span style={{ color: "#ff0000" }}>*</span>
          </label>

          <input
            type="text"
            id="MinimumQuantity"
            name="MinimumQuantity"
            className="form-control border border-success"
            disabled
            value={formdata?.MinimumQuantity || ""}
            onChange={onchange}
          />

          <label htmlFor="AvailableQuantity">
            Available Quantity
          </label>

          <input
            type="number"
            id="AvailableQuantity"
            name="AvailableQuantity"
            className="form-control border border-success"
            placeholder="Enter Available Quantity"
            onChange={onchange}
          />

        </div>

        <div className="modal-footer">

          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>

          <button
            type="button"
            className="btn btn-primary"
             data-bs-dismiss="modal"
           onClick={onsubmit}
          >
            Update
          </button>

        </div>

      </div>
    </form>
  </div>
</div> */}



   
        

    </>)
     }
    