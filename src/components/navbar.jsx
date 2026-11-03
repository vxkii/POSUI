import { useLocation,useNavigate } from "react-router-dom";

export default function NavBar(){
    const navigate= useNavigate()
    const location=useLocation()
    console.log("location",location.pathname)

    return(<>

   
   <nav
    style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "20px",
        padding: "15px",
        backgroundColor: "#ebebec",
        borderBottom: "1px solid #f6eded",
        width: "100%",
        boxSizing: "border-box"
    }}
>

    {/* <button onClick={() => navigate("/Itempg2")}
    style={{border:"none",background:"none",
        color:location.pathname === "/Itempg2"
        ?"blue"
        :"black",
    }}>Items</button> */}

    <button onClick={() => navigate("/ItemRegister")}
        style={{border:"none",
            background:"none",
            color: location.pathname === "/ItemRegister"
            ?"blue"
            :"black",
            marginLeft:500
        }}> Items
         </button>

          <button onClick={() => navigate("/Supplier")}
        style={{border:"none",
            background:"none",
            color: location.pathname === "/Supplier"
            ?"blue"
            :"black",
        }}> Suppliers
         </button>

         {/* <button onClick={() => navigate("/PurchaseOrder")}
        style={{border:"none",
            background:"none",
            color: location.pathname === "/PurchaseOrder"
            ?"blue"
            :"black",
        }}> PurchaseOrder
         </button> */}

          <button onClick={() => navigate("/PurchaseOrder")}
        style={{border:"none",
            background:"none",
            color: location.pathname === "/PurchaseOrder"
            ?"blue"
            :"black",
        }}> PurchaseOrder
         </button>

         <button onClick={() => navigate("/Stocks")}
        style={{border:"none",
            background:"none",
            color: location.pathname === "/Stocks"
            ?"blue"
            :"black",
        }}> Stocks
         </button>

         
         <button onClick={() => navigate("/TransactionPage1")}
        style={{border:"none",
            background:"none",
            color: location.pathname === "/TransactionPage1" || location.pathname === "/TransactionPage2"  || location.pathname === "/ViewBilling"
            ?"blue"
            :"black",
        }}> Billing
         </button>





<div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
    <svg
        onClick={() => navigate("/Login")}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-power"
        viewBox="0 0 16 16"
        style={{ cursor: "pointer" }}
    >
        <path d="M7.5 1v7h1V1z" />
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
    </svg>

    <span
        onClick={() => navigate("/Login")}
        style={{ cursor: "pointer", marginLeft: "5px" }}
    >
        Logout
    </span>
</div>


           </nav>

    

    
    
    
    </>)
}