import React, { useState } from 'react'
import {Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import './css/signup.css'

const Signup = () => {

    const navigate = useNavigate()
    
    const [newUser, setNewUser] = useState({
        name:"",
        email: "",
        password: ''
      
    })

    const [error, setError] = useState("")
    const [alert, setAlert] = useState("")

    const handleRegister = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newUser.name) {
            setError('Name should not be empty');
            setAlert("danger")
            return;
        }
        if (!newUser.email) {
            setError('Email should not be empty');
            setAlert("danger")
            return;
        }
        if (newUser.password.length < 8) {
            setError('Password should have at least 8 characters!');
            setAlert("danger")
            return;
        }
        await axios.post('http://localhost:5000/signup/', newUser)
            .then((res) => {
                console.log(res.data)
                navigate('/login')
            })
            .catch(err => {
                console.log("User not added " + err)
                setAlert('danger');
                setError("User not created")
            })
    }

    return (
        <div className='registerContainer'>
           
                <h2 className="register">Register</h2>
                <div className='registerForm'> 
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Username</strong>
                        </label>
                        <input type='text' placeholder='Enter name' autoComplete='off' name='name' className='form-control rounded-00'  value={newUser.name} onChange={handleRegister} />

                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input type='email' placeholder='Enter email' autoComplete='off' name='email' className='form-control rounded-00'  value={newUser.email} onChange={handleRegister} />

                        <label htmlFor='email'>
                            <strong>Password</strong>
                        </label>
                        <input type='password' placeholder='Password' autoComplete='off' name='password' className='form-control rounded-00'  value={newUser.password} onChange={handleRegister} />
                    </div>

                    <button type='submit' className='btn w-100  rounded-0  registerButton'>Register</button>
                </form>

                <p>Already have an account?</p>


                <Link to="/login">
                    <button className='btn  border w-100  rounded-0 text-decoration-none registerButton'>Login</button>

                </Link>

                <Alert variant={alert}>
                    {error}
                </Alert>
            </div>
           
        </div>
    )
}

export default Signup