import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editSupplier, getSupplierByCode } from "../../Slice/supplierSlice";
import { useEffect, useState } from "react";


export default function UpdateSupplier() {
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

     const { SupplierCode: Suppliercode } = useParams();
    
    const {SupplierbyCode}=useSelector((state)=>state.supplier)
     
     const [formData, setFormData] = useState({
             Suppliercode:'',
            SupplierName:'',
            SupplierAddress:''
        });



        const {
        SupplierName,
        SupplierAddress
        }= formData;

         useEffect(() => {
                dispatch(getSupplierByCode(Suppliercode));
            }, [dispatch, Suppliercode]);


            useEffect(() => {
                    if (SupplierbyCode) {
                        setFormData({
                            Suppliercode: SupplierbyCode.Suppliercode || "",
                            SupplierName: SupplierbyCode.SupplierName || "",
                            SupplierAddress: SupplierbyCode.SupplierAddress || ""
                        });
                    }
                }, [SupplierbyCode]);

                const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
            e.preventDefault();
    
           dispatch(
        editSupplier({
            Suppliercode,
            SupplierName,
            SupplierAddress
        })
               
               
            );
            navigate('/Supplier')
        };
    



    return (
        <div className="container mt-5">
            <h3>Update Supplier</h3>

            <form onSubmit={onSubmit}>

                <input
                    type="text"
                    name="Suppliercode"
                    value={formData.Suppliercode}    
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder="SupplierCode"
                    disabled
                />

                <input
                    type="text"
                    name="SupplierName"
                    value={formData.SupplierName}
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder="SupplierName   "
                />




                <input
                    type="text"
                    name="SupplierAddress"
                    value={formData.SupplierAddress}
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder="SupplierAddress"
                />

                


                <button
                    className="btn btn-success"
                    type="submit"
                >
                    Update Supplier
                </button>

            </form>
        </div>
    )}
    
