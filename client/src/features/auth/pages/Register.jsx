import React from 'react'
import {Link,useNavigate} from "react-router"
import {useState} from "react"
import "../auth.form.scss"
import {useAuth} from "../hooks/useAuth"
import Spinner from "../../../components/Spinner"

const Register = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loading ,handleRegister} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await handleRegister({username,email,password});
        navigate("/home");
    } catch (error) {
        // Error is logged by useAuth, we just prevent navigation
    }
  }

    if(loading){
        return (<Spinner />)
    }
  return (
        <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}} 
                    type="text" id="username" name="username" required placeholder='Enter username'/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>{setEmail(e.target.value)}} 
                    type="email" id="email" name="email" required placeholder='Enter email address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    type="password" id="password" name="password" required placeholder='Enter password'/>
                </div>
                <button className="button primary-button" type="submit">Register</button>

            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register