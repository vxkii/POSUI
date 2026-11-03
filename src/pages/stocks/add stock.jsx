import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { Addstock } from "../../Slice/stocksSlice";

export default function AddStock() {
  const dispatch=useDispatch();
  const navigate = useNavigate();  
  const { isregisterstockssuccess} = useSelector((state) => state.stocks)
const [formdata,setformdata]=useState({
  ItemCode :'',
  ItemName: '',
  AvailableQuantity : ''
})
const {ItemCode,ItemName,AvailableQuantity} = formdata;
  const onchange = (e) => {
    setformdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  } 

    const onsubmit = (e) => {
      e.preventDefault();
  
      if(ItemCode == '' || ItemName == '' || AvailableQuantity == '' ){
        toast.error("Please fill all the fields")
        return;
      }
          const data = { ItemCode,ItemName,AvailableQuantity };
        //   console.log('data',data);
          dispatch(Addstock(data));
        }
    

 
useEffect(() => {
    if (isregisterstockssuccess ) {
    
     
      navigate('/Stocks')
    }

  })


  return (<>
    <form onSubmit={onsubmit}>
      <center style={{ fontWeight: 'bold', fontSize: 30 }}>New Stock</center>
      <div className='totalbox'>
        <div className="col-md-6" >
          <label htmlFor="itemcode" >Item Code <span style={{ color: "#ff0000" }}>*</span></label><br />
          <input type="text" id="ItemCode" name="ItemCode" className="form-control border border-success" placeholder='Enter Item Code' onChange={onchange}   />
        </div>
        <br />
        <div className="col-md-6" >
          <label htmlFor="minimumquantity" > ItemName <span style={{ color: "#ff0000" }}>*</span></label><br />
          <input type="text" id="ItemName" name="ItemName" className="form-control border border-success" placeholder='Enter ItemName' onChange={onchange} />
        </div>
        <br />
        <div className="col-md-6" >
          <label htmlFor="AvailableQuantity" > Available Quantity <span style={{ color: "#ff0000" }}>*</span></label><br />
          <input type="text" id="AvailableQuantity" name="AvailableQuantity" className="form-control border border-success" placeholder='Enter Available Quantity' onChange={onchange}  />
        </div>
        <br />
        <div className='row'>
          <div className="col-md-3" >
            <button className='btn btn-outline-dark col-4' style={{ width: 150 }} type='submit'>Create</button>
          </div>
          <div className="col-md-3" >
            <button className='btn btn-outline-dark col-4' style={{ width: 150, marginLeft: 75 }} onClick={(e) =>{e.preventDefault(); navigate('/Stocks');}}>Cancel</button>
          </div>
        </div>

      </div>
    </form>
    
    </>
  );
}