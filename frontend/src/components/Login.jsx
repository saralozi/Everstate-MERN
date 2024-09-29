import React, { useState, useContext } from 'react'
import { UserContext } from "./UserContext";
import { Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import './css/signup.css'

const Login = () => {

    const { setUserInfo } = useContext(UserContext);
    const nav = useNavigate()


    const [user, setUser] = useState({
        email: "",
        password: ''
      
    })

    const handleUser = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
   

    const [error, setError] = useState("")
    const [alert, setAlert] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (!user.email) {
            setError('Email should not be empty');
            setAlert("danger")
            return;
        }
        if (user.password.length < 8) {
            setError('Password should have at least 8 characters!');
            setAlert("danger")
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/login/', user, {
                withCredentials: true
            });
            console.log(response.data);
            setUserInfo({
                name: response.data.name,
                email: response.data.email,
                role: response.data.role
            });
            nav('/');
            console.log({name: response.data.name});
        } catch (err) {
            console.log("User not login", err);
            setAlert('danger');
            if (err.response && err.response.status === 404 && err.response.data === 'User not found') {
                setError('Incorrect email. Please check your email and try again.');
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        }
    };


    return (
        <div className='registerContainer'>
          
                <h2 className="register">Log in</h2>
                <div className='registerForm'>
                <form onSubmit={handleSubmit} method="post">
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input type='email' placeholder='Enter email' autoComplete='off' name='email' className='form-control rounded-00' value={user.email} onChange={handleUser} />

                        <label htmlFor='email'>
                            <strong>Password</strong>
                        </label>
                        <input type='password' placeholder='Password' autoComplete='off' name='password' className='form-control rounded-00' value={user.password} onChange={handleUser} />
                    </div>

                    <button type='submit'className='btn  border w-100  rounded-0 text-decoration-none registerButton'>Log in</button>
                </form>
               
                <p>Don't have an account?</p>


                <Link to="/signup">
                    <button className='btn  border w-100  rounded-0 text-decoration-none registerButton'>Sign up</button>

                </Link>

            <Alert variant={alert} className='w-75 mt-3 mx-auto'>
                {error}
            </Alert>

            </div>
        </div>
    )
}

export default Login