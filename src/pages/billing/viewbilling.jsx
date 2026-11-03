import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getallbill, getbybillId } from "../../Slice/billSlice";
import { useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ViewBilling() {


    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {billId:bill} = useParams()
    const {selectedBill}=useSelector((state)=>state.bill)

    const back=()=>{
      navigate("/TransactionPage1")
    }

   useEffect(()=>{
          dispatch(getbybillId(bill))
      },[])

      //    useEffect(()=>{
      //     dispatch(getallbill())
      // },[])

const PrintBillPDF = () => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 200] // Shop receipt width
    });

    const billData = selectedBill || [];

    if (billData.length === 0) {
        alert("No bill data available");
        return;
    }

    const phoneNumber = billData[0]?.phoneNumber || "";
    const billDate = billData[0]?.billDate
        ? new Date(billData[0].billDate).toLocaleDateString("en-IN")
        : new Date().toLocaleDateString("en-IN");

    const grandTotal = billData[0]?.grandTotal || 0;

    // Shop heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("POS Management", 40, 10, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Thank you for shopping with us!", 40, 15, {
        align: "center"
    });

    doc.line(5, 19, 75, 19);

    // Items table
    autoTable(doc, {
        startY: 22,
        margin: { left: 4, right: 4 },
        theme: "grid",
        styles: {
            fontSize: 7,
            cellPadding: 1.5,
            lineColor: [50, 50, 50],
            lineWidth: 0.1
        },
        headStyles: {
            fillColor: [230, 230, 230],
            textColor: [0, 0, 0],
            fontStyle: "bold"
        },
        head: [[
            "#",
            "Code",
            "Item",
            "Price",
            "Qty",
            "Total"
        ]],
        body: billData.map((x, index) => [
            index + 1,
            x.ItemCode || "",
            x.ItemName || "",
            `Rs. ${x.unitprice ?? x.UnitPrice ?? 0}`,
            x.totalquantity ?? x.totalQuantity ?? 0,
            `Rs. ${x.total ?? 0}`
        ])
    });

    // Bottom bill details
    let finalY = doc.lastAutoTable.finalY + 7;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`Grand Total: Rs. ${grandTotal}`, 75, finalY, {
        align: "right"
    });

    finalY += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.line(5, finalY, 75, finalY);

    finalY += 6;
    doc.text(`Phone Number: ${phoneNumber}`, 5, finalY);

    finalY += 5;
    doc.text(`Date: ${billDate}`, 5, finalY);

    finalY += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Thank you! Visit again.", 40, finalY, {
        align: "center"
    });

    // Save PDF
    doc.save(`Bill_${phoneNumber}_${Date.now()}.pdf`);
};

    return (<>
    <h1>Transaction Page #</h1>
    

     <div className="col-3"> <label htmlFor="PhoneNumber" style={{fontWeight:'bold', marginTop:'25px'}}>PhoneNumber</label>
    <input type="text" placeholder="Enter PhoneNumber"
     value={selectedBill[0]?.phoneNumber} 
      disabled className="form-control border border-dark" name="phoneNumber" id="phoneNumber" />
    </div>

    <div>


    <table className="table table-bordered" style={{borderColor:'#111', marginTop:'50px'}}>   
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
          {selectedBill && selectedBill.map((x,index)=>(
            <tr key = {index}>
              <td>{index+1}</td>
              <td>{x.ItemCode}</td>
              <td>{x.ItemName}</td>
              <td>{x.unitprice}</td>
               <td>{x.totalquantity}</td>
               <td>{x.total}</td>

            </tr>
        
          ))}
        </tbody>

       

      
    </table>
    </div>

    <div style={{marginTop:'25px'}}>
    <h2>Grand Total:₹{selectedBill[0]?.grandTotal} </h2>
     <button type="submit" className=" btn btn-success"     onClick={PrintBillPDF}
>Submit Bill </button>
     <button style={{marginLeft:'25px'}} type="button" className=" btn btn-secondary" onClick={back} >Cancel </button>
     
     </div>

    
    
    


    </>
    )
}