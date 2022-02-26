import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Product.css';


function ProductList(props) {

    const [productData,setProductData] = useState([]);

    async function fetchAPI (){
        const response = await fetch(`/api/product-list`);
        const body = await response.json();
        console.log(body); 
        setProductData(body);
    }
    

    useEffect(()=>{
        fetchAPI();  
    },[]);


    return (
            <div>
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <div id='productlist'>
                    <h1>Products</h1>
                    <table id='table'>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Category</td>
                            </tr>
                        </thead>
                        {productData.map( (product,key)=> (
                            <tbody key={key}>
                                <tr>
                                    <td>{product.name}</td>  
                                    <td>{product.price}</td> 
                                    <td>{product.quantity}</td>
                                    <td>{product.category}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>

                    <Link id='add-button' to='/add-product'>
                        <button id='add-product-button'>Add Product</button>
                    </Link>
                </div>
            </div>
    
    );
}

export default ProductList;