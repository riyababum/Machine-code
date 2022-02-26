import React, { useState } from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import AddProduct from './components/product-list/AddProduct';
import ProductList from './components/product-list/ProductList';


function App() {

  const [login,setLogin]= useState(false);

    return (
      <Router>
      <>
        <Routes>
          <Route path='/' element={<Login setLogin={setLogin}/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/product-list' element={login?<ProductList/>:<Login/>}/>
          <Route path='/add-product' element={login?<AddProduct/>:<Login/>}/>
        </Routes>
      </>  
      </Router>
    );

}

export default App;
