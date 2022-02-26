import React,{useState, useEffect} from 'react';
import './Login.css';
import {Link,useNavigate} from 'react-router-dom';
import validation from './validation';
import axios from 'axios';

function Login({setLogin}) {

    const navigate = useNavigate();

    const [formValues,setFormValues] = useState({email:'',password:''});
    const [formErrorValues,setFormErrorValues] = useState({});

    const [isSubmit,setIsSubmit] = useState(false);

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = (e)=>{
		e.preventDefault();
		setFormErrorValues(validation(formValues));
		setIsSubmit(true);
	}

    useEffect(()=>{
		if(Object.keys(formErrorValues).length===0 && isSubmit){
            axios.post("/api/login",formValues)
            .then(res => {
                alert(res.data.message);
                if(res.data.message==="Login successful"){
                    setLogin(true);
                    navigate('/product-list');                
                }
            }); 
		}
	},[formErrorValues])

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form id='lform' onSubmit={(e)=>handleSubmit(e)}>
                <h3>Login Here</h3>

                <label>Email</label>
                <input type="email" name='email' placeholder="Enter your E-mail" onChange={handleChange} value={formValues.email}></input>
                <p id='error'>{formErrorValues.email}</p>

                <label>Password</label>
                <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} value={formValues.password}></input>
                <p id='error'>{formErrorValues.password}</p>

                <button>Log In</button>
                <div className="social">
                    <Link className="rg" to='/register'>
                        <div >Registration</div>
                    </Link> 
                </div>
    </form>
        </div>
    );
}

export default Login;