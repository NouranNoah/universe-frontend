import React, { useState ,useContext ,useEffect } from 'react'
import './Login.css'
import imglog from '../../assets/loginImg.png'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../Auth/AuthContext/authContext";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errorPost, seterrorpost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass,setShowPass]= useState(false);

  const { login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const [remember, setRemember] = useState(false);
  React.useEffect(()=>{
    const saveEmail= localStorage.getItem('email');
    const savePassword= localStorage.getItem('password');
    if(saveEmail && savePassword){
        setForm(
            {
                email:saveEmail,
                password: savePassword
            }
        )
        setRemember(true);
    }
  },[])
  
  const Navigate = useNavigate();

  async function handlesubmit(e){
    e.preventDefault();
    setLoading(true);
    seterrorpost('')
    if(form.email ==="" || form.password ===""){
        seterrorpost("Please fill in all fields");
        setLoading(false);
        return;
    }
    if (remember){
        localStorage.setItem('email',form.email);
        localStorage.setItem('password',form.password);
    }else{
        localStorage.removeItem('email');
        localStorage.removeItem('password')
    }
    console.log(form);


    try {
        let res = await axios.post(
            `https://uni-verse-rho.vercel.app/auth/login`, 
        form
        );

        login({
          token: res.data.token,
          role: res.data.data.role,
          name: res.data.data.name,
          id: res.data.data._id
        });
        
        if(res.data.data.role === "admin") Navigate("/dashboard/dashboardAdmin");
        else if(res.data.data.role === "professor") Navigate("/doctor");
        else if(res.data.data.role === "student") Navigate("/student");
    } 
    catch (error) {
        setLoading(false);
        console.log(error.response?.data);
        seterrorpost(error.response?.data?.message || "Something went wrong");
        if(error.response && error.response.status === 401){
            seterrorpost("Email or password is not valid");
        } else {
            seterrorpost("Oops something went wrong, please try again");
        }
    }
}
  

  return (
    <div className='login-container'>
      <div className='logImg'>
        <img src={imglog} alt="login image" />
      </div>

      <div className='logBox'>
        <div className='logo'>
          <img src={logo} alt="logo" />
          <p>UniVerse</p>
        </div>

        <div className='logForm'>
            <div className='logText'>
          <h2>Welcome Back</h2>
          <p>Log in to Manage Administrative Tasks</p>
        </div>

        {errorPost && <p className="error">{errorPost}</p>}

        <form onSubmit={handlesubmit}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder='Email'
            value={form.email}
            onChange={(e)=> setForm({...form, email: e.target.value})}
        />

        <label>Password</label>
        <div className='pass-input'>
            <input 
            type={showPass ? 'text' : 'password'}
            placeholder='Password'
            value={form.password}
            onChange={(e)=> setForm({...form, password: e.target.value})}
            />

            <i 
            className={showPass ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
            onClick={() => setShowPass(!showPass)}
            ></i>
        </div>
        <div className='login-options'>
            <label className="remember-box">
                <input 
                type="checkbox"
                checked={remember}
                onChange={(e)=>{setRemember(e.target.checked)}}
                />
                Remember me
            </label>
            <Link to='/ForgotPassword' className='forgetlink'>Forgot Password!</Link>
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
