import { useNavigate } from "react-router-dom";
import"../../css/style.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {RegistorItem,getallitems, resetcreateitem, resetgetallitems} from "../../Slice/itemSlice"


export default function Itempg2() {
      const dispatch = useDispatch()
      const navigate = useNavigate()
    

       const All=()=>{
    navigate("/Items")
  }
  const back=()=>{              
    navigate("/ItemRegister")
}


 const{isitemsuccess,createitemmesage}=useSelector((state)=>state.Item)

const [formdata,setformdata]=useState({
    ItemCode:"",
    ItemName:"",
    ItemUnit:"",
    ItemPrice:"",
    MinimumQuantity:"",
    AvailableQuantity: "0"
});

const{ItemCode,ItemName,ItemUnit,ItemPrice,MinimumQuantity,AvailableQuantity}=formdata;

const onchange=(e)=>{
    setformdata((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}

const onsubmit=(e)=>{
    e.preventDefault()

     if(!ItemCode){
        toast.error("Enter ItemCode..!")
        return
    }
    
    const item={ItemCode,ItemName,ItemUnit,ItemPrice,MinimumQuantity,AvailableQuantity}
    dispatch(RegistorItem(item))
     
    // console.log(item)

   
      
    // else{
    //  dispatch(RegistorItem(item))
    // }
}


useEffect(()=>{
        if(isitemsuccess && createitemmesage){
           
            toast.success(createitemmesage)
             navigate('/ItemRegister')
             dispatch(getallitems())
             dispatch(resetgetallitems())              
        dispatch(resetcreateitem())}
    },[dispatch,createitemmesage])
    



    return(<>
    <form onSubmit={onsubmit}> <div className="head">
   <center>  Add Items</center> </div> 
      <div onClick={back}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 20 20">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>back</div>
      <div className="mt-3">
        <div className="item" >
            <label htmlFor="ItemCode">ItemCode:</label><br />
            <input type="text" id="ItemCode" name="ItemCode" style={{width:450}} className="form-control border border-dark" onChange={onchange}/>
        </div></div>
        <div className="item" >
            <label htmlFor="ItemName">ItemName:</label><br />
            <input type="text" id="ItemName" name="ItemName" style={{width:450}} className="form-control border border-dark" onChange={onchange}/>
        </div>
         <div className="item" >
            <label htmlFor="ItemUnit">ItemUnit:</label><br />
            <input type="text" id="ItemUnit" name="ItemUnit" style={{width:450}} className="form-control border border-dark" onChange={onchange}/>
        </div>
         <div className="item" >
            <label htmlFor="ItemPrice">ItemPrice:</label><br />
            <input type="text" id="ItemPrice" name="ItemPrice" style={{width:450}} className="form-control border border-dark" onChange={onchange}/>
        </div>
         <div className="item" >
            <label htmlFor="Min.MinimumQuantity">MinimumQuantity:</label><br />
            <input type="text" id="MinimumQuantity" name="MinimumQuantity" style={{width:450}} className="form-control border border-dark" onChange={onchange}/>
       </div>
       <div className="item" >
            <label htmlFor="AvailableQuantity" style={{display:'none'}}>AvailableQuantity:</label><br />
            <input type="number" id="AvailableQuantity"  name="AvailableQuantity" style={{width:450,display:'none'}} className="form-control border border-dark" onChange={onchange}/>
       </div><br />
       <button  className="item btn btn-outline-success">Submit</button><button type="button" onClick={back} className="btn btn-outline-secondary ms-4">Cancel</button>
        <br />
       
        
        </form>
        <center>


</center> 

    </>)
}