import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { edititem, getItemByCode } from "../../Slice/itemSlice";
import { toast } from "react-toastify"

export default function UpdateItem() {
    


    const dispatch = useDispatch();
    const navigate = useNavigate();

 const { ItemCode: ItemCode } = useParams();

  const {Items,isedititemmessage,isedititemisloading,isedititemissuccess}=useSelector((state)=>state.Item)
// alert(ItemCode)

    const [formData, setFormData] = useState({
         ItemCode:'',
        ItemName:'',
        ItemPrice:'',
        MinimumQuantity:'',
        ItemUnit:''
    });
    
    

    const {
        ItemName,
        ItemPrice,
        MinimumQuantity,
        ItemUnit}= formData;

    useEffect(() => {
        dispatch(getItemByCode(ItemCode));
    }, [dispatch, ItemCode]);

    useEffect(() => {
        if (Items) {
            setFormData({
                ItemCode: Items.ItemCode || "",
                ItemName: Items.ItemName || "",
                ItemPrice: Items.ItemPrice || "",
                MinimumQuantity: Items.MinimumQuantity || "",
                ItemUnit: Items.ItemUnit || "",
                
            });
        }
    }, [Items]);

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

       dispatch(
    edititem({
        ItemCode,
        ItemName,
        ItemPrice,
        MinimumQuantity,
        ItemUnit
    })
           
           
        );
      
    };
    useEffect(() => {
        if (isedititemissuccess && isedititemmessage) {
            toast.success(isedititemmessage);
            navigate("/ItemRegister");
        }
    }, [dispatch, isedititemissuccess, isedititemmessage, navigate]);



    return (
        <div className="container mt-5">
            <h3>Update Item</h3>

            <form onSubmit={onSubmit}>

                <input
                    type="text"
                    name="ItemCode"
                    value={formData.ItemCode}    
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder="ItemCode"
                    disabled
                />

                <input
                    type="text"
                    name="ItemName"
                    value={formData.ItemName}
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder="ItemName"
                />




                <input
                    type="text"
                    name="ItemPrice"
                    value={formData.ItemPrice}
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder="ItemPrice"
                />

                <input
                    type="text"
                    name="MinimumQuantity"
                    value={formData.MinimumQuantity}
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder="MinimumQuantity"
                />

                <input
                    type="text"
                    name="ItemUnit"
                    value={formData.ItemUnit}
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder="ItemUnit"
                />


                <button
                    className="btn btn-success"
                    type="submit"
                >
                    Update Item
                </button>

            </form>
        </div>
    );
}