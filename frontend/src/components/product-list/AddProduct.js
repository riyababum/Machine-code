import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

function AddProduct(props) {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name:'',
        price:'',
        quantity:'',
        category:''
    });

    const handleChange = (e)=>{
        const {name,value} =e.target;
        setProduct({...product, [name]:value});
    }

    const handleSubmit = async (e)=>{
        axios.post(`/api/add-product`,product)
            .then(res => {
                alert(res.data.message);
                setProduct({name:'',
                price:'',
                quantity:'',
                category:''})
            });
            navigate('/product-list');
    }
    

    return (
        <div>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form id='add'>
                <label>Product Name:</label><br/>
                <input type='text' name='name' onChange={handleChange} ></input>

                <label>Price:</label><br/>
                <input type='text' name='price' onChange={handleChange} ></input>
                
                <label>Quantity:</label><br/>
                <input type='text' name='quantity' onChange={handleChange} ></input>

                <label>Category:</label><br/>
                <input type='text' name='category' onChange={handleChange} ></input>

                <button onClick={handleSubmit}>Add</button><br/>
            </form>
        </div>
    );
}

export default AddProduct;

