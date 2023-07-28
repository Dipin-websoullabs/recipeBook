import React, { Fragment, useEffect, useState } from 'react'
import './signUp.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register,clearAuthError } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import MetaData from '../components/MetaData';
import {Typography} from '@mui/material' 

function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('email', email)
      formData.append('password', password)
      formData.append('name',name)
      // console.log(formData.get('email'));
      dispatch(register(formData))
    }

    useEffect(() => {
      if (isAuthenticated) {
        toast('Signup Successfully!', {
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER
        })
       
      
          navigate('/');
        
  
      }
  
      if (error) {
        toast.error(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
          onOpen: () => { dispatch(clearAuthError) }// clear error message when toast is closed
        });
        return;
      }
    }, [error, isAuthenticated, dispatch, navigate]);
    
      return (
        <><Fragment>
        { <MetaData title={'SignUp'} />}
        <div className='LoginMain'>
           
        <div className='loginLeft'>
            <div className='loginImage'>
                <img className='loginimg' src='./images/recipeLogin.jpg' alt='loginImage' />
            </div>
        </div>
        <div className='loginRight'>
          <div className='loginForm'> 
          <Typography id="signUpTypo">SignUp</Typography>
          
            <form onSubmit={submitHandler} className='loginForm1'> 
            <input  
                        className='inputMainLogin'
                        type="text" name="name"
                        placeholder='User name'
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}/>
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
                        required
                        onChange={e => setPassword(e.target.value)}
                      />
            <button className='signupbtn inputMainButton' type="submit" value="Sign up" >Sign Up</button>
            <Link  to={"/login"} className='loginLink'><Typography id='signUpLogin'>Login</Typography> </Link>
            </form>
            
            </div>
        </div>
        </div>
        </Fragment></>
      )
}

export default SignUp