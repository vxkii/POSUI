import './App.css';
import store from './App/store';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Itempg2 from './pages/item/itempg2'
import { Provider } from 'react-redux';
import UpdateItem from './pages/item/updateitem';
import ItemRegister from './pages/item/itemRegister';
import Supplier from './pages/Supplier/supplier'
import SupplierRegistor from './pages/Supplier/suplierRegistor'
import UpdateSupplier from './pages/Supplier/updatesupplier'
import NavBar from './components/navbar';
import PurchaseOrder from './pages/purchaseOrder/purchaseorder';
import Stocks from './pages/stocks/stocks';
import AddStock from './pages/stocks/add stock';
import TransactionPage1 from './pages/billing/TransactionPage1';
import TransactionPage2 from './pages/billing/TransactionPag2';
import ViewBilling from './pages/billing/viewbilling';
import Login from './pages/loginscreen/loginscreen';
import Login2 from './pages/loginscreen/loginscreen2';



function App() {
  return (
    <BrowserRouter>
   <Provider store={store}>
      <div className="App">
        <NavBar/>

        <header className="App-header">
         
          <Routes>

               { <Route path="/" element={<Navigate to="/Login" />} />}
             <Route path="/Itempg2" element={<Itempg2 />} />
             <Route path="/UpdateItem/:ItemCode" element={<UpdateItem />} />
             <Route path="/ItemRegister" element={<ItemRegister />} />
             <Route path="/Supplier" element={<Supplier/>} />
              <Route path="/SupplierRegistor" element={<SupplierRegistor/>} />
              <Route path="/UpdateSupplier/:SupplierCode" element={<UpdateSupplier />} />
              <Route path="/PurchaseOrder" element={<PurchaseOrder />} />
              <Route path="/Stocks" element={<Stocks />} />
              <Route path="/AddStock" element={<AddStock />} />
              <Route path="/TransactionPage1" element={<TransactionPage1 />} />
               <Route path="/TransactionPage2" element={<TransactionPage2 />} />
                 <Route path="/ViewBilling/:billId" element={<ViewBilling />} />
                 <Route path="Login" element={<Login2/>} />
               
             
          

            
            
          </Routes>
        </header>
      </div>
      <ToastContainer/>
</Provider>
    </BrowserRouter>
  );
}

export default App;
