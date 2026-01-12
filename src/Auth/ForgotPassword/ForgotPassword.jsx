import React, { useState } from 'react'
import './ForgotPassword.css'
import imgpass from '../../assets/imgforgotpasss.png';
import imgpassword from '../../assets/imgpassword.PNG';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import axios from "axios";
import Cookies from "js-cookie";

export default function ForgotPassword() {
    const [errorPost, seterrorpost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email , setEmail] = useState('');
    
    const Navigate = useNavigate();

    async function handlesubmit(e){
        e.preventDefault();
        setLoading(true);
        if(email === ''){
            seterrorpost('please enter your email address!');
            setLoading(false);
            return;
        }

        try {
            let res = await axios.post(
                `https://uni-verse-rho.vercel.app/auth/forgetpass`, 
            {email: email}
            );

        console.log("the email done", res.data);

        if (res.data.token) {
                console.log(res.data.token)
                Cookies.set('resetToken', res.data.token, { path: '/' });
            }

            Navigate('/ConfirmPassword');
        } catch (error) {
          console.error(error.response?.data);
          seterrorpost(error.response.data.message || "There is an error in sending email. Please try again.");
        } finally {
            setLoading(false);
        }
}
return (
    <div className='login-container'>
          <div className='logImgF'>
            <img src={imgpass} alt="forgot password image" />
          </div>
    
          <div className='logBox'>
              <div className='logo-back'>
                <div className='logo'>
                <img src={logo} alt="logo" />
                <p>UniVerse</p>
              </div>
              <div className='backLog'>
                <p>Already Have an account?</p>
                <Link to='/'>Login</Link>
              </div>
              </div>
    
            <div className='logForm'>
                <div className='logText'>
                    <img src={imgpassword} alt="image password" />
              <h2>Forgot your password?</h2>
              <p>A code will be sent to your email to reset password</p>
            </div>
    
            {errorPost && <p className="error">{errorPost}</p>}
    
            <form onSubmit={handlesubmit}>
              <label>Email</label>
              <input 
                type="email" 
                placeholder='Email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
    
    
              <button type="submit" disabled={loading}>
                {loading ? "Continue..." : "Continue"}
              </button>
            </form>
    
            <div className='contbox'>
                <p>Created By UniVerse Team</p>
                
            </div>
            </div>
          </div>
    </div>
  )
}
