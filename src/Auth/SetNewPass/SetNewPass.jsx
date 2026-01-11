import React, { useState } from 'react'
import './SetNewPass.css'
import imgpass from '../../assets/imgforgotpasss.png';
import imgEmail from '../../assets/emailpass.png';
import { data, Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import axios from "axios";
import Cookies from "js-cookie";

export default function SetNewPass() {
    const [form, setForm] = useState({
    newPassword: "",
    passwordConfirm:""
  });

  const [errorPost, seterrorpost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass,setShowPass]= useState(false);
  const getToken = Cookies.get('resetToken');
  
  const Navigate = useNavigate();

  async function handlesubmit(e){
    e.preventDefault();
    setLoading(true);
    if(form.newPassword === "" || form.passwordConfirm === ""){
        seterrorpost("Please fill in all fields");
        setLoading(false);
        return;
    }
    if(form.newPassword !== form.passwordConfirm ){
        seterrorpost("Password Confirmation incorrect");
        setLoading(false);
        return;
    }
    console.log('the token here:', getToken);
    
    try {
        let res = await axios.put(
            `https://uni-verse-rho.vercel.app/auth/resetpassword`, 
        {
            newPassword: form.newPassword,
            passwordConfirm: form.passwordConfirm,
        },
         {
            headers: {
                Authorization: getToken
            }
         }
        );

        console.log("newpass Done:", res.data);
        Cookies.set("Bearer", res.data.token);

        Navigate('/');
    } 
    catch (error) {
        setLoading(false);
        
        if (error.response?.data?.errors) {
        seterrorpost(error.response.data.errors[0].msg);
        console.log(error.response.data.errors[0].msg);
    }
    // لو فيه message مباشر
    else if (error.response?.data?.message) {
        seterrorpost(error.response.data.message);
        console.log(error.response.data.message);
    }
    // fallback
    else {
        seterrorpost("Something went wrong");
        console.log(error.message);
    }
        
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
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        <div className='logFormm'>
            <div className='logText'>
                <img src={imgEmail} alt="image Email" />
                <h2>Create new password</h2>
                <p>Your new password must be unique from those previously used</p>
        </div>

        {errorPost && <p className="error">{errorPost}</p>}

        <form onSubmit={handlesubmit}>
        <label>New Password</label>
        <div className='pass-input'>
            <input 
            type={showPass ? 'text' : 'password'}
            placeholder='new Password'
            value={form.newPassword}
            onChange={(e)=> setForm({...form, newPassword: e.target.value})}
            />

            <i 
            className={showPass ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
            onClick={() => setShowPass(!showPass)}
            ></i>
        </div>
        <label>Confirm Password</label>
        <div className='pass-input'>
            <input 
            type={showPass ? 'text' : 'password'}
            placeholder='passwordConfirm'
            value={form.passwordConfirm}
            onChange={(e)=> setForm({...form, passwordConfirm: e.target.value})}
            />

            <i 
            className={showPass ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
            onClick={() => setShowPass(!showPass)}
            ></i>
        </div>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>

        <div className='contbox'>
            <p>Created By UniVerse Team</p>
            <Link>Contact us</Link>
        </div>
        </div>
      </div>
    </div>
  )
}
