import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { getallsupplier, Registorsupplier ,resetcreatesupplier} from "../../Slice/supplierSlice";

export default function SupplierRegistor(){



    const navigate=useNavigate()
    const dispatch=useDispatch()

    const backSupplier=()=>{
        navigate("/Supplier")
    }


    const{issupissuccess,issuppmesage}=useSelector((state)=>state.supplier)


    const [formdata,setformdata]=useState({
        Suppliercode:"",
        SupplierName:"",
        SupplierAddress:""
    });
    
    const{Suppliercode,SupplierName,SupplierAddress}=formdata;
    
    const onchange=(e)=>{
        setformdata((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    
    const onsubmit=(e)=>{
        e.preventDefault()
        const supplier={Suppliercode,SupplierName,SupplierAddress}
         console.log(supplier)

    
    if(!Suppliercode){
            toast.error("Enter SupplierCode..!")
            return
        } 
        dispatch(Registorsupplier(supplier))
      
         
    }


    useEffect(()=>{
            if(issupissuccess && issuppmesage){
              
              toast.success(issuppmesage)   
               navigate("/Supplier")
               dispatch(resetcreatesupplier())
            dispatch(getallsupplier())}
            },[dispatch,issuppmesage])
            
        
         
    




return(<>
<form onSubmit={onsubmit}> <div className="head">
   <center>  Add Supplier</center> </div> 
      <div onClick={backSupplier}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 20 20">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>back</div>
      <div className="mt-3">
        <div className="item" >
            <label htmlFor="Suppliercode">SupplierCode:</label><br />
            <input type="text" id="Suppliercode" name="Suppliercode" style={{width:450}} className="form-control border border-dark" onChange={onchange}/>
        </div></div>
        <div className="item" >
            <label htmlFor="SupplierName">SupplierName:</label><br />
            <input type="text" id="SupplierName" name="SupplierName" style={{width:450}} className="form-control border border-dark" onChange={onchange}/>
        </div>
         <div className="item" >
            <label htmlFor="SupplierAddress">SupplierAddress:</label><br />
            <textarea type="text" id="SupplierAddress" name="SupplierAddress" style={{width:450}} className="form-control border border-dark" onChange={onchange}/>
        </div>
         
        <br />
       <button  className="item btn btn-outline-success">Submit</button><button className="btn btn-outline-secondary ms-4" >Cancel</button>
        <br />
       
        
        </form>
     
</>)
}