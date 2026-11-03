import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getallitems } from "../../Slice/itemSlice"
import {AddBill} from "../../Slice/billSlice"
import { toast } from "react-toastify"

export default function TransactionPage2 (){


    const dispatch=useDispatch()
    const navigate=useNavigate()

    const back=()=>{
      navigate("/TransactionPage1")
    }

    const {allitem}=useSelector((state)=>state.Item)

    // const allitems = allitem.filter((items) => String(items.ItemID) === String(ItemID))

    // console.log("allitem",allitem)

    const[header,setHeader]=useState({
      // billDate: new Date().toDateString().split("T")[0],
      PhoneNumber:""

    })

    const [items ,setItems] = useState([]);
    
    const [grandtotal ,setgrandtotal] = useState(0);

    const [item,setitem]=useState({
        ItemCode:"",
        ItemName:"",
        UnitPrice:"",
        totalQuantity:"",
        total:""
    })
    const additem=()=>{
         if(!item.ItemName || !item.UnitPrice || !item.totalQuantity || !item.total){
       toast.error("Enter all Item Details")
         return;


       }
       if(!header.PhoneNumber.trim()){
          toast.error("Please enter PhoneNumber ")
          return;
        }
        if(!/^\d{10}$/.test(header.PhoneNumber)){
          toast.error("Please enter a valid 10 phonenumber")
          return;
        }
        
      
       else{
      
      const itemtotal= Number(item.total);

      setItems((prevItems)=>[
      ...prevItems, {
        ItemCode:item.ItemCode,
        ItemName:item.ItemName,
        UnitPrice:item.UnitPrice,
        totalQuantity:item.totalQuantity,
        total:item.total


      }
     ]);
     setgrandtotal((prevtotal)=> prevtotal+ itemtotal);
     setitem({
       ItemCode:"",
        ItemName:"",
        UnitPrice:"",
        totalQuantity:"",
        total:""

      })
    }
    } 

    

    const handleHeaderChange=(e)=>{
      setHeader({
        ...header,

        [e.target.name]:e.target.value,
      })

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
        } else if (name === "totalQuantity") {
            const quantity = Number(value);
            const price = Number(item.UnitPrice);

            const total = quantity * price;
            setitem({
                ...item,
                totalQuantity: value,
                total: total
            }); 
        } else {
            setitem({
                ...item,
                [name]: value,
            });
        }
    }
       
       
    // const{ItemCode,ItemName,UnitPrice,totalQuantity,TotalCost}=item;

    // const onchange=(e)=>{
    //     setitem((prevState)=>({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    const submitbill=async(e)=>{
        e.preventDefault()
        const bill={
          ...header,
          items:items,
          grandtotal:grandtotal,
          // billId:1/
        }
        if(!header.PhoneNumber.trim()){
          toast.error("Please enter PhoneNumber ")
          return;
        }
        if(!/^\d{10}$/.test(header.PhoneNumber)){
          toast.error("Please enter a valid 10 phonenumber")
          return;
        }
        // try{
          console.log('bill' , bill)
          dispatch(AddBill(bill)).unwrap();
          // dispatch(getbill())
          navigate("/TransactionPage1")
        // }
        
     }


useEffect(()=>{
        dispatch(getallitems())
      },[dispatch])



    


    return(<>
     <center><h3>New Bill</h3> </center>
    <div className="row"   >
        <div className="col-3"  style={{marginLeft:200,marginTop:30}}> <label style={{fontWeight:'bold'}}>Date</label>

<input type="text"   value={new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  })}  className="form-control border border border-dark" />  </div>
   
<div className="col-3" style={{marginTop:30}}><label style={{fontWeight:'bold'}}>Phone Number</label>
<input type="number" name="PhoneNumber" id="PhoneNumber" placeholder="Enter phoneNumber"  value={header.PhoneNumber} onChange={handleHeaderChange} className="form-control border border border-dark" />  </div> 
<div className="col-3">
<button type="submit" style={{marginTop:54}}  className ="btn btn-success " data-bs-toggle="modal" data-bs-target="#exampleModal">Add Item</button>
</div>



</div>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Item</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
         

          <div > <form   onSubmit={onsubmit}>
            <div className="modal-body">
              <label>ItemCode</label> <br />
              <input type="text" name="ItemCode" className="form-control border border-success"
                placeholder="enter ItemCode"
                value={item.ItemCode}
                 onChange={handleItemChange}
                disabled
              />
              <div className="form-label">
            
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
              </div>

             
               
            

            
              <label>1 Unit Price</label> <br />
              <input type="text" name="Currentstock" className="form-control border border-success"
                placeholder=" --1 Unit Price--" 
                value={item.UnitPrice}
             onChange={handleItemChange}
                disabled
              /> 


            
            
              <label className="mt-3">Total Quantity</label> <br />
              <input type="number" name="totalQuantity" className="form-control border border-success"
                placeholder=" --Total Quantity--" 
                value={item.totalQuantity}
                onChange={handleItemChange}
              />

    
        
              <label className="mt-3">Total Cost</label> <br />
              <input type="text" name="total" className="form-control border border-success"
                placeholder=" --Total Cost--"  
                value={item.total}
                onChange={handleItemChange}
                disabled
              />

        
    
              

            </div>
             <div class="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success " data-bs-dismiss="modal" onClick={additem} >confirm bill</button>
             </div>
            </form>
          </div>
          
          </div>
      </div>
    </div>
    <br />

    <table className="table table-bordered">   
      <thead>
        <tr>
          <th>#</th>
           <th>ItemCode</th>
            <th>ItemName</th>
             <th>UnitPrice</th>
              <th>totalQuantity</th>
               <th>TotalCost</th>
        </tr>
        </thead>
        <tbody> 
          {items && items.map((x,index)=>(
            <tr key = {index}>
              <td>{index+1}</td>
              <td>{x.ItemCode}</td>
              <td>{x.ItemName}</td>
              <td>{x.UnitPrice}</td>
               <td>{x.totalQuantity}</td>
               <td>{x.total}</td>

            </tr>
        
          ))}
        </tbody>

       

      
    </table>
     <h2>Grand Total:₹{grandtotal}</h2>
     <button type="submit" className=" btn btn-success" onClick={submitbill}>Submit Bill </button>
     <button style={{marginLeft:'25px'}} type="button" className=" btn btn-secondary" onClick={back} >Cancel </button>



    
    </>)
}