import React, { useState } from 'react'
import "../auth.form.scss"
import {Link,useNavigate} from "react-router"
import {useAuth} from "../hooks/useAuth"
import Spinner from "../../../components/Spinner"

const Login = () => {
const navigate = useNavigate();
 const {loading,handleLogin} = useAuth();
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 
 const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await handleLogin({email,password});
        navigate("/home");
    } catch (error) {
        // Error is logged by useAuth, just prevent navigation
    }
}

    if(loading){
        return (<Spinner />)
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>

                    <input 
                    onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" name="email" required placeholder='Enter email address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" name="password" required placeholder='Enter password'/>
                </div>
                <button className="button primary-button" type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login