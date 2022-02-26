import React,{useState,useEffect} from 'react';
import './Registration.css';
import {Link,useNavigate} from 'react-router-dom';
import validation from './validation';
import axios from  'axios';

function Registration(props) {
    const navigate = useNavigate();

    const [formValues,setFormValues] = useState({name:'',email:'',password:'',place:''});
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

    function clear(e) {
        e.preventDefault();
        setFormValues({name:'',email:'',password:'',place:''});
    }

    useEffect(()=>{
		if(Object.keys(formErrorValues).length===0 && isSubmit){
            axios.post("/api/register",formValues)
            .then(res => {
                alert(res.data.message);
                if(res.data.message==='Successfully Registered. Please Log In'){
                    navigate('/');
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
            <form >
                <h3>Register Here</h3>

                <input type="text" placeholder="Name" name="name" value={formValues.name} onChange={handleChange}></input>
                <p id='error'>{formErrorValues.name}</p>

                <input type="email" placeholder="Email" name="email" value={formValues.email} onChange={handleChange}></input>
                <p id='error'>{formErrorValues.email}</p>

                <input type="password" placeholder="Password" name="password" value={formValues.password} onChange={handleChange}></input>
                <p id='error'>{formErrorValues.password}</p>

                <input type="text" placeholder="Place" name="place" value={formValues.place} onChange={handleChange}></input>
                <p id='error'>{formErrorValues.place}</p>

                <button onClick={(e)=>handleSubmit(e)}>Register</button>
                
                <div id='clear' onClick={clear}> Clear </div>

                <div className="social">
                    <Link className="rg" to='/'>
                        <div >Login</div>
                    </Link> 
                </div>
    </form>
        </div>
    );
}

export default Registration;