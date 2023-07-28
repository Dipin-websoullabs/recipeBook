import React, { useState,useEffect, Fragment } from 'react'
import './login.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login,clearAuthError } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import MetaData from '../components/MetaData';
import {Typography} from '@mui/material' 

function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const { loading, error, isAuthenticated } = useSelector(state => state.authState)
const dispatch = useDispatch();
const navigate = useNavigate();

const submitHandler = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('email', email)
  formData.append('password', password)

  dispatch(login(formData))
}

useEffect(() => {
  if (isAuthenticated) {
    toast('login Successfully!', {
      type: 'success',
      position: toast.POSITION.BOTTOM_CENTER
    })
    
    navigate('/');


}
  if (error) {
    toast(error, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      onOpen: () => { dispatch(clearAuthError) }
    })
    return;
  }
}, [error, isAuthenticated, dispatch, navigate])

  return (
    <><Fragment>
    { <MetaData title={'Login'} />}
    <div className='LoginMain'>
      
    <div className='loginLeft'>
        <div className='loginImage'>
            <img className='loginimg' src='./images/recipeLogin.jpg' alt='loginImage' />
        </div>
    </div>
    <div className='loginRight'>
      <div className='loginForm'> 
      <Typography id='loginTypo'>Login</Typography>
      
        <form onSubmit={submitHandler} className='loginForm1'> 
            <input  
                    className='inputMainLogin'
                    type="email" name="email"
                    placeholder='Email'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>

            <input
                    
                    className='inputMainLogin'
                    type="password"
                    name="Password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
        <button className='signupbtn inputMainButton' type="submit" value="Sign up" >Log in</button>
        <Link  to={"/signup"} className='loginLink'><Typography id='loginSignup'>SignUp</Typography> </Link>
        </form>
        
       
        </div>
    </div>
    </div>
    </Fragment></>
  )
}

export default Login